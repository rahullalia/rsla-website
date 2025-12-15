'use client';

import { useState, useEffect } from 'react';

interface ResultsCardProps {
  result: {
    sanityDocumentId: string;
    studioUrl: string;
    futurePublishedUrl: string;
    seoMetadata?: {
      title: string;
      slug: string;
      tags: string[];
    };
  };
  onGenerateAnother: () => void;
}

export default function ResultsCard({ result, onGenerateAnother }: ResultsCardProps) {
  const [copied, setCopied] = useState(false);
  const [fullStudioUrl, setFullStudioUrl] = useState('');

  useEffect(() => {
    // Capture the origin after component mounts on client side
    setFullStudioUrl(`${window.location.origin}${result.studioUrl}`);
  }, [result.studioUrl]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(result.futurePublishedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <div className="bg-glass border border-glass-border backdrop-blur-[15px] p-8 md:p-12 rounded-[20px] shadow-lg">
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="text-7xl mb-5">✅</div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 font-heading">
          Blog Post Created Successfully!
        </h2>
        {result.seoMetadata && (
          <p className="text-muted text-lg">
            "{result.seoMetadata.title}"
          </p>
        )}
      </div>

      {/* Action Cards */}
      <div className="space-y-5 mb-10">
        {/* Edit in Sanity Studio */}
        <div className="bg-glass border border-glass-border p-6 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
                📝 Edit in Sanity Studio
              </h3>
              <p className="text-muted mb-5">
                Review the outline, content, and SEO metadata. Make any edits before publishing.
              </p>
            </div>
          </div>
          <a
            href={fullStudioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(255,77,40,0.4)] hover:shadow-[0_0_30px_rgba(255,77,40,0.6)] hover:translate-y-[-2px] transition-all duration-400"
          >
            Open Studio
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Future Published URL */}
        <div className="bg-glass border border-glass-border p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
            🔗 Future Published URL
          </h3>
          <p className="text-muted mb-5">
            This is where the blog post will be published after you approve it in Sanity Studio.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={result.futurePublishedUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-glass border border-glass-border rounded-lg text-foreground"
            />
            <button
              onClick={copyUrl}
              className="px-6 py-3 bg-glass border border-glass-border rounded-lg text-foreground hover:bg-glass-hover hover:border-primary/30 transition-all duration-400 font-medium whitespace-nowrap"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* SEO Metadata */}
        {result.seoMetadata && (
          <div className="bg-glass border border-glass-border p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-foreground mb-5 font-heading">
              📊 SEO Metadata
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-muted font-medium">Slug:</span>
                <span className="ml-2 text-foreground">{result.seoMetadata.slug}</span>
              </div>
              <div>
                <span className="text-muted font-medium">Tags:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {result.seoMetadata.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generate Another Button */}
      <button
        onClick={onGenerateAnother}
        className="w-full bg-glass border border-glass-border hover:bg-glass-hover hover:border-primary/30 text-foreground font-semibold py-4 px-6 rounded-full transition-all duration-400 text-lg"
      >
        Generate Another Post
      </button>

      {/* Instructions */}
      <div className="mt-8 p-5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-yellow-200">
          <strong className="font-semibold">Next Steps:</strong> Review and edit the post in Sanity Studio, then publish it when ready.
          The post is currently saved as a draft and won't appear on the live site until you publish it.
        </p>
      </div>
    </div>
  );
}
