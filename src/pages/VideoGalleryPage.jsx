import React, { useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoGalleryPage = () => {
  const videoItems = [
    {
      id: 1,
      imageUrl: "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600324/1_xm3syx.jpg",
      videoUrl: "https://res.cloudinary.com/duupzdrl1/video/upload/v1752601849/1_uhe4iw.mp4",
      title: "Engagement Look"
    },
    
    {
      id: 3,
      imageUrl: "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600349/13_fh0mlz.jpg",
      videoUrl: "https://res.cloudinary.com/duupzdrl1/video/upload/v1752601702/2_becdzp.mp4",
      title: "Groom Makeup Look"
    },
    {
      id: 2,
      imageUrl: "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600313/3_gd3gze.jpg",
      videoUrl: "https://res.cloudinary.com/duupzdrl1/video/upload/v1752601582/3_ylglg0.mp4",
      title: "Sangeet Look"
    },
    {
      id: 4,
      imageUrl: "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600359/19_irievv.jpg",
      videoUrl: "https://res.cloudinary.com/duupzdrl1/video/upload/v1752601695/4_nklpqj.mp4",
      title: "Groom Look"
    }, 
    
  ];

  // State to track which video is playing on mobile
  const [playingVideo, setPlayingVideo] = React.useState(null);
  const [isIntersecting, setIsIntersecting] = React.useState({});

  // Refs to control each video element
  const videoRefs = useRef({});
  const observerRef = useRef(null);

  // Check if device is mobile/touch
  const isMobile = typeof window !== 'undefined' && 'ontouchstart' in window;

  // Intersection Observer for mobile auto-play
  React.useEffect(() => {
    if (isMobile) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const videoId = parseInt(entry.target.dataset.videoId);
            if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
              setIsIntersecting(prev => ({...prev, [videoId]: true}));
              // Auto play when fully visible
              const video = videoRefs.current[videoId];
              if (video && playingVideo !== videoId) {
                // Pause any currently playing video
                if (playingVideo && videoRefs.current[playingVideo]) {
                  videoRefs.current[playingVideo].pause();
                  videoRefs.current[playingVideo].currentTime = 0;
                }
                video.play().catch(error => console.error("Video play failed:", error));
                setPlayingVideo(videoId);
              }
            } else {
              setIsIntersecting(prev => ({...prev, [videoId]: false}));
              // Pause when not visible
              const video = videoRefs.current[videoId];
              if (video && playingVideo === videoId) {
                video.pause();
                video.currentTime = 0;
                setPlayingVideo(null);
              }
            }
          });
        },
        { threshold: [0.7] }
      );

      // Observe all video containers
      const videoContainers = document.querySelectorAll('[data-video-id]');
      videoContainers.forEach(container => {
        observerRef.current.observe(container);
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile, playingVideo]);

  // Handle video play on mouse enter (desktop only)
  const handleMouseEnter = (id) => {
    if (!isMobile) {
      const video = videoRefs.current[id];
      if (video) {
        video.play().catch(error => console.error("Video play failed:", error));
      }
    }
  };

  // Handle video pause on mouse leave (desktop only)
  const handleMouseLeave = (id) => {
    if (!isMobile) {
      const video = videoRefs.current[id];
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset video to start
      }
    }
  };

  // Handle touch/click for mobile (manual control)
  const handleTouchStart = (id) => {
    if (isMobile) {
      const video = videoRefs.current[id];
      if (video) {
        if (playingVideo === id) {
          // If this video is playing, pause it
          video.pause();
          video.currentTime = 0;
          setPlayingVideo(null);
        } else {
          // Pause any currently playing video
          if (playingVideo && videoRefs.current[playingVideo]) {
            videoRefs.current[playingVideo].pause();
            videoRefs.current[playingVideo].currentTime = 0;
          }
          // Play the touched video
          video.play().catch(error => console.error("Video play failed:", error));
          setPlayingVideo(id);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <section id="videogallery" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-purple-700 mb-8 sm:mb-12 lg:mb-16">
          Our Video Gallery
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {videoItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300 ease-in-out hover:shadow-2xl"
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={() => handleMouseLeave(item.id)}
              onTouchStart={() => handleTouchStart(item.id)}
              onClick={() => handleTouchStart(item.id)}
            >
              {/* Thumbnail image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover transition-opacity duration-300 ${
                  isMobile 
                    ? (playingVideo === item.id ? 'opacity-0' : 'opacity-100')
                    : 'group-hover:opacity-0'
                }`}
              />
              
              {/* Video element */}
              <video
                ref={(el) => (videoRefs.current[item.id] = el)}
                src={item.videoUrl}
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover transition-opacity duration-300 ${
                  isMobile 
                    ? (playingVideo === item.id ? 'opacity-100' : 'opacity-0')
                    : 'opacity-0 group-hover:opacity-100'
                }`}
                preload="auto"
              >
                Your browser does not support the video tag.
              </video>

              {/* Title overlay */}
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6 text-white transition-opacity duration-300 ${
                isMobile 
                  ? (playingVideo === item.id ? 'opacity-0' : 'opacity-100')
                  : 'opacity-100 group-hover:opacity-0'
              }`}>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Play/Pause indicator for mobile */}
              {isMobile && (
                <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 backdrop-blur-sm">
                  {playingVideo === item.id ? (
                    <Pause size={20} className="text-white" />
                  ) : (
                    <Play size={20} className="text-white" />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional responsive info */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Hover over any video thumbnail to see a preview. Our gallery showcases the latest makeup transformations and beauty techniques.
          </p>
        </div>
      </section>
    </div>
  );
};

export default VideoGalleryPage;