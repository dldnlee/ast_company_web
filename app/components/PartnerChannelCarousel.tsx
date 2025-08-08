import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";

const PartnerChannelCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleItems] = useState(4); // Number of items visible at once

  // Sample partner channel data - replace with your actual data
  const channels = [
    {
      id: 1,
      title: "케이 & 다니엘 걸",
      category: "LIFESTYLE",
      image: "/api/placeholder/400/120",
      color: "bg-pink-100",
      textColor: "text-pink-800"
    },
    {
      id: 2,
      title: "뷰티 월드",
      category: "BEAUTY",
      image: "/api/placeholder/400/120",
      color: "bg-purple-100",
      textColor: "text-purple-800"
    },
    {
      id: 3,
      title: "음악",
      category: "MUSIC",
      image: "/api/placeholder/400/120",
      color: "bg-blue-100",
      textColor: "text-blue-800"
    },
    {
      id: 4,
      title: "LAUGHING",
      category: "ENTERTAINMENT",
      image: "/api/placeholder/400/120",
      color: "bg-green-100",
      textColor: "text-green-800"
    },
    {
      id: 5,
      title: "영화",
      category: "MOVIES",
      image: "/api/placeholder/400/120",
      color: "bg-red-100",
      textColor: "text-red-800"
    },
    {
      id: 6,
      title: "톡기로장",
      category: "TALK SHOW",
      image: "/api/placeholder/400/120",
      color: "bg-yellow-100",
      textColor: "text-yellow-800"
    },
    {
      id: 7,
      title: "온에어",
      category: "LIVE",
      image: "/api/placeholder/400/120",
      color: "bg-indigo-100",
      textColor: "text-indigo-800"
    },
    {
      id: 8,
      title: "도전자 X SummerYoung",
      category: "CHALLENGE",
      image: "/api/placeholder/400/120",
      color: "bg-gray-100",
      textColor: "text-gray-800"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, channels.length - visibleItems);
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(0, channels.length - visibleItems);
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(nextSlide, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, visibleItems]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="w-full max-w-4xl mx-auto text-white p-6 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-wider">PARTNER CHANNEL</h2>
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
        className="relative overflow-hidden rounded-lg h-96"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          {channels.map((channel, index) => (
            <motion.div
              key={channel.id}
              className="flex-shrink-0 h-20 relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`${channel.color} h-full w-full flex items-center justify-between px-6 relative overflow-hidden rounded-lg`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
                </div>
                
                {/* Content */}
                <div className="flex items-center gap-4 z-10">
                  <div className="flex flex-col">
                    <span className={`text-xs font-medium ${channel.textColor} opacity-70`}>
                      {channel.category}
                    </span>
                    <h3 className={`text-lg font-bold ${channel.textColor}`}>
                      {channel.title}
                    </h3>
                  </div>
                </div>

                {/* Play Button */}
                <motion.button
                  className={`${channel.textColor} p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-200`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlayCircle className="w-4 h-4 fill-current" />
                </motion.button>

                {/* Decorative Elements */}
                <div className="absolute right-0 top-0 w-24 h-full opacity-20">
                  <div className={`w-full h-full ${channel.textColor.replace('text-', 'bg-')} transform rotate-12 translate-x-4`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 bg-gray-800 rounded-full h-1 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ 
            width: isAutoPlaying ? "100%" : `${((currentIndex + 1) / Math.max(1, channels.length - visibleItems + 1)) * 100}%` 
          }}
          transition={{ 
            duration: isAutoPlaying ? 3 : 0.5,
            ease: "linear",
            repeat: isAutoPlaying ? Infinity : 0
          }}
        />
      </div>
    </div>
  );
};

export default PartnerChannelCarousel;