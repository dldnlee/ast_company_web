import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Create Supabase client (you can also create a utils file for this)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Brand {
  id: string;
  brand_name: string;
  logo_url: string;
  logo_filename: string;
  storage_path?: string;
  display_order: number;
  is_visible: boolean;
  is_active: boolean;
  website_url?: string;
  description?: string;
}

const InfiniteScrollPartners = () => {
  const [brandData, setBrandData] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        // Fetch active and visible brands directly from Supabase
        const { data: brands, error } = await supabase
          .from('brands')
          .select('id, brand_name, logo_url, logo_filename, storage_path, display_order, is_visible, is_active, website_url, description')
          .eq('is_active', true)
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) {
          throw error;
        }

        if (brands && brands.length > 0) {
          setBrandData(brands);
        } else {
          // Fallback to static data if no brands in database
          console.warn('No brands found in database, using fallback data');
          const { brandNames } = await import('@/data/brandNames');
          const fallbackBrands = brandNames.map((name, index) => ({
            id: `fallback-${index}`,
            brand_name: name,
            logo_url: `/brand_logos/${name}.png`,
            logo_filename: `${name}.png`,
            display_order: index + 1,
            is_visible: true,
            is_active: true
          }));
          setBrandData(fallbackBrands);
        }
      } catch (error) {
        console.error('Error fetching brands from Supabase:', error);
        setError('Failed to load brands from database');
        
        // Fallback to static data
        try {
          const { brandNames } = await import('@/data/brandNames');
          const fallbackBrands = brandNames.map((name, index) => ({
            id: `fallback-${index}`,
            brand_name: name,
            logo_url: `/brand_logos/${name}.png`,
            logo_filename: `${name}.png`,
            display_order: index + 1,
            is_visible: true,
            is_active: true
          }));
          setBrandData(fallbackBrands);
        } catch (fallbackError) {
          console.error('Fallback data also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();

    // Optional: Set up real-time subscription for live updates
    const subscription = supabase
      .channel('brands-channel')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'brands',
          filter: 'is_active=eq.true'
        },
        (payload) => {
          console.log('Brand data changed:', payload);
          // Refetch data when changes occur
          fetchBrands();
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to get image URL with fallback
  const getImageUrl = (brand: Brand): string => {
    // Priority: Supabase storage URL > static file path
    if (brand.logo_url && brand.logo_url.includes('supabase.co')) {
      return brand.logo_url;
    }
    // Fallback to static path
    return `/brand_logos/${brand.logo_filename || brand.brand_name}.png`;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full pb-20 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">OUR CLIENTS</h2>
          <p className="text-xl text-center text-white/70">AST와 함께하는 클라이언트</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <div className="ml-4 text-white text-lg">브랜드 데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // Show error state but still try to display fallback data
  if (error && brandData.length === 0) {
    return (
      <div className="w-full pb-20 overflow-hidden">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">OUR CLIENTS</h2>
          <p className="text-xl text-center text-white/70">AST와 함께하는 클라이언트</p>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-white text-lg">브랜드 데이터를 불러올 수 없습니다</div>
        </div>
      </div>
    );
  }

  // Split brands into 4 sections for the scrolling rows
  const brandCount = brandData.length;
  const firstSec = brandData.slice(0, Math.ceil(brandCount / 4));
  const secondSec = brandData.slice(Math.ceil(brandCount / 4), Math.ceil(brandCount / 2));
  const thirdSec = brandData.slice(Math.ceil(brandCount / 2), Math.ceil(brandCount * 3 / 4));
  const fourthSec = brandData.slice(Math.ceil(brandCount * 3 / 4));

  // Duplicate for seamless scrolling
  const first = [...firstSec, ...firstSec];
  const second = [...secondSec, ...secondSec];
  const third = [...thirdSec, ...thirdSec];
  const fourth = [...fourthSec, ...fourthSec];

  return (
    <div className="w-full pb-20 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">OUR CLIENTS</h2>
        <p className="text-xl text-center text-white/70">
          AST와 함께하는 클라이언트 {brandData.length > 0 && `(${brandData.length}개)`}
        </p>
        {error && (
          <p className="text-yellow-300 text-sm mt-2">
            ⚠️ 실시간 데이터 로드 중 문제가 발생했습니다
          </p>
        )}
      </div>

      {/* First row - scrolling right */}
      {first.length > 0 && (
        <div className="relative mb-4 sm:mb-8">
          <div className="flex animate-scroll-right">
            {first.map((brand, index) => (
              <div
                key={`first-${brand.id}-${index}`}
                className="flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white"
                title={brand.description || brand.brand_name}
              >
                <img 
                  src={getImageUrl(brand)} 
                  alt={brand.brand_name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('/brand_logos/')) {
                      img.src = `/brand_logos/${brand.logo_filename || brand.brand_name}.png`;
                    } else if (!img.src.includes('placeholder')) {
                      img.src = '/brand_logos/placeholder.png';
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      )}

      {/* Second row - scrolling left */}
      {second.length > 0 && (
        <div className="relative mb-4 sm:mb-8">
          <div className="flex animate-scroll-left">
            {second.map((brand, index) => (
              <div
                key={`second-${brand.id}-${index}`}
                className="flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white"
                title={brand.description || brand.brand_name}
              >
                <img 
                  src={getImageUrl(brand)} 
                  alt={brand.brand_name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('/brand_logos/')) {
                      img.src = `/brand_logos/${brand.logo_filename || brand.brand_name}.png`;
                    } else if (!img.src.includes('placeholder')) {
                      img.src = '/brand_logos/placeholder.png';
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      )}

      {/* Third row - scrolling right */}
      {third.length > 0 && (
        <div className="relative mb-4 sm:mb-8">
          <div className="flex animate-scroll-right">
            {third.map((brand, index) => (
              <div
                key={`third-${brand.id}-${index}`}
                className="flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white"
                title={brand.description || brand.brand_name}
              >
                <img 
                  src={getImageUrl(brand)} 
                  alt={brand.brand_name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('/brand_logos/')) {
                      img.src = `/brand_logos/${brand.logo_filename || brand.brand_name}.png`;
                    } else if (!img.src.includes('placeholder')) {
                      img.src = '/brand_logos/placeholder.png';
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      )}

      {/* Fourth row - scrolling left */}
      {fourth.length > 0 && (
        <div className="relative">
          <div className="flex animate-scroll-left">
            {fourth.map((brand, index) => (
              <div
                key={`fourth-${brand.id}-${index}`}
                className="flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white"
                title={brand.description || brand.brand_name}
              >
                <img 
                  src={getImageUrl(brand)} 
                  alt={brand.brand_name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('/brand_logos/')) {
                      img.src = `/brand_logos/${brand.logo_filename || brand.brand_name}.png`;
                    } else if (!img.src.includes('placeholder')) {
                      img.src = '/brand_logos/placeholder.png';
                    }
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-right {
          animation: scroll-right 60s linear infinite;
          width: calc(200% + 32px);
        }

        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
          width: calc(200% + 32px);
        }
      `}</style>
    </div>
  );
};

export default InfiniteScrollPartners;