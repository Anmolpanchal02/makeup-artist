import React, { useState, useEffect } from 'react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side - Image Section */}
        <div className={`w-full md:w-1/2 relative flex items-center justify-center p-8 transform transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`}>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img
              src="https://res.cloudinary.com/duupzdrl1/image/upload/v1752600314/Sunita_i7y09j.jpg"
              alt="Sarah, the makeup artist"
              className="relative rounded-full w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover shadow-2xl transform group-hover:scale-105 transition-all duration-700 ring-4 ring-white"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/20 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
          </div>
        </div>

        {/* Right Side - Content Section */}
        <div className={`w-full md:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 transform transition-all duration-1000 delay-500 ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
        }`}>
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-semibold text-sm shadow-lg">
              ✨ Glam by Sunita Sharma
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
              About Sunita
            </h2>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-pink-600 leading-tight">
              Freelance Makeup Artist
            </h3>
            
            <div className="flex flex-wrap gap-2 text-sm font-medium">
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">Bridal</span>
              <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full">Special Events</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Photoshoots</span>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg sm:text-xl">
                Welcome to <span className="font-semibold text-pink-600">Makeup by Sunita</span> – where beauty meets artistry. I'm Sunita Sharma, a certified professional makeup artist, trained at <span className="font-semibold">Orane International, Jaipur</span>, and <span className="font-semibold">The Makeup Studio</span>.
              </p>
              
              <p className="text-base sm:text-lg">
                With years of experience and a passion for enhancing natural beauty, I specialize in creating flawless, camera-ready looks for brides, special occasions, and photoshoots across India.
              </p>
              
              <p className="text-base sm:text-lg">
                My mission is simple: to make every client feel <span className="font-semibold text-purple-600">confident, radiant, and uniquely beautiful</span>. Whether you're walking down the aisle or stepping in front of the camera, I ensure a personalized, glamorous experience that reflects your individual style.
              </p>
            </div>

            <div className="pt-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg blur opacity-20"></div>
                <p className="relative text-xl sm:text-2xl font-bold text-transparent bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text">
                  Let's create magic together! ✨
                </p>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div className="pt-6">
              <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg hover:shadow-xl">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-r from-purple-500 to-pink-500 group-hover:translate-x-0 ease">
                  Book Consultation
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Get Started
                </span>
                <span className="relative invisible">Get Started</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>

        {/* Decorative Elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="fixed top-40 right-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="fixed bottom-20 left-1/4 w-20 h-20 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      {/* </div> */}
    </section>
  );
};

export default AboutPage;