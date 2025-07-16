import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react'; // Slider navigation arrows, Star for rating, X for modal close
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'; // Firestore imports

const TestimonialsPage = ({ id, db, appId }) => { // Receiving db and appId props
  const [testimonials, setTestimonials] = useState([]); // State to store fetched testimonials
  const [currentSlide, setCurrentSlide] = useState(0); // State to track current testimonial slide
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false); // State to control review modal visibility
  const [newReview, setNewReview] = useState({ name: '', quote: '', rating: 0 }); // State for new review form data
  const [formError, setFormError] = useState(''); // State for form validation errors
  const modalRef = useRef(null); // Ref for the modal for click outside to close

  // Auto-play functionality for the slider
  useEffect(() => {
    if (testimonials.length === 0) return; // Don't auto-play if no testimonials

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        (prevSlide + 1) % testimonials.length
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [testimonials.length]); // Re-run if number of testimonials changes

  // Firestore: Fetch testimonials in real-time
  useEffect(() => {
    if (!db || !appId) { // Check for db and appId
      console.log("Firestore or App ID not ready. Skipping testimonial fetch.");
      return;
    }

    // Define the collection path for public testimonials
    // Using the appId passed from App.jsx (which is FIREBASE_CONFIG.projectId)
    const testimonialsCollectionRef = collection(db, `artifacts/${appId}/public/data/testimonials`);
    
    // Create a query to order testimonials by timestamp (newest first)
    const q = query(testimonialsCollectionRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTestimonials = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTestimonials(fetchedTestimonials);
      // Reset slide to 0 if testimonials change
      setCurrentSlide(0); 
      console.log("Testimonials fetched:", fetchedTestimonials);
    }, (error) => {
      console.error("Error fetching testimonials:", error);
    });

    // Unsubscribe from real-time updates when component unmounts
    return () => unsubscribe();
  }, [db, appId]); // Re-run when db or appId changes

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prevState => ({ ...prevState, [name]: value }));
    setFormError(''); // Clear error on input change
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setNewReview(prevState => ({ ...prevState, rating }));
    setFormError(''); // Clear error on input change
  };

  // Submit new review to Firestore (no userId needed)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setFormError(''); // Clear previous errors

    if (!newReview.name.trim() || !newReview.quote.trim() || newReview.rating === 0) {
      setFormError('Please fill in all fields and provide a rating.');
      return;
    }

    if (!db || !appId) { // Check for db and appId
      setFormError('Database or App ID not ready. Please try again.');
      console.error("Firestore or App ID not available for submission.");
      return;
    }

    try {
      const testimonialsCollectionRef = collection(db, `artifacts/${appId}/public/data/testimonials`);

      await addDoc(testimonialsCollectionRef, {
        name: newReview.name.trim(),
        quote: newReview.quote.trim(),
        rating: newReview.rating,
        timestamp: serverTimestamp(), // Use serverTimestamp for consistent time
      });

      setNewReview({ name: '', quote: '', rating: 0 }); // Clear form
      setIsReviewModalOpen(false); // Close modal
      console.log("Review submitted successfully!");
    } catch (error) {
      setFormError('Failed to submit review. Please try again.');
      console.error("Error submitting review:", error);
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsReviewModalOpen(false);
        setFormError(''); // Clear error when closing modal
        setNewReview({ name: '', quote: '', rating: 0 }); // Reset form
      }
    };
    if (isReviewModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isReviewModalOpen]);

  return (
    <section id={id} className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-purple-700 mb-12">What Our Clients Say</h2>
      
      {testimonials.length > 0 ? (
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl shadow-xl bg-white">
          {/* Testimonial Slider Content */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index} 
                className="flex-shrink-0 w-full flex flex-col items-center text-center p-8 md:p-12" 
              >
                <img
                  src={testimonial.avatar || `https://placehold.co/100x100/E0F2F7/2196F3?text=${testimonial.name ? testimonial.name.charAt(0).toUpperCase() : '?'}`}
                  alt={testimonial.author || testimonial.name}
                  className="w-28 h-28 rounded-full object-cover mb-6 shadow-md border-4 border-purple-200" 
                />
                <p className="text-xl italic text-gray-700 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < testimonial.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="font-semibold text-xl text-pink-600">- {testimonial.author || testimonial.name}</p>
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
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">No testimonials yet. Be the first to leave a review!</p>
      )}

      {/* Give Review Button */}
      <div className="text-center mt-12">
        <button 
          onClick={() => setIsReviewModalOpen(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          Give a Review
        </button>
      </div>

      {/* Review Submission Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div ref={modalRef} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
            <button 
              onClick={() => { setIsReviewModalOpen(false); setFormError(''); setNewReview({ name: '', quote: '', rating: 0 }); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl focus:outline-none"
              aria-label="Close review form"
            >
              <X size={24} />
            </button>
            <h3 className="text-3xl font-bold text-center text-purple-700 mb-8">Submit Your Review</h3>
            
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-lg font-medium mb-2">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={newReview.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="quote" className="block text-gray-700 text-lg font-medium mb-2">Your Review</label>
                <textarea 
                  id="quote" 
                  name="quote"
                  value={newReview.quote}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-200 resize-y"
                  placeholder="Share your experience with Sunita Sharma..."
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">Rating</label>
                <div className="flex space-x-1 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={32}
                      className={`cursor-pointer transition-colors duration-200 ${
                        i < newReview.rating ? 'fill-current text-yellow-500' : 'text-gray-300'
                      } hover:text-yellow-400`}
                      onClick={() => handleRatingChange(i + 1)}
                    />
                  ))}
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom Keyframes for modal animation */}
      <style>
        {`
        @keyframes fadeInScaleUp {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInScaleUp 0.3s ease-out forwards;
        }
        `}
      </style>
    </section>
  );
};

export default TestimonialsPage;
