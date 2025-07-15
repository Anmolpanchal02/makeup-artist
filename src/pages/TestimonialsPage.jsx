import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Slider navigation arrows

const TestimonialsPage = ({ id }) => { // Receiving id prop
  const testimonials = [
    {
      quote: "Sunita made me feel absolutely stunning on my wedding day! Her attention to detail and calm demeanor were a blessing.",
      author: "Anjali R.",
      rating: 5,
      avatar: "https://placehold.co/100x100/E0F2F7/2196F3?text=AR"
    },
    {
      quote: "I've never felt more confident! Sunita understood exactly what I wanted for my photoshoot and delivered beyond expectations.",
      author: "Priya S.",
      rating: 5,
      avatar: "https://placehold.co/100x100/F3E5F5/9C27B0?text=PS"
    },
    {
      quote: "The makeup lesson was incredibly helpful. Sunita is a fantastic teacher and now I can recreate my favorite looks myself!",
      author: "Neha M.",
      rating: 4,
      avatar: "https://placehold.co/100x100/FFF3E0/FF9800?text=NM"
    },
    {
      quote: "Sunita Sharma's work for my engagement was amazing. Everyone was complimenting my makeup. Thank you so much!",
      author: "Deepti K.",
      rating: 5,
      avatar: "https://placehold.co/100x100/E6EE9C/689F38?text=DK"
    },
    {
      quote: "The look Sunita gave me for my bridal photoshoot was absolutely perfect. She paid great attention to my skin tone and outfit.",
      author: "Pooja V.",
      rating: 5,
      avatar: "https://placehold.co/100x100/BBDEFB/1976D2?text=PV"
    },
    {
      quote: "I learned party makeup from Sunita and now I feel much better preparing myself. Her teaching method is very simple and effective.",
      author: "Reena G.",
      rating: 4,
      avatar: "https://placehold.co/100x100/FFE0B2/EF6C00?text=RG"
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0); // State to track current testimonial slide

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % testimonials.length
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [testimonials.length]); // Re-run if number of testimonials changes

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % testimonials.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section id={id} className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">What Our Clients Say</h2>
      
      {/* Outer container for the slider. Removed padding here. */}
      <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl shadow-xl bg-white">
        {/* Testimonial Slider Content */}
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              // Padding applied directly to each testimonial item
              className="flex-shrink-0 w-full flex flex-col items-center text-center p-8 md:p-12" 
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-28 h-28 rounded-full object-cover mb-6 shadow-md border-4 border-purple-200" // Slightly larger avatar
              />
              <p className="text-xl italic text-gray-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex text-yellow-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < testimonial.rating ? 'fill-current' : 'fill-gray-300'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
                  </svg>
                ))}
              </div>
              <p className="font-semibold text-xl text-pink-600">- {testimonial.author}</p>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-purple-500 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all duration-300 focus:outline-none z-10 shadow-md"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-purple-500 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all duration-300 focus:outline-none z-10 shadow-md"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-purple-700' : 'bg-gray-400'
              } transition-colors duration-300`}
              aria-label={`Go to testimonial ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;
