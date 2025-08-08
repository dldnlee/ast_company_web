import { Variants } from "motion";
import { AnimatePresence, motion } from "motion/react";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
}


const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen, onClose }) => {
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white rounded-lg p-8 max-w-md w-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Animated Modal</h3>
            <p className="text-gray-600 mb-6">
              This modal demonstrates entrance and exit animations with spring physics and backdrop effects.
            </p>
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              onClick={onClose}
            >
              Close Modal
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};