import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string; // Now the actual video publish date
  addedToPlaylistAt: string; // When added to playlist
  thumbnails: {
    default: string;
    medium: string;
    high: string;
    maxres?: string;
  };
  duration?: string;
  viewCount?: string;
}

interface PlaylistGridProps {
  playlistId: string;
  apiKey: string;
  maxResults?: number;
  className?: string;
  autoPlay?: boolean;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
}

// YouTube API Response Types
interface YouTubePlaylistResponse {
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface YouTubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string; // When added to playlist
    resourceId: {
      videoId: string;
    };
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
      maxres?: { url: string };
    };
  };
}

interface YouTubeVideoDetailsResponse {
  items: Array<{
    id: string;
    snippet: {
      publishedAt: string; // Actual video publish date
    };
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
    };
  }>;
}

// Custom hook for fetching playlist data
const useYouTubePlaylist = (playlistId: string, apiKey: string, maxResults: number = 50) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Parse YouTube duration (PT4M13S -> 4:13)
  const parseDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1]?.replace('H', '') || '0');
    const minutes = parseInt(match[2]?.replace('M', '') || '0');
    const seconds = parseInt(match[3]?.replace('S', '') || '0');
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format view count (1234567 -> 1.2M)
  const formatViewCount = (count: string): string => {
    const num = parseInt(count);
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      if (!playlistId || !apiKey) {
        setError('Playlist ID and API key are required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch playlist items
        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?` + 
          `part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`;
        
        const playlistResponse = await fetch(playlistUrl);
        if (!playlistResponse.ok) {
          throw new Error(`Failed to fetch playlist: ${playlistResponse.status}`);
        }
        
        const playlistData: YouTubePlaylistResponse = await playlistResponse.json();
        
        if (!playlistData.items?.length) {
          setError('No videos found in playlist');
          setLoading(false);
          return;
        }

        // Get video IDs for additional details
        const videoIds = playlistData.items
          .map(item => item.snippet.resourceId.videoId)
          .filter(Boolean)
          .join(',');

        // Fetch video details (duration, view count, AND actual publish date)
        const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?` +
          `part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
        
        const videoDetailsResponse = await fetch(videoDetailsUrl);
        const videoDetailsData: YouTubeVideoDetailsResponse = videoDetailsResponse.ok 
          ? await videoDetailsResponse.json() 
          : { items: [] };

        // Combine playlist and video details
        const videosWithDetails: YouTubeVideo[] = playlistData.items.map((item, index) => {
          const videoDetails = videoDetailsData.items?.find(
            detail => detail.id === item.snippet.resourceId.videoId
          );

          return {
            id: item.id,
            videoId: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle,
            // Use actual video publish date from video details, fallback to playlist date
            publishedAt: videoDetails?.snippet?.publishedAt || item.snippet.publishedAt,
            // Keep the playlist addition date as separate field
            addedToPlaylistAt: item.snippet.publishedAt,
            thumbnails: {
              default: item.snippet.thumbnails.default?.url || '',
              medium: item.snippet.thumbnails.medium?.url || '',
              high: item.snippet.thumbnails.high?.url || '',
              maxres: item.snippet.thumbnails.maxres?.url
            },
            duration: videoDetails?.contentDetails?.duration 
              ? parseDuration(videoDetails.contentDetails.duration)
              : undefined,
            viewCount: videoDetails?.statistics?.viewCount 
              ? formatViewCount(videoDetails.statistics.viewCount)
              : undefined
          };
        });

        setVideos(videosWithDetails);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch playlist';
        setError(errorMessage);
        console.error('YouTube API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistVideos();
  }, [playlistId, apiKey, maxResults]);

  return { videos, loading, error};
};

const PlaylistVideoCard: React.FC<{ 
  video: YouTubeVideo; 
  index: number; 
  autoPlay?: boolean;
}> = ({ video, index, autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (): void => {
    setIsPlaying(true);
  };

  const getEmbedUrl = (): string => {
    const params = new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      showinfo: '0',
      fs: '1',
      cc_load_policy: '1',
      iv_load_policy: '3',
      autohide: '1',
      ...(autoPlay && { autoplay: '1' })
    });
    
    return `https://www.youtube.com/embed/${video.videoId}?${params.toString()}`;
  };

  const bestThumbnail = video.thumbnails.maxres || 
                      video.thumbnails.high || 
                      video.thumbnails.medium || 
                      video.thumbnails.default;

  return (
    <motion.div
      className="group relative bg-white text-black rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Video Container */}
      <div className="relative aspect-video overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.iframe
              key="video"
              src={getEmbedUrl()}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              key="thumbnail"
              className="relative w-full h-full group cursor-pointer"
              onClick={handlePlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={bestThumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Info */}
      <div className="p-2 sm:p-3 lg:p-4">
        <h3 className="text-black font-semibold text-sm sm:text-base lg:text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
          <span className="truncate mr-2">
            {new Date(video.publishedAt).toLocaleDateString()}
          </span>
          
          {video.viewCount && (
            <span className="shrink-0">{video.viewCount} views</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const YouTubePlaylistGrid: React.FC<PlaylistGridProps> = ({
  playlistId,
  apiKey,
  maxResults = 50,
  className = "",
  autoPlay = false,
  onError,
  onLoading
}) => {
  const { videos, loading, error } = useYouTubePlaylist(playlistId, apiKey, maxResults);

  // Notify parent components of loading/error states
  useEffect(() => {
    if (onLoading) onLoading(loading);
  }, [loading, onLoading]);

  useEffect(() => {
    if (onError && error) onError(error);
  }, [error, onError]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className={`p-4 sm:p-6 lg:p-8 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-sm sm:text-lg">영상 불러오는중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 sm:p-6 lg:p-8 flex items-center justify-center ${className}`}>
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">Error Loading Playlist</h2>
          <p className="text-gray-300 text-sm sm:text-base">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`w-full px-2 sm:px-4 lg:px-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Responsive Grid Container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid 
          grid-cols-2
          xs:grid-cols-2
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-3 
          xl:grid-cols-3 
          2xl:grid-cols-3
          gap-3 
          sm:gap-4 
          md:gap-5 
          lg:gap-6
        ">
          {videos.map((video, index) => (
            <PlaylistVideoCard
              key={video.id}
              video={video}
              index={index}
              autoPlay={autoPlay}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default YouTubePlaylistGrid;
// export { PlaylistVideoCard, useYouTubePlaylist };