import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ============================================
  // LEGACY WORDPRESS URL REDIRECTS (301 Permanent)
  // These clean up old URLs from the previous WordPress site
  // ============================================

  // 1. Legacy category and tag URLs → /blog
  if (pathname.startsWith('/category/') || pathname.startsWith('/tag/')) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 2. Legacy blog theme pages → /blog
  const legacyBlogPages = [
    '/blog-card',
    '/blog-list',
    '/blog-right-sidebar',
    '/blog-left-sidebar',
    '/blog-list-thumb-right',
    '/blog-list-thumb-random',
    '/blogs/page',
  ];
  if (legacyBlogPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 3. Legacy portfolio pages → /work
  const legacyPortfolioPages = [
    '/portfolio-style',
    '/portfolio-grid',
    '/portfolio-category',
    '/home-portfolio',
    '/portfolios',
    '/our-recents',
    '/case-studies',
  ];
  if (legacyPortfolioPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/work', request.url), 301);
  }

  // 4. Legacy e-commerce/WordPress pages → homepage
  const legacyWordPressPages = [
    '/shop',
    '/cart',
    '/cart-2',
    '/checkout',
    '/my-account',
    '/my-account-2',
    '/product',
    '/product-category',
    '/full-page-slider',
    '/creative-agency',
    '/personal-page',
    '/accordion-widget',
    '/digital-marketing',
    '/book-appointment',
    '/appointment',
    '/resources',
    '/coming-soon',
  ];
  if (legacyWordPressPages.some((page) => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // 5. Legacy author pages → /blog
  if (pathname.startsWith('/author/')) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 6. Legacy categories page (plural) → /blog
  if (pathname.startsWith('/categories/')) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 7. Old WordPress sitemaps → main sitemap
  if (pathname.startsWith('/wp-sitemap') || pathname === '/post-sitemap.xml' || pathname === '/portfolios-sitemap.xml') {
    return NextResponse.redirect(new URL('/sitemap.xml', request.url), 301);
  }

  // 8. Old static HTML blog/case study URLs → new versions
  if (pathname === '/blogs/' || pathname === '/blogs') {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }
  if (pathname.endsWith('.html')) {
    // Old case study HTML files
    if (pathname.includes('casagrande') || pathname.includes('salon')) {
      return NextResponse.redirect(new URL('/work/salon-marketing-automation-roi', request.url), 301);
    }
    if (pathname.includes('spice-on-a-slice')) {
      return NextResponse.redirect(new URL('/work/local-seo-reputation-management', request.url), 301);
    }
    if (pathname.includes('united-sikhs')) {
      return NextResponse.redirect(new URL('/work/nonprofit-crm-volunteer-automation', request.url), 301);
    }
    if (pathname.includes('cleaning-company') || pathname.includes('ghl-system')) {
      return NextResponse.redirect(new URL('/work/field-service-operations-automation', request.url), 301);
    }
    if (pathname.includes('blog-automation') || pathname.includes('rsl-blog')) {
      return NextResponse.redirect(new URL('/work/seo-content-marketing-automation', request.url), 301);
    }
    if (pathname.includes('terms')) {
      return NextResponse.redirect(new URL('/terms', request.url), 301);
    }
    // Generic .html files → homepage
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // 9. Old blog posts that no longer exist → /blog
  const oldBlogPosts = [
    '/claude-vs-chatgpt',
    '/unveiling-chatgpt-5',
    '/launch-small-business-website-checklist',
    '/blog-automation-system-rsl-media-hub',
    '/local-seo-101-guide',
    '/new-strategy-for-optimizing-blog-posting',
    '/website-audit-checklist-2025',
    '/get-more-google-reviews',
    '/8-essential-steps-to-boost-your-website-traffic',
    '/the-ultimate-guide-to-digital-marketing',
    '/how-the-right-seo-optimization-agency',
    '/why-hiring-seo-company-usa',
    '/unfolding-marketing-automation-benefits',
    '/ai-automation-in-smbs',
    '/crm-for-small-business',
    '/the-importance-crm-solutions',
    '/google-business-mistakes',
    '/local-seo-playbook-google-maps',
    '/seo-audit',
  ];
  if (oldBlogPosts.some((post) => pathname.startsWith(post))) {
    return NextResponse.redirect(new URL('/blog', request.url), 301);
  }

  // 10. Old case study URLs (WordPress slugs) → new case study pages
  if (pathname === '/lead-gen-casagrande-salon-nyc' || pathname.startsWith('/lead-gen-casagrande-salon-nyc')) {
    return NextResponse.redirect(new URL('/work/salon-marketing-automation-roi', request.url), 301);
  }
  if (pathname === '/gbp-optimization-spice-on-a-slice-nyc' || pathname.startsWith('/gbp-optimization-spice-on-a-slice-nyc')) {
    return NextResponse.redirect(new URL('/work/local-seo-reputation-management', request.url), 301);
  }
  if (pathname === '/salon-marketing-case-study' || pathname.startsWith('/salon-marketing-case-study')) {
    return NextResponse.redirect(new URL('/work/salon-marketing-automation-roi', request.url), 301);
  }

  // 11. Feed URLs → homepage (we don't have RSS feeds)
  if (pathname.endsWith('/feed/') || pathname.endsWith('/feed')) {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // ============================================
  // CASE STUDY URL MIGRATIONS (301 Permanent)
  // Old slugs → New SEO-optimized slugs (2025-12-31)
  // ============================================
  const caseStudyRedirects: Record<string, string> = {
    '/work/market-research-automation': '/work/market-research-data-scraping-automation',
    '/work/casagrande-salon': '/work/salon-marketing-automation-roi',
    '/work/email-ice-breaker-automation': '/work/ai-cold-email-personalization',
    '/work/united-sikhs': '/work/nonprofit-crm-volunteer-automation',
    '/work/proposal-generator-automation': '/work/ai-proposal-generator-sales-workflow',
    '/work/spice-on-a-slice': '/work/local-seo-reputation-management',
    '/work/facebook-ads-reporting-automation': '/work/marketing-analytics-reporting-automation',
    '/work/email-autoresponder-automation': '/work/ai-lead-response-autoresponder',
    '/work/ai-media-automation-founding-engineer': '/work/media-content-operations-ai',
    '/work/cleaning-company-automation': '/work/field-service-operations-automation',
    '/work/rsl-blog-automation': '/work/seo-content-marketing-automation',
    '/work/smart-factory-robot-integration': '/work/iot-manufacturing-robot-tracking',
  };

  if (caseStudyRedirects[pathname]) {
    return NextResponse.redirect(new URL(caseStudyRedirects[pathname], request.url), 301);
  }

  // 12. Old contact page variations (contact-2 only, /contact is a valid page)
  if (pathname === '/contact-2' || pathname === '/contact-2/') {
    return NextResponse.redirect(new URL('/contact', request.url), 301);
  }

  // 13. Old about page
  if (pathname === '/about-us' || pathname === '/about-us/' || pathname === '/home/about-us' || pathname === '/home/about-us/') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // 14. Old privacy/terms variations
  if (pathname === '/privacy-policy' || pathname === '/privacy-policy/' || pathname === '/privacy-policy-2' || pathname === '/privacy-policy-2/') {
    return NextResponse.redirect(new URL('/privacy-policy', request.url), 301);
  }
  if (pathname === '/terms-and-conditions' || pathname === '/terms-and-conditions/') {
    return NextResponse.redirect(new URL('/terms', request.url), 301);
  }

  // ============================================
  // ADMIN ROUTE PROTECTION
  // ============================================
  if (pathname.startsWith('/admin')) {
    // Allow access to login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for admin auth cookie
    const authCookie = request.cookies.get('admin-auth');
    const isAuthenticated = authCookie?.value === process.env.ADMIN_PASSWORD;

    if (!isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Admin routes
    '/admin/:path*',
    // Legacy WordPress redirects
    '/category/:path*',
    '/tag/:path*',
    '/author/:path*',
    '/categories/:path*',
    '/blog-card/:path*',
    '/blog-list/:path*',
    '/blog-right-sidebar/:path*',
    '/blog-left-sidebar/:path*',
    '/blog-list-thumb-right/:path*',
    '/blog-list-thumb-random/:path*',
    '/portfolio-style/:path*',
    '/portfolio-grid/:path*',
    '/portfolio-category/:path*',
    '/home-portfolio/:path*',
    '/portfolios/:path*',
    '/our-recents/:path*',
    '/case-studies/:path*',
    '/shop/:path*',
    '/cart/:path*',
    '/cart-2/:path*',
    '/checkout/:path*',
    '/my-account/:path*',
    '/my-account-2/:path*',
    '/product/:path*',
    '/product-category/:path*',
    '/full-page-slider/:path*',
    '/creative-agency/:path*',
    '/personal-page/:path*',
    '/accordion-widget/:path*',
    '/digital-marketing/:path*',
    '/book-appointment/:path*',
    '/appointment/:path*',
    '/resources/:path*',
    '/coming-soon/:path*',
    '/wp-sitemap:path*',
    '/blogs/:path*',
    '/contact-2/:path*',
    '/about-us/:path*',
    '/privacy-policy-2/:path*',
    '/terms-and-conditions/:path*',
    '/lead-gen-casagrande-salon-nyc/:path*',
    '/gbp-optimization-spice-on-a-slice-nyc/:path*',
    '/salon-marketing-case-study/:path*',
    // Old blog posts
    '/claude-vs-chatgpt:path*',
    '/unveiling-chatgpt-5:path*',
    '/launch-small-business-website-checklist/:path*',
    '/blog-automation-system-rsl-media-hub/:path*',
    '/local-seo-101-guide/:path*',
    '/new-strategy-for-optimizing-blog-posting/:path*',
    '/website-audit-checklist-2025/:path*',
    '/get-more-google-reviews/:path*',
    '/seo-audit/:path*',
    // Feed URLs
    '/:path*/feed',
    '/:path*/feed/',
    // HTML files
    '/:path*.html',
    // Old case study slugs (2025-12-31 migration)
    '/work/market-research-automation',
    '/work/casagrande-salon',
    '/work/email-ice-breaker-automation',
    '/work/united-sikhs',
    '/work/proposal-generator-automation',
    '/work/spice-on-a-slice',
    '/work/facebook-ads-reporting-automation',
    '/work/email-autoresponder-automation',
    '/work/ai-media-automation-founding-engineer',
    '/work/cleaning-company-automation',
    '/work/rsl-blog-automation',
    '/work/smart-factory-robot-integration',
  ],
};
