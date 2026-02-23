'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomeClient() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { quote: "I've been struggling with my weight, sugar cravings and depression for years. With just a few sessions, my need to use food for comfort nearly vanished. I've lost over 40 pounds, and I've never felt better.", author: "Juliana" },
    { quote: "The stress in my life used to be overwhelming. Thanks to this program, I've learned effective ways to manage it and feel so much calmer.", author: "Isabella, 46" },
    { quote: "Anxiety was like a constant buzzing I couldn't escape. EFT was weird at first, but that tapping – it really works! I have the tools to manage it. It's like finally getting some peace in my head.", author: "Jessa, 23" },
    { quote: "I felt like I was dragging myself through every day. Nutrition helped a little, but EFT was the game-changer. Now, I have energy I haven't felt in years!", author: "Fiona, 43" },
    { quote: "Anxiety controlled my life. I was always tense and couldn't sleep, and it was exhausting. Diet and exercise helped, but EFT was the game-changer. Tapping made me feel calmer in ways I never thought possible.", author: "Mike, 31" }
  ];

  const handleLeadMagnetSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadMagnetSubmitted(true);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    const items = document.querySelectorAll('.faq-item');
    items[index]?.classList.toggle('active');
  };

  return (
    <>
      <header className={`fixed w-full top-0 z-100 transition-all duration-300 ${headerScrolled ? 'py-4 bg-obsidian/95 backdrop-blur-md' : 'py-8 bg-gradient-to-b from-obsidian to-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <span className="font-serif text-2xl text-gold tracking-widest">
              ANTONELA <span className="opacity-60">BUTUC</span>
            </span>
            <span className="block text-xs tracking-widest text-silver mt-1">
              MSc Nutritionist & Brain Health Coach
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#about" className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline">About</a>
            <a href="#services" className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline">Services</a>
            <a href="/shop.html" className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline">Shop</a>
            <a href="#testimonials" className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline">Stories</a>
            <a href="#faq" className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline">FAQ</a>
            <a href="https://antonelabutuc.com/contact/" className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline">Contact</a>
            <Link href="/ro" className="text-gold text-xs tracking-widest uppercase hover:text-champagne transition-colors no-underline">Română</Link>
            <Link href="/auth/signup" className="bg-gold text-obsidian px-6 py-2 text-xs tracking-widest uppercase hover:bg-champagne transition-colors no-underline">
              Pattern Tracker
            </Link>
          </nav>

          <button 
            className="lg:hidden flex flex-col gap-1.5 z-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className={`w-6 h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile nav */}
      <div className={`fixed inset-0 bg-obsidian/98 z-150 flex flex-col items-center justify-center gap-6 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors">About</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors">Services</a>
        <a href="/shop.html" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors">Shop</a>
        <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors">Stories</a>
        <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors">FAQ</a>
        <a href="https://antonelabutuc.com/contact/" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors">Contact</a>
        <Link href="/ro" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-gold tracking-widest">Română</Link>
        <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)} className="font-serif text-2xl text-gold tracking-widest">Pattern Tracker</Link>
      </div>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative">
        <div className="max-w-3xl px-8 animate-fade-in">
          <p className="text-xs tracking-ultra-wide uppercase text-gold mb-8 flex items-center gap-4">
            <span className="w-12 h-px bg-gold" />
            Holistic Health Coaching
          </p>
          <h1 className="font-serif text-7xl md:text-8xl font-light leading-tight mb-8">
            Heal – Grow – <em className="text-gold">Thrive</em>
          </h1>
          <p className="text-lg text-silver leading-relaxed max-w-xl mb-12">
            Helping high-achieving women navigate midlife with grace, strength, and purpose. Reclaim your energy, balance your hormones, and break free from the patterns keeping you stuck.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://antonelabutuc.com/contact/" className="border border-gold text-gold px-8 py-4 text-xs tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-all duration-500">
              Book Your Consultation
            </a>
            <Link href="/auth/signup" className="bg-gold text-obsidian px-8 py-4 text-xs tracking-widest uppercase hover:bg-champagne transition-all duration-500">
              Track Your Patterns
            </Link>
          </div>
        </div>
        
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-96 h-[550px] border border-gold/20 animate-fade-in overflow-hidden">
          <img src="/profile.png" alt="Antonela Butuc" className="w-full h-full object-cover opacity-90" />
        </div>

        <div className="absolute bottom-8 left-8 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-silver">SCROLL</span>
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent animate-pulse-slow" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-40 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="w-full aspect-[4/5] relative overflow-hidden">
              <img src="/profile.png" alt="Antonela Butuc" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-4 -left-4 right-4 -bottom-4 border border-gold/30 -z-10" />
          </div>
          
          <div>
            <p className="text-xs tracking-ultra-wide uppercase text-gold mb-8">The Approach</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Curated wellness for the exceptional
            </h2>
            <p className="text-silver leading-relaxed mb-6">
              I'm on a mission to help high-achieving women navigate the powerful transitions of midlife with grace, strength, and purpose. Through a holistic approach integrating nutrition, EFT (Emotional Freedom Techniques), brain health, and energetic alignment, I guide you to reclaim your energy, align with your body, and reconnect with the vibrant, confident woman you are.
            </p>
            <p className="text-silver leading-relaxed mb-8">
              With degrees from the University of Chester, UK and Carol Davila University of Medicine and Pharmacy, Romania, I bridge cutting-edge research with real-life practicality—guiding you through the confusion of nutrition, hormones, and brain health.
            </p>
            <div className="flex flex-wrap gap-4">
              {['15+ Years Experience', 'MSc Nutrition', 'Brain Health Coach', 'Master EFT Practitioner'].map((cred) => (
                <span key={cred} className="text-xs tracking-wide text-gold uppercase px-4 py-2 border border-gold/30">
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-8 text-center bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <span className="text-5xl text-gold/30 mb-8 block">☽</span>
          <p className="font-serif text-2xl md:text-3xl italic leading-relaxed">
            "True transformation embraces every aspect of our being—light and shadow, feminine and masculine. Through EFT and nutritional wisdom, we integrate the full spectrum of self, creating wholeness from within."
          </p>
        </div>
      </section>

      {/* Pattern Tracker CTA */}
      <section className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">
            Understand Your <em className="text-gold">Patterns</em>
          </h2>
          <p className="text-silver text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Track your energy, mood, sleep, and symptoms to discover personalized insights about your hormonal patterns. 
            No mainstream app shows you what this reveals about YOUR body.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { label: 'Daily Tracking', desc: 'Energy, mood, sleep, symptoms' },
              { label: 'Pattern Recognition', desc: 'Discover your unique patterns' },
              { label: 'Personalized Insights', desc: 'Actionable recommendations' }
            ].map((feature) => (
              <div key={feature.label} className="text-center">
                <p className="text-gold font-serif text-lg">{feature.label}</p>
                <p className="text-silver text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/auth/signup" className="bg-gold text-obsidian px-12 py-4 text-sm tracking-widest uppercase hover:bg-champagne transition-all duration-500 inline-block">
            Start Free Tracking
          </Link>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-32 px-8 bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">How We Work Together</h2>
            <p className="text-silver text-xs tracking-widest uppercase">Personalized Nutrition & Wellness</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { num: '01', icon: '🔬', name: 'Nutrition Consultations', desc: "Women's health, PMS, PCOS, perimenopause, menopause, weight management, metabolic syndrome, digestive disorders, brain health, and anxiety. In-clinic and online sessions available.", price: 'Initial €120 | Follow-up €95' },
              { num: '02', icon: '⚖️', name: 'EFT / Tapping Sessions', desc: 'Emotional Freedom Technique combines psychology and acupressure to address emotional, mental, and physical challenges. Release emotional blockages, reduce stress, and promote overall well-being.', price: '€100 per session' },
              { num: '03', icon: '🔮', name: 'Workshops & Talks', desc: 'Empowering wellbeing talks and workshops for schools and organizations. Focus on stress management, work-life balance, mental health, and the crucial role of nutrition.', price: 'Contact for details' },
              { num: '04', icon: '✨', name: 'Transformation Programs', desc: 'Comprehensive 3-6 month programs combining nutrition, EFT, and brain health coaching. For those ready for deep, lasting transformation in their relationship with food, body, and self.', price: 'From €297' }
            ].map((service) => (
              <a key={service.num} href="https://antonelabutuc.com/contact/" className="card block hover:-translate-y-1 no-underline text-inherit">
                <div className="text-xs tracking-widest text-gold/70 mb-4">{service.num}</div>
                <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-2xl mb-6 mx-auto">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl text-center mb-4">{service.name}</h3>
                <p className="text-silver text-sm leading-relaxed text-center mb-6">{service.desc}</p>
                <p className="text-gold text-xs tracking-widest text-center">{service.price}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnet */}
      <section id="lead-magnet" className="py-32 px-8 bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl mb-4">Hormonal Balance Guide</h2>
            <p className="text-silver leading-relaxed mb-2">
              An e-book guide that includes practical resources to help you balance your hormones naturally.
            </p>
            <p className="text-gold italic">
              Get the first step to increase your energy, lose weight and feel like yourself again.
            </p>
          </div>
          
          {leadMagnetSubmitted ? (
            <div className="text-center py-8">
              <h3 className="font-serif text-xl text-gold mb-4">Thank You!</h3>
              <p className="text-silver">Check your inbox for your free Hormonal Balance Guide.</p>
            </div>
          ) : (
            <form onSubmit={handleLeadMagnetSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-silver mb-2">Your Name</label>
                <input type="text" required className="input-field" placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-silver mb-2">Email Address</label>
                <input type="email" required className="input-field" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Yes, I Want It
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-gold tracking-widest mb-16">Client Love</h2>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full px-4">
                  <p className="font-serif text-2xl italic leading-relaxed mb-8">"{t.quote}"</p>
                  <p className="text-gold text-xs tracking-widest">— {t.author}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`w-2.5 h-2.5 rounded-full border border-gold transition-colors ${i === testimonialIndex ? 'bg-gold' : ''}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-8 bg-gradient-to-b from-transparent via-gold/5 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-0">
            {[
              {
                q: 'How does your coaching process work?',
                a: "My coaching process is rooted in a holistic and individualised approach. It begins with an in-depth assessment of your symptoms, unique challenges, goals, and values. Together, we'll develop a personalised roadmap that addresses gut health, hormonal balance, and blood sugar regulation. Through a combination of mindset and emotional freedom technique work, personalised nutritional strategies, and ongoing accountability, I will guide you towards achieving your health objectives step by step."
              },
              {
                q: 'What makes your coaching style unique and effective?',
                a: "The integration of emotional well-being and nutritional expertise sets my coaching style apart. I create lasting and sustainable transformations by addressing health's physical and emotional aspects. My extensive background as a master EFT practitioner, brain health coach, and nutritional therapist equips me with the skills to support your holistic well-being and empower you to overcome any obstacles that may arise during your journey."
              },
              {
                q: 'Who is an ideal candidate for your coaching services?',
                a: "My coaching services suit individuals dealing with gut issues, hormonal imbalances, and blood sugar regulation challenges. If you're seeking a comprehensive approach to address these health aspects and are open to making positive changes in your life, my coaching is designed to support your specific needs and help you achieve your health and happiness goals."
              },
              {
                q: 'What kind of transformation can a client expect?',
                a: "Clients can expect a profound transformation that extends beyond physical health. By addressing the root causes of health challenges and implementing personalised strategies, clients often experience increased energy, improved digestion, hormonal balance, weight management, enhanced mental clarity, and a renewed sense of confidence and well-being."
              }
            ].map((faq, i) => (
              <div key={i} className="faq-item border-b border-gold/15">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full py-8 flex items-center justify-between text-left"
                >
                  <h3 className="font-serif text-lg pr-8">{faq.q}</h3>
                  <span className="text-gold text-2xl transition-transform duration-300">+</span>
                </button>
                <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                  <p className="text-silver leading-relaxed pb-8">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8 border-t border-gold/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-4xl mb-4">Let's Connect</h2>
            <p className="text-silver leading-relaxed mb-8">
              Ready to begin your transformation journey? Reach out to schedule a consultation or ask any questions.
            </p>
            <div className="text-silver">
              <p className="mb-2">Dublin, Ireland</p>
              <p className="mb-2">
                <a href="mailto:hello@antonelabutuc.com" className="text-gold hover:underline">hello@antonelabutuc.com</a>
              </p>
            </div>
          </div>
          
          {contactSubmitted ? (
            <div className="text-center py-12">
              <h3 className="font-serif text-xl text-gold mb-4">Message Sent!</h3>
              <p className="text-silver">Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-xs tracking-widest uppercase text-silver mb-2">Name</label>
                <input type="text" required className="input-field" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-silver mb-2">Email</label>
                <input type="email" required className="input-field" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs tracking-widest uppercase text-silver mb-2">Message</label>
                <textarea required rows={4} className="input-field resize-none" placeholder="How can I help?" />
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-serif text-xl text-gold tracking-widest">ANTONELA BUTUC</span>
        <div className="flex gap-8">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-silver text-xs tracking-wide hover:text-gold transition-colors no-underline">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-silver text-xs tracking-wide hover:text-gold transition-colors no-underline">LinkedIn</a>
        </div>
        <span className="text-silver text-xs">© {new Date().getFullYear()} Antonela Butuc. All rights reserved.</span>
      </footer>

      <style jsx>{`
        .z-100 { z-index: 100; }
        .z-150 { z-index: 150; }
        .z-200 { z-index: 200; }
        
        .faq-item.active .faq-answer {
          max-height: 500px;
        }
        
        .faq-item.active button span:last-child {
          transform: rotate(45deg);
        }
        
        .no-underline {
          text-decoration: none;
        }
        
        .text-inherit {
          color: inherit;
        }
      `}</style>
    </>
  );
}
