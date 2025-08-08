import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import YouTubePlaylistGrid from "./YoutubePlaylistGrid";

// Sample React components for tab content
const Highlights: React.FC = () => (
  <div className="space-y-4">
  <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLvjagzFLlq9FZavd7KqLFRxZqeZK0h4O-"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={6}
    />
  </div>
  </div>
);

const BrandFilms: React.FC = () => (
  <div className="space-y-4">
  <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLvjagzFLlq9FZavd7KqLFRxZqeZK0h4O-"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={6}
    />
  </div>
  </div>
);

const BrandedFilms: React.FC = () => (
    <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLvjagzFLlq9FZavd7KqLFRxZqeZK0h4O-"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={6}
    />
  </div>
);

const ShortForms: React.FC = () => (
  <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLvjagzFLlq9FZavd7KqLFRxZqeZK0h4O-"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={6}
    />
  </div>
);


interface TabData {
  label: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps {
  tabs?: TabData[];
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ 
  tabs: customTabs, 
  className = "",
  tabClassName = "",
  contentClassName = ""
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const defaultTabs: TabData[] = [
    { 
      label: "모두보기", 
      content: <Highlights /> 
    },
    { 
      label: "브랜드 필름", 
      content: <BrandFilms /> 
    },
    { 
      label: "브랜디드/PPL콘텐츠", 
      content: <BrandedFilms /> 
    },
    { 
      label: "숏폼", 
      content: <ShortForms /> 
    }
  ];

  const tabs = customTabs || defaultTabs;

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  return (
    <div className={`w-full  mx-auto p-6 ${className}`}>
      <div className={`flex items-center justify-center text-xs overflow-x-auto gap-3 mb-6 ${tabClassName}`}>
        {tabs.map((tab: TabData, index: number) => (
          <button
            key={index}
            className={`relative px-4 py-2 font-medium transition-colors border md:border-2 rounded-full ${
              activeTab === index ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`p-6 rounded-lg ${contentClassName}`}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};