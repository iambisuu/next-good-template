'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { 
    FaRobot, FaUserEdit, FaStream, FaFileSignature, FaProjectDiagram, FaPenNib
} from 'react-icons/fa'

interface FeatureCard {
  id: number
  icon: React.ReactNode
  title: string
  description: string
}


const featureCards: FeatureCard[] = [
    {
      id: 1,
      icon: <FaRobot className="w-10 h-10" />,
      title: "Fast Paper Generation",
      description: "Create full-length research papers in minutes with AI-powered section-by-section drafting."
    },
    {
      id: 2,
      icon: <FaUserEdit className="w-10 h-10" />,
      title: "Collaborative Editing", 
      description: "Edit, review, and refine each section with real-time feedback and user control."
    },
    {
      id: 3,
      icon: <FaStream className="w-10 h-10" />,
      title: "Structured Writing Flow",
      description: "Follow a guided research format from abstract to conclusion — with citations and diagrams."
    },
    {
      id: 4,
      icon: <FaFileSignature className="w-10 h-10" />,
      title: "Plagiarism & Citation Tools",
      description: "Integrated plagiarism checks and real references ensure originality and credibility."
    },
    {
      id: 5,
      icon: <FaProjectDiagram className="w-10 h-10" />,
      title: "Visual Aids Generator",
      description: "Add AI-generated flowcharts and diagrams directly into your paper to boost clarity."
    },
    {
      id: 6,
      icon: <FaPenNib className="w-10 h-10" />,
      title: "Scalable Writing Assistant",
      description: "Whether for research, reports, or journals — scale your writing needs with flexible AI tools."
    }
  ];
  

// Floating star elements
const FloatingStar = ({ delay = 0, size = 'small', left, top }: { delay?: number; size?: 'small' | 'medium' | 'large'; left: string; top: string }) => {
  const colors = ['rgba(0,0,0,0.6)', 'rgba(147,51,234,0.4)', 'rgba(59,130,246,0.4)', 'rgba(168,85,247,0.4)']
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  
  const sizeClasses = {
    small: 'w-0.5 h-0.5',
    medium: 'w-1 h-1', 
    large: 'w-1.5 h-1.5'
  }
  
  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} rounded-full`}
      animate={{
        y: [-5, 5, -5],
        x: [-3, 3, -3],
        opacity: [0.6, 1, 0.6]
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      style={{
        left: left,
        top: top,
        backgroundColor: randomColor
      }}
    />
  )
}

// Moving lines background
const MovingLines = () => (
  <div className="absolute inset-0 overflow-hidden">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-20"
        style={{
          width: '200px',
          top: `${(i + 1) * 12.5}%`,
          left: '-200px'
        }}
        animate={{
          x: ['-200px', 'calc(100vw + 200px)']
        }}
        transition={{
          duration: 8 + i * 0.5,
          repeat: Infinity,
          ease: 'linear',
          delay: i * 0.8
        }}
      />
    ))}
  </div>
)

const FeatureCardComponent = ({ card, index }: { card: FeatureCard; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          delay: index * 0.15,
          ease: [0.25, 0.1, 0.25, 1]
        }
      })
    }
  }, [isInView, controls, index])

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={controls}
      className="relative group"
    >
      {/* Card with exact styling from image */}
      <div id='features' className="bg-white border border-black/30 rounded-2xl p-8 hover:border-black/50 transition-all duration-300 min-h-[280px] flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg">
        {/* Icon - larger and centered */}
        <div className="mb-10 relative z-10">
          <div className="text-black text-4xl">
            {card.icon}
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-black mb-4 leading-tight relative z-10">
          {card.title}
        </h3>
        
        {/* Description */}
        <p className="text-black/60 text-base leading-relaxed max-w-xs relative z-10">
          {card.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function TeamPotentialSection() {
  return (
    <section className="relative min-h-screen bg-white py-20 px-4 overflow-hidden">
      {/* Animated background elements */}
      <MovingLines />
      
      {/* Background stars with stable positions */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { left: '5%', top: '10%' }, { left: '15%', top: '25%' }, { left: '25%', top: '8%' },
          { left: '35%', top: '20%' }, { left: '45%', top: '15%' }, { left: '55%', top: '12%' },
          { left: '65%', top: '22%' }, { left: '75%', top: '18%' }, { left: '85%', top: '14%' },
          { left: '10%', top: '40%' }, { left: '20%', top: '55%' }, { left: '30%', top: '45%' },
          { left: '40%', top: '60%' }, { left: '50%', top: '50%' }, { left: '60%', top: '65%' },
          { left: '70%', top: '55%' }, { left: '80%', top: '48%' }, { left: '90%', top: '42%' },
          { left: '8%', top: '75%' }, { left: '18%', top: '85%' }, { left: '28%', top: '78%' },
          { left: '38%', top: '88%' }, { left: '48%', top: '82%' }, { left: '58%', top: '90%' },
          { left: '68%', top: '85%' }, { left: '78%', top: '75%' }, { left: '88%', top: '80%' }
        ].map((position, i) => (
          <FloatingStar 
            key={i} 
            delay={i * 0.3} 
            size="small"
            left={position.left}
            top={position.top}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div id="features" className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
          Unlock Effortless Academic Writing  
          </h1>
          <p className="text-xl text-black/70 max-w-3xl mx-auto leading-relaxed">
          Generate research papers, journals, and reports faster with AI-powered tools
            <br />
            from structured drafting to citations, editing, and visuals.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <FeatureCardComponent 
              key={card.id} 
              card={card} 
              index={index}
            />
          ))}
        </div>

        {/* Made in Framer badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          viewport={{ once: true }}
          className="fixed bottom-6 right-6 z-20"
        >
       
        </motion.div>
      </div>
    </section>
  )
}