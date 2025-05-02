
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-unbnked-blue to-unbnked-lightblue p-2 rounded-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 2v20"></path>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-unbnked-blue">Unbnked</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-unbnked-blue hover:text-unbnked-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-unbnked-blue hover:text-unbnked-teal transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
