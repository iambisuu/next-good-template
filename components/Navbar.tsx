'use client';

import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        // Scrolling down and past 100px
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-white text-xl font-semibold">Intellirite</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link text-white transition-all duration-300 overflow-hidden relative inline-block h-6">
              <span className="block transition-transform duration-300 ease-out">Features</span>
              <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>Features</span>
            </a>
            <a href="#" className="nav-link text-white transition-all duration-300 overflow-hidden relative inline-block h-6">
              <span className="block transition-transform duration-300 ease-out">What we offer</span>
              <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>About App</span>
            </a>
            <a href="#" className="nav-link text-white transition-all duration-300 overflow-hidden relative inline-block h-6">
              <span className="block transition-transform duration-300 ease-out">Contact</span>
              <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>Contact</span>
            </a>
            <a href="#faq" className="nav-link text-white transition-all duration-300 overflow-hidden relative inline-block h-6">
              <span className="block transition-transform duration-300 ease-out">FAQ</span>
              <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>FAQ</span>
            </a>
            <a href="#about-us" className="nav-link text-white transition-all duration-300 overflow-hidden relative inline-block h-6">
              <span className="block transition-transform duration-300 ease-out">About Us</span>
              <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>About Us</span>
            </a>
          </div>

          <button className="bg-white text-black px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:bg-white/80 cursor-pointer">
            Join Waitlist
          </button>
        </div>
      </div>

      <style jsx>{`
        .nav-link:hover span:first-child {
          transform: translateY(-150%);
        }
        .nav-link:hover span:last-child {
          transform: translateY(-150%);
        }
        .nav-link span:first-child {
          transform: translateY(0);
        }
        .nav-link span:last-child {
          transform: translateY(0);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;