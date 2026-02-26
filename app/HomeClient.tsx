'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomeClient() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [leadMagnetSubmitted, setLeadMagnetSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 80);
      setBackToTopVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    { quote: "I've been struggling with my weight, sugar cravings and depression for years. With just a few sessions, my need to use food for comfort nearly vanished. I've lost over 40 pounds, and I've never felt better.", author: "Juliana" },
    { quote: "The stress in my life used to be overwhelming. Thanks to this program, I've learned effective ways to manage it and feel so much calmer.", author: "Isabella, 46" },
    { quote: "Anxiety was like a constant buzzing I couldn't escape. EFT was weird at first, but that tapping \u2013 it really works! It's like finally getting some peace in my head.", author: "Jessa, 23" },
    { quote: "I felt like I was dragging myself through every day. EFT was the game-changer. Now, I have energy I haven't felt in years!", author: "Fiona, 43" },
    { quote: "Tapping made me feel calmer in ways I never thought possible. Diet and exercise helped, but EFT was what truly changed everything.", author: "Mike, 31" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleLeadMagnetSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLeadMagnetSubmitted(true);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    const items = document.querySelectorAll('.faq-item');
    const item = items[index];
    if (!item) return;
    const isActive = item.classList.contains('active');
    items.forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  };

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`fixed w-full top-0 z-[100] flex justify-between items-center transition-all duration-300 ${
          headerScrolled
            ? 'py-4 px-8 lg:px-20 bg-ivory/[0.96] backdrop-blur-[14px] shadow-[0_1px_0_rgba(201,169,98,0.22),0_4px_24px_rgba(28,26,23,0.05)]'
            : 'py-7 px-8 lg:px-20 bg-gradient-to-b from-ivory via-ivory/80 to-transparent'
        }`}
      >
        <Link href="/" className="no-underline">
          <span className="font-serif text-[1.55rem] font-light tracking-[0.42em] text-gold leading-none">
            ANTONELA <span className="opacity-60">BUTUC</span>
          </span>
          <span className="block text-[0.52rem] tracking-[0.28em] text-stone mt-1.5 font-sans font-light">
            MSc Nutritionist &amp; Brain Health Coach
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-14">
          {[
            { href: '#about', label: 'About' },
            { href: '#services', label: 'Services' },
            { href: '/shop.html', label: 'Shop' },
            { href: '#testimonials', label: 'Stories' },
            { href: '#faq', label: 'FAQ' },
            { href: 'https://antonelabutuc.com/contact/', label: 'Contact' },
            { href: '/ro', label: 'Romana', isLink: true }
          ].map((item) =>
            item.isLink ? (
              <Link
                key={item.label}
                href={item.href}
                className="text-stone text-[0.72rem] font-light tracking-[0.22em] uppercase hover:text-gold transition-colors no-underline relative
                  after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-stone text-[0.72rem] font-light tracking-[0.22em] uppercase hover:text-gold transition-colors no-underline relative
                  after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            )
          )}

          {/* Tracker CTA — separated by a fine divider */}
          <div className="w-px h-5 bg-gold/25 ml-2" />
          <Link
            href="/tracker"
            className="group relative flex items-center gap-3 bg-terracotta text-ivory no-underline px-6 py-2.5 text-[0.62rem] font-normal tracking-[0.22em] uppercase transition-all duration-[400ms] hover:bg-charcoal hover:shadow-[0_4px_20px_rgba(184,100,74,0.25)]"
          >
            <span className="relative z-[1] flex items-center gap-2.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-70">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              Pattern Tracker
            </span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="lg:hidden flex flex-col gap-[5px] cursor-pointer z-[200]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-[26px] h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`} />
          <span className={`w-[26px] h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[26px] h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`} />
        </button>
      </header>

      {/* Mobile nav */}
      <div
        className={`fixed inset-0 bg-ivory/[0.98] z-[150] flex flex-col justify-center items-center gap-9 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {['About', 'Services', 'Shop', 'Stories', 'FAQ', 'Contact', 'Romana'].map((label) => (
          <a
            key={label}
            href={
              label === 'Shop' ? '/shop.html' :
              label === 'Contact' ? 'https://antonelabutuc.com/contact/' :
              label === 'Romana' ? '/ro' :
              `#${label.toLowerCase()}`
            }
            onClick={() => setMobileMenuOpen(false)}
            className="text-charcoal no-underline font-serif text-[2.2rem] tracking-[0.18em] hover:text-terracotta transition-colors"
          >
            {label}
          </a>
        ))}
        {/* Tracker CTA */}
        <div className="mt-4 pt-8 border-t border-gold/20 flex flex-col items-center gap-3">
          <Link
            href="/tracker"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 bg-terracotta text-ivory no-underline px-10 py-4 text-[0.68rem] font-normal tracking-[0.25em] uppercase transition-all duration-300 hover:bg-charcoal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            Pattern Tracker
          </Link>
          <span className="text-[0.55rem] tracking-[0.2em] text-feather uppercase">Track your hormonal patterns</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] relative">
        {/* Left panel */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-40 pb-24 relative bg-ivory">
          {/* Decorative arcs */}
          <div className="absolute -bottom-[120px] -right-[120px] w-[500px] h-[500px] rounded-full border border-gold/[0.12] pointer-events-none hidden lg:block" />
          <div className="absolute -bottom-[60px] -right-[60px] w-[300px] h-[300px] rounded-full border border-gold/20 pointer-events-none hidden lg:block" />

          <p className="text-[0.62rem] tracking-ultra-wide uppercase text-terracotta mb-8 flex items-center gap-5 animate-slide-up">
            <span className="w-10 h-px bg-terracotta" />
            Holistic Health Coaching
          </p>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.8rem] font-light leading-[1.02] mb-9 text-charcoal animate-slide-up">
            Heal &ndash; Grow &ndash;<br /><em className="italic text-gold">Thrive</em>
          </h1>

          <p className="text-[1.05rem] font-light text-stone leading-[1.95] mb-14 max-w-[480px] animate-slide-up-delay-1">
            Helping high-achieving women navigate midlife with grace, strength, and purpose. Reclaim your energy, balance your hormones, and break free from the patterns keeping you stuck.
          </p>

          <div className="flex flex-wrap gap-6 animate-slide-up-delay-2">
            <a
              href="https://antonelabutuc.com/contact/"
              className="btn-primary-bold"
            >
              Book a Consultation
            </a>
            <a href="#about" className="btn-outline-bold">
              Learn More
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-8 lg:left-20 flex flex-col items-center gap-2">
            <span className="text-[0.6rem] tracking-[0.35em] text-feather">SCROLL</span>
            <div className="w-px h-[50px] bg-gradient-to-b from-gold to-transparent animate-scroll-pulse mt-3" />
          </div>
        </div>

        {/* Right panel — terracotta with image */}
        <div className="relative bg-terracotta overflow-hidden hidden lg:block">
          <div className="absolute -top-[100px] -right-[100px] w-[500px] h-[500px] rounded-full bg-white/[0.06] pointer-events-none" />
          <div className="absolute bottom-[60px] -left-[80px] w-[280px] h-[280px] rounded-full border border-white/15 pointer-events-none" />

          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/profile.png"
              alt="Antonela Butuc - MSc Nutritionist & Brain Health Coach"
              className="w-full h-full object-cover mix-blend-multiply opacity-75"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta/65 to-transparent" />

          <div className="absolute bottom-14 left-12 z-[2]">
            <span className="font-serif text-[1.8rem] font-light tracking-[0.15em] text-white block">
              Antonela Butuc
            </span>
            <span className="block text-[0.6rem] tracking-[0.35em] uppercase text-white/75 mt-1.5">
              MSc Nutritionist &middot; Brain Health Coach &middot; Master EFT
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS RIBBON ── */}
      <div className="bg-charcoal py-12 px-6 md:px-20 flex flex-wrap justify-center gap-8 md:gap-24">
        {[
          { number: '15+', label: 'Years Experience' },
          { number: '500+', label: 'Clients Transformed' },
          { number: 'MSc', label: 'Nutritional Therapy' },
          { number: '100%', label: 'Online & Private' }
        ].map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-8 md:gap-24">
            <div className="text-center">
              <div className="font-serif text-5xl font-light text-gold leading-none">{stat.number}</div>
              <div className="text-[0.62rem] tracking-wide uppercase text-white/50 mt-2.5">{stat.label}</div>
            </div>
            {i < 3 && <div className="hidden md:block w-px h-12 bg-gold/20" />}
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 md:py-56 px-6 md:px-20 bg-blush relative overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute top-16 -right-4 font-serif text-[5.5rem] md:text-[14rem] font-semibold tracking-[0.15em] leading-none pointer-events-none select-none"
          style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(184,100,74,0.18)' }}
        >
          ABOUT
        </div>

        {/* Gold vertical accent */}
        <div className="absolute top-0 left-8 lg:left-20 w-[2px] h-full bg-gradient-to-b from-transparent via-gold to-transparent opacity-25 hidden md:block" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-32 items-center">
          {/* Image */}
          <div className="w-full aspect-[4/5] relative">
            <div className="w-full h-full overflow-hidden relative group">
              <img
                src="/profile.png"
                alt="Antonela Butuc"
                className="w-full h-full object-cover saturate-[0.9] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-[1.05]"
              />
            </div>
            {/* Offset terracotta frame */}
            <div className="absolute top-10 -left-10 -right-[-10px] -bottom-[-10px] border-2 border-terracotta/35 -z-10 hidden md:block" />
            {/* Gold corner accent */}
            <div className="absolute -top-4 -right-4 w-[60px] h-[60px] border-t-2 border-r-2 border-gold hidden md:block" />
          </div>

          {/* Content */}
          <div className="relative z-[1]">
            <p className="text-[0.62rem] tracking-ultra-wide uppercase text-terracotta mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-terracotta" />
              The Approach
            </p>
            <h2 className="font-serif text-3xl md:text-[3.8rem] font-light leading-[1.15] mb-8 text-charcoal">
              Curated wellness for<br />the <em className="italic text-terracotta">exceptional</em> woman
            </h2>
            <p className="text-[0.93rem] font-light leading-8 text-stone mb-6">
              I&apos;m on a mission to help high-achieving women navigate the powerful transitions of midlife with grace, strength, and purpose. Through a holistic approach integrating nutrition, EFT, brain health, and energetic alignment, I guide you to reclaim your energy and reconnect with the vibrant, confident woman you are.
            </p>
            <p className="text-[0.93rem] font-light leading-8 text-stone mb-6">
              With degrees from the University of Chester, UK and Carol Davila University of Medicine and Pharmacy, Romania, I bridge cutting-edge research with real-life practicality.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['15+ Years Experience', 'MSc Nutrition', 'Brain Health Coach', 'Master EFT Practitioner'].map((cred) => (
                <span key={cred} className="text-[0.62rem] tracking-[0.12em] text-ivory uppercase px-4 py-2 bg-terracotta">
                  {cred}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-28 md:py-40 px-6 md:px-20 bg-charcoal text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.06] pointer-events-none" />

        <div className="max-w-[820px] mx-auto relative z-[1]">
          <span className="text-[2.5rem] text-gold/50 block mb-8">&#9789;</span>
          <p className="font-serif text-xl md:text-[2.1rem] font-light italic leading-[1.75] text-ivory">
            &ldquo;True transformation embraces every aspect of our being&mdash;<span className="text-gold">light and shadow</span>, feminine and masculine. Through EFT and nutritional wisdom, we integrate the full spectrum of self, creating <span className="text-gold">wholeness from within</span>.&rdquo;
          </p>
          <span className="block text-[0.62rem] tracking-[0.4em] uppercase text-feather mt-10">
            &mdash; Antonela Butuc
          </span>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 md:py-48 px-6 md:px-20 bg-ivory">
        <div className="mb-24">
          <p className="text-[0.62rem] tracking-ultra-wide uppercase text-terracotta flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-terracotta" />
            How We Work Together
          </p>
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-charcoal max-w-[600px]">
            Personalised <em className="italic text-gold">nutrition</em> &amp; wellness
          </h2>
        </div>

        <div className="grid md:grid-cols-2 max-w-[1100px] border border-gold/20">
          {[
            { num: '01', tag: 'Nutrition', name: 'Nutrition Consultations', desc: "Women's health, PMS, PCOS, perimenopause, menopause, weight management, metabolic syndrome, digestive disorders, brain health, and anxiety.", price: 'Initial \u20AC120 \u00B7 Follow-up \u20AC95' },
            { num: '02', tag: 'Emotional Freedom', name: 'EFT / Tapping Sessions', desc: 'Emotional Freedom Technique combines psychology and acupressure to release emotional blockages, reduce stress, and promote lasting well-being.', price: '\u20AC100 per session' },
            { num: '03', tag: 'Education', name: 'Workshops & Talks', desc: 'Empowering wellbeing talks and workshops for schools and organizations. Focus on stress management, work-life balance, and the role of nutrition.', price: 'Contact for details' },
            { num: '04', tag: 'Deep Transformation', name: 'Transformation Programs', desc: 'Comprehensive 3\u20136 month programs combining nutrition, EFT, and brain health coaching for those ready for deep, lasting change.', price: 'From \u20AC297' }
          ].map((service, i) => (
            <a
              key={service.num}
              href="https://antonelabutuc.com/contact/"
              className={`block p-10 md:p-14 bg-white relative overflow-hidden transition-all duration-500 no-underline text-inherit group
                ${i % 2 === 0 ? 'border-r border-r-gold/20' : ''}
                ${i < 2 ? 'border-b border-b-gold/20' : ''}
                hover:border-gold/40
              `}
            >
              {/* Gold sweep on hover */}
              <div className="absolute inset-0 bg-gold-pale -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]" />

              <div className="relative z-[1]">
                {/* Large background number */}
                <div
                  className="absolute top-0 right-0 font-serif text-[6rem] font-semibold leading-none pointer-events-none"
                  style={{ color: 'transparent', WebkitTextStroke: '1px rgba(201,169,98,0.2)' }}
                >
                  {service.num}
                </div>

                <span className="text-[0.6rem] tracking-wide uppercase text-terracotta mb-6 block">
                  {service.tag}
                </span>
                <h3 className="font-serif text-[1.65rem] font-light text-charcoal mb-5 leading-[1.3]">
                  {service.name}
                </h3>
                <p className="text-[0.83rem] font-light text-stone leading-[1.85] mb-7">
                  {service.desc}
                </p>
                <p className="text-[0.7rem] tracking-[0.2em] text-gold-deep font-normal flex items-center gap-3">
                  <span className="w-6 h-px bg-gold" />
                  {service.price}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── WORKSHOPS ── */}
      <section className="py-20 md:py-40 px-6 md:px-20 bg-gold-pale relative">
        <div className="mb-16">
          <p className="text-[0.62rem] tracking-ultra-wide uppercase text-terracotta flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-terracotta" />
            Events
          </p>
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-charcoal">
            Upcoming <em className="italic text-gold">Workshops</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-[1000px] mx-auto mt-16">
          {[
            { title: 'The No-Stress Exam Success Workshop', desc: 'Empowering students with practical tools for stress management, focus, and peak performance during exam periods.' },
            { title: 'Discover EFT Workshop', desc: 'Learn the fundamentals of Emotional Freedom Technique and how to use tapping for stress relief, anxiety management, and emotional well-being.' }
          ].map((workshop) => (
            <div
              key={workshop.title}
              className="bg-ivory p-10 md:p-12 border-l-[3px] border-l-gold transition-all duration-[400ms] shadow-[0_4px_24px_rgba(28,26,23,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,169,98,0.15)]"
            >
              <h3 className="font-serif text-2xl text-charcoal mb-4 font-normal">{workshop.title}</h3>
              <p className="text-[0.85rem] font-light text-stone leading-[1.85]">{workshop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section id="lead-magnet" className="py-24 md:py-40 px-6 md:px-20 bg-terracotta relative overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-white/[0.05] pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 max-w-[1000px] mx-auto items-center relative z-[1]">
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-ivory mb-6">
              Free Hormonal Balance Guide
            </h2>
            <p className="text-[0.95rem] font-light text-ivory/80 leading-[1.85] mb-2">
              An e-book guide with practical resources to help you balance your hormones naturally.
            </p>
            <p className="text-gold italic">
              Increase your energy, lose weight and feel like yourself again.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-10 md:p-12 border border-white/20">
            {leadMagnetSubmitted ? (
              <div className="text-center py-8">
                <h3 className="font-serif text-[1.6rem] text-white mb-4">Thank You!</h3>
                <p className="text-[0.9rem] text-white/70">Check your inbox for your free Hormonal Balance Guide.</p>
              </div>
            ) : (
              <form onSubmit={handleLeadMagnetSubmit} className="flex flex-col gap-7">
                <div className="border-b border-white/35 pb-3">
                  <label className="block text-[0.6rem] tracking-[0.22em] uppercase text-white/65 mb-3">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    required
                    className="w-full bg-transparent border-none text-base text-white outline-none font-sans placeholder:text-white/40"
                  />
                </div>
                <div className="border-b border-white/35 pb-3">
                  <label className="block text-[0.6rem] tracking-[0.22em] uppercase text-white/65 mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full bg-transparent border-none text-base text-white outline-none font-sans placeholder:text-white/40"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold text-charcoal border-none py-5 px-10 text-[0.68rem] tracking-wide uppercase cursor-pointer font-sans font-medium transition-all duration-300 mt-2 hover:bg-[#d4b56a] hover:-translate-y-0.5"
                >
                  Yes, I Want It
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-32 md:py-56 px-6 md:px-20 text-center bg-blush relative overflow-hidden">
        {/* Large decorative quote mark */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 font-serif text-[14rem] md:text-[22rem] leading-none pointer-events-none"
          style={{ color: 'transparent', WebkitTextStroke: '1px rgba(201,169,98,0.12)' }}
        >
          &ldquo;
        </div>

        <p className="text-[0.62rem] tracking-ultra-wide uppercase text-terracotta mb-4 flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-terracotta" />
          Client Love
          <span className="w-8 h-px bg-terracotta" />
        </p>
        <h2 className="font-serif text-[1.8rem] md:text-[2.5rem] font-light text-charcoal mb-20">
          Stories of Transformation
        </h2>

        <div className="max-w-[780px] mx-auto relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-full px-6">
                <p className="font-serif text-xl md:text-[1.9rem] font-light italic leading-[1.65] mb-10 text-charcoal relative z-[1]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[0.7rem] tracking-[0.35em] text-gold uppercase">
                  &mdash; {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIndex(i)}
              className={`h-[2px] border-none cursor-pointer transition-all duration-300 ${
                i === testimonialIndex ? 'w-12 bg-gold' : 'w-8 bg-gold/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 md:py-48 px-6 md:px-20 bg-ivory">
        <div className="mb-16">
          <p className="text-[0.62rem] tracking-ultra-wide uppercase text-terracotta flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-terracotta" />
            FAQ
          </p>
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-charcoal">
            Frequently Asked <em className="italic text-gold">Questions</em>
          </h2>
        </div>

        <div className="max-w-[780px] mx-auto mt-16">
          {[
            { q: 'How does your coaching process work?', a: "My coaching process is rooted in a holistic and individualised approach. It begins with an in-depth assessment of your symptoms, unique challenges, goals, and values. Together, we'll develop a personalised roadmap that addresses gut health, hormonal balance, and blood sugar regulation." },
            { q: 'What makes your coaching style unique and effective?', a: "The integration of emotional well-being and nutritional expertise sets my coaching style apart. I create lasting and sustainable transformations by addressing health's physical and emotional aspects. My background as a master EFT practitioner, brain health coach, and nutritional therapist gives me the skills to support your holistic well-being." },
            { q: 'Who is an ideal candidate for your coaching services?', a: "My coaching services suit individuals dealing with gut issues, hormonal imbalances, and blood sugar challenges. If you're seeking a comprehensive approach and are open to making positive changes, my coaching is designed to support your specific needs." },
            { q: 'What kind of transformation can a client expect?', a: 'Clients experience increased energy, reduced digestive discomfort, stabilised moods, and improved emotional well-being. Many also achieve sustainable weight loss and enhanced self-confidence, leading to a more fulfilled and joyful life.' },
            { q: 'Are consultations virtual?', a: 'Yes, 100% online. No embarrassing weekly weigh-ins, no uncomfortable group sessions. Virtual consultations provide comfort, convenience, and complete privacy \u2014 from your own space, on your own terms.' }
          ].map((faq, i) => (
            <div key={i} className="faq-item border-b border-gold/20">
              <button
                className="faq-question w-full py-8 bg-transparent border-none flex justify-between items-center cursor-pointer text-left"
                onClick={() => toggleFaq(i)}
              >
                <h3 className="font-serif text-xl text-charcoal font-light pr-8 transition-colors duration-300">
                  {faq.q}
                </h3>
                <span className="faq-icon text-[1.4rem] text-terracotta transition-transform duration-300 flex-shrink-0">
                  +
                </span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <p className="pb-8 text-[0.88rem] font-light text-stone leading-[1.9]">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 md:py-48 px-6 md:px-20 bg-charcoal relative overflow-hidden">
        <div className="absolute -bottom-[200px] -right-[200px] w-[600px] h-[600px] rounded-full border border-gold/[0.08] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 md:gap-32">
          <div className="relative z-[1]">
            <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-ivory mb-6 leading-[1.2]">
              Begin Your<br /><span className="text-gold italic">Journey</span>
            </h2>
            <p className="text-[0.9rem] font-light text-ivory/65 leading-[1.9] mb-12">
              You don&apos;t have to go through this alone. I am here to support you in making lasting changes that bring health, freedom, and peace into your life &mdash; empowering you to thrive on your terms.
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <p className="text-[0.85rem] text-ivory/60">
                <a href="mailto:hello@antonelabutuc.com" className="text-gold no-underline hover:underline">hello@antonelabutuc.com</a>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              <p className="text-[0.85rem] text-ivory/60">Dublin, Ireland &middot; Online Worldwide</p>
            </div>
          </div>

          <div className="relative z-[1] bg-white/[0.04] border border-gold/15 p-8 md:p-14">
            {contactSubmitted ? (
              <div className="text-center py-12">
                <h3 className="font-serif text-xl text-gold mb-4">Message Sent!</h3>
                <p className="text-ivory/60">Thank you for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-9">
                <div className="border-b border-gold/25 pb-4">
                  <label className="block text-[0.62rem] tracking-[0.22em] uppercase text-ivory/50 mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-none text-base text-ivory outline-none font-sans placeholder:text-ivory/25"
                  />
                </div>
                <div className="border-b border-gold/25 pb-4">
                  <label className="block text-[0.62rem] tracking-[0.22em] uppercase text-ivory/50 mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-none text-base text-ivory outline-none font-sans placeholder:text-ivory/25"
                  />
                </div>
                <div className="border-b border-gold/25 pb-4">
                  <label className="block text-[0.62rem] tracking-[0.22em] uppercase text-ivory/50 mb-3">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    className="w-full bg-transparent border-none text-base text-ivory outline-none font-sans resize-none placeholder:text-ivory/25"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold text-charcoal border-none py-5 px-12 text-[0.68rem] tracking-wide uppercase cursor-pointer font-sans font-medium transition-all duration-[400ms] mt-2 hover:bg-gold-deep hover:text-ivory"
                >
                  Request Consultation &rarr;
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 md:px-20 bg-charcoal border-t border-gold/[0.12] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-serif text-xl text-gold tracking-[0.35em]">ANTONELA BUTUC</div>
        <div className="flex gap-9">
          <a href="https://www.facebook.com/AntonelaButuc" target="_blank" rel="noopener noreferrer" className="text-ivory/40 no-underline text-[0.68rem] tracking-[0.18em] hover:text-gold transition-colors">Facebook</a>
          <a href="https://www.instagram.com/antonela.m.butuc/" target="_blank" rel="noopener noreferrer" className="text-ivory/40 no-underline text-[0.68rem] tracking-[0.18em] hover:text-gold transition-colors">Instagram</a>
          <a href="https://www.linkedin.com/in/antonelamariabutuc/" target="_blank" rel="noopener noreferrer" className="text-ivory/40 no-underline text-[0.68rem] tracking-[0.18em] hover:text-gold transition-colors">LinkedIn</a>
          <a href="https://www.tiktok.com/@antonelabutuc" target="_blank" rel="noopener noreferrer" className="text-ivory/40 no-underline text-[0.68rem] tracking-[0.18em] hover:text-gold transition-colors">TikTok</a>
        </div>
        <div className="text-[0.62rem] text-ivory/30">&copy; {new Date().getFullYear()} Wellness Academy &middot; Dublin, Ireland</div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 w-12 h-12 bg-gold text-charcoal border-none flex items-center justify-center cursor-pointer transition-all duration-300 z-[90] text-base shadow-[0_4px_20px_rgba(201,169,98,0.3)] hover:bg-gold-deep hover:-translate-y-1 ${
          backToTopVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        &uarr;
      </button>
    </>
  );
}
