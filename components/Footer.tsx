import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

const Footer: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 1, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div>
      <style jsx global>{`
        @font-face {
          font-family: 'SF Pro';
          src: url('/fonts/SF-Pro.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        
        * {
          font-family: 'SF Pro', -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>
      
      {/* Top separator line */}
      <div className="w-full h-px bg-gray-800"></div>
      
      <motion.footer 
        className="relative bg-black text-white pt-16 pb-8 px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
            variants={containerVariants}
          >
            {/* Logo and Description */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <span className="text-2xl font-semibold text-white">IntelliRite</span>
              </div>
              <div className="text-gray-400 leading-relaxed">
                <p>Crafted with ✨ clarity, <br /> intelligence & care.</p>
                {/* <p className="mt-1">— Built by </p> */}
              </div>
            </motion.div>

            {/* Platform */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6">Platform</h3>
              <nav className="space-y-4">
                {['Home', 'Features', 'How It Works', 'FAQ', 'Contact'].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="block text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
              <nav className="space-y-4">
                {[
                  { name: 'Blog', url: '/blog' },
                  { name: 'Case Studies', url: '/case-studies' },
                  { name: 'Roadmap', url: '/roadmap' },
                  { name: 'Changelog', url: '/changelog' }
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href={item.url}
                      className="block text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-white font-medium">Stay in the Loop</p>
                  <p className="text-gray-400 text-sm">Get product updates, early access invites & writing insights.</p>
                </div>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter Your Email..."
                    className="flex-1 bg-white/10 border border-gray-800 rounded-l-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors duration-200"
                  />
                  <motion.button 
                    className="bg-white cursor-pointer text-black px-6 py-3 rounded-r-xl font-medium transition-all duration-200 hover:bg-gray-100 flex items-center space-x-2"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* <span>🔔</span> */}
                    <span>Subscribe</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-white mb-6">Social</h3>
            <div className="flex flex-wrap gap-6">
              {[
                { name: 'Twitter (X)', url: 'https://twitter.com' },
                { name: 'LinkedIn', url: 'https://linkedin.com' },
                { name: 'GitHub', url: 'https://github.com' },
                { name: 'YouTube', url: 'https://youtube.com' }
              ].map((item) => (
                <motion.a
                  key={item.name}
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div 
            className="border-t border-gray-800 pt-6"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 IntelliRite Inc.
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.1 }}>
                  <Link href="/terms" className="hover:text-white transition-colors duration-200">
                    Terms & Conditions
                  </Link>
                </motion.div>
                <span>•</span>
                <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.1 }}>
                  <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;