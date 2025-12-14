import CaseStudyLayout from '@/components/CaseStudyLayout';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'From 14 to 132 Google Reviews and $25K in 60 Days | RSL/A',
  description: 'Spice on a Slice, a neighborhood pizza shop, transformed its online visibility to generate over 100 new reviews and $25,000 in extra business in just two months.',
  openGraph: {
    title: 'Restaurant Marketing Case Study: From 14 to 132 Google Reviews and $25K in 60 Days',
    description: 'Spice on a Slice, a neighborhood pizza shop, transformed its online visibility to generate over 100 new reviews and $25,000 in extra business in just two months.',
    url: 'https://www.rsla.io/work/spice-on-a-slice',
    siteName: 'RSL/A',
    type: 'article',
  },
};

export default function SpiceOnASlicePage() {
  const stats = [
    { value: '+118', label: 'New Google Reviews' },
    { value: '$25,000', label: 'Extra Revenue in 60 Days' },
    { value: '1st Page', label: 'Google Maps Rank' },
  ];

  return (
    <CaseStudyLayout
      tag="Local SEO & Customer Nurture Automation"
      title="Restaurant Marketing Case Study: From 14 to 132 Google Reviews and $25K in 60 Days"
      subtitle="Spice on a Slice, a neighborhood pizza shop, transformed its online visibility to generate over 100 new reviews and $25,000 in extra business in just two months."
      stats={stats}
    >
      <h2>The Challenge: The Local Visibility Trap</h2>
      <p>
        Spice on a Slice, a popular pizza shop in Queens Village, faced a challenge common among neighborhood restaurants: while they had great food and loyal regulars, they were effectively <strong>invisible</strong> to new customers searching online. Their lack of digital presence meant they were missing out on walk-ins and local exploration.
      </p>
      <p>
        The restaurant had only <strong>14 Google reviews</strong> and barely showed up on Google Maps for local searches. Sitting beyond the second page of search results meant potential new customers simply weren&apos;t seeing them. This lack of online proof directly hindered growth and made repeat business slow, keeping revenue far below its potential.
      </p>

      <div className="key-takeaway-box">
        <h3>Key Takeaway from Challenge</h3>
        <p>
          The core problem was <strong>failing to convert satisfied in-store customers into online advocates and reviewers</strong>, which is the primary driver for local search visibility.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Apply This Insight to Your Business
        </Link>
      </div>

      <h2>The RSL/A Solution: Automation for Local SEO</h2>
      <p>
        RSL/A focused on optimizing their Google Business Profile and establishing an automated customer feedback loop. The goal was to make the shop highly visible where local customers search most: Google Maps and Search.
      </p>

      <h3>Phase 1: Lead Capture & CRM Integration</h3>
      <ul>
        <li>
          We established an easy, in-store system to capture every customer&apos;s contact information by offering a simple incentive, like a free slice of pizza.
        </li>
        <li>
          Those contacts were immediately pushed into our CRM for automated follow-up.
        </li>
        <li>
          We ran a targeted <strong>database reactivation campaign</strong> via SMS and email to encourage old, satisfied customers to revisit and leave initial reviews.
        </li>
      </ul>

      <h3>Phase 2: Review Generation & Customer Nurture</h3>
      <p>
        The power of the new system was its automation: every new customer received immediate and polite <strong>review requests</strong> via SMS and email. Furthermore, ongoing nurture campaigns were put in place to bring people back in with timely promotions and menu updates, driving repeat business and consistent review generation.
      </p>

      <h2>The Results: Massive Visibility and Revenue Lift</h2>

      <div className="proof-box">
        <h3>Client Testimonial</h3>
        <p>
          — &quot;People already liked our pizza, but not enough people knew about us. New customers are finding us now, old ones are coming back, and our Google reviews finally show the quality we&apos;ve always had.&quot;
        </p>
      </div>

      <p>
        In less than two months, the shop&apos;s local presence was completely transformed, leading to significant financial gains and sustained growth.
      </p>

      <div className="my-8 max-w-2xl mx-auto">
        <a
          href="/images/case-studies/spice-on-a-slice/before-after-reviews.png"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-zoom-in hover:opacity-90 transition-opacity"
        >
          <img
            src="/images/case-studies/spice-on-a-slice/before-after-reviews.png"
            alt="Spice on a Slice Google reviews growth: 14 to 132 reviews"
            className="rounded-lg border border-white/10 w-full h-auto"
          />
        </a>
        <p className="text-sm text-gray-500 text-center mt-2">Before & After: 14 to 132 Google reviews in 60 days (click to expand)</p>
      </div>

      <ul>
        <li>
          Google <strong>Reviews jumped from 14 to 132</strong> in under 60 days, establishing strong social proof.
        </li>
        <li>
          The shop added approximately <strong>$25,000 in extra business</strong> during that time period due to increased visibility and repeat visits.
        </li>
        <li>
          Their Google Maps listing began showing up on the <strong>first page</strong> for key local searches, securing new walk-in traffic.
        </li>
        <li>
          Repeat business increased thanks to the consistent automated nurture sequences.
        </li>
      </ul>

      <div className="cta-section">
        <h2>Save time and money like this client</h2>
        <p>
          If your restaurant or local business isn&apos;t showing up online or getting reviews, RSL/A can help. Let&apos;s grow your visibility and revenue.
        </p>
        <Link href="/inquiry-form" className="btn-cta">
          Show Me How to Save
        </Link>
      </div>
    </CaseStudyLayout>
  );
}
