import { motion } from "motion/react"
import ContactModal from "../components/ContactModal"
import { useState, useEffect } from "react"
import { supabase } from "@/utils/supabase/client"
import Image from "next/image"


interface Channel {
    id: string
    channel_name: string
    channel_link: string | null
    description: string | null
    follower_count: string | null
    platform_type: string
    image_filename: string
    image_url: string
    storage_path: string
    file_size: number
    display_order: number
    is_active: boolean
    is_visible: boolean
    is_featured: boolean
    created_at: string
    updated_at: string
}

export function PartnerChannelSection() {
    const [channels, setChannels] = useState<Channel[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedChannel, setSelectedChannel] = useState<string>('')


    // Fetch channels from Supabase
    useEffect(() => {
    async function fetchChannels() {
        try {
        setLoading(true)
        
        const { data, error } = await supabase
            .from('partner_channels')
            .select('*')
            .eq('is_active', true)      // Only active channels
            .eq('is_visible', true)     // Only visible channels
            .order('display_order', { ascending: true })  // Ordered by display_order

        if (error) {
            console.error('Error fetching channels:', error)
            setError('채널을 불러오는 중 오류가 발생했습니다.')
            return
        }

        setChannels(data || [])
        } catch (err) {
        console.error('Unexpected error:', err)
        setError('예상치 못한 오류가 발생했습니다.')
        } finally {
        setLoading(false)
        }
    }

    fetchChannels()
    }, [])

    const handleChannelClick = (channel: Channel): void => {
    setSelectedChannel(channel.channel_name)
    setIsModalOpen(true)
    }

    const handleCloseModal = (): void => {
    setIsModalOpen(false)
    setSelectedChannel('')
    }

    // Loading state
    if (loading) {
    return (
        <section className="pb-20">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl mx-auto text-white p-6 rounded-lg overflow-hidden"
        >
            <div className="flex items-center justify-center mb-6">
            <h2 className="text-center text-4xl font-bold tracking-wider">PARTNER CHANNELS</h2>
            </div>
            <div className="flex items-center justify-center h-[350px] sm:h-[800px]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-gray-300">채널을 불러오는 중...</p>
            </div>
            </div>
        </motion.div>
        </section>
    )
    }

    // Error state
    if (error) {
    return (
        <section className="pb-20">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl mx-auto text-white p-6 rounded-lg overflow-hidden"
        >
            <div className="flex items-center justify-center mb-6">
            <h2 className="text-center text-4xl font-bold tracking-wider">PARTNER CHANNELS</h2>
            </div>
            <div className="flex items-center justify-center h-[350px] sm:h-[800px]">
            <div className="text-center">
                <p className="text-red-400 mb-4">{error}</p>
                <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                >
                새로고침
                </button>
            </div>
            </div>
        </motion.div>
        </section>
    )
    }

    // Empty state
    if (channels.length === 0) {
    return (
        <section className="pb-20">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="w-full max-w-6xl mx-auto text-white p-6 rounded-lg overflow-hidden"
        >
            <div className="flex items-center justify-center mb-6">
            <h2 className="text-center text-4xl font-bold tracking-wider">PARTNER CHANNELS</h2>
            </div>
            <div className="flex items-center justify-center h-[350px] sm:h-[800px]">
            <p className="text-gray-300 text-center">등록된 파트너 채널이 없습니다.</p>
            </div>
        </motion.div>
        </section>
    )
    }

    // Main render with data
    return (
    <section className="pb-20">
        <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-6xl mx-auto text-white p-6 rounded-lg overflow-hidden"
        >
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
            <h2 className="text-center text-4xl font-bold tracking-wider">PARTNER CHANNELS</h2>
        </div>

        {/* Scrollable container */}
        <div
            className="overflow-y-auto scrollbar-hidden rounded-lg h-[450px] sm:h-[800px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
            <div className="flex flex-col gap-4">
            {channels.map((channel, index) => (
                <motion.div
                key={channel.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex-shrink-0 relative hover:scale-105 cursor-pointer transition-transform duration-300"
                onClick={() => handleChannelClick(channel)}
                >
                <Image
                    width={1000}
                    height={200}
                    quality={95}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/partner-channels/banners/${channel.storage_path}`}
                    alt={channel.channel_name}
                    className="w-full rounded-xl"
                    loading="lazy"
                />
                
                {/* Optional: Channel name overlay */}
                <div className="hidden md:absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl">
                    <h3 className="text-white font-semibold text-lg">{channel.channel_name}</h3>
                    {channel.follower_count && (
                    <p className="text-gray-300 text-sm">{channel.follower_count} 팔로워</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                        {channel.platform_type}
                    </span>
                    {channel.is_featured && (
                        <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">
                        추천
                        </span>
                    )}
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>
        </motion.div>
        
        <ContactModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        influencerId={selectedChannel}
        />
    </section>
    )
}