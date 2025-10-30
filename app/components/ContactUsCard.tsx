import { motion } from "motion/react";
import { Variants } from "motion/react"; // or "motion/react" depending on the package
import React, { useState } from "react";
import ContactUsModal from "./ContactUsModal";

const ContactUsCard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants : Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const ballVariants : Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: -180,
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
        damping: 10,
      },
    },
  };

  return (
    <div
      className="
        w-full max-w-5xl
        text-white px-4 py-10
        md:px-6 md:py-20
        flex flex-col items-center
        bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg
        mx-auto
      "
    >
      {/* Top Section */}
      <p className="text-center text-sm md:text-lg text-white mb-2 md:mb-8">
        Want to work with us? <br />
        <span className="text-purple-400">프로젝트 문의는 언제든지 환영합니다</span>
      </p>

      <motion.h1
        className="
          text-[2.5rem] md:text-[6rem]
          font-extrabold tracking-tight
          flex items-center justify-center gap-3 md:gap-4
          bg-gradient-to-r from-purple-100 to-purple-600
          bg-clip-text text-transparent
          py-2 md:py-7
          flex-col lg:flex-row
        "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
      >
        <div>
          <motion.span variants={wordVariants}>GET </motion.span>
          <motion.span variants={wordVariants}> IN</motion.span>
        </div>
        <motion.span
          style={{
            background: "radial-gradient(at 25% 25%, #f3f4f6 0%, #7c3aed 75%)",
          }}
          className="w-12 h-12 md:w-24 md:h-24 rounded-full inline-block cursor-pointer "
          variants={ballVariants}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px rgba(124, 58, 237, 0.5)"
          }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsModalOpen(true)}
        />
        <motion.span variants={wordVariants}>TOUCH</motion.span>
      </motion.h1>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="
          w-full
          flex flex-col items-center justify-center gap-6
          md:flex-row md:items-center md:justify-center md:gap-10
          mt-2 md:mt-8
        "
      >
        <img
          src="company_logos/ASTCompanyWhiteNoBG.png"
          alt="AST Company"
          className="w-36 md:w-44 md:border-r border-white/30 pr-0 md:pr-6"
        />
        <ul className="space-y-1 text-center md:text-left flex flex-col items-center md:items-start text-sm md:text-base">
          <li>contact@astcompany.co.kr</li>
        </ul>
      </motion.div>
      <ContactUsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ContactUsCard;
