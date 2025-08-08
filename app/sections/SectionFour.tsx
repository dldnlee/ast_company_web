import { Swiper, SwiperSlide } from 'swiper/react';
import { influencerNames } from '@/data/influencerNames';
import 'swiper/css';
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa";




export function SectionFour() {
  return (
    <section className='flex flex-col items-center justify-center gap-10 py-16'>
      <h2 className="text-4xl font-bold text-white mb-4 text-center">OUR PARTNER INFLUENCERS</h2>
      <Swiper
      // spaceBetween={50}
      // slidesPerView={5}
      centeredSlides={true}
      initialSlide={3}
      loop={true}
      breakpoints={{
        640: {slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 40 },
        1280: { slidesPerView: 4, spaceBetween: 50 },
      }}
      className='w-full'
      >
        {influencerNames.map((name : string, idx : number) => (
          <SwiperSlide key={idx}>
            <div className='w-[200px] sm:w-[300px]'>
              <img src={`/partner_influencers/${name}`} alt={name} className='rounded-2xl' />
              <p>@name</p>
            </div>
          </SwiperSlide>  
        ))}
      </Swiper>
      <Link href="/" className='border px-5 py-2 flex justify-center items-center group hover:text-purple-600'>
        <p>전체보기</p>
        <FaArrowRight className='inline ml-2 group-hover:translate-x-2 transition-all' />
      </Link>
    </section>
  )
}