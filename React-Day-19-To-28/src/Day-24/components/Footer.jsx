import React from 'react';
import { SiGithub, SiGmail } from 'react-icons/si';
import { FaHeart, FaCode, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/80 backdrop-blur-sm border-t border-highlight/20 mt-auto">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {currentYear} <span className="text-highlight font-semibold">Satyam Kumar</span>
              <span className="hidden sm:inline"> • All Rights Reserved</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 flex items-center justify-center md:justify-start gap-1">
              Made with <FaHeart className="w-3 h-3 text-highlight inline fill-highlight" /> 
              using React & Tailwind CSS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <SiGithub className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
            <a href="mailto:your.email@example.com"
               className="text-gray-400 hover:text-highlight transition-all duration-300 hover:scale-110 hover:-translate-y-1">
              <SiGmail className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-xs flex items-center justify-center md:justify-end gap-1">
              <FaCode className="w-3 h-3 text-highlight" />
              Powered by <span className="text-yellow-400 font-medium">OMDb API</span>
            </p>
            <p className="text-gray-600 text-xs mt-1">Version 1.0.0</p>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-secondary px-4 text-xs text-gray-600">
              <FaHeart className="w-3 h-3 inline text-highlight fill-highlight" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;