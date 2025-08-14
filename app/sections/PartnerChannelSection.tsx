import { channelNames } from "@/data/channelNames"
import { motion } from "motion/react"
import ContactModal from "../components/ContactModal"
import { useState } from "react";

interface Influencer {
    channelName: string;
    src: string;
    channelLink: string;
}

export function PartnerChannelSection(){
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedInfluencer, setSelectedInfluencer] = useState<string>('');
    
    const handleChannelClick = (item: Influencer): void => {
        setSelectedInfluencer(`${item.channelName}`);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = (): void => {
        setIsModalOpen(false);
        setSelectedInfluencer('');
    };


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
                {/* You can remove these buttons if not needed */}
            </div>

            {/* Scrollable container */}
            <div
                className="overflow-y-auto scrollbar-hidden rounded-lg h-[350px] sm:h-[800px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
                // Optional: add onMouseEnter/onMouseLeave handlers if you want autoplay logic later
            >
                <div className="flex flex-col gap-4">
                {channelNames.map((channel, index) => (
                    <div
                    key={index}
                    className="flex-shrink-0 relative hover:scale-105"
                    onClick={()=> handleChannelClick(channel)}
                    >
                    <img
                        src={`partner_channels/${channel.src}`}
                        alt={channel.src}
                        className="w-full rounded-xl"
                    />
                    </div>
                ))}
                </div>
            </div>
            </motion.div>
            <ContactModal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                influencerId={selectedInfluencer}
            />
        </section>
    )
}