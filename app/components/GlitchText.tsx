import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchChars?: string;
  glitchDuration?: number;
  glitchIntensity?: number;
  triggerOnHover?: boolean;
  autoGlitch?: boolean;
  autoGlitchInterval?: number;
  colors?: {
    primary?: string;
    glitch1?: string;
    glitch2?: string;
  };
}

const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = "text-4xl font-bold",
  glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?",
  glitchDuration = 100,
  glitchIntensity = 0.3,
  triggerOnHover = false,
  autoGlitch = true,
  autoGlitchInterval = 3000,
  colors = {
    primary: "#ffffffff",
    glitch1: "#6000a0ff",
    glitch2: "#33ff00ff"
  }
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [glitchKey, setGlitchKey] = useState<number>(0);

  const generateGlitchText = (): string => {
    return text
      .split('')
      .map(char => {
        if (char === ' ') return ' ';
        return Math.random() < glitchIntensity 
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char;
      })
      .join('');
  };

  const startGlitch = (): void => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    setGlitchKey(prev => prev + 1);

    // Multiple glitch iterations
    const glitchIterations = 3 + Math.floor(Math.random() * 3);
    let iteration = 0;

    const glitchInterval = setInterval(() => {
      setDisplayText(generateGlitchText());
      iteration++;

      if (iteration >= glitchIterations) {
        clearInterval(glitchInterval);
        setTimeout(() => {
          setDisplayText(text);
          setIsGlitching(false);
        }, glitchDuration);
      }
    }, glitchDuration / 2);
  };

  // Auto glitch effect
  useEffect(() => {
    if (!autoGlitch) return;

    const interval = setInterval(() => {
      if (!isGlitching) {
        startGlitch();
      }
    }, autoGlitchInterval);

    return () => clearInterval(interval);
  }, [autoGlitch, autoGlitchInterval, isGlitching]);

  // Glitch animation variants
  const glitchVariants = {
    normal: {
      x: 0,
      y: 0,
      textShadow: `0 0 0 ${colors.primary}`,
      filter: "none"
    },
    glitch: {
      x: [-2, 2, -1, 1, 0],
      y: [0, -1, 1, 0, 0],
      textShadow: [
        `2px 0 0 ${colors.glitch1}, -2px 0 0 ${colors.glitch2}`,
        `-1px 0 0 ${colors.glitch1}, 1px 0 0 ${colors.glitch2}`,
        `1px 0 0 ${colors.glitch1}, -1px 0 0 ${colors.glitch2}`,
        `0 0 0 ${colors.primary}`
      ],
      filter: [
        "hue-rotate(90deg) saturate(2)",
        "hue-rotate(0deg) saturate(1)",
        "hue-rotate(180deg) saturate(1.5)",
        "none"
      ],
      transition: {
        duration: glitchDuration / 1000,
        times: [0, 0.25, 0.5, 0.75, 1],
        ease: "easeInOut"
      }
    }
  };

  // RGB split effect variants
  const rgbSplitVariants = {
    normal: {
      textShadow: `0 0 0 ${colors.primary}`
    },
    split: {
      textShadow: [
        `3px 0 0 ${colors.glitch1}, -3px 0 0 ${colors.glitch2}`,
        `2px 0 0 ${colors.glitch1}, -2px 0 0 ${colors.glitch2}`,
        `1px 0 0 ${colors.glitch1}, -1px 0 0 ${colors.glitch2}`,
        `0 0 0 ${colors.primary}`
      ],
      transition: {
        duration: 0.1,
        times: [0, 0.33, 0.66, 1]
      }
    }
  };

  const handleInteraction = (): void => {
    if (triggerOnHover && !isGlitching) {
      startGlitch();
    }
  };

  return (
    <div className="relative inline-block">
      {/* Main text with glitch effect */}
      <motion.span
        className={`${className} relative z-10 select-none text-5xl`}
        style={{ color: colors.primary }}
        variants={glitchVariants}
        animate={isGlitching ? "glitch" : "normal"}
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`${glitchKey}-${displayText}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.05 }}
          >
            {displayText}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* Background text layers for extra effect */}
      <motion.span
        className={`${className} absolute top-0 left-0 -z-10 select-none`}
        style={{ color: colors.glitch1 }}
        variants={rgbSplitVariants}
        animate={isGlitching ? "split" : "normal"}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      <motion.span
        className={`${className} absolute top-0 left-0 -z-20 select-none`}
        style={{ color: colors.glitch2 }}
        variants={rgbSplitVariants}
        animate={isGlitching ? "split" : "normal"}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      {/* Scan lines effect */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              backgroundPosition: ["0% 0%", "0% 100%"]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: glitchDuration / 1000,
              ease: "linear"
            }}
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(255, 255, 255, 0.1) 2px,
                rgba(255, 255, 255, 0.1) 4px
              )`,
              mixBlendMode: "overlay"
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlitchText;