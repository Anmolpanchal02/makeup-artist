import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Horizontal arrows for navigation

const PortfolioPage = ({ id }) => {
  // IMPORTANT: Make sure your image files are accessible via these URLs.
  const originalImages = [
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600350/7_zysdjj.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600352/12_s2mlv1.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600358/9_lnbehe.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600359/16_lturko.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600361/21_qe5uj4.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600363/17_yr4oob.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752601204/WhatsApp_Image_2025-07-15_at_22.59.01_46975b44_a7xmg1.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600360/20_kofdqn.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600354/18_ljm7b9.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600353/10_mtsuxx.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600350/4_dlx94a.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600349/13_fh0mlz.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600313/3_gd3gze.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600324/1_xm3syx.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600359/19_irievv.jpg",
    "https://res.cloudinary.com/duupzdrl1/image/upload/v1752600358/14_gv3yil.jpg",
  ];

  const numClones = 2;
  const images = [
    ...originalImages.slice(originalImages.length - numClones),
    ...originalImages,
    ...originalImages.slice(0, numClones),
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(numClones);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null);

  // State to force re-render on resize for accurate transform calculation
  const [containerWidth, setContainerWidth] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => prevIndex + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Handle seamless looping logic after slide change
  useEffect(() => {
    if (currentSlideIndex === images.length - numClones) {
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentSlideIndex(numClones);
        setIsTransitioning(true);
      }, 50);
    } else if (currentSlideIndex === numClones - 1) {
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentSlideIndex(images.length - numClones - 1);
        setIsTransitioning(true);
      }, 50);
    }
  }, [currentSlideIndex, images.length, numClones]);

  // Update container width on mount and resize
  useEffect(() => {
    const updateContainerWidth = () => {
      if (carouselRef.current) {
        setContainerWidth(carouselRef.current.offsetWidth);
      }
    };

    updateContainerWidth(); // Initial set
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []); // Empty dependency array means this runs once on mount

  const nextImage = () => {
    if (!isTransitioning) return;
    setCurrentSlideIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    if (!isTransitioning) return;
    setCurrentSlideIndex((prevIndex) => prevIndex - 1);
  };

  // Calculate the translateX value to center the current image in a multi-image view
  const getTransformX = () => {
    if (!carouselRef.current || containerWidth === 0) return '0px';

    // Get the actual rendered width of the first image element
    // Assuming all images within the flex container will have the same responsive width
    const firstImageElement = carouselRef.current.querySelector('img');
    if (!firstImageElement) return '0px';

    const imageWidth = firstImageElement.offsetWidth; // Get actual rendered width of one image
    const marginX = 16; // Half of mx-4 (32px total horizontal margin)
    const itemFullWidth = imageWidth + (marginX * 2); // Total space an item takes

    // Calculate the offset needed to center the currentSlideIndex image
    const offset = (containerWidth / 2) - (currentSlideIndex * itemFullWidth + (itemFullWidth / 2));
    return `${offset}px`;
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/400x600/CCCCCC/333333?text=Image+Not+Found";
    e.target.alt = "Image failed to load";
    console.error("Image failed to load from path:", e.target.src);
    console.error("Please ensure the image URL is correct and accessible (e.g., Cloudinary link).");
  };

  return (
    <section id={id} className="container w-full mx-auto">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-6">Our Portfolio</h2>
      <div className="bg-pink-100/15 mb-3 px-4 md:p-12">
        <div ref={carouselRef} className="relative  w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg h-[400px] md:h-[500px] flex items-center">
          <div
            className={`flex flex-nowrap py-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{
              transform: `translateX(${getTransformX()})`,
              // Set a very large width to ensure all images fit in a single row
              width: `${images.length * (300 + 32) * 2}px` // Multiplied by 2 to be safe, actual width calculated by flex items
            }}
          >
            {images.map((image, index) => {
              const effectiveDistance = Math.min(
                Math.abs(index - currentSlideIndex),
                images.length - Math.abs(index - currentSlideIndex)
              );

              let blurClass = '';
              let scaleClass = '';

              if (index === currentSlideIndex) {
                blurClass = 'filter-none';
                scaleClass = 'scale-105';
              } else if (effectiveDistance === 1) {
                blurClass = 'filter blur-sm';
                scaleClass = 'scale-95';
              } else {
                blurClass = 'filter blur-md';
                scaleClass = 'scale-85';
              }

              return (
                <img
                  key={index}
                  src={image}
                  alt={`Portfolio Image ${index + 1}`}
                  // Responsive width and height for images
                  // Mobile: w-[200px] h-[300px]
                  // Small screens: sm:w-[250px] sm:h-[350px]
                  // Medium/Large screens: md:w-[300px] md:h-[400px]
                  className={`flex-shrink-0 w-[200px] h-[300px] sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[400px] object-cover rounded-2xl mx-4
                                ${blurClass} ${scaleClass} transition-all duration-300 ease-in-out`} // Added transition for blur/scale
                  onError={handleImageError}
                />
              );
            })}
          </div>

          {/* Horizontal navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2  bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2  bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
          {/* Horizontal pagination dots */}
          {/* <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {originalImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(numClones + index)}
                className={`w-3 h-3 rounded-full ${index === (currentSlideIndex - numClones + originalImages.length) % originalImages.length ? 'bg-white' : 'bg-gray-400'} transition-colors duration-300`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
