import CaseStudyLayout from '@/components/CaseStudyLayout';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Proposal Generator Saves $22K Annually for RSL/A | Case Study',
  description: 'RSL/A automated proposal creation with AI, reducing production time from 2 hours to 10 minutes and recovering 165 hours annually through Make.com, Claude AI, and Google Docs integration.',
  openGraph: {
    title: 'AI Proposal Generator Saves $22K Annually and Recovers 165 Hours Per Year',
    description: 'RSL/A automated proposal creation with AI, reducing production time from 2 hours to 10 minutes per proposal. Built with Make.com, Claude AI, and Google Docs.',
    url: 'https://www.rsla.io/work/proposal-generator-automation',
    siteName: 'RSL/A',
    type: 'article',
  },
};

export default function ProposalGeneratorAutomationPage() {
  const stats = [
    { value: '92%', label: 'Time Reduction' },
    { value: '$22K+', label: 'Annual Savings' },
    { value: '165hrs', label: 'Recovered Per Year' },
  ];

  return (
    <CaseStudyLayout
      tag="AI Automation & Workflow"
      title="AI Proposal Generator Saves $22K Annually and Recovers 165 Hours Per Year"
      subtitle="RSL/A automated proposal creation with AI, reducing production time from 2 hours to 10 minutes per proposal. Built with Make.com, Claude AI, and Google Docs, this internal tool eliminated manual formatting work and recovered 165 hours annually."
      stats={stats}
    >
      <h2>The Challenge: Proposals Were Eating Up Valuable Time</h2>
      <p>
        Like many agencies, RSL/A faced a familiar bottleneck: every client proposal required 2 hours of manual work. Writing, formatting, customizing, and perfecting each proposal was a time-consuming process that pulled us away from high-value client work.
      </p>
      <p>
        The specific problems we faced:
      </p>
      <ul>
        <li><strong>2 hours per proposal:</strong> Writing, formatting, and customizing every single proposal from scratch</li>
        <li><strong>Easy to fall into a rabbit hole:</strong> Spending too much time perfecting details instead of closing deals</li>
        <li><strong>Inconsistent formatting:</strong> Each proposal looked slightly different depending on who wrote it</li>
        <li><strong>Slower response times:</strong> Delays between discovery calls and sending proposals</li>
        <li><strong>High opportunity cost:</strong> At $133.50/hour average rate, we were spending $267 per proposal</li>
      </ul>

      <div className="key-takeaway-box">
        <h3>Key Takeaway from Challenge</h3>
        <p>
          Manual proposal creation isn&apos;t just a time sink, it&apos;s a revenue killer. Every hour spent formatting documents is an hour not spent talking to clients, building solutions, or closing deals. We needed to eliminate the busywork without sacrificing quality.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Automate Your Sales Process Today
        </Link>
      </div>

      <h2>The RSL/A Solution: AI-Powered Proposal Generation</h2>
      <p>
        We built a fully automated proposal generation system that turns discovery call notes into professional, branded proposals in minutes. The entire workflow runs on autopilot using Make.com, Claude AI, and Google Docs.
      </p>

      <h3>How It Works</h3>
      <div className="my-8 max-w-3xl mx-auto">
        <a
          href="/images/case-studies/proposal-generator-automation/workflow-screenshot.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-zoom-in hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/case-studies/proposal-generator-automation/workflow-screenshot.png"
            alt="AI Proposal Generator Make.com Workflow"
            className="rounded-lg border border-white/10 w-full h-auto"
          />
        </a>
        <p className="text-sm text-gray-500 mt-4 text-center">
          The complete Make.com workflow: Typeform → Claude AI → Google Docs (click to expand)
        </p>
      </div>

      <h3>Phase 1: Discovery Call Intake Form</h3>
      <p>
        After each discovery call, our sales team fills out a simple Typeform (5-10 minutes) with:
      </p>
      <ul>
        <li>Prospect information (name, company, email)</li>
        <li>One-line business summary</li>
        <li>Problem they&apos;re suffering from</li>
        <li>Solution we pitched</li>
        <li>Deliverables and timeline</li>
        <li>Pricing</li>
      </ul>

      <h3>Phase 2: AI-Powered Content Generation</h3>
      <p>
        Make.com triggers the workflow and sends the form data to Claude Opus 4, which:
      </p>
      <ul>
        <li>Generates a professional proposal title</li>
        <li>Writes compelling problem and solution sections</li>
        <li>Breaks deliverables into 5 clear scope items</li>
        <li>Creates a 4-milestone timeline with specific dates</li>
        <li>Formats everything in structured JSON for template insertion</li>
      </ul>

      <h3>Phase 3: Google Docs Template Insertion</h3>
      <p>
        The structured data automatically populates a branded Google Docs template:
      </p>
      <ul>
        <li>Professional design with RSL/A branding</li>
        <li>Client name, company, and business summary</li>
        <li>Custom problem/solution narrative</li>
        <li>Detailed scope of work (5 deliverables)</li>
        <li>4-phase timeline with milestones</li>
        <li>Investment amount and next steps</li>
      </ul>

      <div className="proof-box">
        <h3>The Technology Stack</h3>
        <p>
          <strong>Typeform:</strong> Clean, simple form interface for discovery call notes
        </p>
        <p>
          <strong>Make.com:</strong> Automation platform connecting all systems
        </p>
        <p>
          <strong>Claude Opus 4 (Anthropic):</strong> AI model that generates professional proposal content
        </p>
        <p>
          <strong>Google Docs API:</strong> Template-based document creation
        </p>
        <p className="mt-4">
          <a
            href="https://docs.google.com/document/d/14JqN_DlSHu-9EXpdA3PcZvXsBqbWhzaBwdkiVOAicKs/copy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline"
          >
            → Get the Google Docs template here
          </a>
        </p>
        <p className="mt-2">
          <a
            href="/downloads/proposal-generator-blueprint.json"
            download
            className="text-brand-blue hover:underline"
          >
            → Download the Make.com blueprint
          </a>
        </p>
      </div>

      <h2>The Results: 165 Hours Recovered Per Year</h2>
      <p>
        The impact was immediate and measurable:
      </p>

      <h3>Time Savings</h3>
      <ul>
        <li><strong>Before:</strong> 2 hours per proposal</li>
        <li><strong>After:</strong> 10 minutes per proposal</li>
        <li><strong>Time saved:</strong> 1 hour 50 minutes per proposal (92% reduction)</li>
        <li><strong>Monthly time saved:</strong> 13.75 hours (based on 7.5 proposals/month)</li>
        <li><strong>Annual time saved:</strong> 165 hours (that&apos;s over 4 weeks of work!)</li>
      </ul>

      <h3>Financial Impact</h3>
      <ul>
        <li><strong>Monthly savings:</strong> $1,835 (13.75 hours × $133.50/hour)</li>
        <li><strong>Annual savings:</strong> $22,027</li>
        <li><strong>Build time investment:</strong> 2 hours ($267)</li>
        <li><strong>Break-even:</strong> After just 2 proposals (~5 days)</li>
        <li><strong>First-year ROI:</strong> 8,150%</li>
      </ul>

      <h3>Qualitative Benefits</h3>
      <ul>
        <li><strong>Consistent branding:</strong> Every proposal looks professional and on-brand</li>
        <li><strong>Faster response times:</strong> Send proposals within hours of discovery calls</li>
        <li><strong>No more rabbit holes:</strong> Structured form prevents overthinking and endless editing</li>
        <li><strong>Scalable process:</strong> Can handle 10x proposal volume with zero additional time</li>
        <li><strong>Mental clarity:</strong> Sales team focuses on closing, not formatting</li>
      </ul>

      <div className="key-takeaway-box">
        <h3>Key Takeaway from Results</h3>
        <p>
          A 2-hour build created a system that saves 165+ hours per year. That&apos;s 4+ weeks of billable time recovered annually. More importantly, it eliminated the mental burden of proposal writing and allowed our team to focus on what matters: building relationships and closing deals.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Automate Your Proposals Now
        </Link>
      </div>

      <h2>The Real Win: Scalability Without Headcount</h2>
      <p>
        Beyond the time and money saved, this automation demonstrates a critical principle: the right tools let you scale without scaling headcount.
      </p>
      <p>
        Before this automation, doubling our proposal volume would have meant:
      </p>
      <ul>
        <li>20-40 hours per month on proposal writing</li>
        <li>Hiring additional sales support staff</li>
        <li>Slower response times to leads</li>
        <li>Higher risk of inconsistent messaging</li>
      </ul>
      <p>
        Now, we can handle 10x the proposal volume with the exact same team. That&apos;s the power of automation.
      </p>

      <div className="cta-section">
        <h2>Save time and money like this client</h2>
        <p>
          If you&apos;re spending hours writing proposals, you&apos;re leaving money on the table. Let us build you a custom AI-powered proposal generator that eliminates the busywork and lets you focus on closing deals.
        </p>
        <p className="mt-4">
          <strong>Want to build it yourself?</strong> Download our{' '}
          <a href="/downloads/proposal-generator-blueprint.json" download className="text-brand-blue hover:underline">
            Make.com blueprint
          </a>{' '}
          and{' '}
          <a
            href="https://docs.google.com/document/d/14JqN_DlSHu-9EXpdA3PcZvXsBqbWhzaBwdkiVOAicKs/copy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline"
          >
            Google Docs template
          </a>{' '}
          to get started.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Show Me How to Save
        </Link>
      </div>
    </CaseStudyLayout>
  );
}
