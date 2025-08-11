import { channelNames } from "@/data/channelNames";
import { motion } from "motion/react";

const PartnerChannelCarousel = () => {
  // Remove currentIndex and nextSlide/prevSlide logic if you want pure scroll
  // Or keep them to programmatically scroll on button clicks

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full max-w-6xl mx-auto text-white p-6 rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-bold tracking-wider">PARTNER CHANNELS</h2>
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
              className="flex-shrink-0 relative"
              // Optional: add hover scale here if you want
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
  );
};

export default PartnerChannelCarousel