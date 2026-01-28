'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { cn, formatPrice, getUnitLabel } from '@/lib/utils'
import type { PriceSlab } from '@/types'

interface PriceSelectorProps {
  prices: PriceSlab[]
  pricingType: 'WEIGHT' | 'UNIT'
  onSelect?: (price: PriceSlab) => void
  className?: string
}

export function PriceSelector({
  prices,
  pricingType,
  onSelect,
  className,
}: PriceSelectorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedPrice = prices[selectedIndex]

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    onSelect?.(prices[index])
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Price display */}
      <div className="text-center">
        <motion.div
          key={selectedPrice.price}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-display-md font-serif text-ink"
        >
          {formatPrice(selectedPrice.price)}
        </motion.div>
        <motion.p
          key={`${selectedPrice.quantity}-${selectedPrice.unit}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="text-sm text-muted mt-1"
        >
          for {getUnitLabel(selectedPrice.unit, selectedPrice.quantity)}
        </motion.p>
      </div>

      {/* Pill selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {prices.map((price, index) => (
          <button
            key={price._id || index}
            onClick={() => handleSelect(index)}
            className={cn(
              'relative px-5 py-3 text-sm font-display rounded-full',
              'transition-all duration-400 ease-luxury',
              'border',
              selectedIndex === index
                ? 'bg-cocoa text-parchment border-cocoa shadow-soft'
                : 'bg-transparent text-muted border-cocoa/20 hover:border-gold/50 hover:text-cocoa'
            )}
          >
            {selectedIndex === index && (
              <motion.span
                layoutId="price-pill-bg"
                className="absolute inset-0 bg-cocoa rounded-full"
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
            <span className="relative z-10">
              {getUnitLabel(price.unit, price.quantity)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Compact variant for product cards
interface CompactPriceSelectorProps {
  prices: PriceSlab[]
  className?: string
}

export function CompactPriceSelector({ prices, className }: CompactPriceSelectorProps) {
  const minPrice = Math.min(...prices.map((p) => p.price))
  const maxPrice = Math.max(...prices.map((p) => p.price))

  if (prices.length === 1) {
    return (
      <span className={cn('font-display text-cocoa', className)}>
        {formatPrice(prices[0].price)}
      </span>
    )
  }

  return (
    <span className={cn('font-display text-cocoa', className)}>
      {formatPrice(minPrice)} – {formatPrice(maxPrice)}
    </span>
  )
}

// Inline selector for quick selection
interface InlinePriceSelectorProps {
  prices: PriceSlab[]
  selectedIndex: number
  onSelect: (index: number) => void
  className?: string
}

export function InlinePriceSelector({
  prices,
  selectedIndex,
  onSelect,
  className,
}: InlinePriceSelectorProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 p-1 bg-ivory rounded-full', className)}>
      {prices.map((price, index) => (
        <button
          key={price._id || index}
          onClick={() => onSelect(index)}
          className={cn(
            'relative px-4 py-2 text-xs font-display rounded-full',
            'transition-all duration-300 ease-luxury',
            selectedIndex === index
              ? 'text-parchment'
              : 'text-muted hover:text-cocoa'
          )}
        >
          {selectedIndex === index && (
            <motion.span
              layoutId="inline-pill"
              className="absolute inset-0 bg-cocoa rounded-full"
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            />
          )}
          <span className="relative z-10">
            {getUnitLabel(price.unit, price.quantity)}
          </span>
        </button>
      ))}
    </div>
  )
}

