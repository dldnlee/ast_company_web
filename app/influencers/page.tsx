// app/influencers/page.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import ContactModal from "../components/ContactModal";
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase/client';

// Types

interface InfluencerDisplayData {
  id: string;
  influencer_name: string;
  social_id: string;
  followers_count: string;
  profile_image: string;
  description?: string;
  instagram_url?: string;
  youtube_url?: string;
  tiktok_url?: string;
}

export default function InfluencersPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');
  const [influencers, setInfluencers] = useState<InfluencerDisplayData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleBackClick = () => {
    router.back();
  };

  const handleInfluencerClick = (item: InfluencerDisplayData): void => {
    setSelectedInfluencer(`@${item.social_id}`);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('partner_influencers')
          .select('*')
          .eq('is_active', true)
          .eq('is_visible', true)
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching influencers:', error);
          setError('인플루언서를 불러오는 중 오류가 발생했습니다.');
          return;
        }

        const displayData: InfluencerDisplayData[] = data?.map(influencer => ({
          id: influencer.id,
          influencer_name: influencer.influencer_name,
          social_id: influencer.social_id || '',
          followers_count: influencer.followers_count || '',
          profile_image: influencer.profile_image || '',
          description: influencer.description,
          instagram_url: influencer.instagram_url,
          youtube_url: influencer.youtube_url,
          tiktok_url: influencer.tiktok_url
        })) || [];

        setInfluencers(displayData);
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedInfluencer('');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen px-5 sm:px-10 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-8">
          <button
            onClick={handleBackClick}
            className="absolute left-0 flex items-center gap-2 cursor-pointer text-white hover:text-purple-400 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
            PARTNER INFLUENCERS
          </h1>
        </div>
        
        {/* Loading */}
        <div className='flex items-center justify-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
          <p className='ml-4 text-white'>인플루언서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen px-5 sm:px-10 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-8">
          <button
            onClick={handleBackClick}
            className="absolute left-0 flex items-center gap-2 cursor-pointer text-white hover:text-purple-400 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
            PARTNER INFLUENCERS
          </h1>
        </div>
        
        {/* Error */}
        <div className='flex flex-col items-center justify-center py-20'>
          <p className='text-red-400 mb-4'>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (influencers.length === 0) {
    return (
      <div className="min-h-screen px-5 sm:px-10 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-center relative mb-8">
          <button
            onClick={handleBackClick}
            className="absolute left-0 flex items-center gap-2 cursor-pointer text-white hover:text-purple-400 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
          <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
            PARTNER INFLUENCERS
          </h1>
        </div>
        
        {/* Empty */}
        <div className='flex items-center justify-center py-20'>
          <p className='text-white'>등록된 파트너 인플루언서가 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 sm:px-10 py-12">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row items-center justify-center relative mb-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute left-0 flex items-center gap-2 cursor-pointer text-white hover:text-purple-400 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        {/* Title */}
        <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
          PARTNER INFLUENCERS
        </h1>
      </div>

      <div className="grid gap-3 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {influencers.map((inf) => {
          // Construct image URL with fallback
          const imageUrl = inf.profile_image
            ? (inf.profile_image.startsWith('http')
                ? inf.profile_image
                : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/partner-influencers/profile-images/${inf.profile_image}`)
            : '/partner_influencers/placeholder.png';
            
          return (
            <div
              key={inf.id}
              className="hover:scale-105 hover:-translate-y-2 cursor-pointer rounded-2xl bg-white/10 backdrop-blur-md shadow hover:shadow-lg transition overflow-hidden"
              onClick={() => handleInfluencerClick(inf)}
            >
              <div className="relative w-full h-[150px] md:h-[300px]">
                <Image
                  src={imageUrl}
                  alt={inf.influencer_name || inf.social_id}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/partner_influencers/placeholder.png';
                  }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-sm md:text-lg font-semibold text-white">
                  {inf.influencer_name}
                </h2>
                <p className="text-xs md:text-sm text-gray-300">@{inf.social_id}</p>
                <p className="mt-2 text-xs md:text-sm text-gray-400">
                  {inf.followers_count} followers
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        influencerId={selectedInfluencer}
      />
    </div>
  );
}