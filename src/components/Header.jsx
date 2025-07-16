import React, { useState } from 'react';
import { User, Video, Image, Brush, Menu, X } from 'lucide-react'; // Removed MessageSquare icon as Testimonials is removed from header

// NavItem Component (No changes here, it's already set up to receive onClick and page)
const NavItem = ({ icon, label, page, currentPage, onClick }) => {
  const isActive = currentPage === page;
  
  return (
    <button
      onClick={() => onClick(page)} // This is key: call the passed onClick with the page ID
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
        isActive 
          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' 
          : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
      }`}
    >
      <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

const Header = ({ currentPage = 'portfolio', navigate = () => {} }) => { // Default currentPage to 'portfolio'
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-pink-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo/Brand Name: Clicking this now navigates to the 'portfolio' section */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('portfolio')}> 
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
                Sunita Sharma
              </span>
              
              
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {/* Removed Portfolio NavItem, as clicking the logo takes there now */}
            <NavItem 
              icon={<User size={20} />} 
              label="About" 
              page="about" 
              currentPage={currentPage} 
              onClick={navigate} 
            />
            <NavItem 
              icon={<Video size={20} />} 
              label="Video Gallery" 
              page="videogallery" 
              currentPage={currentPage} 
              onClick={navigate} 
            />
             <NavItem 
              icon={<Image size={20} />} 
              label="Gallery" 
              page="mixedgallery" 
              currentPage={currentPage} 
              onClick={navigate} 
            />
            <NavItem 
              icon={<Brush size={20} />} 
              label="Services" 
              page="services" 
              currentPage={currentPage} 
              onClick={navigate} 
            />
            {/* Removed Testimonials NavItem */}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-pink-50 transition-all  duration-300"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X size={24} className="transition-transform duration-300 rotate-180" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 mt-4 space-y-2 shadow-inner">
            {/* Removed Portfolio NavItem */}
            <NavItem 
              icon={<User size={20} />} 
              label="About" 
              page="about" 
              currentPage={currentPage} 
              onClick={(page) => { navigate(page); setIsMenuOpen(false); }} 
            />
            <NavItem 
              icon={<Video size={20} />} 
              label="Video Gallery" 
              page="videogallery" 
              currentPage={currentPage} 
              onClick={(page) => { navigate(page); setIsMenuOpen(false); }} 
            />
            <NavItem 
              icon={<Image size={20} />} 
              label="Mixed Gallery" 
              page="mixedgallery" 
              currentPage={currentPage} 
              onClick={(page) => { navigate(page); setIsMenuOpen(false); }} 
            />
            <NavItem 
              icon={<Brush size={20} />} 
              label="Services" 
              page="services" 
              currentPage={currentPage} 
              onClick={(page) => { navigate(page); setIsMenuOpen(false); }} 
            />
            {/* Removed Testimonials NavItem */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;