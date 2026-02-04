import { NextRequest, NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { generateCaseStudyMarkdown } from '@/lib/portableTextToMarkdown';

/**
 * AX-SEO (Agent Experience SEO) endpoint
 * Serves case studies as raw markdown for AI/LLM crawlers
 *
 * Usage: GET /api/work/[slug] or /work/[slug].md (via middleware rewrite)
 */

const caseStudyMarkdownQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    tag,
    description,
    metrics,
    publishedAt,
    content,
    clientName,
    industry,
    timeframe,
    faqSchema,
    tldr,
    keyTakeaways,
    problemStatement,
    solutionApproach,
    resultsOutcome,
    servicesUsed
  }
`;

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;

    const caseStudy = await client.fetch(caseStudyMarkdownQuery, { slug });

    if (!caseStudy) {
        return new NextResponse('# 404 Not Found\n\nCase study not found.', {
            status: 404,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    }

    const markdown = generateCaseStudyMarkdown(caseStudy);

    return new NextResponse(markdown, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
