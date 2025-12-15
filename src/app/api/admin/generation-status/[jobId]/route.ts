import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/admin/job-queue';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    // Get job from queue (now async)
    const job = await getJob(jobId);

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Return job status
    return NextResponse.json({
      _id: job._id,
      status: job.status,
      progress: job.progress,
      currentStep: job.currentStep,
      logs: job.logs,

      // Result data (only if completed)
      ...(job.status === 'completed' && {
        result: job.result
      }),

      // Error data (only if failed)
      ...(job.status === 'failed' && {
        error: job.error,
      }),
    });

  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Generation status API error:', err);
    return NextResponse.json(
      { error: 'Failed to get job status', details: err.message },
      { status: 500 }
    );
  }
}
