
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
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
            <p className="mt-3 text-gray-600">
              Decentralized lending platform powered by blockchain technology.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-unbnked-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-unbnked-teal transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-unbnked-blue hover:text-unbnked-teal transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-unbnked-blue hover:text-unbnked-teal transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-unbnked-blue hover:text-unbnked-teal transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M12 2.253v13.494M12 2.253C14.196 2.238 16.331 2.886 18.145 4.118c1.81 1.235 3.193 3.01 3.93 5.047A12.04 12.04 0 0 1 22.75 12a12.043 12.043 0 0 1-.675 2.835c-.736 2.037-2.12 3.812-3.93 5.047a11.955 11.955 0 0 1-6.145 1.865 11.95 11.95 0 0 1-6.145-1.865c-1.81-1.235-3.194-3.01-3.93-5.047A12.043 12.043 0 0 1 1.25 12c0-.98.132-1.946.385-2.835.737-2.037 2.12-3.812 3.93-5.047A11.956 11.956 0 0 1 12 2.253z"></path>
                </svg>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">
                Have questions? <a href="#" className="text-unbnked-teal hover:underline">Contact us</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Unbnked. All rights reserved.</p>
          <p className="mt-1">This is a demonstration project and not intended for actual financial transactions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
