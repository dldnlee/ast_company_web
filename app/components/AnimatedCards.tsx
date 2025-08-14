import React from 'react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';

interface CardData {
  title: string;
  description: string;
}

const AnimatedCardGrid: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  // Define colors for each card (matching the image)
  const colors = [
    'bg-gradient-to-r from-purple-500 to-purple-600', // Purple for 콘텐츠 제작
    'bg-gradient-to-r from-blue-500 to-blue-600',     // Blue for 광고 캠페인
    'bg-gradient-to-r from-cyan-500 to-cyan-600'      // Cyan for 브랜드 매니지먼트
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Individual card animation variants
  const cardVariants : Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Divider line animation variants
  const dividerVariants : Variants = {
    hidden: {
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Title animation variants
  const titleVariants : Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Description animation variants
  const descriptionVariants : Variants = {
    hidden: {
      opacity: 0,
      y: 15
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto place-items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center justify-center w-[410px] transform transition-all duration-300 hover:scale-105"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
        >
          {/* Colored divider bar */}
          <motion.div 
            className={`mx-auto h-1 w-16 rounded-full ${colors[index % colors.length]}`}
            variants={dividerVariants}
            style={{ transformOrigin: 'center' }}
          />
          
          {/* Card content */}
          <div className="py-6 text-center">
            <motion.h3 
              className="text-xl font-bold text-white mb-4"
              variants={titleVariants}
            >
              {card.title}
            </motion.h3>
            <motion.p 
              className="text-gray-300 leading-relaxed whitespace-pre-line"
              variants={descriptionVariants}
            >
              {card.description}
            </motion.p>
          </div>  
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedCardGrid;