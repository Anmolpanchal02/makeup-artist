import React from 'react';
import { Brush, Image, User, Heart, Sparkles, Camera, Film, Diamond, Briefcase, Users, Shirt } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: "Bridal Makeup",
      description: "Flawless and long-lasting makeup designed to make you shine on your special day. Includes trial session.",
      icon: <Heart size={30} className="text-pink-600" />,
    },
    {
      title: "Special Occasion Glam",
      description: "Perfect for proms, parties, galas, or any event where you want to look stunning. Customized to your style.",
      icon: <Sparkles size={30} className="text-purple-600" />,
    },
    {
      title: "Photoshoot & Editorial",
      description: "Professional makeup for photoshoots, fashion editorials, and commercial projects. Tailored for camera.",
      icon: <Camera size={30} className="text-pink-600" />,
    },
    {
      title: "Makeup Lessons",
      description: "Personalized one-on-one or group lessons to teach you techniques for your everyday look or special occasions.",
      icon: <User size={30} className="text-purple-600" />,
    },
    {
      title: "Day Makeup",
      description: "Light and natural makeup perfect for daytime events or a fresh everyday look.",
      icon: <Brush size={30} className="text-pink-600" />,
    },
    {
      title: "Party Makeup",
      description: "Vibrant and long-lasting makeup designed to make you stand out at any party.",
      icon: <Sparkles size={30} className="text-purple-600" />,
    },
    {
      title: "Cocktail Makeup",
      description: "Sophisticated and glamorous makeup for cocktail parties and evening events.",
      icon: <Film size={30} className="text-pink-600" />,
    },
    {
      title: "Sangeet Makeup",
      description: "Energetic and festive makeup to complement your Sangeet celebration.",
      icon: <Users size={30} className="text-purple-600" />,
    },
    {
      title: "Reception Makeup",
      description: "Elegant and radiant makeup for your grand reception.",
      icon: <Diamond size={30} className="text-pink-600" />,
    },
    {
      title: "Jewellery Shoot Makeup",
      description: "Specialized makeup that highlights the beauty of jewellery for photoshoots.",
      icon: <Camera size={30} className="text-purple-600" />,
    },
    {
      title: "Ad Shoot Makeup",
      description: "Professional makeup tailored for advertising campaigns and commercial shoots.",
      icon: <Film size={30} className="text-pink-600" />,
    },
    {
      title: "Portfolio Shoot Makeup",
      description: "Diverse makeup looks to build or enhance a professional model portfolio.",
      icon: <Image size={30} className="text-purple-600" />,
    },
    {
      title: "Groom Makeup",
      description: "Subtle yet effective grooming and makeup for the groom on his special day.",
      icon: <User size={30} className="text-pink-600" />,
    },
    {
      title: "Fashion Show Makeup",
      description: "High-fashion and avant-garde makeup for runway shows and fashion events.",
      icon: <Shirt size={30} className="text-purple-600" />,
    },
  ];

  return (
    <section id="services" className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-purple-700 mb-8 sm:mb-12">
        Our Services
      </h2>
      
      {/* Custom CSS for scrollbar hiding */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            scrollbar-width: none;
          }
        `}
      </style>
      
      {/* Responsive grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center transform hover:scale-105 transition duration-300 ease-in-out border-t-4 border-pink-500 hover:shadow-xl"
          >
            <div className="mb-3 p-2 bg-gradient-to-r from-pink-50 to-purple-50 rounded-full">
              {service.icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-pink-600 mb-2 leading-tight">
              {service.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-xs sm:text-sm flex-grow">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;