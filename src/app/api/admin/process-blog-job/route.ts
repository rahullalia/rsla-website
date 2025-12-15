import { NextRequest, NextResponse } from 'next/server';
import { processJobStep } from '@/lib/admin/blog-generator';

export async function POST(request: NextRequest) {
    try {
        const { jobId } = await request.json();

        if (!jobId) {
            return NextResponse.json(
                { error: 'Missing jobId' },
                { status: 400 }
            );
        }

        // Process one step of the job
        const updatedJob = await processJobStep(jobId);

        return NextResponse.json(updatedJob);

    } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error('Process blog job API error:', err);
        return NextResponse.json(
            { error: 'Failed to process job step', details: err.message },
            { status: 500 }
        );
    }
}
