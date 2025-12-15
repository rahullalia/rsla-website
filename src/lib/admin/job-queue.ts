import { ContentBrief } from './gemini-prompts';
import { client } from '@/sanity/lib/client';

/**
 * Job Status Types
 */
export type JobStatus = 'pending' | 'generating-outline' | 'generating-sections' | 'generating-seo' | 'creating-draft' | 'completed' | 'failed';

/**
 * Blog Generation Job
 */
export interface BlogGenerationJob {
  _id: string;
  status: JobStatus;
  brief: ContentBrief;
  progress: number; // 0-100
  currentStep: string;
  logs: string[];

  // Generated content
  outline?: string;
  sections?: string[];
  fullMarkdown?: string;
  seoMetadata?: {
    title: string;
    description: string;
    excerpt: string;
    slug: string;
    tags: string[];
  };

  // Result
  result?: {
    sanityDocumentId: string;
    studioUrl: string;
    futurePublishedUrl: string;
  };

  error?: string;
}

/**
 * Create a new blog generation job
 */
export async function createJob(brief: ContentBrief): Promise<string> {
  try {
    const doc = await client.create({
      _type: 'blogGenerationJob',
      status: 'pending',
      brief,
      progress: 0,
      currentStep: 'Initializing...',
      logs: ['Job created'],
      sections: [],
    });

    console.log(`[JobQueue] Created job ${doc._id}`);
    return doc._id;
  } catch (error) {
    console.error('Failed to create job:', error);
    throw error;
  }
}

/**
 * Get job by ID
 */
export async function getJob(jobId: string): Promise<BlogGenerationJob | null> {
  try {
    const job = await client.fetch(`*[_type == "blogGenerationJob" && _id == $jobId][0]`, { jobId });
    return job || null;
  } catch (error) {
    console.error(`Failed to get job ${jobId}:`, error);
    return null;
  }
}

/**
 * Update job status
 */
export async function updateJobStatus(jobId: string, status: JobStatus): Promise<void> {
  try {
    await client.patch(jobId).set({ status }).commit();
  } catch (error) {
    console.error(`Failed to update job status ${jobId}:`, error);
  }
}

/**
 * Update job progress
 */
export async function updateJobProgress(jobId: string, progress: number, currentStep: string): Promise<void> {
  try {
    await client.patch(jobId).set({ progress, currentStep }).commit();
  } catch (error) {
    console.error(`Failed to update job progress ${jobId}:`, error);
  }
}

/**
 * Set job data
 */
export async function setJobData(jobId: string, data: Partial<BlogGenerationJob>): Promise<void> {
  try {
    // Remove _id from data if present to avoid Sanity error
    const { _id, ...updateData } = data as any;
    await client.patch(jobId).set(updateData).commit();
  } catch (error) {
    console.error(`Failed to set job data ${jobId}:`, error);
  }
}

/**
 * Log message to job
 */
export async function logToJob(jobId: string, message: string): Promise<void> {
  try {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logMessage = `[${timestamp}] ${message}`;

    await client.patch(jobId)
      .setIfMissing({ logs: [] })
      .append('logs', [logMessage])
      .commit();
  } catch (error) {
    console.error(`Failed to log to job ${jobId}:`, error);
  }
}

/**
 * Mark job as failed
 */
export async function failJob(jobId: string, error: string): Promise<void> {
  try {
    await client.patch(jobId).set({
      status: 'failed',
      error,
    }).commit();
    await logToJob(jobId, `ERROR: ${error}`);
  } catch (err) {
    console.error(`Failed to fail job ${jobId}:`, err);
  }
}

/**
 * Mark job as completed
 */
export async function completeJob(jobId: string, result: { sanityDocumentId: string; studioUrl: string; futurePublishedUrl: string }): Promise<void> {
  try {
    await client.patch(jobId).set({
      status: 'completed',
      progress: 100,
      currentStep: 'Completed!',
      result,
    }).commit();
    await logToJob(jobId, 'Blog post created successfully!');
  } catch (error) {
    console.error(`Failed to complete job ${jobId}:`, error);
  }
}
