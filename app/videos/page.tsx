// app/influencers/page.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { influencerNames } from "@/data/influencerNames";
import ContactModal from "../components/ContactModal";
import { useState } from "react";
import { AnimatedTabs } from "../components/AnimatedTabs";

interface Influencer {
  src: string;
  socialId: string;
}

export default function VideosPage() {
  const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');

  const handleBackClick = () => {
    router.back();
  };

  const handleInfluencerClick = (item: Influencer): void => {
    setSelectedInfluencer(`@${item.socialId}`);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedInfluencer('');
  };

  return (
    <div className="min-h-screen py-12">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row items-center justify-center relative mb-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute left-10 flex items-center gap-2 cursor-pointer text-white hover:text-purple-400 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        {/* Title */}
        <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
          OUR WORKS
        </h1>
      </div>
      <AnimatedTabs maxResults={200} />
    </div>
  );
}