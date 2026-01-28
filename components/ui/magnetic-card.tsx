'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MagneticCardProps {
  children: ReactNode
  className?: string
  strength?: number
  radius?: number
}

export function MagneticCard({
  children,
  className,
  strength = 0.15,
  radius = 200,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  const springConfig = { stiffness: 150, damping: 15 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)
  
  // Subtle shadow movement
  const shadowX = useTransform(xSpring, (val) => val * 0.5)
  const shadowY = useTransform(ySpring, (val) => val * 0.5)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)
    
    if (distance < radius) {
      const factor = 1 - distance / radius
      x.set(distX * strength * factor)
      y.set(distY * strength * factor)
      rotateX.set(-distY * 0.1 * factor)
      rotateY.set(distX * 0.1 * factor)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformPerspective: 1000,
      }}
      className={cn('will-change-transform', className)}
    >
      <motion.div
        style={{
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([latestX, latestY]: number[]) =>
              `${-latestX}px ${-latestY + 8}px 32px rgba(0, 0, 0, 0.06)`
          ),
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Magnetic Button variant
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: 200, damping: 20 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    x.set((e.clientX - centerX) * 0.2)
    y.set((e.clientY - centerY) * 0.2)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className={cn('will-change-transform', className)}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}

