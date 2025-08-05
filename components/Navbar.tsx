'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import WaitlistModal from './WaitlistModal';
import { trackButtonClick, trackScrollToSection } from '../lib/utils/analytics';

const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navbarHeight = 80; // Approximate navbar height
      const targetPosition = targetElement.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Track scroll to section
      trackScrollToSection(targetId);
    }
  };

  const openModal = () => {
    trackButtonClick('join_waitlist', 'navbar');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-black/10 transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
                          <div className="flex items-center">
                <Image src="/f.png" alt="Intellirite" width={45} height={45} className="h-[45px]" />
              </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#features" 
                onClick={(e) => handleSmoothScroll(e, 'features')}
                className="nav-link text-black transition-all duration-300 overflow-hidden relative inline-block h-6"
              >
                <span className="block transition-transform duration-300 ease-out">Features</span>
                <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>Features</span>
              </a>
              {/* <a 
                href="#what-we-offer" 
                onClick={(e) => handleSmoothScroll(e, 'what-we-offer')}
                className="nav-link text-black transition-all duration-300 overflow-hidden relative inline-block h-6"
              >
                <span className="block transition-transform duration-300 ease-out">What we offer</span>
                <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>About App</span>
              </a> */}
              {/* <a 
                href="#contact" 
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="nav-link text-black transition-all duration-300 overflow-hidden relative inline-block h-6"
              >
                <span className="block transition-transform duration-300 ease-out">Contact</span>
                <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>Contact</span>
              </a> */}
              <a 
                href="#faq" 
                onClick={(e) => handleSmoothScroll(e, 'faq')}
                className="nav-link text-black transition-all duration-300 overflow-hidden relative inline-block h-6"
              >
                <span className="block transition-transform duration-300 ease-out">FAQ</span>
                <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>FAQ</span>
              </a>
              {/* <a 
                href="#about-us" 
                onClick={(e) => handleSmoothScroll(e, 'about-us')}
                className="nav-link text-black transition-all duration-300 overflow-hidden relative inline-block h-6"
              >
                <span className="block transition-transform duration-300 ease-out">About Us</span>
                <span className="absolute left-0 transition-transform duration-300 ease-out" style={{ top: '150%' }}>About Us</span>
              </a> */}
            </div>

            <button 
              onClick={openModal}
              className="bg-black text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-lg hover:bg-black/80 cursor-pointer hover:scale-105 active:scale-95"
            >
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

      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;