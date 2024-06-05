import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 relative bottom-0 w-full border-t border-gray-700">
      <div className="container mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-300">
            <FaLinkedinIn size={24} />
          </a>
        </div>
        <p className="text-sm text-center md:text-left">&copy; 2024 NavJob Portal. All rights reserved.</p>
        <div className="flex space-x-4 text-sm px-3">
          <a href="/privacy-policy" className="hover:text-white transition duration-300">Privacy Policy</a>
          <span className="hidden md:inline">|</span>
          <a href="/terms-of-service" className="hover:text-white transition duration-300">Terms of Service</a>
          <span className="hidden md:inline">|</span>
          <a href="/about-us" className="hover:text-white transition duration-300">About Us</a>
          <span className="hidden md:inline">|</span>
          <a href="/contact-us" className="hover:text-white transition duration-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
