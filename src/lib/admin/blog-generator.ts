import { ContentBrief, getOutlinePrompt, getSectionPrompt, getFormatSectionPrompt, getSEOMetadataPrompt } from './gemini-prompts';
import { generateOutline, generateSection, formatSection as formatWithLite, generateSEOMetadata, parseJSONFromResponse } from './gemini-client';
import { updateJobStatus, updateJobProgress, setJobData, logToJob, failJob, completeJob, getJob, BlogGenerationJob } from './job-queue';
import { convertMarkdownToPortableText } from '@/lib/markdown-to-portable-text';

/**
 * Process a single step of the blog generation job
 * This is designed to be called repeatedly by the client to avoid timeouts
 */
export async function processJobStep(jobId: string): Promise<BlogGenerationJob> {
  const job = await getJob(jobId);

  if (!job) {
    throw new Error(`Job ${jobId} not found`);
  }

  if (job.status === 'completed' || job.status === 'failed') {
    return job;
  }

  try {
    switch (job.status) {
      case 'pending':
        return await startGeneration(job);

      case 'generating-outline':
        return await stepGenerateOutline(job);

      case 'generating-sections':
        return await stepGenerateNextSection(job);

      case 'generating-seo':
        return await stepGenerateSEO(job);

      case 'creating-draft':
        return await stepCreateDraft(job);

      default:
        throw new Error(`Unknown job status: ${job.status}`);
    }
  } catch (error: any) {
    console.error('Job processing error:', error);
    await failJob(jobId, error.message || 'Unknown error occurred');
    return await getJob(jobId) as BlogGenerationJob;
  }
}

async function startGeneration(job: BlogGenerationJob): Promise<BlogGenerationJob> {
  await logToJob(job._id, 'Starting blog generation...');
  await updateJobStatus(job._id, 'generating-outline');
  await updateJobProgress(job._id, 5, 'Generating outline...');
  return await getJob(job._id) as BlogGenerationJob;
}

async function stepGenerateOutline(job: BlogGenerationJob): Promise<BlogGenerationJob> {
  await logToJob(job._id, 'Generating outline with Gemini Pro...');

  const outlinePrompt = getOutlinePrompt(job.brief);
  const outline = await generateOutline(outlinePrompt);

  // Parse sections immediately
  const sections = parseOutlineForSections(outline);

  await setJobData(job._id, {
    outline,
    sections: [], // Initialize empty generated sections array
  });

  await logToJob(job._id, `Outline generated with ${sections.length} sections`);
  await updateJobStatus(job._id, 'generating-sections');
  await updateJobProgress(job._id, 15, 'Outline complete. Starting sections...');

  return await getJob(job._id) as BlogGenerationJob;
}

async function stepGenerateNextSection(job: BlogGenerationJob): Promise<BlogGenerationJob> {
  const outline = job.outline || '';
  const allSections = parseOutlineForSections(outline);
  const currentGeneratedCount = job.sections?.length || 0;

  // Check if we're done with sections
  if (currentGeneratedCount >= allSections.length) {
    await logToJob(job._id, 'All sections generated!');
    await updateJobStatus(job._id, 'generating-seo');
    await updateJobProgress(job._id, 75, 'Generating SEO metadata...');
    return await getJob(job._id) as BlogGenerationJob;
  }

  // Generate next section
  const sectionIndex = currentGeneratedCount;
  const sectionTitle = allSections[sectionIndex];
  const totalSections = allSections.length;

  await logToJob(job._id, `Generating section ${sectionIndex + 1}/${totalSections}: "${sectionTitle}"`);

  // Calculate progress (from 20% to 70%)
  const progressPerSection = 50 / totalSections;
  const currentProgress = 20 + (sectionIndex * progressPerSection);
  await updateJobProgress(job._id, currentProgress, `Writing section: ${sectionTitle}`);

  // Mark current section in outline
  const markedOutline = markSectionInOutline(outline, sectionTitle);
  const sectionPrompt = getSectionPrompt(markedOutline, job.brief, sectionIndex, totalSections);
  const sectionContent = await generateSection(sectionPrompt);

  // Re-check job state to detect race conditions
  const freshJob = await getJob(job._id);
  const freshSectionCount = freshJob?.sections?.length || 0;

  if (freshSectionCount > currentGeneratedCount) {
    // Another process already added a section - abort this duplicate work
    await logToJob(job._id, `Race condition detected: section ${sectionIndex + 1} already being processed, skipping duplicate`);
    return freshJob as BlogGenerationJob;
  }

  // Validate section content is not empty
  if (!sectionContent || sectionContent.trim().length < 50) {
    await logToJob(job._id, `ERROR: Section ${sectionIndex + 1} generated empty content, retrying...`);
    throw new Error(`Section generation failed - content too short (${sectionContent?.length || 0} chars)`);
  }

  // 25% chance of formatting this section
  const shouldFormat = Math.random() < 0.25;
  const finalContent = shouldFormat
    ? await formatSectionContent(sectionContent, job._id, sectionIndex + 1)
    : sectionContent;

  const formattedSection = `## ${sectionTitle}\n\n${finalContent}`;

  // Append to sections array
  // Note: We need to fetch the latest job state again to ensure we don't overwrite concurrent updates
  // but since we are serializing via client, we can just append to what we have
  const updatedSections = [...(job.sections || []), formattedSection];

  await setJobData(job._id, { sections: updatedSections });
  await logToJob(job._id, `Section ${sectionIndex + 1} complete (${countWords(finalContent)} words)`);

  return await getJob(job._id) as BlogGenerationJob;
}

async function stepGenerateSEO(job: BlogGenerationJob): Promise<BlogGenerationJob> {
  await logToJob(job._id, 'Generating SEO metadata...');

  // Combine all sections
  const fullMarkdown = `# ${job.brief.title}\n\n${(job.sections || []).join('\n\n')}`;
  await setJobData(job._id, { fullMarkdown });

  const seoPrompt = getSEOMetadataPrompt(fullMarkdown, job.brief);

  let seoMetadata;
  try {
    const seoResponse = await generateSEOMetadata(seoPrompt);
    seoMetadata = parseJSONFromResponse(seoResponse);
  } catch (error: any) {
    await logToJob(job._id, `ERROR parsing SEO metadata: ${error.message}`);
    throw new Error(`SEO metadata generation failed: ${error.message}`);
  }

  // Validate SEO metadata
  if (!seoMetadata.title || !seoMetadata.description || !seoMetadata.slug) {
    const errorMsg = `Invalid SEO metadata - missing fields. Got: ${JSON.stringify(Object.keys(seoMetadata))}`;
    await logToJob(job._id, `ERROR: ${errorMsg}`);
    throw new Error(errorMsg);
  }

  await setJobData(job._id, { seoMetadata });
  await logToJob(job._id, `SEO metadata generated: "${seoMetadata.title}"`);

  await updateJobStatus(job._id, 'creating-draft');
  await updateJobProgress(job._id, 90, 'Creating draft in Sanity...');

  return await getJob(job._id) as BlogGenerationJob;
}

async function stepCreateDraft(job: BlogGenerationJob): Promise<BlogGenerationJob> {
  if (!job.seoMetadata || !job.fullMarkdown) {
    throw new Error('Missing data for draft creation');
  }

  await logToJob(job._id, 'Creating Sanity draft...');

  const portableText = convertMarkdownToPortableText(job.fullMarkdown);
  await logToJob(job._id, `Converted to ${portableText.length} Portable Text blocks`);

  // Call the existing API endpoint
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT || 3000}` : 'http://localhost:3000');

  const createDraftResponse = await fetch(`${baseUrl}/api/create-blog-draft`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.BLOG_API_KEY || '',
    },
    body: JSON.stringify({
      title: job.brief.title,
      slug: job.seoMetadata.slug,
      excerpt: job.seoMetadata.excerpt,
      description: job.seoMetadata.description,
      tags: job.seoMetadata.tags,
      markdown: job.fullMarkdown,
    }),
  });

  if (!createDraftResponse.ok) {
    const errorData = await createDraftResponse.json();
    throw new Error(`Failed to create Sanity draft: ${errorData.error || 'Unknown error'}`);
  }

  const draftResult = await createDraftResponse.json();

  await completeJob(job._id, {
    sanityDocumentId: draftResult.documentId,
    studioUrl: draftResult.studioUrl,
    futurePublishedUrl: draftResult.futurePublishedUrl,
  });

  return await getJob(job._id) as BlogGenerationJob;
}

// Helper functions (same as before)

function parseOutlineForSections(outline: string): string[] {
  const h2Regex = /^## (.+)$/gm;
  const sections: string[] = [];
  let match;

  while ((match = h2Regex.exec(outline)) !== null) {
    sections.push(match[1].trim());
  }

  return sections;
}

function markSectionInOutline(outline: string, sectionTitle: string): string {
  const escapedTitle = sectionTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^(## ${escapedTitle})$`, 'gm');
  return outline.replace(regex, '$1 <--');
}

async function formatSectionContent(content: string, jobId: string, sectionNum: number): Promise<string> {
  try {
    await logToJob(jobId, `Formatting section ${sectionNum}...`);
    const formatPrompt = getFormatSectionPrompt(content);
    const formatted = await formatWithLite(formatPrompt);
    return formatted;
  } catch (error: any) {
    await logToJob(jobId, `Formatting failed for section ${sectionNum}, using original`);
    return content;
  }
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}
