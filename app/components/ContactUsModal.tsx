import { Variants } from "motion";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface FormData {
  name: string;
  contact: string;
  content: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Contact Modal Component
const ContactUsModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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
    success: {
      opacity: 1,
      scale: 0.6,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        duration: 0.6
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

  const contentVariants: Variants = {
    form: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3
      }
    },
    success: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const successVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.4,
        type: "spring",
        damping: 15,
        stiffness: 300
      }
    }
  };

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setLoading(false);
      setFormData({
        name: '',
        contact: '',
        content: ''
      });
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !loading && !showSuccess) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);

    // Prepare data for Google App Script
    const formDataObj = {
      name: formData.name,
      contact: formData.contact,
      content: formData.content,
      timestamp: new Date().toISOString()
    };

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyZZ6exHsa5Q6CEqD94FUYOCxfAg2yIsDCrhvwv8EmnXuyIADfB61mArqY4YRJg7cR7rA/exec';

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google App Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj)
      });
      
      // Show success animation
      setShowSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      alert('문의 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-black text-white rounded-lg overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate={showSuccess ? "success" : "visible"}
            exit="exit"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.div
                  key="form"
                  variants={contentVariants}
                  initial="form"
                  animate="form"
                  exit="success"
                  className="p-8 w-full max-w-2xl min-w-[600px] max-h-[90vh] overflow-y-auto"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-bold text-white">문의하기</h3>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white text-xl transition-colors"
                      type="button"
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Form */}
                  <div className="space-y-6">
                    {/* Top Row - Name and Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 이름 */}
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="이름"
                          disabled={loading}
                        />
                      </div>

                      {/* 연락처 */}
                      <div>
                        <input
                          type="text"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="이메일 또는 전화번호"
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* 문의사항 - Full width */}
                    <div>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
                        placeholder="문의사항"
                        disabled={loading}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-800 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={loading}
                    >
                      {loading ? '제출 중...' : '문의 보내기'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-20 gap-2 flex flex-col items-center justify-center text-center min-w-[300px] min-h-[200px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
                  >
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    접수가 완료되었습니다.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-gray-300"
                  >
                    영업일 기준 1~2일 내 답변 드리겠습니다.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactUsModal;