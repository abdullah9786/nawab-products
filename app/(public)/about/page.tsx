import { Metadata } from 'next'
import Image from 'next/image'
import { Navigation, Footer, CursorGlow } from '@/components/ui'
import { FadeUp, Parallax } from '@/components/ui/motion'

export const metadata: Metadata = {
  title: 'Our Story | About NAWAB KHANA',
  description:
    'Discover the heritage and passion behind NAWAB KHANA. Learn about our commitment to authentic, premium quality dry fruits and artisanal masalas.',
}

export default function AboutPage() {
  return (
    <>
      <CursorGlow />
      <Navigation />
      
      <main className="min-h-screen bg-parchment">
        {/* Hero */}
        <section className="pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="container-luxury">
            <div className="max-w-3xl">
              <FadeUp>
                <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
                  Our Story
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-display-lg font-serif text-ink mb-6">
                  A Legacy of{' '}
                  <span className="text-gradient-gold">Excellence</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-xl text-muted leading-relaxed">
                  For generations, our family has been dedicated to sourcing and delivering 
                  the finest dry fruits and spices from heritage regions around the world.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="pb-24 md:pb-32">
          <div className="container-luxury">
            <Parallax speed={0.2}>
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1600&q=80"
                  alt="Heritage spice preparation"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </div>
            </Parallax>
          </div>
        </section>

        {/* Values */}
        <section className="pb-24 md:pb-32">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FadeUp>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16 4V8M16 24V28M28 16H24M8 16H4M24.485 7.515L21.657 10.343M10.343 21.657L7.515 24.485M24.485 24.485L21.657 21.657M10.343 10.343L7.515 7.515" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-ink mb-4">Authenticity</h3>
                  <p className="text-muted">
                    Every product is sourced directly from heritage regions, 
                    ensuring genuine quality and traditional preparation methods.
                  </p>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16 4L20 12L28 13.5L22 19.5L23.5 28L16 24L8.5 28L10 19.5L4 13.5L12 12L16 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-ink mb-4">Quality</h3>
                  <p className="text-muted">
                    Rigorous quality control at every step ensures only 
                    the finest ingredients make it to your table.
                  </p>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 8V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-ink mb-4">Heritage</h3>
                  <p className="text-muted">
                    Preserving centuries-old traditions while bringing 
                    the finest flavors to modern homes.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 md:py-32 bg-ivory">
          <div className="container-narrow">
            <div className="prose prose-lg mx-auto text-center">
              <FadeUp>
                <p className="text-muted leading-relaxed">
                  NAWAB KHANA was born from a simple yet profound belief: that the finest 
                  ingredients, sourced with care and prepared with tradition, can transform 
                  everyday meals into extraordinary experiences.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-muted leading-relaxed">
                  Our journey began in the bustling spice markets of India, where generations 
                  of our family learned the art of identifying quality—the subtle differences 
                  in aroma, color, and texture that separate the ordinary from the exceptional.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-muted leading-relaxed">
                  Today, we continue this legacy, traveling to remote valleys and heritage 
                  farms to bring you products that carry the essence of their origin—each one 
                  a testament to the craftsmen who have perfected their art over centuries.
                </p>
              </FadeUp>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  )
}

