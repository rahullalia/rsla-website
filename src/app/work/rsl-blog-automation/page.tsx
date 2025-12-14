import CaseStudyLayout from '@/components/CaseStudyLayout';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saved $18K a Year with Make.com and ChatGPT | RSL/A',
  description: 'Facing high copywriting costs, RSL/A built an internal automation system to consistently publish high-quality, SEO-optimized blog content, saving $18,000 annually.',
  openGraph: {
    title: 'Blog Automation Case Study: How RSL/A Saved $18K a Year with Make.com and ChatGPT',
    description: 'Facing high copywriting costs, RSL/A built an internal automation system to consistently publish high-quality, SEO-optimized blog content, saving $18,000 annually.',
    url: 'https://www.rsla.io/work/rsl-blog-automation',
    siteName: 'RSL/A',
    type: 'article',
  },
};

export default function RSLBlogAutomationPage() {
  const stats = [
    { value: '$18,000', label: 'Annual Cost Saved' },
    { value: '4X', label: 'Posts per Month Achieved' },
    { value: '99%', label: 'Manual Work Eliminated' },
  ];

  return (
    <CaseStudyLayout
      tag="AI Automation & Content Strategy"
      title="Blog Automation Case Study: How RSL/A Saved $18K a Year with Make.com and ChatGPT"
      subtitle="Facing high copywriting costs, RSL/A built an internal automation system to consistently publish high-quality, SEO-optimized blog content, saving $18,000 annually."
      stats={stats}
    >
      <h2>The Challenge: The High Cost of Content Consistency</h2>
      <p>
        At RSL/A, maintaining a steady stream of blog content is essential for demonstrating our expertise in automation, SEO, and digital strategy. However, relying on traditional methods quickly became inefficient and expensive. At an average cost of $75 per article, publishing just four posts a month totaled <strong>$300 per month</strong>, or <strong>$3,600 annually</strong> in raw copywriting fees.
      </p>
      <p>
        The total cost, including internal coordination and editing time, was estimated to approach <strong>$18,000 a year</strong>, a massive expenditure for any growing business. Beyond cost, the system lacked two key factors: <strong>Time</strong> (manual editing and publishing slowed the pipeline) and <strong>Consistency</strong> (maintaining a reliable weekly schedule was a constant struggle).
      </p>

      <div className="key-takeaway-box">
        <h3>Key Takeaway from Challenge</h3>
        <p>
          The core problem was the <strong>scaling bottleneck of human labor in a low-margin content production process</strong>, confirming the need for an efficient, repeatable system to maintain authority.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Apply This Insight to Your Business
        </Link>
      </div>

      <h2>The RSL/A Solution: Building the AI Content Engine</h2>
      <p>
        We solved this problem internally by designing an autonomous blog creation pipeline using no-code tools. This exact system is now available to clients looking to save on content costs while boosting consistency.
      </p>

      <h3>Phase 1: Workflow Foundation & AI Integration</h3>
      <ul>
        <li>
          We established a front-end form (Typeform) to capture blog topics, primary/secondary keywords, and internal/external links.
        </li>
        <li>
          The data feeds into a central record (Google Sheets) for tracking.
        </li>
        <li>
          The core action uses a custom prompt to instruct <strong>ChatGPT</strong> to generate SEO-optimized outlines and full posts.
        </li>
      </ul>

      <div className="my-8 max-w-xl mx-auto">
        <a
          href="/images/case-studies/rsl-blog-automation/typeform-screenshot.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-zoom-in hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/case-studies/rsl-blog-automation/typeform-screenshot.png"
            alt="Typeform interface for blog topic input"
            className="rounded-lg border border-white/10 w-full h-auto"
          />
        </a>
        <p className="text-sm text-gray-500 text-center mt-2">Typeform input interface (click to expand)</p>
      </div>

      <h3>Phase 2: Automation & Publishing</h3>
      <p>
        The entire system is orchestrated by <strong>Make.com</strong>. Once a topic is entered into the initial Typeform, the workflow takes over. The generated content is automatically organized and saved in Google Drive, and the final post is published directly to <strong>WordPress</strong>, completely eliminating manual copying, pasting, and scheduling.
      </p>

      <div className="my-8 max-w-2xl mx-auto">
        <a
          href="/images/case-studies/rsl-blog-automation/automation-screenshot.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-zoom-in hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/case-studies/rsl-blog-automation/automation-screenshot.png"
            alt="Make.com automation workflow for blog publishing"
            className="rounded-lg border border-white/10 w-full h-auto"
          />
        </a>
        <p className="text-sm text-gray-500 text-center mt-2">Make.com automation workflow (click to expand)</p>
      </div>

      <div className="my-8 p-6 bg-white/[0.03] border border-white/10 rounded-lg max-w-2xl mx-auto">
        <h4 className="text-lg font-semibold mb-3">Want to Use This Automation?</h4>
        <p className="text-gray-400 mb-4">
          Download the Make.com blueprint and import it directly into your account to set up this exact workflow in minutes.
        </p>
        <a
          href="/downloads/typeform-ai-content-generator.blueprint.json"
          download
          className="inline-block bg-brand-blue px-6 py-3 rounded-lg font-semibold hover:bg-brand-blue/90 transition-colors text-white"
        >
          Download Blueprint (.json)
        </a>
      </div>

      <h2>The Results: $18,000 in Annual Savings</h2>

      <div className="proof-box">
        <h3>Internal Takeaway</h3>
        <p>
          &quot;What used to cost the same as a part-time employee now runs for less than the cost of a single outsourced blog post. This system proved our commitment to efficiency and automation.&quot;
        </p>
      </div>

      <p>
        The implemented automation system delivered an immediate and dramatic impact on both cost and content velocity, solidifying RSL/A&apos;s market authority.
      </p>

      <ul>
        <li>
          Achieved <strong>$18,000 in annual savings</strong> compared to the estimated fully-burdened cost of manual copywriting.
        </li>
        <li>
          Enabled <strong>consistent, high-quality blog publishing every week</strong> without taxing internal team resources.
        </li>
        <li>
          Eliminated <strong>hours of manual work</strong>, replacing data entry, writing, and formatting with a few simple clicks.
        </li>
      </ul>

      <div className="cta-section">
        <h2>Save time and money like this client</h2>
        <p>
          If you want consistent blog content or other repetitive tasks automated without burning through thousands in labor costs, let&apos;s set up your custom AI automation system.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Show Me How to Save
        </Link>
      </div>
    </CaseStudyLayout>
  );
}
