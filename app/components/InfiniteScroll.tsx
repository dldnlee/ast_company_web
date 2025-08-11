import { brandNames } from '@/data/brandNames';
import React from 'react';

const InfiniteScrollPartners = () => {
  // Duplicate brands for seamless scrolling
  const median = Math.floor(brandNames.length / 2);
  const lowerHalf = brandNames.slice(0, 15);
  const firstSec = brandNames.slice(0, 15);
  const secondSec = brandNames.slice(15, 30);
  const thirdSec = brandNames.slice(30, 45);
  const fourthSec = brandNames.slice(45, brandNames.length);
  // 
  const first = [...firstSec, ...firstSec];
  const second = [...secondSec, ...secondSec];
  const third = [...thirdSec, ...thirdSec];
  const fourth = [...fourthSec, ...fourthSec];
  // const upperHalf = [...first, ...second, ...third, ...fourth];
  // const topBrands = [...upperHalf, ...upperHalf];
  // const bottomBrands = [...lowerHalf, ...lowerHalf];

  return (
    <div className="w-full pb-20 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">OUR PARTNERS</h2>
      </div>

      {/* First row - scrolling right */}
      <div className="relative mb-4 sm:mb-8">
        <div className="flex animate-scroll-right">
          {first.map((brand, index) => (
            <div
              key={`top-${brand}-${index}`}
              className={`flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white`}
            >
              <img src={`/brand_logos/${brand}.png`} alt={brand} />
              {/* {brand.name} */}
            </div>
          ))}
        </div>
        {/* Left edge blur */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        {/* Right edge blur */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Second row - scrolling left */}
      <div className="relative mb-4 sm:mb-8">
        <div className="flex animate-scroll-left">
          {second.map((brand, index) => (
            <div
              key={`bottom-${brand}-${index}`}
              className={`flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white`}
            >
              <img src={`/brand_logos/${brand}.png`} alt={brand} />
              {/* {brand.name} */}
            </div>
          ))}
        </div>
        {/* Left edge blur */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        {/* Right edge blur */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Third row - scrolling right */}
      <div className="relative mb-4 sm:mb-8">
        <div className="flex animate-scroll-right">
          {third.map((brand, index) => (
            <div
              key={`top-${brand}-${index}`}
              className={`flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white`}
            >
              <img src={`/brand_logos/${brand}.png`} alt={brand} />
              {/* {brand.name} */}
            </div>
          ))}
        </div>
        {/* Left edge blur */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        {/* Right edge blur */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Fourth row - scrolling right */}
      <div className="relative">
        <div className="flex animate-scroll-left">
          {fourth.map((brand, index) => (
            <div
              key={`bottom-${brand}-${index}`}
              className={`flex-shrink-0 w-[100px] h-[50px] sm:w-40 sm:h-20 rounded-lg flex items-center justify-center text-white font-medium mx-2 sm:mx-4 shadow-lg bg-white`}
            >
              <img src={`/brand_logos/${brand}.png`} alt={brand} />
              {/* {brand.name} */}
            </div>
          ))}
        </div>
        {/* Left edge blur */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10"></div>
        {/* Right edge blur */}
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>  

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