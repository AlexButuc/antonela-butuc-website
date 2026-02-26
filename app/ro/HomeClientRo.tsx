'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#despre', label: 'Despre' },
  { href: '#servicii', label: 'Servicii' },
  { href: '#testimoniale', label: 'Povești' },
  { href: '#faq', label: 'FAQ' },
  { href: 'https://antonelabutuc.com/contact/', label: 'Contact' },
];

const services = [
  {
    number: '01',
    tag: 'Nutriție',
    name: 'Consultații de Nutriție',
    desc: 'Sănătatea femeilor, PMS, PCOS, perimenopauză, menopauză, gestionarea greutății, sindrom metabolic, tulburări digestive, sănătatea creierului și anxietate.',
    price: 'Inițială €120 · Urmărire €95'
  },
  {
    number: '02',
    tag: 'Eliberare Emoțională',
    name: 'Sesiuni EFT / Tapping',
    desc: 'Tehnica de Eliberare Emoțională combină psihologia și acupresura pentru a elibera blocajele emoționale, a reduce stresul și a promova starea generală de bine.',
    price: '€100 per sesiune'
  },
  {
    number: '03',
    tag: 'Educație',
    name: 'Ateliere & Prezentări',
    desc: 'Prezentări și ateliere care împuternicesc starea de bine pentru școli și organizații. Focus pe gestionarea stresului, echilibrul viață-muncă și rolul nutriției.',
    price: 'Contact pentru detalii'
  },
  {
    number: '04',
    tag: 'Transformare Profundă',
    name: 'Programe de Transformare',
    desc: 'Programe cuprinzătoare de 3-6 luni care combină nutriția, EFT și coaching pentru sănătatea creierului. Pentru cele pregătite pentru o schimbare durabilă.',
    price: 'De la €297'
  }
];

const testimonials = [
  {
    quote: '"Am luptat cu greutatea, pofta de dulce și depresia ani de zile. Doar cu câteva sesiuni, nevoia mea de a folosi mâncarea ca alinare aproape a dispărut. Am slăbit peste 18 kg și nu m-am simțit niciodată mai bine."',
    author: '— Juliana'
  },
  {
    quote: '"Stresul din viața mea era copleșitor. Datorită acestui program, am învățat modalități eficiente de a-l gestiona și mă simt mult mai liniștită."',
    author: '— Isabella, 46 ani'
  },
  {
    quote: '"Anxietatea era ca un zumzet constant de care nu puteam scăpa. EFT a fost ciudat la început, dar acel tapping – chiar funcționează! E ca și cum aș avea în sfârșit puțină liniște în cap."',
    author: '— Jessa, 23 ani'
  },
  {
    quote: '"Mă simțeam ca și cum mă târâm prin fiecare zi. EFT a fost schimbarea decisivă. Acum am o energie pe care n-am simțit-o de ani!"',
    author: '— Fiona, 43 ani'
  },
  {
    quote: '"Tapping-ul m-a făcut să mă simt mai calmă în moduri pe care nu le-am crezut posibile. Dieta și exercițiile au ajutat, dar EFT a fost ceea ce a schimbat cu adevărat totul."',
    author: '— Mike, 31 ani'
  }
];

const faqItems = [
  {
    q: 'Cum funcționează procesul tău de coaching?',
    a: 'Procesul meu de coaching este înrădăcinat într-o abordare holistică și individualizată. Începe cu o evaluare aprofundată a simptomelor, provocărilor unice, obiectivelor și valorilor tale. Împreună, vom dezvolta o foaie de parcurs personalizată care abordează sănătatea intestinală, echilibrul hormonal și reglarea glicemiei.'
  },
  {
    q: 'Ce face stilul tău de coaching unic și eficient?',
    a: 'Integrarea bunăstării emoționale și a expertizei nutriționale diferențiază stilul meu de coaching. Creez transformări durabile și sustenabile abordând aspectele fizice și emoționale ale sănătății. Pregătirea mea ca practician master EFT, coach pentru sănătatea creierului și terapeut nutrițional îmi oferă abilitățile de a-ți sprijini bunăstarea holistică.'
  },
  {
    q: 'Cine este un candidat ideal pentru serviciile tale?',
    a: 'Serviciile mele de coaching sunt potrivite pentru persoanele care se confruntă cu probleme intestinale, dezechilibre hormonale și provocări ale glicemiei. Dacă cauți o abordare cuprinzătoare și ești deschisă să faci schimbări pozitive, coaching-ul meu este conceput pentru a-ți sprijini nevoile specifice.'
  },
  {
    q: 'Ce fel de transformare poate aștepta un client?',
    a: 'Clienții experimentează creșterea energiei, reducerea disconfortului digestiv, stabilizarea stărilor de spirit și îmbunătățirea bunăstării emoționale. Mulți realizează și pierderea sustenabilă în greutate și o încredere sporită în sine.'
  },
  {
    q: 'Consultațiile sunt virtuale?',
    a: 'Da, 100% online. Fără cântăriri jenante săptămânale, fără sesiuni de grup inconfortabile. Consultațiile virtuale oferă confort, comoditate și confidențialitate completă — din spațiul tău, în termenii tăi.'
  }
];

export default function HomeClientRo() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <>
      {/* ── HEADER ── */}
      <header
        className={`fixed w-full top-0 z-[100] flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? 'py-4 px-8 lg:px-20 bg-ivory/[0.96] backdrop-blur-[14px] shadow-[0_1px_0_rgba(201,169,98,0.22),0_4px_24px_rgba(28,26,23,0.05)]'
            : 'py-7 px-8 lg:px-20 bg-gradient-to-b from-ivory via-ivory/80 to-transparent'
        }`}
      >
        <Link href="/ro" className="no-underline">
          <span className="font-serif text-[1.55rem] font-light tracking-[0.42em] text-gold leading-none">
            ANTONELA <span className="opacity-60">BUTUC</span>
          </span>
          <span className="block text-[0.52rem] tracking-[0.28em] text-stone mt-1.5 font-sans font-light">
            MSc Nutritionist &amp; Brain Health Coach
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-14">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-stone text-[0.72rem] font-light tracking-[0.22em] uppercase hover:text-gold transition-colors no-underline relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/"
            className="text-stone text-[0.72rem] font-light tracking-[0.22em] uppercase hover:text-gold transition-colors no-underline relative after:content-[''] after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
          >
            English
          </Link>

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

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col gap-[5px] cursor-pointer z-[200]"
          aria-label="Toggle menu"
        >
          <span className={`w-[26px] h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`} />
          <span className={`w-[26px] h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-[26px] h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`} />
        </button>
      </header>

      {/* ── MOBILE NAV ── */}
      <div
        className={`fixed inset-0 bg-ivory/[0.98] z-[150] flex flex-col items-center justify-center gap-9 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-[2.2rem] text-charcoal tracking-[0.18em] hover:text-terracotta transition-colors no-underline"
          >
            {item.label}
          </a>
        ))}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="font-serif text-[2.2rem] text-charcoal tracking-[0.18em] hover:text-terracotta transition-colors no-underline"
        >
          English
        </Link>
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
          <span className="text-[0.55rem] tracking-[0.2em] text-feather uppercase">Urmărește-ți tiparele hormonale</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] relative">
        {/* Left panel */}
        <div className="flex flex-col justify-center px-6 md:px-20 pt-40 pb-24 lg:pt-40 lg:pb-24 relative bg-ivory">
          {/* Decorative arcs */}
          <div className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] rounded-full border border-gold/[0.12] pointer-events-none hidden lg:block" />
          <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full border border-gold/20 pointer-events-none hidden lg:block" />

          <p className="text-[0.62rem] tracking-[0.55em] uppercase text-terracotta mb-8 flex items-center gap-5 animate-slide-up">
            <span className="w-10 h-px bg-terracotta" />
            Coaching pentru Sănătate Holistică
          </p>
          <h1 className="font-serif text-5xl md:text-[5.8rem] font-light leading-[1.02] mb-9 text-charcoal animate-slide-up">
            Vindecă – Crește –<br />
            <em className="italic text-gold">Înflori</em>
          </h1>
          <p className="text-[1.05rem] font-light text-stone leading-[1.95] mb-14 max-w-[480px] animate-slide-up-delay-1">
            Ghidez femeile ambițioase în a naviga perioada de mijloc a vieții cu grație, putere și scop. Redescoperă-ți energia, echilibrează-ți hormonii și eliberează-te de tiparele care te țin blocată.
          </p>
          <div className="flex gap-6 flex-wrap animate-slide-up-delay-2">
            <a href="https://antonelabutuc.com/contact/" className="btn-primary-bold">
              Programează o Consultație
            </a>
            <a href="#despre" className="btn-outline-bold">
              Află Mai Multe
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-8 md:left-20 flex flex-col gap-2 text-[0.6rem] tracking-[0.35em] text-feather hidden lg:flex">
            <span>SCROLL</span>
            <div className="w-px h-[50px] bg-gradient-to-b from-gold to-transparent mx-auto mt-3 animate-scroll-pulse" />
          </div>
        </div>

        {/* Right panel — terracotta */}
        <div className="relative bg-terracotta overflow-hidden hidden lg:block">
          <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-white/[0.06] pointer-events-none" />
          <div className="absolute bottom-[60px] left-[-80px] w-[280px] h-[280px] rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/profile.png"
              alt="Antonela Butuc - Nutriționist MSc & Coach pentru Sănătatea Creierului"
              className="w-full h-full object-cover mix-blend-multiply opacity-75"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta/65 via-transparent to-transparent" />
          <div className="absolute bottom-14 left-12 z-[2]">
            <span className="font-serif text-[1.8rem] font-light tracking-[0.15em] text-white block">
              Antonela Butuc
            </span>
            <span className="block text-[0.6rem] tracking-[0.35em] uppercase text-white/75 mt-1.5">
              Nutriționist MSc · Coach Sănătatea Creierului · Master EFT
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS RIBBON ── */}
      <div className="bg-charcoal py-12 px-8 md:px-20 flex justify-center gap-8 md:gap-24 flex-wrap">
        {[
          { num: '15+', label: 'Ani Experiență' },
          { num: '500+', label: 'Clienți Transformați' },
          { num: 'MSc', label: 'Terapie Nutrițională' },
          { num: '100%', label: 'Online & Privat' },
        ].map((stat, i, arr) => (
          <div key={i} className="flex items-center gap-8 md:gap-24">
            <div className="text-center">
              <div className="font-serif text-[3rem] font-light text-gold leading-none">{stat.num}</div>
              <div className="text-[0.62rem] tracking-[0.3em] uppercase text-white/50 mt-2.5">{stat.label}</div>
            </div>
            {i < arr.length - 1 && <div className="w-px h-12 bg-gold/20 hidden md:block" />}
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section id="despre" className="py-32 md:py-56 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 relative bg-blush overflow-hidden">
        {/* Watermark */}
        <div className="absolute top-16 right-[-1rem] font-serif text-[5.5rem] md:text-[14rem] font-semibold tracking-[0.15em] text-transparent [-webkit-text-stroke:1.5px_rgba(184,100,74,0.18)] pointer-events-none select-none leading-none">
          DESPRE
        </div>
        {/* Gold vertical line */}
        <div className="absolute top-0 left-8 md:left-20 w-[2px] h-full bg-gradient-to-b from-transparent via-gold/25 to-transparent" />

        {/* Image */}
        <div className="relative overflow-visible">
          <div className="w-full aspect-[4/5] overflow-hidden relative">
            <img
              src="/profile.png"
              alt="Antonela Butuc"
              className="w-full h-full object-cover saturate-[0.9] transition-all duration-700 hover:scale-[1.03] hover:saturate-[1.05]"
            />
          </div>
          {/* Offset frame */}
          <div className="absolute top-10 -left-10 right-10 -bottom-10 border-2 border-terracotta/35 -z-10 hidden md:block" />
          {/* Gold corner */}
          <div className="absolute -top-4 -right-4 w-[60px] h-[60px] border-t-2 border-r-2 border-gold hidden md:block" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center relative z-[1]">
          <p className="text-[0.62rem] tracking-[0.55em] uppercase text-terracotta mb-6 flex items-center gap-4">
            <span className="w-8 h-px bg-terracotta" />
            Abordarea
          </p>
          <h2 className="font-serif text-3xl md:text-[3.8rem] font-light leading-[1.15] mb-8 text-charcoal">
            Wellness curatoriat pentru<br />femeia <em className="italic text-terracotta">excepțională</em>
          </h2>
          <p className="text-[0.93rem] font-light leading-[2] text-stone mb-6">
            Sunt într-o misiune de a ajuta femeile ambițioase să navigheze tranzițiile puternice ale perioadei de mijloc a vieții cu grație, putere și scop. Printr-o abordare holistică care integrează nutriția, EFT, sănătatea creierului și alinierea energetică, te ghidez să-ți recâștigi energia și să te reconectezi cu femeia vibrantă și încrezătoare care ești.
          </p>
          <p className="text-[0.93rem] font-light leading-[2] text-stone mb-6">
            Cu diplome de la Universitatea din Chester, Marea Britanie și Universitatea de Medicină și Farmacie Carol Davila, România, fac legătura între cercetarea de ultimă oră și practicabilitatea din viața reală.
          </p>
          <div className="flex gap-3 flex-wrap mt-6">
            {['15+ Ani Experiență', 'MSc Nutriție', 'Coach Sănătatea Creierului', 'Practician Master EFT'].map((cred) => (
              <span key={cred} className="text-[0.62rem] tracking-[0.12em] text-ivory uppercase px-4 py-2 bg-terracotta">
                {cred}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-32 md:py-40 px-6 md:px-20 bg-charcoal text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.06] pointer-events-none" />
        <div className="max-w-[820px] mx-auto relative z-[1]">
          <span className="text-[2.5rem] text-gold opacity-50 block mb-8">☽</span>
          <p className="font-serif text-xl md:text-[2.1rem] font-light italic leading-[1.75] text-ivory">
            &ldquo;Transformarea adevărată îmbrățișează fiecare aspect al ființei noastre —
            <span className="text-gold"> lumină și umbră</span>, feminin și masculin. Prin EFT și înțelepciune nutrițională,
            integrăm întregul spectru al sinelui, creând
            <span className="text-gold"> integritate din interior</span>.&rdquo;
          </p>
          <span className="block text-[0.62rem] tracking-[0.4em] uppercase text-feather mt-10">
            — Antonela Butuc
          </span>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="servicii" className="py-32 md:py-48 px-6 md:px-20 bg-ivory">
        <div className="mb-24">
          <p className="text-[0.62rem] tracking-[0.55em] uppercase text-terracotta flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-terracotta" />
            Cum Lucrăm Împreună
          </p>
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-charcoal max-w-[600px]">
            Nutriție & wellness <em className="italic text-gold">personalizat</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1100px] border border-gold/20">
          {services.map((service, i) => (
            <a
              key={service.number}
              href="https://antonelabutuc.com/contact/"
              className={`p-10 md:p-14 relative overflow-hidden bg-white block no-underline text-inherit transition-all duration-[450ms] group
                ${i % 2 === 0 ? 'border-r border-r-gold/20 md:border-r-gold/20' : 'border-r-0'}
                ${i < 2 ? 'border-b border-b-gold/20' : 'border-b-0'}
                max-md:border-r-0 max-md:border-b max-md:border-b-gold/20 max-md:last:border-b-0
              `}
            >
              {/* Gold sweep */}
              <div className="absolute inset-0 bg-gold-pale -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]" />
              {/* Number bg */}
              <div className="absolute top-4 right-6 font-serif text-[6rem] font-semibold text-transparent [-webkit-text-stroke:1px_rgba(201,169,98,0.2)] leading-none pointer-events-none">
                {service.number}
              </div>
              <div className="relative z-[1]">
                <span className="text-[0.6rem] tracking-[0.3em] uppercase text-terracotta mb-6 block">
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
      <section className="py-24 md:py-40 px-6 md:px-20 bg-gold-pale">
        <div className="mb-16">
          <p className="text-[0.62rem] tracking-[0.55em] uppercase text-terracotta flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-terracotta" />
            Evenimente
          </p>
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-charcoal">
            Ateliere <em className="italic text-gold">Viitoare</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1000px] mx-auto mt-16">
          {[
            { title: 'Atelierul Succes la Examene Fără Stres', desc: 'Împuternicirea studenților cu instrumente practice pentru gestionarea stresului, concentrare și performanță maximă în perioadele de examene.' },
            { title: 'Atelierul Descoperă EFT', desc: 'Învață fundamentele Tehnicii de Eliberare Emoțională și cum să folosești tapping-ul pentru ameliorarea stresului, gestionarea anxietății și bunăstarea emoțională.' },
          ].map((w, i) => (
            <div key={i} className="bg-ivory p-10 md:p-12 border-l-[3px] border-gold transition-all duration-[400ms] shadow-[0_4px_24px_rgba(28,26,23,0.04)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,169,98,0.15)]">
              <h3 className="font-serif text-[1.5rem] text-charcoal mb-4 font-normal">{w.title}</h3>
              <p className="text-[0.85rem] font-light text-stone leading-[1.85]">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section className="py-24 md:py-40 px-6 md:px-20 bg-terracotta relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-white/5 pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-[1000px] mx-auto items-center relative z-[1]">
          <div>
            <h2 className="font-serif text-3xl md:text-[3rem] font-light text-ivory mb-6">
              Ghid Gratuit pentru Echilibrul Hormonal
            </h2>
            <p className="text-[0.95rem] font-light text-ivory/80 leading-[1.85] mb-2">
              Un ghid e-book cu resurse practice pentru a-ți echilibra hormonii natural.
            </p>
            <p className="text-gold italic">
              Crește-ți energia, slăbește și simte-te din nou tu însăți.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-[8px] p-10 md:p-12 border border-white/20">
            <form className="flex flex-col gap-7" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-white/35 pb-3">
                <label className="block text-[0.6rem] tracking-[0.22em] uppercase text-white/65 mb-3">Numele Tău</label>
                <input type="text" placeholder="Introdu numele tău" className="w-full bg-transparent border-none text-base text-white outline-none font-sans placeholder:text-white/40" />
              </div>
              <div className="border-b border-white/35 pb-3">
                <label className="block text-[0.6rem] tracking-[0.22em] uppercase text-white/65 mb-3">Adresa de Email</label>
                <input type="email" placeholder="Introdu adresa de email" className="w-full bg-transparent border-none text-base text-white outline-none font-sans placeholder:text-white/40" />
              </div>
              <button type="submit" className="bg-gold text-charcoal border-none py-5 px-10 text-[0.68rem] tracking-[0.3em] uppercase cursor-pointer font-sans font-medium transition-all duration-300 hover:bg-[#d4b56a] hover:-translate-y-0.5 mt-2">
                Da, Îl Vreau
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimoniale" className="py-32 md:py-56 px-6 md:px-20 text-center bg-blush relative overflow-hidden">
        {/* Decorative quote */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 font-serif text-[22rem] text-transparent [-webkit-text-stroke:1px_rgba(201,169,98,0.12)] leading-none pointer-events-none select-none">
          &ldquo;
        </div>

        <p className="text-[0.62rem] tracking-[0.55em] uppercase text-terracotta mb-4 flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-terracotta" />
          Povești de Dragoste
          <span className="w-8 h-px bg-terracotta" />
        </p>
        <h2 className="font-serif text-2xl md:text-[2.5rem] font-light text-charcoal mb-20">
          Povești de Transformare
        </h2>

        <div className="max-w-[780px] mx-auto relative overflow-hidden">
          <div ref={trackRef} className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
            {testimonials.map((t, i) => (
              <div key={i} className="min-w-full px-6">
                <p className="font-serif text-lg md:text-[1.9rem] font-light italic leading-[1.65] mb-10 text-charcoal relative z-[1]">
                  {t.quote}
                </p>
                <p className="text-[0.7rem] tracking-[0.35em] text-gold uppercase">{t.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-14">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-[2px] border-none cursor-pointer transition-all duration-300 ${
                i === currentSlide ? 'bg-gold w-12' : 'bg-gold/30 w-8'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-32 md:py-48 px-6 md:px-20 bg-ivory">
        <div className="mb-16">
          <p className="text-[0.62rem] tracking-[0.55em] uppercase text-terracotta flex items-center gap-4 mb-5">
            <span className="w-8 h-px bg-terracotta" />
            FAQ
          </p>
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-charcoal">
            Întrebări Frecvente <em className="italic text-gold">Răspunsuri</em>
          </h2>
        </div>
        <div className="max-w-[780px] mx-auto mt-16">
          {faqItems.map((item, i) => (
            <div key={i} className={`border-b border-gold/20 faq-item ${activeFaq === i ? 'active' : ''}`}>
              <button
                className="w-full py-8 bg-transparent border-none flex justify-between items-center cursor-pointer text-left"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <h3 className="font-serif text-[1.25rem] text-charcoal font-light pr-8">
                  {item.q}
                </h3>
                <span className={`text-[1.4rem] text-terracotta transition-transform duration-300 flex-shrink-0 faq-icon ${activeFaq === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-[500px]' : 'max-h-0'}`}>
                <p className="pb-8 text-[0.88rem] font-light text-stone leading-[1.9]">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-32 md:py-48 px-6 md:px-20 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 md:gap-32 bg-charcoal relative overflow-hidden">
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full border border-gold/[0.08] pointer-events-none" />
        <div className="relative z-[1]">
          <h2 className="font-serif text-3xl md:text-[3.5rem] font-light text-ivory mb-6 leading-[1.2]">
            Începe-ți<br /><span className="text-gold italic">Călătoria</span>
          </h2>
          <p className="text-[0.9rem] font-light text-ivory/65 leading-[1.9] mb-12">
            Nu trebuie să treci singură prin această călătorie. Sunt aici să te sprijin în a face schimbări durabile care aduc sănătate, libertate și pace în viața ta — împuternicindu-te să înflorești în propriii termeni.
          </p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            <p className="text-[0.85rem] text-ivory/60">
              <a href="mailto:hello@antonelabutuc.com" className="text-gold no-underline hover:underline">hello@antonelabutuc.com</a>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
            <p className="text-[0.85rem] text-ivory/60">Dublin, Irlanda · Online Mondial</p>
          </div>
        </div>
        <div className="relative z-[1] bg-white/[0.04] border border-gold/15 p-10 md:p-14">
          <form className="flex flex-col gap-9" onSubmit={(e) => e.preventDefault()}>
            <div className="border-b border-gold/25 pb-4">
              <label className="block text-[0.62rem] tracking-[0.22em] uppercase text-ivory/50 mb-3">Nume Complet</label>
              <input type="text" required className="w-full bg-transparent border-none text-base text-ivory outline-none font-sans placeholder:text-ivory/25" />
            </div>
            <div className="border-b border-gold/25 pb-4">
              <label className="block text-[0.62rem] tracking-[0.22em] uppercase text-ivory/50 mb-3">Adresa de Email</label>
              <input type="email" required className="w-full bg-transparent border-none text-base text-ivory outline-none font-sans placeholder:text-ivory/25" />
            </div>
            <div className="border-b border-gold/25 pb-4">
              <label className="block text-[0.62rem] tracking-[0.22em] uppercase text-ivory/50 mb-3">Mesaj</label>
              <textarea rows={4} required className="w-full bg-transparent border-none text-base text-ivory outline-none font-sans resize-none placeholder:text-ivory/25" />
            </div>
            <button type="submit" className="bg-gold text-charcoal border-none py-5 px-12 text-[0.68rem] tracking-[0.3em] uppercase cursor-pointer font-sans font-medium transition-all duration-[400ms] hover:bg-gold-deep hover:text-ivory mt-2">
              Solicită Consultație →
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6 md:px-20 bg-charcoal border-t border-gold/[0.12] flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-serif text-xl text-gold tracking-[0.35em]">ANTONELA BUTUC</span>
        <div className="flex gap-8">
          {[
            { label: 'Facebook', url: 'https://www.facebook.com/AntonelaButuc' },
            { label: 'Instagram', url: 'https://www.instagram.com/antonela.m.butuc/' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/in/antonelamariabutuc/' },
            { label: 'TikTok', url: 'https://www.tiktok.com/@antonelabutuc' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 text-[0.68rem] tracking-[0.18em] hover:text-gold transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>
        <span className="text-[0.62rem] text-ivory/30">© 2025 Wellness Academy · Dublin, Irlanda</span>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-10 right-10 w-12 h-12 bg-gold text-charcoal border-none flex items-center justify-center cursor-pointer transition-all duration-300 z-[90] text-base shadow-[0_4px_20px_rgba(201,169,98,0.3)] hover:bg-gold-deep hover:-translate-y-1 ${
          showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        ↑
      </button>
    </>
  );
}
