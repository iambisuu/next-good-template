'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function MainVideo() {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showSoundButton, setShowSoundButton] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAttemptedAutoPlay, setHasAttemptedAutoPlay] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  // Starts tilted backward and comes forward
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]); // No skew, just straight tilt

  // Auto-play video when rotation is 75% complete
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest >= 0.75 && videoRef.current && videoRef.current.paused && !hasAttemptedAutoPlay) {
        setHasAttemptedAutoPlay(true);
        
        // First try to play unmuted
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Unmuted auto-play prevented, trying muted:', error);
            // If unmuted fails, try muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => {
                setShowSoundButton(true);
              }).catch(mutedError => {
                console.log('Muted auto-play also failed:', mutedError);
              });
            }
          });
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasAttemptedAutoPlay]);

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      setShowSoundButton(false);
    }
  };

  return (
    <div className="relative flex justify-center min-h-screen bg-[#fafbfa] dark:bg-[#0d0d0d] perspective-[1000px]">
      <motion.div
        ref={ref}
        style={{ rotateX, transformOrigin: 'center center' }} // Tilt is perfectly straight
        className="w-[90vw] max-sm:w-[90vw] max-sm:h-[50vw] max-sm:mb-12 h-[60vw] max-w-6xl max-h-[700px] bg-black rounded-lg shadow-2xl overflow-hidden relative"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/pr_video.mp4"
          controls
        />
        
        {/* Fancy Sound Button */}
        {showSoundButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            onClick={handleUnmute}
            className="absolute top-4 cursor-pointer right-4 z-10 group"
          >
            <div className="relative">
              {/* Background circle with gradient */}
              <div className="w-12 h-12 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-full shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl relative">
                {/* Sound icon */}
                <svg 
                  className="w-6 h-6 text-gray-800 transition-all duration-300 group-hover:text-black" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                
                {/* Cross line to indicate muted */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-0.5 bg-black rotate-45 transform origin-center"></div>
                </div>
              </div>
              
              {/* Pulse animation */}
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full animate-ping"></div>
              
              {/* Tooltip */}
              <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Click to unmute
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
              </div>
            </div>
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}