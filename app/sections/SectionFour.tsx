import { Swiper, SwiperSlide } from 'swiper/react';
import { influencerNames } from '@/data/influencerNames';
import 'swiper/css';




export function SectionFour() {
  return (
    <section className='flex flex-col items-center justify-center gap-10'>
      <h1 className='text-2xl'>Our Partner Influencers</h1>
      <Swiper
      spaceBetween={50}
      slidesPerView={5}
      centeredSlides={true}
      className='w-full'
      >
        {influencerNames.map((name : string, idx : number) => (
          <SwiperSlide key={idx}>
            <div className='w-[400px]'>
              <img src={`/partner_influencers/${name}`} alt={name} className='rounded-2xl' />
              <p>name</p>
            </div>
          </SwiperSlide>  
        ))}
      </Swiper>
    </section>
  )
}