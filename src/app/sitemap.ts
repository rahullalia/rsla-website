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

  // Case study pages
  const caseStudies = [
    'casagrande-salon',
    'market-research-automation',
    'email-ice-breaker-automation',
    'united-sikhs',
    'rsl-blog-automation',
    'proposal-generator-automation',
    'lead-magnet-automation',
    'linkedin-dms-automation',
    'instantly-campaign-automation',
    'upwork-scraper-automation',
    'gmaps-scraper-automation',
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
