// app/robots.txt/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /login

# Allow important directories
Allow: /company_logos/
Allow: /brand_logos/
Allow: /influencer_images/
Allow: /channel_images/

# Sitemap location
Sitemap: https://astcompany.co.kr/sitemap.xml

# Crawl delay for politeness
Crawl-delay: 1

# Specific rules for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: NaverBot
Allow: /
Crawl-delay: 1

User-agent: Yeti
Allow: /
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}