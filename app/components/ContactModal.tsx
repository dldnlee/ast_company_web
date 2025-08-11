import { Variants } from "motion";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface FormData {
  channel: string;
  inquiryType: string;
  title: string;
  contact: string;
  content: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  influencerId?: string;
}

// Contact Modal Component
const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, influencerId = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    channel: influencerId,
    inquiryType: '',
    title: '',
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

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      channel: influencerId || '',
    }));
  }, [influencerId]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false);
      setLoading(false);
      setFormData({
        channel: influencerId,
        inquiryType: '',
        title: '',
        contact: '',
        content: ''
      });
    }
  }, [isOpen, influencerId]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget && !loading && !showSuccess) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
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
      inquiryChannel: formData.channel,
      inquiryType: formData.inquiryType,
      title: formData.title,
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
          className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4 text-black"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-gray-100 rounded-lg overflow-hidden"
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
                  className="p-8 max-h-[90vh] w-xs sm:w-md"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">CONTACT</h3>
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                      type="button"
                      disabled={loading}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Form */}
                  <div className="space-y-4 w-full">
                    {/* 문의 채널 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        문의 채널
                      </label>
                      <input
                        type="text"
                        name="channel"
                        value={formData.channel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder=""
                        disabled
                      />
                    </div>

                    {/* 문의 구분 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        문의 구분
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
                        disabled={loading}
                      >
                        <option value="">선택해주세요</option>
                        <option value="collaboration">협업 문의</option>
                        <option value="partnership">파트너십</option>
                        <option value="general">일반 문의</option>
                        <option value="technical">기술 지원</option>
                        <option value="other">기타</option>
                      </select>
                    </div>

                    {/* 제목 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        제목
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        placeholder="문의 제목을 입력해주세요"
                        disabled={loading}
                      />
                    </div>

                    {/* 연락처 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        연락처 (전화번호 또는 이메일주소)
                      </label>
                      <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        placeholder="연락처를 입력해주세요"
                        disabled={loading}
                      />
                    </div>

                    {/* 내용 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        내용
                      </label>
                      <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white"
                        placeholder="콘텐츠 유형, 예산, 원하시는 일정 등 세부 사항을 기입해주세요."
                        disabled={loading}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      {loading ? '제출 중...' : '제출하기'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                  className="p-20 gap-2 flex flex-col items-center justify-center text-center min-w-[200px] min-h-[150px]"
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
                    className="text-5xl font-bold text-gray-800 mb-2"
                  >
                    접수가 완료되었습니다.
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl text-gray-600"
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

export default ContactModal;