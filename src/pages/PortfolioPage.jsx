import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Horizontal arrows for navigation

const PortfolioPage = () => {
  // IMPORTANT: Make sure your image files are located in the 'public/assets/image/' directory
  // and their filenames exactly match what's listed here.
  const originalImages = [
    "../assets/image/12.jpg",
    
    "assets/image/2.jpg",
    "public/assets/image/3.jpg",
    "public/assets/image/4.jpg",
    "public/assets/image/13.jpg",
    "public/assets/image/5.jpg",
    "public/assets/image/1.jpg",
    "public/assets/image/6.jpg",
    "public/assets/image/7.jpg",
    "public/assets/image/8.jpg",
    "public/assets/image/19.jpg",
    "public/assets/image/9.jpg",
    "public/assets/image/10.jpg",
    "public/assets/image/11.jpg",
  ];

  // Number of images to clone at the beginning and end for seamless looping
  const numClones = 2;

  // Create the extended image array for seamless looping
  // [last N clones] + [original images] + [first N clones]
  const images = [
    ...originalImages.slice(originalImages.length - numClones),
    ...originalImages,
    ...originalImages.slice(0, numClones),
  ];

  // currentSlideIndex tracks the index within the 'images' (cloned) array
  const [currentSlideIndex, setCurrentSlideIndex] = useState(numClones); // Start at the first 'real' image
  // isTransitioning helps to instantly jump back/forth when looping
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef(null); // Ref for the outer slider container

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => prevIndex + 1);
    }, 1000); // हर 4 सेकंड में इमेज बदलें (Change image every 4 seconds)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  // Handle seamless looping logic after slide change
  useEffect(() => {
    if (currentSlideIndex === images.length - numClones) { // If we've slid to the first cloned original image
      // Instantly jump back to the actual first original image (at index numClones)
      setIsTransitioning(false); // Disable transition
      setTimeout(() => {
        setCurrentSlideIndex(numClones);
        setIsTransitioning(true); // Re-enable transition after jump
      }, 50); // Small delay to allow browser to register transition disable
    } else if (currentSlideIndex === numClones - 1) { // If we've slid to the last cloned original image
      // Instantly jump forward to the actual last original image
      setIsTransitioning(false); // Disable transition
      setTimeout(() => {
        setCurrentSlideIndex(images.length - numClones - 1);
        setIsTransitioning(true); // Re-enable transition after jump
      }, 50); // Small delay
    }
  }, [currentSlideIndex, images.length, numClones]);

  const nextImage = () => {
    if (!isTransitioning) return; // Prevent rapid clicks during transition reset
    setCurrentSlideIndex((prevIndex) => prevIndex + 1);
  };

  const prevImage = () => {
    if (!isTransitioning) return; // Prevent rapid clicks during transition reset
    setCurrentSlideIndex((prevIndex) => prevIndex - 1);
  };

  // Calculate the translateX value to center the current image in a multi-image view
  const getTransformX = () => {
    if (!carouselRef.current) return '0px';

    const imageWidth = 300; // Fixed width for each image (from w-[300px])
    const marginX = 16; // Half of mx-4 (32px total), so 16px on each side of the image
    const itemFullWidth = imageWidth + (marginX * 2); // Total space an item takes (300 + 32 = 332px)

    const containerWidth = carouselRef.current.offsetWidth; // Get actual width of the visible container

    // Calculate the offset needed to center the currentSlideIndex image
    // This moves the entire flex track
    const offset = (containerWidth / 2) - (currentSlideIndex * itemFullWidth + (itemFullWidth / 2));
    return `${offset}px`;
  };

  // Function to handle image loading errors
  const handleImageError = (e) => {
    // Replace the broken image with a placeholder and log to console for debugging
    e.target.public = "https://placehold.co/400x600/CCCCCC/333333?text=Image+Not+Found";
    e.target.alt = "Image failed to load";
    console.error("Image failed to load from path:", e.target.public);
    console.error("Please ensure the image is in public/assets/image/ and the filename is correct.");
  };

  return (
    <section id="portfolio" className="container mx-auto px-6 ">
      {/* <h2 className="text-4xl font-bold text-center text-pink-600 mb-12">Our Portfolio</h2> */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        {/* Outer slider container: Increased max-w to show multiple images */}
        {/* Fixed height (h-[550px]) to ensure consistent vertical space for images */}
        <div ref={carouselRef} className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-2xl shadow-lg h-[550px] flex items-center">
          {/* Inner container for images: uses flex and translateX for sliding */}
          {/* `py-4` for vertical padding, `flex-nowrap` to prevent wrapping */}
          <div
            className={`flex flex-nowrap py-4 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{
              transform: `translateX(${getTransformX()})`,
              // Set the total width of the inner track to accommodate all images
              width: `${images.length * (300 + 32)}px` // (imageWidth + total margin-x) * number of images
            }}
          >
            {images.map((image, index) => {
              // Determine if the image is current, adjacent, or further away for blur/scale effects
              // Calculate effective distance for circular array to handle cloning correctly
              const effectiveDistance = Math.min(
                Math.abs(index - currentSlideIndex),
                images.length - Math.abs(index - currentSlideIndex)
              );

              let blurClass = '';
              let scaleClass = '';

              if (index === currentSlideIndex) {
                blurClass = 'filter-none';
                scaleClass = 'scale-105'; // Main image slightly larger
              } else if (effectiveDistance === 1) { // Directly adjacent
                blurClass = 'filter blur-sm'; // Adjacent images slightly blurred
                scaleClass = 'scale-95'; // Adjacent images slightly smaller
              } else {
                blurClass = 'filter blur-md'; // Images further away are more blurred
                scaleClass = 'scale-85'; // Images further away are smaller
              }

              return (
                <img
                  key={index}
                  public={image}
                  alt={`Portfolio Image ${index + 1}`}
                  // Fixed width and height for vertical images
                  // `mx-4` for horizontal margin (total 32px gap between images)
                  // `flex-shrink-0` ensures images don't shrink
                  className={`flex-shrink-0 w-[300px] h-[500px] object-cover rounded-2xl mx-4
                              ${blurClass} ${scaleClass}`} // Transition handled by parent div
                  onError={handleImageError} // Add error handler here
                />
              );
            })}
          </div>

          {/* Horizontal navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} /> {/* Left arrow */}
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-300 focus:outline-none z-10"
            aria-label="Next image"
          >
            <ChevronRight size={24} /> {/* Right arrow */}
          </button>
          {/* Horizontal pagination dots (now based on original images length) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
            {originalImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlideIndex(numClones + index)} // Click leads to the real image index
                className={`w-3 h-3 rounded-full ${index === (currentSlideIndex - numClones + originalImages.length) % originalImages.length ? 'bg-white' : 'bg-gray-400'} transition-colors duration-300`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioPage;
