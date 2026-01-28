'use client'

import { motion } from 'framer-motion'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/motion'

const processSteps = [
  {
    number: '01',
    title: 'Sourcing',
    description: 'We travel to heritage farms and valleys to source the finest ingredients directly from trusted cultivators.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 4V12M24 12C28.4183 12 32 15.5817 32 20C32 24.4183 28.4183 28 24 28C19.5817 28 16 24.4183 16 20C16 15.5817 19.5817 12 24 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 36C12 36 16 32 24 32C32 32 36 36 36 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 32V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 40H30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Selection',
    description: 'Each ingredient is hand-inspected, ensuring only the highest quality makes it to our collection.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 24L22 28L30 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Crafting',
    description: 'Traditional methods meet modern precision. Stone-ground, slow-roasted, and carefully blended.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 32L16 24L24 32L40 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 16H40V24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 40H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Preservation',
    description: 'Vacuum-sealed and stored in optimal conditions to lock in freshness and authentic flavors.',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="28" height="32" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 16H38" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M24 16V8" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="24" cy="28" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
]

export function ProcessSection() {
  return (
    <section className="py-32 md:py-40 bg-parchment relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30">
          <div 
            className="absolute inset-0 rounded-full animate-pulse-soft"
            style={{
              background: 'radial-gradient(circle, rgba(199, 163, 109, 0.15) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <FadeUp>
            <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
              Our Craft
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display-md font-serif text-ink max-w-2xl mx-auto">
              The Art of{' '}
              <span className="text-gradient-gold">Perfection</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-muted mt-6 max-w-xl mx-auto">
              Every product in our collection goes through a meticulous process, 
              ensuring authenticity and uncompromising quality.
            </p>
          </FadeUp>
        </div>

        {/* Process Steps */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {processSteps.map((step, index) => (
            <StaggerItem key={step.number}>
              <ProcessCard step={step} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

interface ProcessCardProps {
  step: {
    number: string
    title: string
    description: string
    icon: React.ReactNode
  }
  index: number
}

function ProcessCard({ step, index }: ProcessCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      {/* Connector line (hidden on last item) */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-12 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
            className="w-full h-full bg-gradient-to-r from-gold/40 to-gold/10 origin-left"
          />
        </div>
      )}

      <div className="text-center p-8 rounded-2xl bg-ivory/50 border border-gold/10 transition-all duration-500 group-hover:bg-ivory group-hover:shadow-soft group-hover:border-gold/20">
        {/* Number */}
        <span className="text-xs font-display tracking-widest text-gold/60 mb-6 block">
          {step.number}
        </span>

        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-parchment text-gold mb-6 transition-transform duration-500 group-hover:scale-110">
          {step.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif text-ink mb-4">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

