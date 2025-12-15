'use client';

import { useState, useEffect, useRef } from 'react';

interface JobStatus {
  _id: string;
  status: string;
  progress: number;
  currentStep: string;
  logs: string[];
  error?: string;
  result?: any;
}

interface GenerationProgressProps {
  jobId: string;
  onComplete: (result: any) => void;
}

export default function GenerationProgress({ jobId, onComplete }: GenerationProgressProps) {
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const isProcessingRef = useRef(false);

  // Scroll to bottom of logs
  useEffect(() => {
    if (showLogs && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [jobStatus?.logs, showLogs]);

  useEffect(() => {
    let isMounted = true;

    const processNextStep = async () => {
      if (!isMounted || isProcessingRef.current) return;

      isProcessingRef.current = true;

      try {
        const response = await fetch('/api/admin/process-blog-job', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobId }),
        });

        if (!response.ok) {
          throw new Error('Failed to process job step');
        }

        const data = await response.json();

        if (isMounted) {
          setJobStatus(data);

          if (data.status === 'completed') {
            onComplete(data.result);
            return; // Stop processing
          } else if (data.status === 'failed') {
            // Stop processing on failure
            return;
          } else {
            // Wait 2 seconds before next step to prevent race conditions
            await new Promise(resolve => setTimeout(resolve, 2000));
            isProcessingRef.current = false;
            processNextStep();
          }
        }
      } catch (error) {
        console.error('Step processing error:', error);
        // Retry after delay if it was a network error, or stop?
        // For now, let's retry after a short delay to be robust
        setTimeout(() => {
          isProcessingRef.current = false;
          processNextStep();
        }, 2000);
      }
    };

    // Start the loop
    processNextStep();

    return () => {
      isMounted = false;
    };
  }, [jobId, onComplete]);

  if (!jobStatus) {
    return (
      <div className="bg-glass border border-glass-border backdrop-blur-[15px] p-12 rounded-[20px] shadow-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-foreground text-lg">Initializing job...</span>
        </div>
      </div>
    );
  }

  const getStepStatus = (stepName: string) => {
    // Map high-level status to individual steps for UI visualization
    const steps = [
      { id: 'generating-outline', label: 'Generate Outline' },
      { id: 'generating-sections', label: 'Write Sections' },
      { id: 'generating-seo', label: 'Generate SEO Metadata' },
      { id: 'creating-draft', label: 'Create Sanity Draft' },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === jobStatus.status);
    const targetStepIndex = steps.findIndex(s => s.label === stepName);

    if (jobStatus.status === 'completed') return 'completed';
    if (jobStatus.status === 'failed') return 'failed';

    if (currentStepIndex > targetStepIndex) return 'completed';
    if (currentStepIndex === targetStepIndex) return 'in-progress';
    return 'pending';
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'failed': return '❌';
      default: return '⏸';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-foreground/40';
    }
  };

  const uiSteps = [
    'Generate Outline',
    'Write Sections',
    'Generate SEO Metadata',
    'Create Sanity Draft'
  ];

  return (
    <div className="bg-glass border border-glass-border backdrop-blur-[15px] p-8 md:p-12 rounded-[20px] shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-heading">
          {jobStatus.status === 'completed' ? '✅ Blog Post Created!' :
            jobStatus.status === 'failed' ? '❌ Generation Failed' :
              '⏳ Generating Blog Post...'}
        </h2>
        <p className="text-muted text-lg">{jobStatus.currentStep}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted mb-3">
          <span className="font-medium">Progress</span>
          <span className="font-semibold">{Math.round(jobStatus.progress)}%</span>
        </div>
        <div className="w-full bg-glass border border-glass-border rounded-full h-3 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(255,77,40,0.5)]"
            style={{ width: `${jobStatus.progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="mb-8 space-y-3">
        {uiSteps.map((stepName, index) => {
          const status = getStepStatus(stepName);
          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-3 rounded-lg bg-glass border border-glass-border transition-all duration-400 ${getStatusColor(status)}`}
            >
              <span className="text-2xl">{getStepIcon(status)}</span>
              <span className="flex-1 font-medium">{stepName}</span>
              {status === 'in-progress' && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {jobStatus.error && (
        <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 font-semibold mb-2 text-lg">Error:</p>
          <p className="text-red-300">{jobStatus.error}</p>
        </div>
      )}

      {/* Logs */}
      <div>
        <button
          onClick={() => setShowLogs(!showLogs)}
          className="flex items-center justify-between w-full text-left px-4 py-3 rounded-lg bg-glass border border-glass-border hover:bg-glass-hover hover:border-primary/30 transition-all duration-400 mb-3"
        >
          <span className="font-semibold text-foreground">Logs</span>
          <span className="text-primary">{showLogs ? '▼' : '▶'}</span>
        </button>

        {showLogs && (
          <div className="bg-background/50 border border-glass-border rounded-lg p-5 max-h-64 overflow-y-auto toc-scrollbar">
            <div className="font-mono text-sm space-y-2">
              {jobStatus.logs?.map((log, index) => (
                <div key={index} className="text-muted">
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Estimated Time */}
      {jobStatus.status !== 'completed' && jobStatus.status !== 'failed' && (
        <p className="text-center text-muted text-sm mt-8">
          Estimated time remaining: {Math.max(0, Math.ceil((100 - jobStatus.progress) / 20))} minutes
        </p>
      )}
    </div>
  );
}
