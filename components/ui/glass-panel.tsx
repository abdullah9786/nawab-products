'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  opacity?: 'light' | 'medium' | 'heavy'
  border?: boolean
  glow?: boolean
  animate?: boolean
}

const blurMap = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
}

const opacityMap = {
  light: 'bg-white/50',
  medium: 'bg-white/70',
  heavy: 'bg-white/85',
}

export function GlassPanel({
  children,
  className,
  blur = 'lg',
  opacity = 'medium',
  border = true,
  glow = false,
  animate = true,
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        blurMap[blur],
        opacityMap[opacity],
        border && 'border border-white/40',
        glow && 'shadow-glass',
        className
      )}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={animate ? { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } : undefined}
      {...props}
    >
      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />
      
      {/* Gold edge highlight */}
      {glow && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(199,163,109,0.2) 0%, transparent 30%)',
          }}
          aria-hidden="true"
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

// Floating Glass Card variant
interface FloatingGlassCardProps extends GlassPanelProps {
  hoverEffect?: boolean
}

export function FloatingGlassCard({
  children,
  className,
  hoverEffect = true,
  ...props
}: FloatingGlassCardProps) {
  return (
    <GlassPanel
      className={cn(
        'transition-all duration-500 ease-luxury',
        hoverEffect && 'hover:shadow-glass-hover hover:-translate-y-1',
        className
      )}
      glow
      {...props}
    >
      {children}
    </GlassPanel>
  )
}

