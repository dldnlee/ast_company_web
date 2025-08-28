// app/sitemap.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://astcompany.co.kr';
  const currentDate = new Date().toISOString();
  
  // Define your static pages with priorities and change frequencies
  const staticPages = [
    {
      url: '',
      changeFreq: 'weekly',
      priority: '1.0',
      lastMod: currentDate
    },
    {
      url: '/about',
      changeFreq: 'monthly',
      priority: '0.8',
      lastMod: currentDate
    },
    {
      url: '/services',
      changeFreq: 'monthly',
      priority: '0.8',
      lastMod: currentDate
    },
    {
      url: '/portfolio',
      changeFreq: 'weekly',
      priority: '0.8',
      lastMod: currentDate
    },
    {
      url: '/contact',
      changeFreq: 'monthly',
      priority: '0.7',
      lastMod: currentDate
    },
    // Korean-specific landing pages for SEO
    {
      url: '/influencer-marketing',
      changeFreq: 'weekly',
      priority: '0.9',
      lastMod: currentDate
    },
    {
      url: '/brand-promotion',
      changeFreq: 'weekly',  
      priority: '0.9',
      lastMod: currentDate
    },
    {
      url: '/mcn-agency',
      changeFreq: 'monthly',
      priority: '0.8',
      lastMod: currentDate
    }
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastMod}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="ko-KR" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en-US" href="${baseUrl}/en${page.url}" />
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}