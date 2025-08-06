import { brandNames } from '@/data/brandNames';
import React from 'react';

const InfiniteScrollPartners = () => {
  // // Sample brand logos - you can replace these with your actual brand data
  // const brands = [
  //   { id: 1, name: 'Brand Logo 1', color: 'bg-gray-400' },
  //   { id: 2, name: 'Brand Logo 2', color: 'bg-gray-500' },
  //   { id: 3, name: 'Brand Logo 3', color: 'bg-gray-400' },
  //   { id: 4, name: 'Brand Logo 4', color: 'bg-gray-500' },
  //   { id: 5, name: 'Brand Logo 5', color: 'bg-gray-400' },
  //   { id: 6, name: 'Brand Logo 6', color: 'bg-gray-500' },
  //   { id: 7, name: 'Brand Logo 7', color: 'bg-gray-400' },
  //   { id: 8, name: 'Brand Logo 8', color: 'bg-gray-500' },
  // ];

  // Duplicate brands for seamless scrolling
  const median = Math.floor(brandNames.length / 2);
  const lowerHalf = brandNames.slice(0, median);
  const upperHalf = brandNames.slice(median, brandNames.length);
  const topBrands = [...upperHalf, ...upperHalf];
  const bottomBrands = [...lowerHalf, ...lowerHalf];

  return (
    <div className="w-full bg-black py-16 overflow-hidden">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">OUR PARTNERS</h2>
      </div>

      {/* Top row - scrolling right */}
      <div className="relative mb-8">
        <div className="flex animate-scroll-right">
          {topBrands.map((brand, index) => (
            <div
              key={`top-${brand}-${index}`}
              className={`flex-shrink-0 w-40 h-20 rounded-lg flex items-center justify-center text-white font-medium mx-4 shadow-lg bg-white`}
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

      {/* Bottom row - scrolling left */}
      <div className="relative">
        <div className="flex animate-scroll-left">
          {bottomBrands.map((brand, index) => (
            <div
              key={`bottom-${brand}-${index}`}
              className={`flex-shrink-0 w-40 h-20 rounded-lg flex items-center justify-center text-white font-medium mx-4 shadow-lg bg-white`}
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