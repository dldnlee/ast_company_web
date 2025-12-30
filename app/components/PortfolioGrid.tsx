'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { supabase } from '@/utils/supabase/client';

interface Portfolio {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  storage_path: string | null;
  link_url: string | null;
  display_order: number;
  image_position: string | null;
}

interface PortfolioGridProps {
  maxResults?: number;
  className?: string;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}

const usePortfolios = (maxResults: number = 50) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('portfolios')
          .select('*')
          .eq('is_visible', true)
          .eq('is_active', true)
          .order('display_order', { ascending: true })
          .limit(maxResults);

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        if (!data || data.length === 0) {
          setError('포트폴리오가 없습니다');
        setLoading(false);
          return;
        }

        setPortfolios(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '포트폴리오를 불러오는데 실패했습니다';
        setError(errorMessage);
        console.error('Portfolio Fetch Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [maxResults]);

  return { portfolios, loading, error };
};

const PortfolioCard: React.FC<{
  portfolio: Portfolio;
  index: number;
}> = ({ portfolio, index }) => {
  const [imageError, setImageError] = useState(false);

  // Get the image URL from either image_url or construct from storage_path
  const getImageUrl = (): string => {
    if (portfolio.image_url) {
      return portfolio.image_url;
    }

    if (portfolio.storage_path) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      return `${supabaseUrl}/storage/v1/object/public/portfolios/${portfolio.storage_path}`;
    }

    return ''; // No image available
  };

  const imageUrl = getImageUrl();

  // Debug log
  console.log('Portfolio:', portfolio.title, 'Image URL:', imageUrl);

  const CardContent = (
    <motion.div
      className="group relative bg-white text-black rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden bg-gray-100">
        {imageUrl && !imageError ? (
          <>
            <img
              src={imageUrl}
              alt={portfolio.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{
                objectPosition: portfolio.image_position || 'center'
              }}
              onError={() => {
                console.error('Image load error for:', portfolio.title, imageUrl);
                setImageError(true);
              }}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-4xl">📷</span>
            {!imageUrl && (
              <p className="text-xs text-gray-500 mt-2">No image</p>
            )}
          </div>
        )}
      </div>

      {/* Portfolio Info */}
      <div className="p-2 sm:p-3 lg:p-4 h-22 truncate">
        <h3 className="text-black font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
          {portfolio.title}
        </h3>

        {portfolio.description && (
          <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2">
            {portfolio.description}
          </p>
        )}
      </div>
    </motion.div>
  );

  // If there's a link_url, wrap the card in an anchor tag
  if (portfolio.link_url) {
    return (
      <a
        href={portfolio.link_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  maxResults = 50,
  className = "",
  onError,
  onLoading
}) => {
  const { portfolios, loading, error } = usePortfolios(maxResults);

  // Notify parent components of loading/error states
  useEffect(() => {
    if (onLoading) onLoading(loading);
  }, [loading, onLoading]);

  useEffect(() => {
    if (onError && error) onError(error);
  }, [error, onError]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className={`p-4 sm:p-6 lg:p-8 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-sm sm:text-lg">포트폴리오 불러오는중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 sm:p-6 lg:p-8 flex items-center justify-center ${className}`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-gray-800 text-xl sm:text-2xl font-bold mb-2">포트폴리오 로딩 오류</h2>
          <p className="text-gray-600 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  if (portfolios.length === 0) {
    return (
      <div className={`p-4 sm:p-6 lg:p-8 flex items-center justify-center ${className}`}>
        <div className="text-center max-w-md">
          <div className="text-gray-400 text-4xl sm:text-6xl mb-4">📁</div>
          <h2 className="text-gray-800 text-xl sm:text-2xl font-bold mb-2">포트폴리오가 없습니다</h2>
          <p className="text-gray-600 text-sm sm:text-base">곧 업데이트 예정입니다</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`w-full px-2 sm:px-4 lg:px-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Responsive Grid Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid
          grid-cols-2
          xs:grid-cols-2
          sm:grid-cols-2
          md:grid-cols-4
          lg:grid-cols-4
          xl:grid-cols-4
          2xl:grid-cols-4
          gap-3
          sm:gap-4
          md:gap-5
          lg:gap-6
        ">
          {portfolios.map((portfolio, index) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioGrid;
