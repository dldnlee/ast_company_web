// app/influencers/page.tsx
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { influencerNames } from "@/data/influencerNames";
import ContactModal from "../components/ContactModal";
import { useState } from "react";

interface Influencer {
  src: string;
  socialId: string;
}

export default function InfluencersPage() {
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
    <div className="min-h-screen px-5 sm:px-10 py-12">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row items-center justify-center relative mb-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="absolute left-0 flex items-center gap-2 cursor-pointer text-white hover:text-purple-400 transition-colors group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        {/* Title */}
        <h1 className="text-lg sm:text-3xl font-bold text-white text-center">
          PARTNER INFLUENCERS
        </h1>
      </div>

      <div className="grid gap-3 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {influencerNames.map((inf, idx) => (
          <div
            key={idx}
            className="hover:scale-105 hover:-translate-y-2 cursor-pointer rounded-2xl bg-white/10 backdrop-blur-md shadow hover:shadow-lg transition overflow-hidden"
            onClick={() => handleInfluencerClick(inf)}
          >
            <div className="relative w-full h-[150px] md:h-[300px]">
              <Image
                src={`/partner_influencers/${inf.src}`}
                alt={inf.socialId}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-sm md:text-lg font-semibold text-white">
                {inf.socialId}
              </h2>
              <p className="text-xs md:text-sm text-gray-500">@{inf.socialId}</p>
              <p className="mt-2 text-xs md:text-sm text-gray-700">
                {inf.socialId} followers
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        influencerId={selectedInfluencer}
      />
    </div>
  );
}