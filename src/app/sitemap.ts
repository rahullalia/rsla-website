import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import { blogPostSlugsQuery } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rsla.io';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insider`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Case study pages (updated 2025-12-31 with SEO-optimized slugs)
  const caseStudies = [
    'market-research-data-scraping-automation',
    'salon-marketing-automation-roi',
    'ai-cold-email-personalization',
    'nonprofit-crm-volunteer-automation',
    'ai-proposal-generator-sales-workflow',
    'local-seo-reputation-management',
    'marketing-analytics-reporting-automation',
    'ai-lead-response-autoresponder',
    'media-content-operations-ai',
    'field-service-operations-automation',
    'seo-content-marketing-automation',
    'iot-manufacturing-robot-tracking',
  ];

  const caseStudyPages = caseStudies.map(slug => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic blog posts
  const blogSlugs = await client.fetch<string[]>(blogPostSlugsQuery);
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...caseStudyPages, ...blogPages];
}
