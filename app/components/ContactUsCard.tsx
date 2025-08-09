import { motion } from "motion/react";
import React from "react";

const ContactUsCard = () => {
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

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const ballVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.6,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };
  return (
    <div className="w-full text-white px-6 py-12 md:py-20 flex flex-col items-center 
        bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
        
        {/* Top Section */}
        <p className="text-xl text-white text-center">
            Want to work with us? <br />
            <span className="text-purple-400">프로젝트 문의는 언제든지 환영합니다</span>
        </p>

        <motion.h1 
            className="text-[3rem] md:text-[6rem] font-extrabold tracking-tight flex items-center justify-center gap-4 
                        bg-gradient-to-r from-purple-100 to-purple-600 bg-clip-text text-transparent py-7"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            >
            <motion.span variants={wordVariants}>GET</motion.span>
            <motion.span variants={wordVariants}>IN</motion.span>
            <motion.span 
                className="w-12 h-12 md:w-24 md:h-24 rounded-full inline-block"
                style={{
                background: 'radial-gradient(at 25% 25%, #f3f4f6 0%, #7c3aed 75%)'
                }}
                variants={ballVariants}
            />
            <motion.span variants={wordVariants}>TOUCH</motion.span>
        </motion.h1>

        {/* Contact Info */}
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-full flex items-centerju justify-center gap-5">
            <img src="company_logos/ASTCompanyWhiteNoBG.png" alt="AST Company" className="w-[180px] border-r"/>
            <div className="h-full"></div>
            <ul className="space-y-1 flex flex-col items-start justify-center">
                <li>contact@astcompany.co.kr</li>
                <li>010-3044-2131</li>
                <li>서울특별시 서초구 매헌로 16, 1313호</li>
            </ul>
        </motion.div>

        </div>

  );
};

export default ContactUsCard;
