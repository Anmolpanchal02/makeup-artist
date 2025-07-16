import React, { useState } from 'react';
import { Brush, Image, User, Heart, Sparkles, Camera, Film, Diamond, Briefcase, Users, Shirt, X } from 'lucide-react';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const services = [
    {
      title: "Bridal Makeup",
      description: "Flawless and long-lasting makeup designed to make you shine on your special day. Includes trial session.",
      icon: <Heart size={30} className="text-pink-600" />,
      category: "Bridal & Wedding"
    },
    {
      title: "Reception Makeup",
      description: "Elegant and radiant makeup for your grand reception.",
      icon: <Diamond size={30} className="text-pink-600" />,
      category: "Bridal & Wedding"
    },
    {
      title: "Sangeet Makeup",
      description: "Energetic and festive makeup to complement your Sangeet celebration.",
      icon: <Users size={30} className="text-purple-600" />,
      category: "Bridal & Wedding"
    },
    {
      title: "Groom Makeup",
      description: "Subtle yet effective grooming and makeup for the groom on his special day.",
      icon: <User size={30} className="text-pink-600" />,
      category: "Bridal & Wedding"
    },
    {
      title: "Special Occasion Glam",
      description: "Perfect for proms, parties, galas, or any event where you want to look stunning. Customized to your style.",
      icon: <Sparkles size={30} className="text-purple-600" />,
      category: "Special Events"
    },
    {
      title: "Party Makeup",
      description: "Vibrant and long-lasting makeup designed to make you stand out at any party.",
      icon: <Sparkles size={30} className="text-purple-600" />,
      category: "Special Events"
    },
    {
      title: "Cocktail Makeup",
      description: "Sophisticated and glamorous makeup for cocktail parties and evening events.",
      icon: <Film size={30} className="text-pink-600" />,
      category: "Special Events"
    },
    {
      title: "Day Makeup",
      description: "Light and natural makeup perfect for daytime events or a fresh everyday look.",
      icon: <Brush size={30} className="text-pink-600" />,
      category: "Special Events"
    },
    {
      title: "Photoshoot & Editorial",
      description: "Professional makeup for photoshoots, fashion editorials, and commercial projects. Tailored for camera.",
      icon: <Camera size={30} className="text-pink-600" />,
      category: "Professional Shoots"
    },
    {
      title: "Jewellery Shoot Makeup",
      description: "Specialized makeup that highlights the beauty of jewellery for photoshoots.",
      icon: <Camera size={30} className="text-purple-600" />,
      category: "Professional Shoots"
    },
    {
      title: "Ad Shoot Makeup",
      description: "Professional makeup tailored for advertising campaigns and commercial shoots.",
      icon: <Film size={30} className="text-pink-600" />,
      category: "Professional Shoots"
    },
    {
      title: "Portfolio Shoot Makeup",
      description: "Diverse makeup looks to build or enhance a professional model portfolio.",
      icon: <Image size={30} className="text-purple-600" />,
      category: "Professional Shoots"
    },
    {
      title: "Fashion Show Makeup",
      description: "High-fashion and avant-garde makeup for runway shows and fashion events.",
      icon: <Shirt size={30} className="text-purple-600" />,
      category: "Professional Shoots"
    },
    {
      title: "Makeup Lessons",
      description: "Personalized one-on-one or group lessons to teach you techniques for your everyday look or special occasions.",
      icon: <User size={30} className="text-purple-600" />,
      category: "Training & Lessons"
    },
  ];

  const categories = [
    {
      name: "Bridal & Wedding",
      icon: <Heart size={40} className="text-pink-600" />,
      color: "from-pink-500 to-rose-500",
      description: "Complete bridal makeup services for your special day"
    },
    {
      name: "Special Events",
      icon: <Sparkles size={40} className="text-purple-600" />,
      color: "from-purple-500 to-indigo-500",
      description: "Glamorous looks for parties and special occasions"
    },
    {
      name: "Professional Shoots",
      icon: <Camera size={40} className="text-blue-600" />,
      color: "from-blue-500 to-cyan-500",
      description: "Professional makeup for photoshoots and commercials"
    },
    {
      name: "Training & Lessons",
      icon: <User size={40} className="text-green-600" />,
      color: "from-green-500 to-emerald-500",
      description: "Learn makeup techniques with personalized lessons"
    }
  ];

  const getServicesForCategory = (categoryName) => {
    return services.filter(service => service.category === categoryName);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const closePopup = () => {
    setSelectedCategory(null);
  };

  return (
    <section id="services" className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            scrollbar-width: none;
          }
          .popup-overlay {
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.6);
          }
          .popup-enter {
            opacity: 0;
            transform: scale(0.9);
          }
          .popup-enter-active {
            opacity: 1;
            transform: scale(1);
            transition: all 0.3s ease-out;
          }
        `}
      </style>

      {/* Main Categories View */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-purple-700 mb-8 sm:mb-12">
        Our Services
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 sm:p-8 text-white cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-full">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-3">
                {category.name}
              </h3>
              <p className="text-center text-sm sm:text-base opacity-90 leading-relaxed">
                {category.description}
              </p>
              <div className="mt-4 text-center">
                 <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {getServicesForCategory(category.name).length} Services
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 popup-overlay">
          <div 
            className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl popup-enter-active"
            style={{
              animation: 'fadeInScale 0.3s ease-out'
            }}
          >
            <style>
              {`
                @keyframes fadeInScale {
                  from {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}
            </style>
            
            {/* Popup Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-purple-700">
                {selectedCategory}
              </h3>
              <button
                onClick={closePopup}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Popup Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getServicesForCategory(selectedCategory).map((service, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition duration-300 ease-in-out border border-pink-200 hover:shadow-lg"
                  >
                    <div className="mb-4 p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full">
                      {service.icon}
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-pink-600 mb-3 leading-tight">
                      {service.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base flex-grow">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop click handler */}
      {selectedCategory && (
        <div
          className="fixed inset-0 z-40"
          onClick={closePopup}
        />
      )}
    </section>
  );
};

export default ServicesPage;