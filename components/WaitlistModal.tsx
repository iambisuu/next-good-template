import React, { useRef, useState, useCallback, useEffect } from 'react';
import { submitToWaitlist } from '../lib/utils/waitlist';
import { trackWaitlistSubmission } from '../lib/utils/analytics';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && emailRef.current) {
      setTimeout(() => {
        emailRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    const email = emailRef.current?.value || '';
    
    if (!email) {
      setStatus({
        type: 'error',
        message: 'Please enter your email address.',
      });
      return;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await submitToWaitlist({ email });
      
      if (result.success) {
        // Track successful submission
        trackWaitlistSubmission(email);
        
        setStatus({
          type: 'success',
          message: 'Thanks for joining the waitlist! We\'ll be in touch soon.',
        });
        if (emailRef.current) {
          emailRef.current.value = '';
        }
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [onClose]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }, [handleSubmit]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl border border-black/20 rounded-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 scale-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black/60 hover:text-black transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-black/10 rounded-xl border border-black/20 flex items-center justify-center mx-auto">
              <div className="text-black text-2xl font-bold transform -rotate-12">
                ∅
              </div>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-medium text-black mb-2">
            Join the waitlist
          </h2>
          <p className="text-black/60 text-sm mb-8">
            Get early access to our AI-powered research platform
          </p>

          {/* Form */}
          <div className="space-y-4">
            <input
              ref={emailRef}
              type="email"
              placeholder="your@email.com"
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-black/10 border border-black/20 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-blue-600 transition-colors"
              disabled={isSubmitting}
            />
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full px-6 py-3 bg-black text-white font-semibold rounded-xl transition-all duration-200 ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-black/80 hover:scale-105 active:scale-95'
              }`}
            >
              {isSubmitting ? 'Joining...' : 'Join waitlist'}
            </button>
          </div>

          {/* Status message */}
          {status.message && (
            <div
              className={`mt-4 text-sm ${
                status.type === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal; 