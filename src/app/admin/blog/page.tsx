'use client';

import { useState } from 'react';
import { ContentBrief } from '@/lib/admin/gemini-prompts';
import ContentBriefForm from './components/ContentBriefForm';
import GenerationProgress from './components/GenerationProgress';
import ResultsCard from './components/ResultsCard';

type ViewState = 'form' | 'generating' | 'completed';

interface BlogResult {
  status: string;
  error?: string;
  result?: {
    sanityDocumentId: string;
    studioUrl: string;
    futurePublishedUrl: string;
    seoMetadata?: {
      title: string;
      slug: string;
      tags: string[];
    };
  };
}

export default function BlogAutomationPage() {
  const [viewState, setViewState] = useState<ViewState>('form');
  const [jobId, setJobId] = useState<string | null>(null);
  const [result, setResult] = useState<BlogResult['result'] | null>(null);

  const handleFormSubmit = async (brief: ContentBrief) => {
    try {
      const response = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brief),
      });

      if (!response.ok) {
        throw new Error('Failed to start blog generation');
      }

      const data = await response.json();
      setJobId(data.jobId);
      setViewState('generating');

    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      alert(`Error: ${message}`);
      console.error('Form submission error:', error);
    }
  };

  const handleGenerationComplete = (data: BlogResult) => {
    if (data.status === 'completed' && data.result) {
      setResult(data.result);
      setViewState('completed');
    } else if (data.status === 'failed') {
      alert(`Generation failed: ${data.error}`);
      setViewState('form');
      setJobId(null);
    }
  };

  const handleGenerateAnother = () => {
    setViewState('form');
    setJobId(null);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 font-satoshi">
          Blog Automation
        </h1>
        <p className="text-gray-400">
          Generate high-quality blog posts powered by AI in minutes
        </p>
      </div>

      {/* View States */}
      {viewState === 'form' && (
        <ContentBriefForm
          onSubmit={handleFormSubmit}
          isGenerating={false}
        />
      )}

      {viewState === 'generating' && jobId && (
        <GenerationProgress
          jobId={jobId}
          onComplete={handleGenerationComplete}
        />
      )}

      {viewState === 'completed' && result && (
        <ResultsCard
          result={result}
          onGenerateAnother={handleGenerateAnother}
        />
      )}

      {/* Info Cards */}
      {viewState === 'form' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-white mb-1">Fast Generation</h3>
            <p className="text-sm text-gray-400">
              Complete blog posts in 2-5 minutes with AI-powered generation
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-semibold text-white mb-1">High Quality</h3>
            <p className="text-sm text-gray-400">
              Professional content with SEO optimization and natural link placement
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="font-semibold text-white mb-1">Cost Effective</h3>
            <p className="text-sm text-gray-400">
              Only $0.15 per post using Gemini Pro + Flash (75% cheaper than GPT-4)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
