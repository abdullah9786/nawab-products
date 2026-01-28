'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-cocoa text-parchment hover:bg-cocoa/90',
  secondary: 'bg-ivory text-ink hover:bg-ivory/80',
  outline: 'bg-transparent border border-cocoa/30 text-cocoa hover:border-gold hover:bg-gold/5',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  gold: 'bg-gradient-gold text-parchment shadow-gold hover:shadow-gold-lg',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'font-display tracking-wider uppercase',
          'rounded-full overflow-hidden',
          'transition-all duration-400 ease-luxury',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Loading...
          </span>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
          </>
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// Elegant CTA Button with hover effect
interface CTAButtonProps extends ButtonProps {
  arrow?: boolean
}

export function CTAButton({ children, className, arrow = true, ...props }: CTAButtonProps) {
  return (
    <Button
      variant="primary"
      size="lg"
      className={cn(
        'group relative overflow-hidden',
        className
      )}
      icon={
        arrow ? (
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        ) : undefined
      }
      iconPosition="right"
      {...props}
    >
      {children}
    </Button>
  )
}

// Text Link Button
interface TextLinkProps {
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
}

export function TextLink({ children, href, className, onClick }: TextLinkProps) {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center gap-1',
        'text-sm font-display tracking-wider uppercase text-cocoa',
        'transition-colors duration-300',
        'hover:text-gold',
        'group',
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute left-0 -bottom-px w-full h-px bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </span>
      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </Component>
  )
}

