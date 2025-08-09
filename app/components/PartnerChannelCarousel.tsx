import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { channelNames } from '@/data/channelNames';

const PartnerChannelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleItems] = useState(7); // Number of items visible at once

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, channelNames.length - visibleItems);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, channelNames.length - visibleItems);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, visibleItems]);

  // const handleMouseEnter = () => setIsAutoPlaying(false/);
  // const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
    className="w-full max-w-6xl mx-auto text-white p-6 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-wider">PARTNER CHANNELS</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            <FaArrowCircleUp className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            <FaArrowCircleDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Vertical Carousel Container */}
      <div 
        className="relative overflow-hidden rounded-lg h-[800px]"
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <motion.div 
          className="flex flex-col gap-4"
          animate={{ 
            y: `${-currentIndex * (100 / visibleItems)}%` 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30
          }}
        >
          {channelNames.map((channel, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img src={`partner_channels/${channel.src}`} alt={channel.src} className='w-full rounded-xl' />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PartnerChannelCarousel;