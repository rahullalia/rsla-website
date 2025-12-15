import { NextRequest, NextResponse } from 'next/server';
import { ContentBrief } from '@/lib/admin/gemini-prompts';
import { createJob } from '@/lib/admin/job-queue';

const ORACLE_FUNCTION_ENDPOINT = 'https://dpnnb5k7lyrvkmkd5uxbytsk5m.apigateway.us-sanjose-1.oci.customer-oci.com/blog/generate';

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Starting blog generation request...');

    // Parse request body
    const brief: ContentBrief = await request.json();
    console.log('[API] Received brief:', JSON.stringify(brief, null, 2));

    // Validate required fields
    if (!brief.title || !brief.primaryKeyword) {
      console.error('[API] Validation failed - missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: title and primaryKeyword are required' },
        { status: 400 }
      );
    }

    // Set defaults
    if (!brief.wordCount) brief.wordCount = 1500;
    if (!brief.secondaryKeywords) brief.secondaryKeywords = [];
    if (!brief.internalLinks) brief.internalLinks = [];
    if (!brief.externalLinks) brief.externalLinks = [];

    console.log('[API] Brief after defaults:', JSON.stringify(brief, null, 2));
    console.log('[API] Attempting to create job in Sanity...');

    // Create job in Sanity
    const jobId = await createJob(brief);
    console.log('[API] Job created successfully with ID:', jobId);

    // Trigger Oracle Function asynchronously (fire-and-forget)
    triggerOracleFunction(jobId).catch(err => {
      console.error('[API] Oracle Function trigger error:', err);
    });

    // Return job ID immediately (202 Accepted)
    return NextResponse.json({
      success: true,
      jobId,
      message: 'Blog generation started. Oracle Function is processing your request.',
    }, { status: 202 });

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('[API] ERROR - Generate blog API error:', err);
    console.error('[API] ERROR - Error message:', err.message);
    console.error('[API] ERROR - Error stack:', err.stack);

    return NextResponse.json(
      {
        error: 'Failed to create blog generation job',
        details: err.message,
        errorName: err.name,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Trigger Oracle Function to process blog generation
 */
async function triggerOracleFunction(jobId: string) {
  try {
    console.log('[Oracle] Triggering Oracle Function for job:', jobId);

    const response = await fetch(ORACLE_FUNCTION_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Oracle Function returned ${response.status}: ${error}`);
    }

    const result = await response.json();
    console.log('[Oracle] Function triggered successfully:', result);
    return result;

  } catch (error) {
    console.error('[Oracle] Failed to trigger function:', error);
    throw error;
  }
}
