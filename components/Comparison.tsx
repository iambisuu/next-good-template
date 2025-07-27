'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { RiCloseLine, RiCheckLine } from 'react-icons/ri';

// Add font face declaration
const fontFaceStyle = `
  @font-face {
    font-family: 'SF Pro';
    src: url('/fonts/SF-Pro.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
`;

const ComparisonSection: React.FC = () => {
  const leftItems = [
    "Manual Research & Citation",
    "Copy-Paste from Old Templates",
    "Juggling Multiple Tools",
    "Time-Consuming Edits",
    "Risk of Plagiarism & Errors"
  ];
  
  const rightItems = [
    "AI-Powered Research & Citations",
    "Smart, Context-Aware Templates",
    "All-in-One Writing Workspace",
    "Auto-Polished Drafts with Feedback",
    "Original, Verified, and Citation-Ready"
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const leftItemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -100 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const rightItemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: 100 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceStyle }} />
      <div 
        className="min-h-screen bg-black text-white py-20 px-4"
        style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={headerVariants}
          >
            <div 
              className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-400 px-4 py-2 rounded-full text-sm mb-8"
              style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Comparison
            </div>
            
            <h1 
              className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-6"
              style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              IntelliRite vs. Normal way
            </h1>
            
            <p 
              className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
            >
              IntelliRite is built to elevate your writing—whether it is research papers, journals, or professional reports—with a clean, AI-enhanced platform that prioritizes quality, structure, and originality.
            </p>
          </motion.div>

          {/* Comparison Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Main Container with Border */}
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm">
              {/* Grid */}
              <div className="grid md:grid-cols-2">
                {/* Left Column - Normal Way */}
                <motion.div
                  className="p-8 space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={containerVariants}
                >
                  {leftItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4"
                      variants={leftItemVariants}
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                        <RiCloseLine className="w-4 h-4 text-red-400" />
                      </div>
                      <span 
                        className="text-white/80 text-lg"
                        style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Vertical Divider */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>

                {/* Right Column - IntelliRite */}
                <motion.div
                  className="p-8 space-y-6 relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={containerVariants}
                >
                  {/* Subtle glow effect for right side */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-purple-900/5 pointer-events-none"></div>
                  
                  {rightItems.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 relative z-10"
                      variants={rightItemVariants}
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <RiCheckLine className="w-4 h-4 text-purple-400" />
                      </div>
                      <span 
                        className="text-white text-lg"
                        style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComparisonSection;