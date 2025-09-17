"use client"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "motion/react"

interface Influencer {
  id: string;
  kr_name: string;
  en_name: string | null;
  profile_image: string;
  offer_price: number;
  gender: string | null;
  instagram_id: string | null;
  followers_count: string | null;
  followers_count_numeric: number;
  age: string | null;
  description: string | null;
}

interface ProposalData {
  id: string;
  influencer_list: string[];
  platform: string;
  category: string;
  author: string;
  receiver: string;
  created_at: string;
  expire_at: string;
}

export default function ProposalPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInfluencer(null);
    setIsModalOpen(false);
  };

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  async function fetchInfluencerDetails(influencerIds: string[], platform: string, category: string) {
    try {
      const { data: influencerData, error } = await supabase
        .from('influencers')
        .select('id, kr_name, en_name, profile_image, gender, instagram_id, followers_count, followers_count_numeric, age, description')
        .in('id', influencerIds);

      if (error) throw error;

      if (influencerData) {
        const influencersWithPricing = await Promise.all(
          influencerData.map(async (influencer) => {
            const { data: pricing } = await supabase
              .from('influencer_pricing')
              .select('offer_price')
              .eq('influencer_id', influencer.id)
              .eq('platform', platform)
              .eq('category', category)
              .single();

            return {
              ...influencer,
              offer_price: pricing?.offer_price || 0
            };
          })
        );
        setInfluencers(influencersWithPricing);
      }
    } catch (error) {
      console.error("Error fetching influencer details:", error);
    }
  }

  useEffect(() => {
    async function fetchProposal() {
      console.log('Slug received:', slug)
      console.log('Slug type:', typeof slug)
      try {
        setLoading(true);
        setError(null);

        const { data: proposals, error } = await supabase
          .from('proposals')
          .select('id, influencer_list, platform, category, author, receiver, created_at, expire_at')
          .eq('id', slug);

        console.log('Query response:', { proposals, error })
        const proposal = proposals && proposals.length > 0 ? proposals[0] : null;
        console.log('Final proposal:', proposal)

        if (error) {
          throw error;
        }

        if (proposal) {
          setProposalData(proposal);

          if (proposal.influencer_list && proposal.influencer_list.length > 0) {
            await fetchInfluencerDetails(proposal.influencer_list, proposal.platform, proposal.category);
          }
        }
      } catch (error) {
        console.error("Error fetching proposal data:", error);
        setError("Failed to load proposal data");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProposal();
    } else {
      console.log('No slug provided')
      setLoading(false);
      setError('No proposal ID provided');
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!proposalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Proposal Not Found</h1>
          <p className="text-gray-600">The requested proposal could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {isModalOpen && selectedInfluencer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="relative flex h-full">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left side - Profile Image */}
              <div className="flex-1 flex items-center justify-center">
                <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
                  {selectedInfluencer.profile_image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/partner-influencers/profile-images/${selectedInfluencer.profile_image}`}
                      alt={selectedInfluencer.kr_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 text-4xl font-medium">
                      {selectedInfluencer.kr_name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>

              {/* Right side - Content */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedInfluencer.kr_name}</h2>
                  {selectedInfluencer.en_name && (
                    <p className="text-xl text-white mb-4">{selectedInfluencer.en_name}</p>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    {selectedInfluencer.gender && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        {selectedInfluencer.gender === 'male' ? '남성' : '여성'}
                      </span>
                    )}
                    {calculateAge(selectedInfluencer.age) && (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                        {calculateAge(selectedInfluencer.age)}세
                      </span>
                    )}
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {proposalData?.platform}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {proposalData?.category}
                    </span>
                  </div>

                  {/* Description */}
                  {selectedInfluencer.description && (
                    <div className="mb-6">
                      <p className="text-white leading-relaxed">{selectedInfluencer.description}</p>
                    </div>
                  )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900 mb-1">{selectedInfluencer.followers_count}</p>
                    <p className="text-sm text-gray-600">팔로워</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600 mb-1">₩{selectedInfluencer.offer_price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">제안 가격</p>
                  </div>
                </div>

                {/* Social Media */}
                {/* {selectedInfluencer.instagram_id && (
                  <div className="mb-6">
                    <p className="text-sm text-white mb-2">소셜 미디어</p>
                    <div className="flex items-center gap-2">
                      <div className="bg-pink-100 text-pink-800 px-3 py-2 rounded-lg text-sm font-medium">
                        📸 @{selectedInfluencer.instagram_id}
                      </div>
                    </div>
                  </div>
                )} */}

                {/* Action Buttons */}
                {/* <div className="flex gap-3">
                  <button className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors">
                    프로필 보기
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    협업 문의하기
                  </button>
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen py-8"
      >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white bg-white/20 rounded-xl">
        <div className="p-6">
          <div className="border-b border-gray-200 pb-6 mb-6">
            {/* <h1 className="text-3xl font-bold text-gray-900 mb-2">
              제안서 #{proposalData.id}
            </h1> */}
            <div className="flex flex-wrap gap-4 text-xl text-white">
              {/* <span><strong>플랫폼:</strong> {proposalData.platform}</span>
              <span><strong>카테고리:</strong> {proposalData.category}</span> */}
              <span><strong>작성자 :</strong> {proposalData.author}</span>
              <span><strong>수신자 :</strong> {proposalData.receiver}</span>
              <span><strong>만료일 :</strong> {new Date(proposalData.expire_at).toLocaleDateString('ko-KR')}</span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              제안된 인플루언서 ({influencers.length}명)
            </h2>

            {influencers.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {influencers.map((influencer) => (
                  <motion.div
                    key={influencer.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openModal(influencer)}
                    className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="aspect-[3/4] relative">
                      {influencer.profile_image ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/partner-influencers/profile-images/${influencer.profile_image}`}
                          alt={influencer.kr_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white text-4xl font-medium">
                          {influencer.kr_name.charAt(0)}
                        </div>
                      )}

                      {/* Dark gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg leading-tight">{influencer.kr_name}</h3>
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-blue-400">
                            ₩{influencer.offer_price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                선택된 인플루언서가 없습니다.
              </p>
            )}

            {/* {influencers.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">총 예상 비용:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₩{influencers.reduce((total, inf) => total + inf.offer_price, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )} */}
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
}