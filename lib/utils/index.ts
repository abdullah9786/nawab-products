import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price in INR
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Generate slug from string
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Truncate text
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

// Debounce function
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Format date
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// Get unit label
export function getUnitLabel(unit: string | undefined, quantity: number): string {
  if (!unit) return quantity.toString()
  
  const unitMap: Record<string, { singular: string; plural: string }> = {
    g: { singular: 'gram', plural: 'grams' },
    kg: { singular: 'kg', plural: 'kg' },
    piece: { singular: 'piece', plural: 'pieces' },
    dozen: { singular: 'dozen', plural: 'dozens' },
    pack: { singular: 'pack', plural: 'packs' },
  }
  
  const unitInfo = unitMap[unit.toLowerCase()] || { singular: unit, plural: unit }
  
  // For grams, show as "250g" format
  if (unit.toLowerCase() === 'g' || unit.toLowerCase() === 'kg') {
    return `${quantity}${unit}`
  }
  
  return `${quantity} ${quantity === 1 ? unitInfo.singular : unitInfo.plural}`
}

// Lerp (linear interpolation)
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Map value from one range to another
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

// Get random number in range
export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// Check if we're on the client side
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

// Serialize MongoDB document
export function serializeDoc<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc))
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

