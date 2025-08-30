import React, { useRef, useState } from 'react';
import { ArrowRight, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MainVideo from './home/MainVideo';

// Wobble Card Component
const WobbleCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
        ...style,
      }}
      className={className}
    >
      <motion.div
        style={{
          transform: isHovering
            ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
            : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
          transition: "transform 0.1s ease-out",
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

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
    } catch {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  return (
    <motion.section 
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16"
      style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Main Content */}
      <motion.div 
        className="text-center max-w-5xl mx-auto mb-[25px]"
        variants={itemVariants}
      >
        {/* Main Heading */}
        <motion.h1 
          className="text-black text-5xl mt-12 md:text-6xl lg:text-6xl font-medium leading-tight mb-8"
          variants={itemVariants}
        >
          Smart Writing, Made Simple <br />
          <span className='text-black text-5xl mt-12 md:text-4xl lg:text-6xl font-medium leading-tight mb-8'>Turn your ideas into polished content</span> 
        </motion.h1>
        
        {/* Subtext */}
        <motion.p 
          className="text-gray-600 text-xl mb-8"
          variants={itemVariants}
        >
          AI-Powered Research Made Simple.
        </motion.p>

        {/* Email Form */}
        <motion.div 
          className="max-w-2xl mx-auto"
          variants={itemVariants}
        >
          <div className="relative">
            <div className="flex rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-300 hover:border-gray-400 focus-within:border-black focus-within:shadow-3xl transition-all duration-300 bg-white">
              <div className="relative flex-1">
                <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Mail size={28} />
                </div>
                <input
                  ref={emailRef}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email to join the waitlist"
                  disabled={isSubmitting}
                  className="w-full pl-16 pr-6 py-8 text-xl bg-transparent border-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !email.trim()}
                className="bg-black text-white px-12 py-8 text-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 min-w-fit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span>Joining...</span>
                  </>
                ) : (
                  <>
                    <span>Join Waitlist</span>
                    <ArrowRight size={24} />
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
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="text-gray-500 text-sm"
          variants={itemVariants}
        >
          Join 10,000+ writers already on the waitlist • No spam, ever
        </motion.div>
      </motion.div>

<MainVideo/>
    </motion.section>
  );
};

export default Hero;
// import React, { useRef, useState } from 'react';
// import { ArrowRight, Mail, Loader2, Zap, Brain, Clock, Shield, ChevronDown } from 'lucide-react';
// import { motion } from 'framer-motion';

// // Wobble Card Component
// const WobbleCard = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovering, setIsHovering] = useState(false);

//   const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
//     const { clientX, clientY } = event;
//     const rect = event.currentTarget.getBoundingClientRect();
//     const x = (clientX - (rect.left + rect.width / 2)) / 20;
//     const y = (clientY - (rect.top + rect.height / 2)) / 20;
//     setMousePosition({ x, y });
//   };

//   return (
//     <motion.div
//       onMouseMove={handleMouseMove}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => {
//         setIsHovering(false);
//         setMousePosition({ x: 0, y: 0 });
//       }}
//       style={{
//         transform: isHovering
//           ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
//           : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
//         transition: "transform 0.1s ease-out",
//         ...style,
//       }}
//       className={className}
//     >
//       <motion.div
//         style={{
//           transform: isHovering
//             ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
//             : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
//           transition: "transform 0.1s ease-out",
//         }}
//         className="h-full"
//       >
//         {children}
//       </motion.div>
//     </motion.div>
//   );
// };

// export type WaitlistSubmission = {
//   name?: string
//   email: string
// }

// export async function submitToWaitlist({ name, email }: WaitlistSubmission) {
//   try {
//     const response = await fetch('/api/waitlist', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, name }),
//     })

//     const data = await response.json()

//     if (!response.ok) {
//       return {
//         success: false,
//         error: data.error || 'Something went wrong. Please try again later.',
//       }
//     }

//     return data
//   } catch (error) {
//     console.error('Error submitting to waitlist:', error)
//     return {
//       success: false,
//       error: 'Something went wrong. Please try again later.',
//     }
//   }
// }

// const Hero: React.FC = () => {
//   const emailRef = useRef<HTMLInputElement>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async () => {
//     const emailValue = email.trim();
    
//     if (!emailValue) {
//       setError('Please enter your email address');
//       return;
//     }

//     if (!validateEmail(emailValue)) {
//       setError('Please enter a valid email address');
//       return;
//     }

//     setError('');
//     setIsSubmitting(true);
    
//     try {
//       const result = await submitToWaitlist({ email: emailValue });
//       if (result.success) {
//         setSuccess(true);
//         setEmail('');
//         setTimeout(() => setSuccess(false), 3000);
//       } else {
//         setError(result.error || 'Something went wrong. Please try again.');
//       }
//     } catch {
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       handleSubmit();
//     }
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//     if (error) setError('');
//   };

//   const scrollToFeatures = () => {
//     document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 20 
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0
//     }
//   };

//   const cardVariants = {
//     hidden: { 
//       opacity: 0, 
//       y: 30,
//       scale: 0.95
//     },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       scale: 1
//     }
//   };

//   const featureVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { 
//       opacity: 1, 
//       x: 0,
//       transition: { duration: 0.5 }
//     }
//   };

//   const keyFeatures = [
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "AI-Powered Writing",
//       description: "Turn your ideas into polished content 3x faster with intelligent assistance"
//     },
//     {
//       icon: <Brain className="w-6 h-6" />,
//       title: "Smart Research",
//       description: "Auto-citation and intelligent outlining to keep you in flow"
//     },
//     {
//       icon: <Clock className="w-6 h-6" />,
//       title: "Time Saving",
//       description: "Save 2+ hours per document with distraction-free editing"
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Reliable Output",
//       description: "Consistent, high-quality results for papers, reports, and journals"
//     }
//   ];

//   return (
//     <div style={{ fontFamily: "'SF Pro Display', system-ui, sans-serif" }}>
//       {/* Hero Section */}
//       <motion.section 
//         className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center px-6 py-16 relative"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {/* Main Content */}
//         <motion.div 
//           className="text-center max-w-5xl mx-auto mb-16"
//           variants={itemVariants}
//         >
//           {/* Main Heading */}
//           <motion.h1 
//             className="text-black text-5xl mt-16 md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
//             variants={itemVariants}
//           >
//             Smart Writing, Made Simple
//             <br />
//             <span className='text-gray-700 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight'>
//               Turn your ideas into polished content
//             </span> 
//           </motion.h1>
          
//           {/* Subtext */}
//           <motion.p 
//             className="text-gray-600 text-xl md:text-2xl mb-12"
//             variants={itemVariants}
//           >
//             Join the waitlist for AI-powered research and writing made simple.
//           </motion.p>

//           {/* Enhanced Email Form */}
//           <motion.div 
//             className="max-w-2xl mx-auto mb-12"
//             variants={itemVariants}
//           >
//             <div className="relative">
//               <div className="flex rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-300 hover:border-gray-400 focus-within:border-black focus-within:shadow-3xl transition-all duration-300 bg-white">
//                 <div className="relative flex-1">
//                   <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <Mail size={24} />
//                   </div>
//                   <input
//                     ref={emailRef}
//                     type="email"
//                     value={email}
//                     onChange={handleEmailChange}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Enter your email to join the waitlist"
//                     disabled={isSubmitting}
//                     className="w-full pl-16 pr-6 py-6 text-xl bg-transparent border-0 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-400"
//                   />
//                 </div>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting || !email.trim()}
//                   className="bg-black text-white px-10 py-6 text-xl font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 min-w-fit"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 size={24} className="animate-spin" />
//                       <span>Joining...</span>
//                     </>
//                   ) : (
//                     <>
//                       <span>Join Waitlist</span>
//                       <ArrowRight size={24} />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
            
//             {/* Status Messages */}
//             <div className="mt-4 h-8">
//               {error && (
//                 <motion.p 
//                   className="text-red-500 text-lg animate-in slide-in-from-top-1 duration-200 font-medium"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   {error}
//                 </motion.p>
//               )}
//               {success && (
//                 <motion.p 
//                   className="text-green-600 text-lg animate-in slide-in-from-top-1 duration-200 font-semibold"
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   🎉 Successfully joined! Check your email for confirmation.
//                 </motion.p>
//               )}
//             </div>
//           </motion.div>

//           {/* Key Features Grid */}
//           <motion.div 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
//             variants={itemVariants}
//           >
//             {keyFeatures.map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300"
//                 variants={featureVariants}
//                 custom={index}
//               >
//                 <div className="text-black mb-3">{feature.icon}</div>
//                 <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Additional Info */}
//           <motion.div 
//             className="text-gray-500 text-lg mb-8"
//             variants={itemVariants}
//           >
//             Join 10,000+ writers already on the waitlist • No spam, ever
//           </motion.div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.button
//           onClick={scrollToFeatures}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//           variants={itemVariants}
//           animate={{ y: [0, 10, 0] }}
//           transition={{ repeat: Infinity, duration: 2 }}
//         >
//           <ChevronDown size={32} />
//         </motion.button>
//       </motion.section>

//       {/* Featured Plans Section */}
//       <motion.section 
//         id="features-section"
//         className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={containerVariants}
//       >
//         <motion.div 
//           className="w-full max-w-7xl mx-auto"
//           variants={itemVariants}
//         >
//           {/* Section Header */}
//           <motion.div 
//             className="flex items-center justify-between mb-12"
//             variants={itemVariants}
//           >
//             <h2 className="text-black text-4xl md:text-5xl font-bold">Featured Plans</h2>
//             <button className="text-black text-xl font-medium hover:underline transition-all duration-200">
//               Explore All
//             </button>
//           </motion.div>

//           {/* Plans Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Idea to Impact Plan */}
//             <motion.div variants={cardVariants}>
//               <WobbleCard className="rounded-3xl p-6 text-black" style={{ backgroundColor: '#5fcca0' }}>
//                 <div className="text-sm font-medium mb-3 opacity-80">STRATEGY</div>
//                 <h3 className="text-2xl font-bold mb-4">Idea to Impact</h3>
//                 <p className="text-sm mb-6 opacity-90 leading-relaxed">
//                   Turn scattered thoughts into polished, structured content — fast — using AI-powered writing intelligence.
//                 </p>
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <div className="text-sm opacity-80 mb-1">Drafting Speed</div>
//                     <div className="text-lg font-bold">3× Faster</div>
//                   </div>
//                   <button className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
//                     <ArrowRight size={20} />
//                   </button>
//                 </div>
//               </WobbleCard>
//             </motion.div>

//             {/* Long-Term Edge Plan */}
//             <motion.div variants={cardVariants}>
//               <WobbleCard className="rounded-3xl p-6 text-white" style={{ backgroundColor: '#0a0a0a' }}>
//                 <div className="text-sm font-medium mb-3 opacity-80">PLAN</div>
//                 <h3 className="text-2xl font-bold mb-4">Long-Term Edge</h3>
//                 <p className="text-sm mb-6 opacity-90 leading-relaxed">
//                   Stay consistent with smart writing prompts, context memory, and progress tracking that adapts to you.
//                 </p>
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <div className="text-sm opacity-80 mb-1">Skill Growth</div>
//                     <div className="text-lg font-bold">noticeable improvement</div>
//                   </div>
//                   <button className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
//                     <ArrowRight size={20} />
//                   </button>
//                 </div>
//               </WobbleCard>
//             </motion.div>

//             {/* Focused Creation Plan */}
//             <motion.div variants={cardVariants}>
//               <WobbleCard className="rounded-3xl p-6 text-black" style={{ backgroundColor: '#cb9bfb' }}>
//                 <div className="text-sm font-medium mb-3 opacity-80">STRATEGY</div>
//                 <h3 className="text-2xl font-bold mb-4">Focused Creation</h3>
//                 <p className="text-sm mb-6 opacity-90 leading-relaxed">
//                   Distraction-free editor, intelligent outlining, and auto-citation keep you in flow — from intro to conclusion.
//                 </p>
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <div className="text-sm opacity-80 mb-1">Time Saved</div>
//                     <div className="text-lg font-bold">2 hours per paper</div>
//                   </div>
//                   <button className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
//                     <ArrowRight size={20} />
//                   </button>
//                 </div>
//               </WobbleCard>
//             </motion.div>

//             {/* Reliable Output Plan */}
//             <motion.div variants={cardVariants}>
//               <WobbleCard className="rounded-3xl p-6 text-black" style={{ backgroundColor: '#f9fd91' }}>
//                 <div className="text-sm font-medium mb-3 opacity-80">PLAN</div>
//                 <h3 className="text-2xl font-bold mb-4">Reliable Output</h3>
//                 <p className="text-sm mb-6 opacity-90 leading-relaxed">
//                   Whether it is a journal, research paper, or report — IntelliRite helps you write confidently, every time.
//                 </p>
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <div className="text-sm opacity-80 mb-1">Early Feedback</div>
//                     <div className="text-lg font-bold">writing co-pilot</div>
//                   </div>
//                   <button className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
//                     <ArrowRight size={20} />
//                   </button>
//                 </div>
//               </WobbleCard>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.section>
//     </div>
//   );
// };

// export default Hero;