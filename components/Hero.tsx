import React, { useRef, useState } from 'react';
import { ArrowRight, Mail, Loader2 } from 'lucide-react';

export type WaitlistSubmission = {
  name?: string
  email: string
}

export async function submitToWaitlist({ name, email }: WaitlistSubmission) {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Something went wrong. Please try again later.',
      }
    }

    return data
  } catch (error) {
    console.error('Error submitting to waitlist:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }
}

const Hero: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const emailValue = email.trim();
    
    if (!emailValue) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(emailValue)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);
    
    try {
      const result = await submitToWaitlist({ email: emailValue });
      if (result.success) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <section 
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16"
      style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
    >
      {/* Main Content */}
      <div className="text-center max-w-5xl mx-auto mb-16">
        {/* Main Heading */}
        <h1 className="text-black text-5xl mt-16 md:text-6xl lg:text-6xl font-bold leading-tight mb-8">
        Smart Writing, Made Simple <br />
       <span className='text-black text-5xl mt-12 md:text-4xl lg:text-6xl font-bold leading-tight mb-8'>Turn your ideas into polished content</span> 
        </h1>
        
        {/* Subtext */}
        <p className="text-gray-600 text-xl mb-8">
        AI-Powered Research Made Simple.
        </p>

        {/* Email Form */}
        <div className="max-w-md mx-auto mb-4">
          <div className="relative">
            <div className="flex rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 hover:border-gray-300 focus-within:border-black transition-all duration-300">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-4 text-lg bg-white border-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !email.trim()}
                className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 min-w-fit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Status Messages */}
          <div className="mt-3 h-6">
            {error && (
              <p className="text-red-500 text-sm animate-in slide-in-from-top-1 duration-200">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-600 text-sm animate-in slide-in-from-top-1 duration-200 font-medium">
                Successfully joined the waitlist! Check your email for confirmation.
              </p>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-gray-500 text-sm">
          Join 10,000+ writers already on the waitlist • No spam, ever
        </p>
      </div>

      {/* Featured Plans Section */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-black text-3xl font-bold">Featured Plans</h2>
          <button className="text-black text-lg font-medium hover:underline">
            Explore All
          </button>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Idea to Impact Plan */}
          <div className="rounded-2xl p-5 text-black" style={{ backgroundColor: '#5fcca0' }}>
            <div className="text-sm font-medium mb-2 opacity-80">STRATEGY</div>
            <h3 className="text-2xl font-bold mb-4">Idea to Impact</h3>
            <p className="text-sm mb-6 opacity-90">
              Turn scattered thoughts into polished, structured content — fast — using AI-powered writing intelligence.
            </p>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm opacity-80 mb-1">Drafting Speed</div>
                <div className="text-lg font-bold">3× Faster</div>
              </div>
              <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Long-Term Edge Plan */}
          <div className="rounded-2xl p-5 text-white" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="text-sm font-medium mb-2 opacity-80">PLAN</div>
            <h3 className="text-2xl font-bold mb-4">Long-Term Edge</h3>
            <p className="text-sm mb-6 opacity-90">
              Stay consistent with smart writing prompts, context memory, and progress tracking that adapts to you.
            </p>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm opacity-80 mb-1">Skill Growth</div>
                <div className="text-lg font-bold">noticeable improvement</div>
              </div>
              <button className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Focused Creation Plan */}
          <div className="rounded-2xl p-5 text-black" style={{ backgroundColor: '#cb9bfb' }}>
            <div className="text-sm font-medium mb-2 opacity-80">STRATEGY</div>
            <h3 className="text-2xl font-bold mb-4">Focused Creation</h3>
            <p className="text-sm mb-6 opacity-90">
              Distraction-free editor, intelligent outlining, and auto-citation keep you in flow — from intro to conclusion.
            </p>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm opacity-80 mb-1">Time Saved</div>
                <div className="text-lg font-bold">2 hours per paper</div>
              </div>
              <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            </div>

          {/* Reliable Output Plan */}
          <div className="rounded-2xl p-5 text-black" style={{ backgroundColor: '#f9fd91' }}>
            <div className="text-sm font-medium mb-2 opacity-80">PLAN</div>
            <h3 className="text-2xl font-bold mb-4">Reliable Output</h3>
            <p className="text-sm mb-6 opacity-90">
              Whether it's a journal, research paper, or report — IntelliRite helps you write confidently, every time.
            </p>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm opacity-80 mb-1">Early Feedback</div>
                <div className="text-lg font-bold">"writing co-pilot"</div>
              </div>
              <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;