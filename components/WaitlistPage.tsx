import React, { useRef, useState, memo, useCallback } from 'react';
import { submitToWaitlist } from '../lib/utils/waitlist';

// Memoize static content sections
const Logo = memo(() => (
  <div className="mb-16 transform-gpu">
    <div className="w-20 h-20 bg-black rounded-2xl border border-white/20 flex items-center justify-center">
      <div className="text-white text-3xl font-bold transform -rotate-12">
        ∅
      </div>
    </div>
  </div>
));
Logo.displayName = 'Logo';

const Heading = memo(() => (
  <div className="text-center mb-12 transform-gpu">
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-8 leading-tight">
      Join the waitlist
    </h1>
    <p className="text-white/50 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
      Unlock early access to premium AI writing suite<br />
      Get access to beta before anyone else.
    </p>
  </div>
));
Heading.displayName = 'Heading';

const BackedBy = memo(() => (
  <div className="text-center transform-gpu">
    <p className="text-gray-500 text-sm mb-8">
      Backed by
    </p>
    <div className="flex items-center justify-center gap-8 opacity-70">
      <div className="text-white text-xl font-medium">weire</div>
      <div className="text-white text-xl font-medium">ezprep*</div>
      <div className="text-white text-xl font-medium">startup india</div>
    </div>
  </div>
));
BackedBy.displayName = 'BackedBy';

// Status message component
const StatusMessage = memo(({ type, message }: { type: 'success' | 'error' | null; message: string }) => {
  if (!message) return null;
  
  return (
    <div
      className={`text-sm transform-gpu ${
        type === 'success' ? 'text-green-400' : 'text-red-400'
      }`}
    >
      {message}
    </div>
  );
});
StatusMessage.displayName = 'StatusMessage';

// Main form component
const WaitlistForm = memo(({ onSubmit, isSubmitting, status }: {
  onSubmit: (email: string) => void;
  isSubmitting: boolean;
  status: { type: 'success' | 'error' | null; message: string; }
}) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const email = emailRef.current?.value || '';
    onSubmit(email);
  }, [onSubmit]);

  return (
    <div className="flex flex-col items-center gap-4 mb-20 transform-gpu">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          ref={emailRef}
          type="email"
          placeholder="your@email.com"
          className="px-6 py-4 bg-white/10 border border-white/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors w-80"
          disabled={isSubmitting}
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-8 py-4 bg-white text-black font-semibold rounded-xl transition-colors whitespace-nowrap ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          {isSubmitting ? 'Joining...' : 'Join waitlist'}
        </button>
      </div>
      <StatusMessage type={status.type} message={status.message} />
    </div>
  );
});
WaitlistForm.displayName = 'WaitlistForm';

const WaitlistSection: React.FC = () => {
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (email: string) => {
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
        setStatus({
          type: 'success',
          message: 'Thanks for joining the waitlist! We\'ll be in touch soon.',
        });
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
  }, []);

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-20 font-sans">
      <Logo />
      <Heading />
      <WaitlistForm 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
      />
      <div className="relative w-100 mb-12 h-px transform-gpu">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 mask-gradient"></div>
      </div>
      <BackedBy />
      <style jsx>{`
        .mask-gradient {
          mask-image: linear-gradient(to right, transparent 0%, white 30%, white 70%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, white 30%, white 70%, transparent 100%);
        }
      `}</style>
    </section>
  );
};

export default WaitlistSection;