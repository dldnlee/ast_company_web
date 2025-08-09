import { motion } from "motion/react"
import { GradualSpacing } from "../components/GradualSpacing"
import GlitchText from "../components/GlitchText"
import React from "react";


const StaggeredPhrases = () => {
  const phrases = ['We Create', 'We Connect', 'We Convert'];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const phraseVariants = {
    hidden: {
      opacity: 0,
      rotateX: -90,
      y: 20
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.p 
      className="text-md md:text-xl flex items-center gap-4 flex-wrap"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      style={{ perspective: '1000px' }}
    >
      {phrases.map((phrase, index) => (
        <React.Fragment key={index}>
          <motion.span 
            className="text-white"
            variants={phraseVariants}
          >
            {phrase}
          </motion.span>
          {index < phrases.length - 1 && (
            <span className="text-gray-400 font-bold text-2xl">|</span>
          )}
        </React.Fragment>
      ))}
    </motion.p>
  );
};

export function SectionOne() {
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
          e.preventDefault();
          const element = document.getElementById(sectionId);
          if (element) {
              element.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      };
      
    

  
    return (
        <section className="relative w-full h-screen overflow-hidden bg-gradient-to-bl from-purple-800 to-black">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
        src="/videos/earth.mp4" // Replace with your video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="relative z-10 flex flex-col gap-2 justify-end h-full px-20 pb-20 max-w-7xl mx-auto overflow-hidden">
        <GradualSpacing text="AST Company"/>
        <motion.p 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        transition={{
            duration: 1.5
        }}
        className="text-white text-xl">브랜드를 콘텐츠로 세상과 연결하다</motion.p>
        <StaggeredPhrases />
        {/* <p>At the Same Time</p> */}
        <div className="flex gap-4 mt-5">
          <a className="border py-3 px-4 hover:border-purple-600 hover:text-purple-600" href={`#portfolio`} onClick={(e) => handleNavClick(e, 'portfolio')}>VIEW PORTFOLIO</a>
          <a className="border py-3 px-4 hover:border-purple-600 hover:text-purple-600" href={`#contact`} onClick={(e) => handleNavClick(e, 'contact')}>CONTACT US</a>
        </div>
      </div>

      {/* Optional: Overlay Background Tint */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />
    </section>
    )
}