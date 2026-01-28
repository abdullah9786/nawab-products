export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-parchment">
      <div className="flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <span className="text-2xl font-serif tracking-wider text-ink">NAWAB</span>
          <span className="text-xs tracking-[0.3em] text-gold uppercase -mt-0.5">KHANA</span>
        </div>
        
        {/* Loading indicator */}
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

