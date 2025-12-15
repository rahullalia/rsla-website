'use client';

import { useState } from 'react';
import { ContentBrief } from '@/lib/admin/gemini-prompts';

interface ContentBriefFormProps {
  onSubmit: (brief: ContentBrief) => void;
  isGenerating: boolean;
}

export default function ContentBriefForm({ onSubmit, isGenerating }: ContentBriefFormProps) {
  const [title, setTitle] = useState('');
  const [wordCount, setWordCount] = useState(1500);
  const [primaryKeyword, setPrimaryKeyword] = useState('');
  const [secondaryKeywords, setSecondaryKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [internalLinks, setInternalLinks] = useState<string[]>([]);
  const [internalLinkInput, setInternalLinkInput] = useState('');
  const [externalLinks, setExternalLinks] = useState<string[]>([]);
  const [externalLinkInput, setExternalLinkInput] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const brief: ContentBrief = {
      title,
      wordCount,
      primaryKeyword,
      secondaryKeywords,
      internalLinks,
      externalLinks,
      additionalInstructions: additionalInstructions || undefined,
    };

    onSubmit(brief);
  };

  const addSecondaryKeyword = () => {
    if (keywordInput.trim() && !secondaryKeywords.includes(keywordInput.trim())) {
      setSecondaryKeywords([...secondaryKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeSecondaryKeyword = (keyword: string) => {
    setSecondaryKeywords(secondaryKeywords.filter(k => k !== keyword));
  };

  const addInternalLink = () => {
    if (internalLinkInput.trim()) {
      if (!internalLinkInput.startsWith('https://rslmediahub.com')) {
        alert('Internal links must start with https://rslmediahub.com');
        return;
      }
      setInternalLinks([...internalLinks, internalLinkInput.trim()]);
      setInternalLinkInput('');
    }
  };

  const removeInternalLink = (link: string) => {
    setInternalLinks(internalLinks.filter(l => l !== link));
  };

  const addExternalLink = () => {
    if (externalLinkInput.trim()) {
      if (!externalLinkInput.startsWith('http://') && !externalLinkInput.startsWith('https://')) {
        alert('External links must start with http:// or https://');
        return;
      }
      setExternalLinks([...externalLinks, externalLinkInput.trim()]);
      setExternalLinkInput('');
    }
  };

  const removeExternalLink = (link: string) => {
    setExternalLinks(externalLinks.filter(l => l !== link));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-glass border border-glass-border backdrop-blur-[15px] p-8 md:p-12 rounded-[20px] shadow-lg">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-heading">Blog Post Generator</h2>

      {/* Basic Information */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6 font-heading tracking-wide">Basic Information</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted transition-all duration-400"
              placeholder="e.g., AI in Dental Marketing"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="wordCount" className="block text-sm font-medium text-foreground mb-2">
                Word Count <span className="text-primary">*</span>
              </label>
              <input
                type="number"
                id="wordCount"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                min="500"
                max="5000"
                step="100"
                className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground transition-all duration-400"
                required
              />
            </div>

            <div>
              <label htmlFor="primaryKeyword" className="block text-sm font-medium text-foreground mb-2">
                Primary Keyword <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="primaryKeyword"
                value={primaryKeyword}
                onChange={(e) => setPrimaryKeyword(e.target.value)}
                className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted transition-all duration-400"
                placeholder="e.g., dental marketing"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Keywords */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6 font-heading tracking-wide">SEO Keywords</h3>

        <div>
          <label htmlFor="secondaryKeywords" className="block text-sm font-medium text-foreground mb-2">
            Secondary Keywords
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              id="secondaryKeywords"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSecondaryKeyword())}
              className="flex-1 px-4 py-2.5 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted transition-all duration-400"
              placeholder="Enter a keyword and press Enter"
            />
            <button
              type="button"
              onClick={addSecondaryKeyword}
              className="px-6 py-2.5 bg-glass border border-glass-border rounded-lg text-foreground hover:bg-glass-hover hover:border-primary/30 transition-all duration-400"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {secondaryKeywords.map(keyword => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => removeSecondaryKeyword(keyword)}
                  className="hover:text-primary-hover"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-6 font-heading tracking-wide">Links</h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="internalLinks" className="block text-sm font-medium text-foreground mb-2">
              Internal Links (rslmediahub.com)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                id="internalLinks"
                value={internalLinkInput}
                onChange={(e) => setInternalLinkInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInternalLink())}
                className="flex-1 px-4 py-2.5 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted transition-all duration-400"
                placeholder="https://rslmediahub.com/..."
              />
              <button
                type="button"
                onClick={addInternalLink}
                className="px-6 py-2.5 bg-glass border border-glass-border rounded-lg text-foreground hover:bg-glass-hover hover:border-primary/30 transition-all duration-400"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {internalLinks.map(link => (
                <div
                  key={link}
                  className="flex items-center justify-between px-3 py-2 bg-foreground/5 rounded text-sm"
                >
                  <span className="text-foreground/80 truncate">{link}</span>
                  <button
                    type="button"
                    onClick={() => removeInternalLink(link)}
                    className="text-foreground/60 hover:text-primary ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="externalLinks" className="block text-sm font-medium text-foreground mb-2">
              External Links
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                id="externalLinks"
                value={externalLinkInput}
                onChange={(e) => setExternalLinkInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExternalLink())}
                className="flex-1 px-4 py-2.5 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted transition-all duration-400"
                placeholder="https://example.com/..."
              />
              <button
                type="button"
                onClick={addExternalLink}
                className="px-6 py-2.5 bg-glass border border-glass-border rounded-lg text-foreground hover:bg-glass-hover hover:border-primary/30 transition-all duration-400"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {externalLinks.map(link => (
                <div
                  key={link}
                  className="flex items-center justify-between px-3 py-2 bg-foreground/5 rounded text-sm"
                >
                  <span className="text-foreground/80 truncate">{link}</span>
                  <button
                    type="button"
                    onClick={() => removeExternalLink(link)}
                    className="text-foreground/60 hover:text-primary ml-2"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Instructions */}
      <div className="mb-8">
        <label htmlFor="additionalInstructions" className="block text-sm font-medium text-foreground mb-2">
          Additional Instructions (Optional)
        </label>
        <textarea
          id="additionalInstructions"
          value={additionalInstructions}
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary/50 text-foreground placeholder:text-muted resize-none transition-all duration-400"
          placeholder="Any specific requirements or tone adjustments..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating}
        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,77,40,0.4)] hover:shadow-[0_0_30px_rgba(255,77,40,0.6)] hover:translate-y-[-2px] transition-all duration-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none text-lg"
      >
        {isGenerating ? 'Generating...' : 'Generate Blog Post'}
      </button>

      {/* Estimated Time */}
      {!isGenerating && (
        <p className="text-center text-muted text-sm mt-4">
          Estimated generation time: 2-5 minutes
        </p>
      )}
    </form>
  );
}
