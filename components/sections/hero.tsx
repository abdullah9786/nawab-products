'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

// Floating particle component
function FloatingParticle({ delay = 0, duration = 10 }: { delay?: number; duration?: number }) {
  const randomX = Math.random() * 100
  const randomSize = 2 + Math.random() * 4
  
  return (
    <motion.div
      className="absolute rounded-full bg-gold/30"
      style={{
        width: randomSize,
        height: randomSize,
        left: `${randomX}%`,
        bottom: '-10%',
      }}
      animate={{
        y: [0, -window?.innerHeight * 1.2 || -1200],
        x: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-parchment"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Gradient background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(227, 184, 115, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Ambient glow blobs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(199, 163, 109, 0.3) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(156, 107, 78, 0.3) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Floating spice particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.8} duration={12 + Math.random() * 8} />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold mb-8"
        >
          Est. Heritage Collection
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-display-xl font-serif text-ink mb-6"
        >
          Pure Ingredients.{' '}
          <span className="text-gradient-gold">Royal Traditions.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          From heritage kitchens to modern homes. Experience the finest collection of 
          premium dry fruits and artisanal masalas, crafted with centuries of tradition.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/products"
            className="btn-elegant"
          >
            <span>Explore Collection</span>
          </a>
          <a
            href="#story"
            className="btn-elegant-outline"
          >
            <span>Our Story</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-muted">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </motion.div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-gold/20" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r border-t border-gold/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l border-b border-gold/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-gold/20" />
    </section>
  )
}

