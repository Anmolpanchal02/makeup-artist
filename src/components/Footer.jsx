import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-400 rounded-full blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">

          {/* Brand Section */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Sarah's Glam
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
              Transform your beauty with our professional makeup artistry. Making every moment memorable with flawless looks.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Instagram size={20} className="group-hover:animate-pulse" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Facebook size={20} className="group-hover:animate-pulse" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-sky-400 to-sky-600 p-3 rounded-full hover:from-sky-500 hover:to-sky-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
              >
                <Twitter size={20} className="group-hover:animate-pulse" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h4 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                {/* Changed href to match App.jsx id */}
                <a href="#about" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm sm:text-base">
                  About Us
                </a>
              </li>
              <li>
                {/* Changed href to match App.jsx id */}
                <a href="#videogallery" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm sm:text-base">
                  Video Gallery
                </a>
              </li>
              <li>
                {/* Changed href to match App.jsx id */}
                <a href="#mixedgallery" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm sm:text-base">
                  Photo Gallery
                </a>
              </li>

              <li>
                {/* Changed href to match App.jsx id */}
                <a href="#services" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 text-sm sm:text-base">
                  Our Services
                </a>
              </li>

             
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-left">
            <h4 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start space-x-3 group">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300">
                  <Mail size={16} />
                </div>
                <span className="text-gray-300 text-sm sm:text-base hover:text-pink-400 transition-colors duration-300">
                  wwwsunitasharma0806@gmail.com
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3 group">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300">
                  <Phone size={16} />
                </div>
                <span className="text-gray-300 text-sm sm:text-base hover:text-pink-400 transition-colors duration-300">
                  +91 8209282607
                </span>
              </div>

              <div className="flex items-start justify-center lg:justify-start space-x-3 group">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full group-hover:from-pink-600 group-hover:to-purple-700 transition-all duration-300 flex-shrink-0 mt-1">
                  <MapPin size={16} />
                </div>
                <span className="text-gray-300 text-sm sm:text-base hover:text-pink-400 transition-colors duration-300 leading-relaxed">
                 Jaipur, Mumbai, Bikaner
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made</span>
              <Heart size={16} className="text-pink-500 animate-pulse" />
              <span>by Anmol Panchal</span>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Glamour by Sunita. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;