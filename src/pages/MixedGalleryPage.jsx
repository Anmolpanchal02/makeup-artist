import React, { useRef, useState } from 'react';

const MixedGalleryPage = () => {
  // Data for mixed gallery items (images and videos)
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: "assets/image/1.jpg",
      
    },
    {
      id: 2,
      type: 'image',
      src: "assets/image/13.jpg",
      
    },
    
    {
      id: 3,
      type: 'image',
      src: "assets/image/2.jpg",
      
    },
    
   
    {
      id: 4,
      type: 'image',
      src: "assets/image/3.jpg",
      // alt: "मेकअप लुक 3"
    },
    {
      id: 5,
      type: 'image',
      src: "assets/image/16.jpg",
      // alt: "मेकअप लुक 3"
    },
    
    {
      id: 6,
      type: 'image',
      src: "assets/image/4.jpg",
      // alt: "मेकअप लुक 4"
    },
    {
      id: 7,
      type: 'image',
      src: "assets/image/14.jpg",
      // alt: "मेकअप लुक 5"
    },
    {
      id: 8,
      type: 'image',
      src: "assets/image/22.jpg",
      // alt: "मेकअप लुक 5"
    },
   
     {
      id: 9,
      type: 'image',
      src: "assets/image/19.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 10,
      type: 'image',
      src: "assets/image/18.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 11,
      type: 'image',
      src: "assets/image/8.jpg",
      // alt: "मेकअप लुक 2"
    },
   
    {
      id: 12,
      type: 'image',
      src: "assets/image/9.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 13,
      type: 'image',
      src: "assets/image/10.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 14,
      type: 'image',
      src: "assets/image/11.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 15,
      type: 'image',
      src: "assets/image/20.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 16,
      type: 'image',
      src: "assets/image/23.jpg",
      // alt: "मेकअप लुक 2"
    },
    {
      id: 17,
      type: 'image',
      src: "assets/image/21.jpg",
      
    },
     {
      id: 18,
      type: 'image',
      src: "assets/image/12.jpg",
      // alt: "मेकअप लुक 2"
    },
  ];

  const videoRefs = useRef({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle video play on mouse enter
  const handleMouseEnter = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(error => console.error("वीडियो प्ले विफल रहा:", error));
    }
  };

  // Handle video pause on mouse leave
  const handleMouseLeave = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x600/CCCCCC/333333?text=Error";
    e.target.alt = "सामग्री लोड करने में विफल";
    console.error("सामग्री लोड करने में विफल:", e.target.src);
  };

  // Open modal on item click
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    if (selectedItem && selectedItem.type === 'video' && videoRefs.current[`modal-video-${selectedItem.id}`]) {
      videoRefs.current[`modal-video-${selectedItem.id}`].pause();
      videoRefs.current[`modal-video-${selectedItem.id}`].currentTime = 0;
    }
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section id="mixedgallery" className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-pink-600 mb-1">Our Gallery</h2>
        <p className="text-lg text-gray-700 text-center mb-10 max-w-2xl mx-auto">
          (Explore some of the finest moments of our makeup artistry, featuring both photos and videos.)
        </p>

        {/* Custom CSS for hiding scrollbar */}
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
          `}
        </style>

        {/* First Row - Original horizontal scrolling (left to right) */}
        <div className="flex flex-nowrap overflow-x-auto space-x-6 pb-4 hide-scrollbar mb-8">
          {galleryItems.slice(0, 9).map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[240px] relative bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onMouseEnter={item.type === 'video' ? () => handleMouseEnter(item.id) : undefined}
              onMouseLeave={item.type === 'video' ? () => handleMouseLeave(item.id) : undefined}
              onClick={() => openModal(item)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-[360px] object-cover"
                  onError={handleImageError}
                />
              ) : (
                <>
                  {/* Video thumbnail/poster */}
                  <img
                    src={item.poster}
                    alt={item.alt + " थंबनेल"}
                    className="w-full h-[360px] object-cover transition-opacity duration-300 group-hover:opacity-0"
                    onError={handleImageError}
                  />
                  {/* Video element */}
                  <video
                    ref={(el) => (videoRefs.current[item.id] = el)}
                    src={item.src}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    preload="auto"
                  >
                    आपके ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।
                  </video>
                </>
              )}
              {/* Title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 text-white">
                <h3 className="text-xl font-bold">{item.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - Reverse horizontal scrolling (right to left) */}
        <div className="flex flex-nowrap overflow-x-auto space-x-6 pb-4 hide-scrollbar flex-row-reverse">
          {galleryItems.slice(10,18).map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[240px] relative bg-white rounded-2xl shadow-xl overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              onMouseEnter={item.type === 'video' ? () => handleMouseEnter(item.id) : undefined}
              onMouseLeave={item.type === 'video' ? () => handleMouseLeave(item.id) : undefined}
              onClick={() => openModal(item)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-[360px] object-cover"
                  onError={handleImageError}
                />
              ) : (
                <>
                  {/* Video thumbnail/poster */}
                  <img
                    src={item.poster}
                    alt={item.alt + " थंबनेल"}
                    className="w-full h-[360px] object-cover transition-opacity duration-300 group-hover:opacity-0"
                    onError={handleImageError}
                  />
                  {/* Video element */}
                  <video
                    ref={(el) => (videoRefs.current[item.id] = el)}
                    src={item.src}
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    preload="auto"
                  >
                    आपके ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।
                  </video>
                </>
              )}
              {/* Title overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4 text-white">
                <h3 className="text-xl font-bold">{item.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal/Overlay */}
        {isModalOpen && selectedItem && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div
              className="relative bg-white rounded-lg shadow-2xl p-4 sm:p-6 max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-800 text-2xl sm:text-3xl font-bold z-10 bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg"
                aria-label="मॉडल बंद करें"
              >
                &times;
              </button>
              
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  onError={handleImageError}
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[`modal-video-${selectedItem.id}`] = el)}
                  src={selectedItem.src}
                  controls
                  autoPlay
                  loop
                  muted={false}
                  playsInline
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  onError={handleImageError}
                >
                  आपके ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।
                </video>
              )}
              
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mt-4 text-center px-4">
                {selectedItem.alt}
              </h3>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default MixedGalleryPage;