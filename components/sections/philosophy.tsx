'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FadeUp, TextReveal } from '@/components/ui/motion'

export function PhilosophySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section
      ref={containerRef}
      className="relative py-40 md:py-56 bg-cocoa overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C7A36D' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Animated glow */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
      >
        <div 
          className="absolute inset-0 rounded-full blur-3xl animate-pulse-soft"
          style={{
            background: 'radial-gradient(circle, rgba(199, 163, 109, 0.2) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="container-luxury relative z-10">
        <motion.div style={{ opacity }} className="max-w-4xl mx-auto text-center">
          {/* Quote mark */}
          <FadeUp>
            <span className="text-7xl md:text-9xl font-serif text-gold/30 leading-none mb-8 block">
              "
            </span>
          </FadeUp>

          {/* Philosophy statement */}
          <FadeUp delay={0.2}>
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif text-parchment leading-snug mb-12">
              We don&apos;t just sell ingredients.{' '}
              <span className="text-gold">We preserve traditions,</span>{' '}
              honor craftsmen, and deliver heritage to your table.
            </blockquote>
          </FadeUp>

          {/* Divider */}
          <FadeUp delay={0.3}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-gold/40" />
              <span className="text-gold">✦</span>
              <div className="w-12 h-px bg-gold/40" />
            </div>
          </FadeUp>

          {/* Values */}
          <FadeUp delay={0.4}>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm tracking-[0.2em] uppercase text-parchment/60">
              <span>Authenticity</span>
              <span className="text-gold/40">·</span>
              <span>Quality</span>
              <span className="text-gold/40">·</span>
              <span>Heritage</span>
              <span className="text-gold/40">·</span>
              <span>Trust</span>
            </div>
          </FadeUp>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto text-parchment"
          preserveAspectRatio="none"
        >
          <path
            d="M0 100H1440V50C1440 50 1200 0 720 0C240 0 0 50 0 50V100Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  )
}

// Alternative: Newsletter/CTA section
export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-parchment">
      <div className="container-luxury">
        <div className="max-w-2xl mx-auto text-center">
          <FadeUp>
            <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              Stay Connected
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display-md font-serif text-ink mb-6">
              Join the{' '}
              <span className="text-gradient-gold">NAWAB Circle</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-muted mb-10">
              Be the first to discover new collections, exclusive offers, and stories 
              from our heritage kitchens.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-ivory border border-gold/20 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
              />
              <button
                type="submit"
                className="btn-elegant whitespace-nowrap"
              >
                <span>Subscribe</span>
              </button>
            </form>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-xs text-muted/60 mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

