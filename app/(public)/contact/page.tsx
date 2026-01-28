import { Metadata } from 'next'
import { Navigation, Footer, CursorGlow } from '@/components/ui'
import { GlassPanel } from '@/components/ui/glass-panel'
import { FadeUp } from '@/components/ui/motion'

export const metadata: Metadata = {
  title: 'Contact Us | NAWAB KHANA',
  description:
    'Get in touch with NAWAB KHANA. We\'d love to hear from you about orders, partnerships, or just to say hello.',
}

export default function ContactPage() {
  return (
    <>
      <CursorGlow />
      <Navigation />
      
      <main className="min-h-screen bg-parchment pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <FadeUp>
                <span className="text-xs tracking-[0.3em] uppercase text-gold mb-4 block">
                  Get in Touch
                </span>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-display-md font-serif text-ink mb-4">
                  Let&apos;s <span className="text-gradient-gold">Connect</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-muted max-w-lg mx-auto">
                  Have questions about our products or interested in a partnership? 
                  We&apos;d love to hear from you.
                </p>
              </FadeUp>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <FadeUp delay={0.3}>
                <GlassPanel className="p-8 rounded-3xl" glow>
                  <h2 className="text-xl font-serif text-ink mb-6">Send a Message</h2>
                  <form className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-parchment/50 border border-cocoa/20 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-parchment/50 border border-cocoa/20 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Subject</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-parchment/50 border border-cocoa/20 text-ink focus:outline-none focus:border-gold transition-colors duration-300">
                        <option>General Inquiry</option>
                        <option>Product Question</option>
                        <option>Wholesale / Partnership</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ink mb-2">Message</label>
                      <textarea
                        rows={5}
                        placeholder="Your message..."
                        className="w-full px-4 py-3 rounded-xl bg-parchment/50 border border-cocoa/20 text-ink placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                      />
                    </div>
                    <button type="submit" className="w-full btn-elegant py-4">
                      <span>Send Message</span>
                    </button>
                  </form>
                </GlassPanel>
              </FadeUp>

              {/* Contact Info */}
              <FadeUp delay={0.4}>
                <div className="space-y-8">
                  <GlassPanel className="p-8 rounded-3xl">
                    <h2 className="text-xl font-serif text-ink mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M2.5 5.833L10 10.833L17.5 5.833M3.333 15H16.667C17.127 15 17.5 14.627 17.5 14.167V5.833C17.5 5.373 17.127 5 16.667 5H3.333C2.873 5 2.5 5.373 2.5 5.833V14.167C2.5 14.627 2.873 15 3.333 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink mb-1">Email</p>
                          <a href="mailto:hello@nawabkhana.com" className="text-muted hover:text-gold transition-colors">
                            hello@nawabkhana.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M17.5 14.167V16.667C17.5 17.127 17.127 17.5 16.667 17.5H15.833C8.93 17.5 3.333 11.903 3.333 5V4.167C3.333 3.707 3.707 3.333 4.167 3.333H6.667L8.333 7.5L6.25 9.167C7.283 11.217 8.95 12.883 11 13.917L12.667 11.833L16.833 13.5L17.5 14.167Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink mb-1">Phone</p>
                          <a href="tel:+919323379975" className="text-muted hover:text-gold transition-colors">
                            +91 93233 79975
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 10.833C11.381 10.833 12.5 9.714 12.5 8.333C12.5 6.952 11.381 5.833 10 5.833C8.619 5.833 7.5 6.952 7.5 8.333C7.5 9.714 8.619 10.833 10 10.833Z" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M10 17.5C10 17.5 16.667 13.333 16.667 8.333C16.667 4.651 13.682 1.667 10 1.667C6.318 1.667 3.333 4.651 3.333 8.333C3.333 13.333 10 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink mb-1">Address</p>
                          <p className="text-muted">
                            123 Heritage Lane<br />
                            Mumbai, Maharashtra 400001<br />
                            India
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlassPanel>

                  <GlassPanel className="p-8 rounded-3xl">
                    <h2 className="text-xl font-serif text-ink mb-4">Business Hours</h2>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Monday - Friday</span>
                        <span className="text-ink">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Saturday</span>
                        <span className="text-ink">10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Sunday</span>
                        <span className="text-ink">Closed</span>
                      </div>
                    </div>
                  </GlassPanel>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  )
}

