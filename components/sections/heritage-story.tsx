'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { FadeUp, TextReveal, Parallax } from '@/components/ui/motion'

export function HeritageStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1])
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden bg-parchment"
    >
      {/* Decorative line */}
      <div className="container-luxury mb-16">
        <div className="divider-gold" />
      </div>

      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <Parallax speed={0.3}>
              <motion.div
                style={{ scale: imageScale }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80"
                  alt="Traditional spice preparation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 to-transparent" />
                
                {/* Gold frame accent */}
                <div className="absolute inset-4 border border-gold/30 rounded-xl pointer-events-none" />
              </motion.div>
            </Parallax>

            {/* Floating accent image - positioned at bottom right of image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-6 right-4 lg:-right-6 w-28 h-36 rounded-xl overflow-hidden shadow-xl border-4 border-parchment hidden md:block z-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=80"
                alt="Spices detail"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
            <FadeUp>
              <span className="text-xs tracking-[0.3em] uppercase text-gold mb-6 block">
                Our Heritage
              </span>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="text-display-md font-serif text-ink mb-8 leading-tight">
                Centuries of Tradition,{' '}
                <span className="text-gradient-gold">Curated for You</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  In the royal kitchens of ancient India, spices were considered as precious as gold. 
                  Master craftsmen would spend lifetimes perfecting the art of selection, blending, 
                  and preservation — creating flavors that would grace the tables of emperors.
                </p>
                <p>
                  NAWAB KHANA carries forward this legacy. Each ingredient is sourced directly from 
                  heritage farms, where traditional cultivation methods have been preserved for generations. 
                  Our dry fruits are sun-kissed in the valleys of Kashmir, while our masalas are 
                  stone-ground using recipes guarded for centuries.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-10 flex items-center gap-8">
                <div>
                  <span className="text-4xl font-serif text-gold">50+</span>
                  <p className="text-sm text-muted mt-1">Years of Excellence</p>
                </div>
                <div className="w-px h-12 bg-gold/30" />
                <div>
                  <span className="text-4xl font-serif text-gold">100%</span>
                  <p className="text-sm text-muted mt-1">Natural & Pure</p>
                </div>
                <div className="w-px h-12 bg-gold/30" />
                <div>
                  <span className="text-4xl font-serif text-gold">12</span>
                  <p className="text-sm text-muted mt-1">Heritage Regions</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

