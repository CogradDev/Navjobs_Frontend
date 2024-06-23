import React, { useContext } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';

const Footer = () => {

  const context = useContext(authContext);
  const { islogedin, userType } = context;

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-3 pt-5 relative bottom-0 w-full border-t border-gray-700">
        <div className="container mx-auto flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0 px-4">
          <div className="flex space-x-4 max-md:gap-2 text-sm flex-wrap items-center justify-center">
            <Link to="/About" className="hover:text-white transition duration-300">About Us</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/alljobs" className="hover:text-white transition duration-300">Jobs</Link>
            <span className="hidden md:inline">|</span>
            {
              islogedin && <>
                {userType === "recruiter" ? <><Link to="/recruiterprofile" className="hover:text-white transition duration-300">Profile</Link>
                  <span className="hidden md:inline">|</span></> : <><Link to="/applicantprofile" className="hover:text-white transition duration-300">Profile</Link>
                  <span className="hidden md:inline">|</span></>}
              </>
            }
            <Link to="/terms-of-service" className="hover:text-white transition duration-300">Terms of Service</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/privacy-policy" className="hover:text-white transition duration-300">Privacy Policy</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/About" className="hover:text-white transition duration-300">Contact Us</Link>
          </div>

          <div className="flex space-x-6">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition duration-300">
              <FaFacebookF size={24} />
            </Link>
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition duration-300">
              <FaTwitter size={24} />
            </Link>
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition duration-300">
              <FaInstagram size={24} />
            </Link>
            <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition duration-300">
              <FaLinkedinIn size={24} />
            </Link>
          </div>
        </div>
        <div className="text-sm flex items-center justify-center mt-4 md:text-left">&copy; 2024 NavJob Portal. All rights reserved.</div>
      </footer>
    </>
  );
};

export default Footer;
