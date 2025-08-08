'use client';

import { motion, useScroll } from "motion/react";


export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-200"
      style={{ scaleX: scrollYProgress }}
    />
  );
};