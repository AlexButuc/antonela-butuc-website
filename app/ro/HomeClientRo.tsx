'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#despre', label: 'Despre' },
  { href: '#servicii', label: 'Servicii' },
  { href: '#ciclu-lunar', label: 'Ciclu Lunar' },
  { href: 'https://antonelabutuc.com/contact/', label: 'Contact' },
];

const services = [
  {
    number: '01',
    icon: '🔬',
    name: 'Consultații de Nutriție',
    desc: 'Sănătatea femeilor, PMS, PCOS, perimenopauză, menopauză, gestionarea greutății, sindrom metabolic, tulburări digestive, sănătatea creierului și anxietate. Sesiuni în clinică și online.',
    price: 'Inițială €120 | Urmărire €95'
  },
  {
    number: '02',
    icon: '⚖️',
    name: 'Sesiuni EFT / Tapping',
    desc: 'Tehnica de Eliberare Emoțională combină psihologia și acupresura pentru a aborda provocări emoționale, mentale și fizice. Eliberează blocajele emoționale, redu stresul și promovează starea generală de bine.',
    price: '€100 per sesiune'
  },
  {
    number: '03',
    icon: '🔮',
    name: 'Ateliere & Prezentări',
    desc: 'Prezentări și ateliere care împuternicesc starea de bine pentru școli și organizații. Focus pe gestionarea stresului, echilibrul viață-muncă, sănătatea mentală și rolul crucial al nutriției.',
    price: 'Contact pentru detalii'
  },
  {
    number: '04',
    icon: '✨',
    name: 'Programe de Transformare',
    desc: 'Programe cuprinzătoare de 3-6 luni care combină nutriția, EFT și coaching pentru sănătatea creierului. Pentru cele pregătite pentru o transformare profundă și durabilă în relația cu mâncarea, corpul și sinele.',
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
    quote: '"Anxietatea era ca un zumzet constant de care nu puteam scăpa. EFT a fost ciudat la început, dar acel tapping – chiar funcționează! Am uneltele să o gestionez. E ca și cum aș avea în sfârșit puțină liniște în cap."',
    author: '— Jessa, 23 ani'
  },
  {
    quote: '"Mă simțeam ca și cum mă târâm prin fiecare zi. Nutriția a ajutat puțin, dar EFT a fost schimbarea decisivă. Acum am o energie pe care n-am simțit-o de ani!"',
    author: '— Fiona, 43 ani'
  }
];

export default function HomeClientRo() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed w-full top-0 z-100 transition-all duration-300 ${scrolled ? 'py-4 bg-obsidian/95 backdrop-blur-md' : 'py-8 bg-gradient-to-b from-obsidian to-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/ro" className="no-underline">
            <span className="font-serif text-2xl text-gold tracking-widest">
              ANTONELA <span className="opacity-60">BUTUC</span>
            </span>
            <span className="block text-xs tracking-widest text-silver mt-1">
              Nutriționist & Coach pentru Sănătatea Creierului
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-silver text-xs tracking-widest uppercase hover:text-gold transition-colors no-underline"
              >
                {item.label}
              </a>
            ))}
            <Link href="/" className="text-gold text-xs tracking-widest uppercase hover:text-champagne transition-colors no-underline">
              English
            </Link>
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 z-200"
          >
            <span className={`w-6 h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-px bg-gold transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 bg-obsidian/98 z-150 flex flex-col items-center justify-center gap-6 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl text-cream tracking-widest hover:text-gold transition-colors"
          >
            {item.label}
          </a>
        ))}
        <Link href="/" className="font-serif text-2xl text-gold tracking-widest" onClick={() => setMobileMenuOpen(false)}>
          English
        </Link>
      </div>

      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 relative">
        <div className="text-6xl text-gold opacity-30 mb-8 animate-pulse-slow">☽</div>
        <p className="text-xs tracking-ultra-wide uppercase text-gold mb-8">
          Coaching pentru Sănătate Holistică
        </p>
        <h1 className="font-serif text-6xl md:text-7xl font-light leading-tight mb-8 max-w-4xl">
          Vindecă – Crește – <em className="text-gold">Înflori</em>
        </h1>
        <p className="text-lg text-silver leading-relaxed max-w-xl mb-12">
          Ghidez femeile în a naviga perioada de mijloc a vieții cu grație, putere și scop. Redescoperă-ți energia, echilibrează-ți hormonii și eliberează-te de tiparele care te țin blocată.
        </p>
        <a
          href="https://antonelabutuc.com/contact/"
          className="border border-gold text-gold px-8 py-4 text-xs tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-all duration-500"
        >
          Programează o Consultație
        </a>
      </section>

      <div className="w-px h-24 bg-gradient-to-b from-transparent via-gold to-transparent mx-auto" />

      <section id="despre" className="py-40 px-8 text-center bg-gradient-to-b from-transparent via-gold/5 to-transparent relative">
        <span className="absolute top-12 left-1/2 -translate-x-1/2 text-5xl text-gold opacity-20">☽</span>
        <h2 className="font-serif text-4xl md:text-5xl font-light mb-12 text-gold">
          Munca cu Umbra & Integrarea
        </h2>
        <p className="text-lg text-silver leading-relaxed max-w-3xl mx-auto mb-8">
          Transformarea adevărată îmbrățișează fiecare aspect al ființei noastre – lumină și umbră, feminin și masculin. Prin EFT și înțelepciune nutrițională, integrăm întregul spectru al sinelui, creând integritate din interior.
        </p>
        <p className="text-lg text-silver leading-relaxed max-w-3xl mx-auto mb-16">
          Când lucrăm cu umbra noastră, nu fugim de aspectele mai întunecate ale experienței umane. Le întâmpinăm cu compasiune și curiozitate, recunoscând că în adâncurile ființei noastre se află cea mai mare putere.
        </p>

        <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <div className="p-12 border border-gold/15 hover:border-gold/40 transition-colors">
            <div className="text-4xl mb-6">☽</div>
            <h3 className="font-serif text-2xl mb-4 text-gold">Energia Feminină</h3>
            <p className="text-silver leading-relaxed">
              Intuiție, receptivitate, flux și ciclicitate. Conectarea cu ritmurile naturale ale corpului și ale lunii. Capacitatea de a primi, de a simți profund, de a crea spațiu pentru transformare.
            </p>
          </div>
          <div className="p-12 border border-gold/15 hover:border-gold/40 transition-colors">
            <div className="text-4xl mb-6">☀</div>
            <h3 className="font-serif text-2xl mb-4 text-gold">Energia Masculină</h3>
            <p className="text-silver leading-relaxed">
              Acțiune, structură, direcție și protecție. Puterea de a manifesta schimbarea, de a pune limite sănătoase, de a avansa cu hotărâre spre viziunea ta.
            </p>
          </div>
        </div>
      </section>

      <section id="ciclu-lunar" className="py-32 px-8 bg-gold/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-light">Ciclu Lunar & Vindecare</h2>
            <p className="text-silver text-xs tracking-widest uppercase mt-4">
              Lucrează cu energiile lunare pentru transformare profundă
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div className="p-12 border border-gold/15 hover:border-gold/40 hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-8">🌑</div>
              <h3 className="font-serif text-2xl mb-4 text-gold">Lună Nouă</h3>
              <p className="text-silver leading-relaxed mb-6">
                Timpul pentru intenții noi și semințe de schimbare. În această fază, lucrăm cu setarea intențiilor, vizualizarea viitorului dorit și pregătirea terenului interior pentru creștere. Este momentul de liniște și reflecție.
              </p>
              <p className="text-xs tracking-wide text-gold/70 uppercase">
                Intenție • Noi Începuturi • Posibilități
              </p>
            </div>
            <div className="p-12 border border-gold/15 hover:border-gold/40 hover:-translate-y-1 transition-all">
              <div className="text-5xl mb-8">🌕</div>
              <h3 className="font-serif text-2xl mb-4 text-gold">Lună Plină</h3>
              <p className="text-silver leading-relaxed mb-6">
                Momentul eliberării și al iluminării. În plinătatea lunii, lucrăm cu eliberarea emoțională prin EFT, eliberarea tiparelor vechi și recunoașterea a ceea ce nu mai servește. Umbrele ies la lumină pentru a fi vindecate.
              </p>
              <p className="text-xs tracking-wide text-gold/70 uppercase">
                Eliberare • Shadow Work • Transformare
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicii" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl">Cum Lucrăm Împreună</h2>
            <p className="text-silver text-xs tracking-widest uppercase mt-4">
              Nutriție & Wellness Personalizat
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <a
                key={service.number}
                href="https://antonelabutuc.com/contact/"
                className="card block hover:-translate-y-1 no-underline text-inherit"
              >
                <div className="text-xs tracking-widest text-gold/70 mb-4">{service.number}</div>
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

      <section id="testimoniale" className="py-32 px-8 text-center">
        <h2 className="font-serif text-3xl text-gold tracking-widest mb-16">Povești de Transformare</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gold/15 p-8 text-left bg-obsidian/30">
              <p className="font-serif text-lg font-light italic leading-relaxed mb-6 text-cream">
                {testimonial.quote}
              </p>
              <p className="text-xs tracking-widest text-gold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-32 px-8 border-t border-gold/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-4xl mb-4">Începe Călătoria Ta</h2>
            <p className="text-silver leading-relaxed mb-8">
              Nu trebuie să treci singură prin această călătorie. Sunt aici să te sprijin în a face schimbări durabile care aduc sănătate, libertate și pace în viața ta, împuternicindu-te să înflorești în propriii termeni.
            </p>
            <div className="text-silver">
              <p className="mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:antonela@wellnessacademy.ie" className="text-gold hover:underline">
                  antonela@wellnessacademy.ie
                </a>
              </p>
              <p><strong>Locație:</strong> Dublin, Irlanda</p>
            </div>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-xs tracking-widest uppercase text-silver mb-2">Nume Complet</label>
              <input type="text" required className="input-field" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-silver mb-2">Adresa de Email</label>
              <input type="email" required className="input-field" />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase text-silver mb-2">Mesaj</label>
              <textarea rows={3} required className="input-field resize-none" />
            </div>
            <button type="submit" className="btn-primary">Solicită Consultație</button>
          </form>
        </div>
      </section>

      <footer className="py-8 px-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-serif text-xl text-gold tracking-widest">ANTONELA BUTUC</span>
        <div className="flex gap-8">
          <a href="https://www.facebook.com/AntonelaButuc" target="_blank" rel="noopener noreferrer" className="text-silver text-xs tracking-wide hover:text-gold transition-colors no-underline">
            Facebook
          </a>
          <a href="https://www.instagram.com/antonela.m.butuc/" target="_blank" rel="noopener noreferrer" className="text-silver text-xs tracking-wide hover:text-gold transition-colors no-underline">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/antonelamariabutuc/" target="_blank" rel="noopener noreferrer" className="text-silver text-xs tracking-wide hover:text-gold transition-colors no-underline">
            LinkedIn
          </a>
        </div>
        <span className="text-silver text-xs">© 2024 Antonela Butuc. Toate drepturile rezervate.</span>
      </footer>
    </>
  );
}
