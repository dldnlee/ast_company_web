import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import YouTubePlaylistGrid from "./YoutubePlaylistGrid";

interface TabProps {
  maxResults? : number;
}

// Sample React components for tab content
const Highlights: React.FC<TabProps> = ({maxResults}) => (
  <div className="space-y-4">
  <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLMyrXvS6JvAZH-qyY1PRivv55GW9ruPeQ"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={maxResults}
    />
  </div>
  </div>
);

const BrandFilms: React.FC<TabProps> = ({maxResults}) => (
  <div className="space-y-4">
  <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLMyrXvS6JvAa7xW-h0zlK2NPDcTGbbie0"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={maxResults}
    />
  </div>
  </div>
);

const BrandedFilms: React.FC<TabProps> = ({maxResults}) => (
    <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLMyrXvS6JvAbs053ReVy_hspIDrau85ub"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={maxResults}
    />
  </div>
);

const ShortForms: React.FC<TabProps> = ({maxResults}) => (
  <div className="space-y-4">
    <YouTubePlaylistGrid
    playlistId="PLMyrXvS6JvAZ_6RNhbn_Xa17u-GEnDF63"
    apiKey={process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!}
    maxResults={maxResults}
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
  maxResults?: number;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ 
  tabs: customTabs, 
  className = "",
  tabClassName = "",
  contentClassName = "",
  maxResults = 6
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  
  const defaultTabs: TabData[] = [
    { 
      label: "모두보기", 
      content: <Highlights maxResults={maxResults} /> 
    },
    { 
      label: "브랜디드/PPL콘텐츠", 
      content: <BrandedFilms maxResults={maxResults} /> 
    },
    { 
      label: "브랜드 필름", 
      content: <BrandFilms maxResults={maxResults} /> 
    },
    { 
      label: "숏폼", 
      content: <ShortForms maxResults={maxResults} /> 
    }
  ];

  const tabs = customTabs || defaultTabs;

  const handleTabClick = (index: number): void => {
    setActiveTab(index);
  };

  return (
    <div className={`w-full mx-auto p-4 md:p-6 ${className} flex flex-col items-center justify-center`}>
      <div
        className={`
          flex items-center justify-start sm:text-md text-sm
          overflow-x-auto whitespace-nowrap md:gap-3 mb-6 ${tabClassName}
        `}
        // Make sure justify-start so scroll works well (justify-center will center content and disable scroll)
      >
        {tabs.map((tab: TabData, index: number) => (
          <button
            key={index}
            className={`
              relative px-3 py-2 font-medium transition-colors
              inline-block min-w-[80px] flex-shrink-0
              ${activeTab === index
                ? 'text-purple-600 border-b-2 border-b-purple font-semibold'
                : 'text-gray-500 hover:text-gray-700'}
            `}
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
          className={`p-1 md:p-6 rounded-lg ${contentClassName}`}
        >
          {tabs[activeTab].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};