import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "./components/ScrollProgress";
import BackgroundBubbles from "./components/BackgroundBubble";
import { createClient } from '@/utils/supabase/server';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Dynamic metadata that reads from your seo_settings table
export async function generateMetadata(): Promise<Metadata> {
  let seoData = null;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('seo_settings')
      .select('*')
      .single();
    
    seoData = data;
  } catch (error) {
    console.log('Using fallback SEO data');
  }
  
  // Use database values or optimized fallbacks
  const title = seoData?.site_title || "AST Company | 아스트 컴퍼니 – 광고, 콘텐츠, 행사 미디어 그룹";
  const description = seoData?.site_description || "한국 최고의 인플루언서 마케팅 에이전시 AST Company. 브랜드 홍보부터 인플루언서 파트너십까지, 콘텐츠 마케팅의 모든 것을 제공합니다. 서울 기반 전문 MCN 에이전시.";
  const keywords = seoData?.keywords || [
    "인플루언서 마케팅", "브랜드 홍보", "인플루언서 에이전시", "MCN 에이전시",
    "YouTube 마케팅", "인스타그램 마케팅", "브랜드 협업", "콘텐츠 마케팅",
    "인플루언서 파트너십", "크리에이터 매니지먼트", "서울 마케팅 에이전시",
    "소셜미디어 마케팅", "브랜드 프로모션", "스폰서십", "쿄카 섭외", "오죠갱 섭외", "우와 섭외", "아스트"
  ];
  const canonicalUrl = seoData?.canonical_url || "https://astcompany.co.kr";
  const language = seoData?.language || "ko-KR";
  const author = seoData?.author || "AST Company";

  // Open Graph data
  const ogTitle = seoData?.og_title || title;
  const ogDescription = seoData?.og_description || description;
  const ogImageUrl = seoData?.og_image_url || "/company_logos/ASTCompanyWhiteNoBG.png";
  const ogType = seoData?.og_type || "website";

  // Twitter data  
  const twitterCard = seoData?.twitter_card || "summary_large_image";
  const twitterTitle = seoData?.twitter_title || title;
  const twitterDescription = seoData?.twitter_description || description;
  const twitterImageUrl = seoData?.twitter_image_url || ogImageUrl;

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords : [],
    authors: [{ name: author }],
    creator: author,
    publisher: "AST Company",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: ogType as any,
      locale: language.replace('-', '_'),
      alternateLocale: 'en_US',
      url: canonicalUrl,
      siteName: 'AST Company',
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'AST Company - 인플루언서 마케팅 에이전시',
        },
      ],
    },
    twitter: {
      card: twitterCard as any,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ko-KR': canonicalUrl,
        'en-US': `${canonicalUrl}/en`,
      },
    },
    verification: {
      google: 'OOZsV3QypXDEyET_6DkNjKKvdvGFahB1FhQ8KNNtQKw', // You'll add this from Google Search Console
      other: {
        'naver-site-verification': '', // You'll add this from Naver
      },
    },
    category: 'business',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <head>
        {/* Additional SEO optimizations for Korean market */}
        <link rel="canonical" href="https://astcompany.co.kr" />
        <meta name="geo.region" content="KR-11" />
        <meta name="geo.placename" content="Seoul" />
        <meta name="geo.position" content="37.5665;126.9780" />
        <meta name="ICBM" content="37.5665, 126.9780" />
        
        {/* Hreflang for international SEO */}
        <link rel="alternate" hrefLang="ko-KR" href="https://astcompany.co.kr" />
        <link rel="alternate" hrefLang="en-US" href="https://astcompany.co.kr/en" />
        <link rel="alternate" hrefLang="x-default" href="https://astcompany.co.kr" />
        
        {/* Local Business Schema - Critical for Korean local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "AST Company",
              "alternateName": "AST Media Group",
              "description": "브랜드와 인플루언서를 연결하는 전문 마케팅 에이전시",
              "url": "https://astcompany.co.kr",
              "logo": "https://astcompany.co.kr/company_logos/ASTCompanyWhiteNoBG.png",
              "image": "https://astcompany.co.kr/company_logos/ASTCompanyWhiteNoBG.png",
              "telephone": "+82-10-3044-2131",
              "email": "contact@astcompany.co.kr",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "매헌로 16, 1313호",
                "addressLocality": "서초구",
                "addressRegion": "서울특별시",
                "addressCountry": "KR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "37.5665",
                "longitude": "126.9780"
              },
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "South Korea"
                },
                {
                  "@type": "City", 
                  "name": "Seoul"
                }
              ],
              "serviceType": [
                "인플루언서 마케팅",
                "브랜드 프로모션", 
                "콘텐츠 마케팅",
                "소셜미디어 마케팅",
                "MCN 서비스",
                "크리에이터 매니지먼트"
              ],
              "sameAs": [
                "https://instagram.com/ast__company"
              ],
              "priceRange": "$$"
            })
          }}
        />
        
        {/* Organization Schema for brand recognition */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AST Company",
              "alternateName": "AST Media Group", 
              "url": "https://astcompany.co.kr",
              "logo": "https://astcompany.co.kr/company_logos/ASTCompanyWhiteNoBG.png",
              "description": "인플루언서 마케팅 전문 에이전시",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+82-10-3044-2131",
                "contactType": "customer service",
                "areaServed": "KR",
                "availableLanguage": ["Korean", "English"]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased relative min-h-screen`}>
        <ScrollProgress />
        {/* <BackgroundBubbles /> */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}