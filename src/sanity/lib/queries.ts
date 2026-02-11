import { groq } from 'next-sanity';

// Get all blog posts (with pagination support)
// Only shows posts with publishedAt set (drafts have no publishedAt)
export const blogPostsQuery = groq`
  *[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      role,
      image {
        asset->,
        alt
      }
    },
    categories[]->{
      name,
      slug
    }
  }
`;

// Get single blog post by slug
export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    featuredImage {
      asset->,
      alt
    },
    author->{
      name,
      slug,
      role,
      image {
        asset->,
        alt
      },
      bio
    },
    categories[]->{
      name,
      slug
    },
    body,
    seo
  }
`;

// Get all blog post slugs (for static generation)
// Only published posts get static pages
export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()][].slug.current
`;

// Get total count of published blog posts
export const blogPostsCountQuery = groq`
  count(*[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()])
`;

// Get recent blog posts (for sidebar or related posts)
export const recentBlogPostsQuery = groq`
  *[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    publishedAt,
    featuredImage {
      asset->,
      alt
    }
  }
`;

// Get featured case studies for homepage (ordered by priority)
export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(priority asc) [0...3] {
    title,
    "slug": slug.current,
    tag,
    description,
    metrics,
    featured,
    priority
  }
`;

// Get all case studies (ordered by priority)
export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(priority asc) {
    title,
    "slug": slug.current,
    tag,
    description,
    metrics,
    featured,
    category,
    priority,
    annualSavings,
    publishedAt
  }
`;

// Get single case study by slug
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    tag,
    description,
    metrics,
    featured,
    category,
    priority,
    annualSavings,
    publishedAt,
    content,
    "seo": seo,
    clientName,
    industry,
    timeframe,
    faqSchema,
    tldr,
    keyTakeaways,
    problemStatement,
    solutionApproach,
    resultsOutcome,
    servicesUsed,
    relatedCases[]->{
      title,
      "slug": slug.current,
      tag,
      description,
      metrics
    }
  }
`;

// Get related case studies by category (fallback when relatedCases is empty)
export const relatedCaseStudiesQuery = groq`
  *[_type == "caseStudy" && slug.current != $slug && category == $category] | order(priority asc) [0...3] {
    title,
    "slug": slug.current,
    tag,
    description,
    metrics
  }
`;

// Get all case study slugs (for sitemap/static generation)
export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;
