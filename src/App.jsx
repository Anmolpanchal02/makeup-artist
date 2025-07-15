import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import TestimonialsPage from './pages/TestimonialsPage';
import VideoGalleryPage from './pages/VideoGalleryPage';
import MixedGalleryPage from './pages/MixedGalleryPage';
// import { MessageCircle } from 'lucide-react'; // अब इसकी ज़रूरत नहीं है

import { FaWhatsapp } from 'react-icons/fa'; // FaWhatsapp आइकॉन इम्पोर्ट करें Font Awesome से

const App = () => {
  const [currentPage, setCurrentPage] = useState('portfolio'); 

  // आपका WhatsApp नंबर यहाँ डालें (कंट्री कोड के साथ)
  const whatsappNumber = "918209282607"; // IMPORTANT: इसे अपने असली नंबर से बदलें

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    setTimeout(() => {
      const element = document.getElementById(pageId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  useEffect(() => {
    const sections = ['portfolio', 'about', 'videogallery', 'mixedgallery', 'services', 'testimonials'];
    
    const observerOptions = {
      root: null, 
      rootMargin: '-50% 0px -50% 0px', 
      threshold: 0 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setCurrentPage(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      if (observer) {
        sections.forEach(id => {
          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 font-inter text-gray-800">
      <Header currentPage={currentPage} navigate={handleNavigate} />

      <main className="pt-24 pb-8">
        <PortfolioPage id="portfolio" />
        <AboutPage id="about" />
        <VideoGalleryPage id="videogallery" />
        <MixedGalleryPage id="mixedgallery" />
        <ServicesPage id="services" />
        <TestimonialsPage id="testimonials" />
      </main>

      <Footer />

      {/* WhatsApp Floating Icon - अब FaWhatsapp का उपयोग करके */}
      <a 
        href={`https://wa.me/${whatsappNumber}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 
                   bg-green-500 hover:bg-green-600 text-white 
                   w-14 h-14 rounded-full shadow-xl 
                   flex items-center justify-center 
                   transition-all duration-300 transform 
                   hover:scale-110 active:scale-95 
                   z-50 
                   group 
                   focus:outline-none focus:ring-4 focus:ring-green-300 
                   animate-pulse-slow" 
        aria-label="WhatsApp Chat"
      >
        {/* CORRECTED LINE: Using FaWhatsapp component */}
        <FaWhatsapp size={32} /> 
        {/* Optional: Text on hover for desktop */}
        <span className="hidden md:block absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* Tailwind CSS Custom Animation Keyframes (Add this to your CSS or a style block) */}
      <style>
        {`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
        `}
      </style>
    </div>
  );
};

export default App;