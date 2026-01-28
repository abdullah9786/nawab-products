'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, createContext, useContext, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Accordion Context
interface AccordionContextValue {
  openItems: string[]
  toggle: (id: string) => void
  allowMultiple: boolean
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

// Accordion Root
interface AccordionProps {
  children: ReactNode
  className?: string
  allowMultiple?: boolean
  defaultOpen?: string[]
}

export function Accordion({
  children,
  className,
  allowMultiple = false,
  defaultOpen = [],
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, allowMultiple }}>
      <div className={cn('divide-y divide-cocoa/10', className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

// Accordion Item
interface AccordionItemProps {
  children: ReactNode
  value: string
  className?: string
}

const AccordionItemContext = createContext<string>('')

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn('py-4', className)}>{children}</div>
    </AccordionItemContext.Provider>
  )
}

// Accordion Trigger
interface AccordionTriggerProps {
  children: ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const context = useContext(AccordionContext)
  const itemId = useContext(AccordionItemContext)
  
  if (!context) throw new Error('AccordionTrigger must be used within Accordion')

  const isOpen = context.openItems.includes(itemId)

  return (
    <button
      onClick={() => context.toggle(itemId)}
      className={cn(
        'flex w-full items-center justify-between',
        'text-left font-display tracking-wide text-ink',
        'transition-colors duration-300 hover:text-cocoa',
        className
      )}
      aria-expanded={isOpen}
    >
      <span className="text-heading-md font-serif">{children}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-shrink-0 ml-4 text-gold"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
    </button>
  )
}

// Accordion Content
interface AccordionContentProps {
  children: ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const context = useContext(AccordionContext)
  const itemId = useContext(AccordionItemContext)
  
  if (!context) throw new Error('AccordionContent must be used within Accordion')

  const isOpen = context.openItems.includes(itemId)

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className={cn('pt-4 text-muted leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

