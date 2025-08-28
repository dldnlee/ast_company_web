import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "./components/ScrollProgress";
import BackgroundBubbles from "./components/BackgroundBubble";

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

// Optimized metadata for Korean market and dual audience
export const metadata: Metadata = {
  title: "AST Company | 브랜드와 인플루언서를 연결하는 전문 에이전시",
  description: "한국 최고의 인플루언서 마케팅 에이전시 AST Company. 브랜드 홍보부터 인플루언서 파트너십까지, 콘텐츠 마케팅의 모든 것을 제공합니다. 서울 기반 전문 MCN.",
  keywords: [
    "인플루언서 마케팅", "브랜드 홍보", "인플루언서 에이전시", "MCN", 
    "YouTube 마케팅", "인스타그램 마케팅", "브랜드 협업", "콘텐츠 마케팅",
    "인플루언서 파트너십", "크리에이터 매니지먼트", "서울 마케팅 에이전시"
  ],
  authors: [{ name: "AST Company" }],
  creator: "AST Company",
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
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: 'https://astcompany.co.kr',
    siteName: 'AST Company',
    title: 'AST Company | 브랜드와 인플루언서를 연결하는 전문 에이전시',
    description: '한국 최고의 인플루언서 마케팅 에이전시. 브랜드 홍보부터 인플루언서 파트너십까지 원스톱 솔루션을 제공합니다.',
    images: [
      {
        url: '/company_logos/ASTCompanyWhiteNoBG.png',
        width: 1200,
        height: 630,
        alt: 'AST Company - 인플루언서 마케팅 에이전시',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AST Company | 인플루언서 마케팅 전문 에이전시',
    description: '브랜드와 인플루언서를 연결하는 전문 에이전시. 콘텐츠 마케팅의 모든 것.',
    images: ['/company_logos/ASTCompanyWhiteNoBG.png'],
  },
  alternates: {
    canonical: 'https://astcompany.co.kr',
    languages: {
      'ko-KR': 'https://astcompany.co.kr',
      'en-US': 'https://astcompany.co.kr',
    },
  },
  verification: {
    // Add your verification codes when you get them
    google: 'OOZsV3QypXDEyET_6DkNjKKvdvGFahB1FhQ8KNNtQKw', // Add Google Search Console verification
    other: {
      'naver-site-verification': '', // Add Naver verification for Korean SEO
    },
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <head>
        {/* Additional SEO optimizations */}
        <link rel="canonical" href="https://astcompany.co.kr" />
        <meta name="geo.region" content="KR-11" />
        <meta name="geo.placename" content="Seoul" />
        <meta name="geo.position" content="37.5665;126.9780" />
        <meta name="ICBM" content="37.5665, 126.9780" />
        
        {/* Local Business Schema - for better local SEO */}
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
              "areaServed": {
                "@type": "Country",
                "name": "South Korea"
              },
              "serviceType": [
                "인플루언서 마케팅",
                "브랜드 프로모션",
                "콘텐츠 마케팅",
                "소셜미디어 마케팅"
              ],
              "sameAs": [
                "https://instagram.com/ast__company"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased relative min-h-screen`}>
        <ScrollProgress />
        <BackgroundBubbles />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}