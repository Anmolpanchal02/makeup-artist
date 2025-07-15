import React from 'react';

const NavItem = ({ icon, label, page, currentPage, onClick }) => {
  return (
    <button
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-300
        ${currentPage === page ? 'bg-pink-600 text-white shadow-md' : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'}`}
      onClick={() => onClick(page)}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default NavItem;
