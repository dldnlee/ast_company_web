import React, { JSX, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { influencerNames } from '@/data/influencerNames';
import 'swiper/css';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";
import { Autoplay } from 'swiper/modules';
import { Variants } from "motion";
import { AnimatePresence, motion } from "motion/react";
import ContactModal from '../components/ContactModal';

// Types
interface Influencer {
  src: string;
  socialId: string;
}

// Main Component
export function PartnerInfluencerSection(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');

  const handleInfluencerClick = (item: Influencer): void => {
    setSelectedInfluencer(`@${item.socialId}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedInfluencer('');
  };

  return (
    <section className='flex flex-col items-center justify-center gap-10 py-16 px-10'>
      <h2 className="text-4xl font-bold text-white mb-4 text-center">OUR PARTNER INFLUENCERS</h2>
      <Swiper
        initialSlide={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, 
        }}
        modules={[Autoplay]}
        breakpoints={{
          640: {slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
          1280: { slidesPerView: 5, spaceBetween: 50 },
        }}
        className='w-full'
      >
        {influencerNames.map((item: Influencer, idx: number) => (
          <SwiperSlide key={idx} style={{ width: 'auto'}} className='flex justify-center items-center'>
            <div 
              className='cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2'
              onClick={() => handleInfluencerClick(item)}
            >
              <img 
                src={`/partner_influencers/${item.src}`} 
                alt={item.src} 
                className='rounded-2xl hover:shadow-lg transition-shadow duration-300' 
              />
              <p className='font-bold text-center mt-2'>@{item.socialId}</p>
            </div>
          </SwiperSlide>  
        ))}
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