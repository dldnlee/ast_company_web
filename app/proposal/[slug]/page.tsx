"use client"

import { supabase } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "motion/react"

interface ProposalItem {
  id: string;
  influencer_id: string;
  platform: string;
  category: string;
  count: number;
  unit_price: number;
  total_price: number;
  memo: string;
}

interface Influencer {
  id: string;
  kr_name: string;
  en_name: string | null;
  profile_image: string;
  gender: string | null;
  instagram_id: string | null;
  followers_count: string | null;
  followers_count_numeric: number;
  age: string | null;
  description: string | null;
  keywords: string[] | null;
  proposal_items: ProposalItem[];
}

interface ProposalData {
  id: string;
  author: string;
  receiver: string;
  created_at: string;
  expire_at: string;
  total_amount: number;
  currency: string;
  status: string;
  show_total_amount: boolean;
}

const platformLabels: { [key: string]: string } = {
  youtube: '유튜브',
  instagram: '인스타그램',
  broadcast: '방송'
}

export const categoryLabels: { [key: string]: string } = {
  // YouTube
  community: '커뮤니티',
  exposure_ppl: '단순노출PPL',
  functional_ppl: '기능성 PPL',
  branded: '브랜드형',
  shorts: '숏폼',
  fixed_comment: '고정 댓글',
  yt_second_one_month: '2차 활용 (1개월)',
  yt_second_three_month: '2차 활용 (3개월)',
  yt_general: '기타',
  // Instagram
  picture: '피드 포스트',
  reels: '릴스',
  story: '스토리',
  insta_second_one_month: '2차 활용 (1개월)',
  insta_second_three_month: '2차 활용 (3개월)',
  insta_general: '기타',
  // Broadcast
  broadcast: 'TV 방송',
  radio: '라디오',
  shown_radio: '영상 라디오',
  homeshopping: '홈쇼핑',
  live_commerce: '라이브 커머스',
  youtube: '방송용 유튜브',
  offline_convert: '오프라인 이벤트',
  popup_event: '팝업 이벤트',
  brand_model: '브랜드 모델',
  voice_model: '음성 모델',
  brand_film: '브랜드 영상',
  bc_second_one_month: '2차 활용 (1개월)',
  bc_second_three_month: '2차 활용 (3개월)',
  bc_general: '기타',
}

// Helper function to get platform color classes
const getPlatformColorClasses = (platform: string) => {
  const platformLower = platform.toLowerCase();
  if (platformLower === 'youtube') {
    return 'bg-red-100 text-red-800';
  } else if (platformLower === 'instagram') {
    return 'bg-pink-100 text-pink-800';
  } else if (platformLower === 'broadcast') {
    return 'bg-purple-100 text-purple-800';
  }
  return 'bg-blue-100 text-blue-800';
}

// Helper function to get category color classes
const getCategoryColorClasses = (platform: string) => {
  const platformLower = platform.toLowerCase();
  if (platformLower === 'youtube') {
    return 'bg-red-50 text-red-700 border border-red-200';
  } else if (platformLower === 'instagram') {
    return 'bg-pink-50 text-pink-700 border border-pink-200';
  } else if (platformLower === 'broadcast') {
    return 'bg-purple-50 text-purple-700 border border-purple-200';
  }
  return 'bg-green-100 text-green-800';
}

// Helper function to get category label
const getCategoryLabel = (category: string) => {
  return categoryLabels[category] || category;
}

// Helper function to get platform label in Korean
const getPlatformLabel = (platform: string) => {
  const platformLower = platform.toLowerCase();
  return platformLabels[platformLower] || platform;
}

// Helper function to group proposal items by platform
const groupByPlatform = (items: ProposalItem[]) => {
  const grouped = new Map<string, ProposalItem[]>();
  items.forEach(item => {
    const platform = item.platform.toLowerCase();
    if (!grouped.has(platform)) {
      grouped.set(platform, []);
    }
    grouped.get(platform)!.push(item);
  });
  return grouped;
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
  const [isExpired, setIsExpired] = useState(false);

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

  const checkIfExpired = (expireDate: string) => {
    const now = new Date();
    const expire = new Date(expireDate);
    return now > expire;
  };

  async function fetchProposalDetails(proposalId: string) {
    try {
      // Fetch proposal items with influencer details
      const { data: proposalItems, error: itemsError } = await supabase
        .from('proposal_items')
        .select(`
          id,
          influencer_id,
          platform,
          category,
          count,
          unit_price,
          total_price,
          memo,
          influencers(
            id,
            kr_name,
            en_name,
            profile_image,
            gender,
            instagram_id,
            followers_count,
            followers_count_numeric,
            age,
            description,
            keywords
          )
        `)
        .eq('proposal_id', proposalId);

      if (itemsError) throw itemsError;

      if (proposalItems) {
        // Group proposal items by influencer
        const influencerMap = new Map<string, Influencer>();

        proposalItems.forEach((item: any) => {
          const influencerId = item.influencer_id;
          const influencerData = item.influencers;

          if (!influencerMap.has(influencerId)) {
            influencerMap.set(influencerId, {
              ...influencerData,
              proposal_items: []
            });
          }

          influencerMap.get(influencerId)!.proposal_items.push({
            id: item.id,
            influencer_id: item.influencer_id,
            platform: item.platform,
            category: item.category,
            count: item.count,
            unit_price: item.unit_price,
            total_price: item.total_price,
            memo: item.memo
          });
        });

        setInfluencers(Array.from(influencerMap.values()));
      }
    } catch (error) {
      console.error("Error fetching proposal details:", error);
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
          .select('id, author, receiver, created_at, expire_at, total_amount, currency, status, show_total_amount')
          .eq('id', slug);

        console.log('Query response:', { proposals, error })
        const proposal = proposals && proposals.length > 0 ? proposals[0] : null;
        console.log('Final proposal:', proposal)

        if (error) {
          throw error;
        }

        if (proposal) {
          setProposalData(proposal);
          setIsExpired(checkIfExpired(proposal.expire_at));
          await fetchProposalDetails(proposal.id);
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
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/purple.mp4" type="video/mp4" />
        </video>
        {/* Dark blue overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedInfluencer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20 shadow-2xl"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
            }}
          >
            <div className="relative flex h-full">
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left side - Profile Image */}
              <div className="flex-1 flex items-center justify-center">
                <div className="h-150 rounded-l-2xl overflow-hidden shadow-lg">
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
              <div className="flex-1 p-8 flex h-150 flex-col justify-start overflow-auto">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-white mb-2">{selectedInfluencer.kr_name}</h2>
                  {selectedInfluencer.en_name && (
                    <p className="text-xl text-white mb-4">{selectedInfluencer.en_name}</p>
                  )}
                  {/* Keywords */}
                  {selectedInfluencer.keywords && selectedInfluencer.keywords.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {selectedInfluencer.keywords.map((keyword: string, index: number) => (
                        <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  {selectedInfluencer.description && (
                    <div className="mb-6">
                      <p className="text-white leading-relaxed">{selectedInfluencer.description}</p>
                    </div>
                  )}
                </div>

                

                {/* Proposal Items Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">제안 항목</h3>
                  <div className="space-y-4">
                    {Array.from(groupByPlatform(selectedInfluencer.proposal_items)).map(([platform, items]) => (
                      <div key={platform} className="bg-white/20 p-4">
                        {/* Platform Header */}
                        <div className="flex justify-between items-center mb-3">
                          <span className={`${getPlatformColorClasses(platform)} px-3 py-1.5 text-sm font-semibold`}>
                            {getPlatformLabel(platform)}
                          </span>
                          <div className="text-right">
                            <p className="text-white font-semibold">
                              ₩{items.reduce((sum, item) => sum + item.total_price, 0).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {items.map((item, idx) => (
                            <span key={idx} className={`${getCategoryColorClasses(platform)} px-2 py-1 text-xs font-medium`}>
                              {getCategoryLabel(item.category)}
                            </span>
                          ))}
                        </div>

                        {/* Item Details */}
                        <div className="space-y-2">
                          {items.map((item, idx) => (
                            <div  key={idx}>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-300">{getCategoryLabel(item.category)} ({item.count}개)</span>
                                <span className="text-gray-400">₩{item.unit_price.toLocaleString()}</span>
                              </div>
                              {item.memo && <div className="mt-3 border-b pb-2 border-gray-700">
                                <p className="text-gray-300 text-sm whitespace-pre-line">{item.memo}</p>
                              </div>}
                            </div>
                          ))}
                        </div>

                        {/* Memo if exists */}
                        {/* {items.some(item => item.memo) && (
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            {items.filter(item => item.memo).map((item, idx) => (
                              <p key={idx} className="text-gray-300 text-sm whitespace-pre-line">{item.memo}</p>
                            ))}
                          </div>
                        )} */}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Cards */}
                {proposalData.show_total_amount && (<div className="mb-6">
                  <div className="bg-white p-4 text-center">
                  <p className="text-sm text-gray-600">총 제안 가격</p>
                    <p className="text-2xl font-bold text-black mb-1">
                      ₩{selectedInfluencer.proposal_items.reduce((total, item) => total + item.total_price, 0).toLocaleString()}
                    </p>
                  </div>
                </div>)}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen py-8 flex items-center justify-center"
      >
      <div
        className="max-w-4xl mx-auto px-4 text-white bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
        }}
      >
        <div className="p-6">
          {/* Expired Banner */}
          {isExpired && (
            <div className="mb-6 bg-red-500/20 border border-red-500 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-red-300">제안서 만료</h3>
                  <p className="text-red-200">이 제안서는 만료되었습니다. ({new Date(proposalData.expire_at).toLocaleDateString('ko-KR')})</p>
                </div>
              </div>
            </div>
          )}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex flex-wrap gap-4 text-xl text-white">
              <span><strong>작성자 :</strong> {proposalData.author}</span>
              <span><strong>수신자 :</strong> {proposalData.receiver}</span>
              <span className={isExpired ? 'text-red-300' : ''}>
                <strong>만료일 :</strong> {new Date(proposalData.expire_at).toLocaleDateString('ko-KR')}
                {isExpired && <span className="ml-2 text-red-400 font-semibold">(만료됨)</span>}
              </span>
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
                    className="relative bg-linear-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="aspect-3/4 relative">
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
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm leading-tight truncate">{influencer.kr_name}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          {proposalData.show_total_amount && (<p className="text-xs font-semibold text-white">
                            ₩{influencer.proposal_items.reduce((total, item) => total + item.total_price, 0).toLocaleString()}
                          </p>)}
                          <div className="flex gap-1">
                            {influencer.proposal_items.length > 2 && (
                              <span className="bg-gray-500 text-white px-1 py-0.5 rounded text-xs">
                                +{influencer.proposal_items.length - 2}
                              </span>
                            )}
                          </div>
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

            {influencers.length > 0 && proposalData.show_total_amount && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">총 예상 비용:</span>
                  <span className="text-2xl font-bold text-white">
                    ₩{proposalData?.total_amount.toLocaleString() || influencers.reduce((total, inf) => total + inf.proposal_items.reduce((itemTotal, item) => itemTotal + item.total_price, 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
}
