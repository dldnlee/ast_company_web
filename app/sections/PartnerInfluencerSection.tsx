'use client';

import React, { JSX, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';
import { AnimatePresence, motion } from "motion/react";
import ContactModal from '../components/ContactModal';
import { supabase } from '@/utils/supabase/client';
import Image from 'next/image';

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

// Main Component
export function PartnerInfluencerSection(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');
  const [influencers, setInfluencers] = useState<InfluencerDisplayData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  

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
          social_id: influencer.social_id,
          followers_count: influencer.followers_count,
          profile_image: influencer.profile_image,
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
      <section className='flex flex-col items-center justify-center gap-10 pb-20 px-10'>
        <h2 className="text-4xl font-bold text-white mb-4 text-center">PARTNER INFLUENCERS</h2>
        <div className='flex items-center justify-center py-20'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white'></div>
          <p className='ml-4 text-white'>인플루언서를 불러오는 중...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className='flex flex-col items-center justify-center gap-10 pb-20 px-10'>
        <h2 className="text-4xl font-bold text-white mb-4 text-center">PARTNER INFLUENCERS</h2>
        <div className='flex flex-col items-center justify-center py-20'>
          <p className='text-red-400 mb-4'>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className='px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors'
          >
            다시 시도
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (influencers.length === 0) {
    return (
      <section className='flex flex-col items-center justify-center gap-10 pb-20 px-10'>
        <h2 className="text-4xl font-bold text-white mb-4 text-center">PARTNER INFLUENCERS</h2>
        <div className='flex items-center justify-center py-20'>
          <p className='text-white'>등록된 파트너 인플루언서가 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className='flex flex-col items-center justify-center gap-10 pb-20 px-10'>
      <h2 className="text-4xl font-bold text-white mb-4 text-center">PARTNER INFLUENCERS</h2>
      <Swiper
        initialSlide={Math.min(3, influencers.length - 1)}
        loop={influencers.length > 1}
        autoplay={influencers.length > 1 ? {
          delay: 2500,
          disableOnInteraction: false, 
        } : false}
        modules={[Autoplay]}
        breakpoints={{
          640: {slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
          1280: { slidesPerView: 5, spaceBetween: 50 },
        }}
        className='w-full'
      >
        {influencers.map((item: InfluencerDisplayData) => {
          // Construct image URL with fallback
          const imageUrl = item.profile_image 
            ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/partner-influencers/profile-images/${item.profile_image}`
            : '/partner_influencers/placeholder.png';
          
          return (
            <SwiperSlide key={item.id} style={{ width: 'auto'}} className='flex justify-center items-center'>
              <div 
                className='cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2'
                onClick={() => handleInfluencerClick(item)}
              >
                <div className='relative w-full h-auto'>
                  <Image 
                    src={imageUrl}
                    alt={item.influencer_name || item.social_id}
                    width={300}
                    height={300}
                    className='rounded-2xl hover:shadow-lg transition-shadow duration-300 object-cover'
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/partner_influencers/placeholder.png';
                    }}
                    priority={false}
                  />
                </div>
                <p className='font-bold text-center mt-2'>@{item.social_id} <span>| {item.followers_count}</span></p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Link href="/influencers" className='border px-5 py-2 flex justify-center items-center group hover:text-purple-600'>
        <p>전체보기</p>
        <FaArrowRight className='inline ml-2 group-hover:translate-x-2 transition-all' />
      </Link>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        influencerId={selectedInfluencer}
      />
    </section>
  );
}