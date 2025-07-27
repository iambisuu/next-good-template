import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/hero.avif" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-60"
          style={{ objectPosition: 'center bottom' }}
        />
        <div className="absolute mt-100 inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center bg-purple-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 mb-8">
          <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full mr-3">2025</span>
          <span className="text-gray-200 text-sm">Next-Gen AI Studio</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-light leading-tight mb-8 tracking-tight">
          AI-Driven Success<br />
          Redefining the Future.
        </h1>

        {/* Subtext */}
        <div className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          <p className="mb-2">Creating latest solutions that redefine innovation.</p>
          <p>Stay ahead with AI-powered technology for the future.</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-white text-black px-8 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 shadow-lg">
            Connect With Us
          </button>
          <button className="bg-gray-800/50 backdrop-blur-sm text-white px-8 py-3.5 rounded-lg font-medium border border-gray-600/50 hover:bg-gray-700/50 transition-all duration-200">
            What is Nubien?
          </button>
        </div>

        {/* Brand Logos */}
        <div className="mt-20 opacity-30">
          <div className="flex items-center justify-center space-x-12 text-gray-400">
            <div className="text-2xl font-bold tracking-wider">LOGO</div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-xl font-medium">LOREM IPSUM</div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-2xl font-bold tracking-wider">IPSUM</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;