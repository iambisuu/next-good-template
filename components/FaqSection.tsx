'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';

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

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "What is IntelliRite?",
      answer: "IntelliRite is an AI-powered writing assistant that helps you create research papers, reports, journals, and more—section by section—with real citations, humanized tone, and minimal plagiarism."
    },
    {
      question: "How is IntelliRite different from other AI writing tools?",
      answer: "Unlike generic AI tools, IntelliRite focuses on academic and professional writing. It handles citations, diagrams, humanized tone, and allows deep edits per section—all in one place."
    },
    {
      question: "Do I need to be a researcher to use this?",
      answer: "Not at all. IntelliRite is built for students, professionals, and anyone who needs to write structured documents—from research papers to journal entries and detailed reports."
    },
    {
      question: "Can I edit each section of my paper?",
      answer: "Yes! Each section is fully editable. You can tweak, rewrite, regenerate, or even collaborate with others on specific parts of your document before exporting the final version."
    },
    {
      question: "Will my content be plagiarism-free?",
      answer: "Yes, IntelliRite uses advanced AI and a third-party plagiarism checker to ensure your content is original and properly cited."
    },
    {
      question: "Can I add diagrams or flowcharts?",
      answer: "Absolutely. You can add visual elements like diagrams and flowcharts, either manually or by prompting the AI to generate them based on your content."
    },
    {
      question: "Is this tool free to use?",
      answer: "We’re launching with a free waitlist access for early users. Premium plans with advanced features will be available soon. Join the waitlist to get notified first!"
    },
    {
      question: "How do I join the waitlist?",
      answer: "Simply enter your email on our homepage or waitlist page. You’ll be the first to know when IntelliRite launches publicly."
    },
    {
      question: "Will I get early access if I join the waitlist?",
      answer: "Yes, waitlist members will get exclusive early access, special perks, and possibly discounts when we go live."
    }
  ];
  

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceStyle }} />
      <div 
        id="faq"
        className="min-h-screen bg-white text-black py-20 px-4"
        style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Column - Header */}
            <motion.div
              className="lg:sticky lg:top-20 pl-8 lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={headerVariants}
            >
              <div 
                className="inline-flex items-center gap-2 bg-purple-600/20 text-purple-600 px-4 py-2 rounded-full text-sm mb-8"
                style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                FAQ
              </div>
              
              <h1 
                className="text-5xl md:text-6xl font-semibold text-black mb-2"
                style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Frequently
              </h1>
              <h2 
                className="text-5xl md:text-6xl font-semibold text-black/60 mb-8"
                style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Asked Questions
              </h2>
              
              <p 
                className="text-black/60 text-lg leading-relaxed max-w-md"
                style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
              >
                Have questions? Our FAQ section has you covered with quick answers to the most common inquiries.
              </p>
            </motion.div>

            {/* Right Column - FAQ Items */}
            <motion.div
              className="space-y-4 lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="border border-black/10 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-lg"
                  variants={itemVariants}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-black/5 transition-colors duration-200"
                    style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    <span 
                      className="text-black text-lg font-medium pr-4"
                      style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
                    >
                      {item.question}
                    </span>
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      {openIndex === index ? (
                        <RiSubtractLine className="w-5 h-5 text-black" />
                      ) : (
                        <RiAddLine className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <p 
                        className="text-black/70 text-base leading-relaxed"
                        style={{ fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif' }}
                      >
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQSection;