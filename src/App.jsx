import React, { useState, useEffect, useRef } from 'react'
import {
  Menu,
  X,
  ChevronRight,
  Settings,
  Droplets,
  Filter,
  Wrench,
  ShieldCheck,
  Mail,
  MessageCircle,
  Building2,
  Truck,
  CheckCircle2,
  HardHat,
  Factory,
  MapPin,
  Globe,
  Briefcase,
  ArrowRight,
  ArrowUp
} from 'lucide-react'

// Custom Logo Component - Professional SVG representing Akasia (Leaf) + Industrial (A-frame)
const Logo = ({ className = 'w-10 h-10', color = '#66b879' }) => (
  <svg viewBox='0 0 100 100' className={className} fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M50 10L15 85H30L50 40L70 85H85L50 10Z' fill={color} />
    <path d='M50 25C50 25 65 45 65 65C65 75 58 82 50 82C42 82 35 75 35 65C35 45 50 25 50 25Z' fill='white' fillOpacity='0.3' />
    <circle cx='50' cy='60' r='8' fill='white' />
  </svg>
)

// Custom Reveal Component to handle scroll-triggered animations
const Reveal = ({ children, width = 'fit-content', delay = 0 }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        width,
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(30px)',
        transition: `opacity 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s, transform 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  )
}

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Monitor scroll for navbar styles and back to top button
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Apply Montserrat font and keyframes to the document
  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const style = document.createElement('style')
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      @keyframes pulse-soft {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      .animate-float {
        animation: float 5s ease-in-out infinite;
      }
      .animate-pulse-soft {
        animation: pulse-soft 3s ease-in-out infinite;
      }
      .bg-grid {
        background-size: 50px 50px;
        background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
      }
      .mask-gradient {
        mask-image: linear-gradient(to bottom, black, transparent);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(style)
    }
  }, [])

  const mainColor = '#66b879'

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' }
  ]

  const productCategories = [
    {
      title: 'Wear Parts & Mechanical',
      description: 'Designed to support productivity and minimize operational downtime in mining and processing operations.',
      icon: <Settings className='w-8 h-8' style={{ color: mainColor }} />,
      items: ['Bucket Teeth', 'Cutting Edge', 'Ripper Shank', 'Drill Bit', 'Drill Rod', 'Crusher Liner', 'Conveyor Belt', 'Conveyor Roller']
    },
    {
      title: 'Lubrication & Maintenance',
      description: 'Supporting equipment reliability and operational efficiency under demanding working conditions.',
      icon: <Droplets className='w-8 h-8' style={{ color: mainColor }} />,
      items: ['Engine Oil', 'Hydraulic Oil', 'Gear Oil', 'Grease']
    },
    {
      title: 'Filters',
      description: 'Industrial-grade filtration products to protect engines and hydraulic systems from contamination.',
      icon: <Filter className='w-8 h-8' style={{ color: mainColor }} />,
      items: ['Oil Filter', 'Fuel Filter', 'Air Filter', 'Hydraulic Filter']
    },
    {
      title: 'Supporting Materials',
      description: 'Essential materials required for maintenance, repair, and daily operational readiness.',
      icon: <Wrench className='w-8 h-8' style={{ color: mainColor }} />,
      items: ['OTR Tire', 'Wire Rope', 'Hydraulic Hose', 'Seal Kit', 'Bolt & Nut', 'Gasket']
    },
    {
      title: 'Safety & PPE',
      description: 'Providing PPE to support safe working environments and compliance with site safety requirements.',
      icon: <ShieldCheck className='w-8 h-8' style={{ color: mainColor }} />,
      items: ['Safety Helmet', 'Safety Shoes', 'Wearpack', 'Safety Gloves', 'Mask / Respirator']
    }
  ]

  const industries = [
    { name: 'Mining Operations', icon: <Truck className='w-10 h-10 mb-4' /> },
    { name: 'Smelter & Processing', icon: <Factory className='w-10 h-10 mb-4' /> },
    { name: 'Heavy Equipment', icon: <HardHat className='w-10 h-10 mb-4' /> },
    { name: 'Industrial Plants', icon: <Building2 className='w-10 h-10 mb-4' /> }
  ]

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900 scroll-smooth selection:bg-green-100 selection:text-green-900" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-[60] p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-90 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
        style={{ backgroundColor: mainColor, color: 'white' }}
      >
        <ArrowUp size={24} />
      </button>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-xl py-2' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center space-x-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:scale-150 transition-transform duration-700"></div>
                <Logo className="w-12 h-12 relative z-10 transition-transform duration-700 group-hover:rotate-[360deg] drop-shadow-lg" color={scrolled || isMenuOpen ? mainColor : 'white'} />
              </div>
              <div className="flex flex-col">
                <span className={`font-black text-xl leading-tight tracking-tighter transition-colors duration-500 ${scrolled || isMenuOpen ? 'text-slate-900' : 'text-white'}`}>PT AKAL KARYA</span>
                <span className={`text-[11px] font-extrabold tracking-[0.4em] uppercase transition-opacity duration-500 ${scrolled || isMenuOpen ? 'text-[#66b879]' : 'text-white/70'}`}>INDONESIA</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className={`group relative text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${scrolled ? 'text-slate-600' : 'text-white/80 hover:text-white'}`}>
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: mainColor }}></span>
                </a>
              ))}
              <a href="#contact" className="group relative overflow-hidden text-white px-10 py-3.5 rounded-full font-black text-xs tracking-widest transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-95" style={{ backgroundColor: mainColor }}>
                <span className="relative z-10">CONTACT US</span>
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg transition-colors duration-300 ${scrolled || isMenuOpen ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white/95 backdrop-blur-2xl border-b border-slate-100 transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0 h-screen' : 'opacity-0 -translate-y-10 h-0 pointer-events-none'}`}>
          <div className="py-20 px-8 flex flex-col items-center space-y-10">
            {navLinks.map((link, i) => (
              <a key={link.name} href={link.href} className="text-3xl font-black text-slate-800 hover:text-green-600 transition-all opacity-0 translate-y-10" style={{ animation: isMenuOpen ? `slideUp 0.5s ease-out ${i * 0.1}s forwards` : 'none' }} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            ))}
            <a href="#contact" className="w-full text-center text-white px-6 py-5 rounded-2xl font-black text-lg tracking-widest shadow-2xl opacity-0 translate-y-10" style={{ backgroundColor: mainColor, animation: isMenuOpen ? `slideUp 0.5s ease-out 0.4s forwards` : 'none' }} onClick={() => setIsMenuOpen(false)}>
              CONTACT US
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-900">
        {/* Modern Geometric Hero BG */}
        <div className="absolute inset-0 z-0 transition-transform duration-1000 ease-out" style={{ backgroundColor: mainColor }}>
          <div className="absolute inset-0 bg-grid opacity-30"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-white/10 skew-x-12 blur-[120px] rounded-full animate-pulse-soft"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[80%] bg-black/20 -skew-x-12 blur-[100px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center px-5 py-2.5 bg-white/15 backdrop-blur-xl rounded-2xl mb-10 border border-white/20 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse mr-3"></div>
                <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">
                  INDUSTRIAL SOLUTION
                </span>
              </div>
            </Reveal>
            
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[1] mb-10 tracking-tighter opacity-0 translate-y-10 animate-[slideUp_1s_ease-out_0.2s_forwards]">
              MINING & SMELTER <span className="text-black/30">INDUSTRIAL</span> CONSUMABLES IN INDONESIA
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-14 leading-relaxed max-w-2xl font-medium opacity-0 translate-y-10 animate-[slideUp_1s_ease-out_0.4s_forwards]">
              Reliable non-chemical industrial consumables supporting mining operations, smelter facilities, and heavy equipment maintenance with consistent supply and responsive service
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 opacity-0 translate-y-10 animate-[slideUp_1s_ease-out_0.6s_forwards]">
              <a 
                href="#contact" 
                className="group relative bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-sm tracking-[0.2em] transition-all duration-500 hover:bg-slate-900 hover:text-white hover:scale-110 active:scale-95 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                GET STARTED
                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </a>
              <a 
                href="#products" 
                className="group relative border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-black text-sm tracking-[0.2em] transition-all duration-500 hover:bg-white/10 hover:border-white flex items-center justify-center backdrop-blur-sm"
              >
                OUR SOLUTIONS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="relative group">
              <div className="relative z-10 w-full aspect-square flex items-center justify-center rounded-[4rem] transition-all duration-1000 group-hover:rounded-[2rem] group-hover:rotate-2 shadow-2xl" style={{ backgroundColor: mainColor + '10' }}>
                <div className="relative p-16 text-center transition-all duration-700 group-hover:scale-105">
                  <div className="bg-white p-12 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] inline-block mb-10 transition-transform duration-700 group-hover:-rotate-6">
                    <Briefcase className="w-24 h-24" style={{ color: mainColor }} />
                  </div>
                  <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">Reliable Partner</h3>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">Engineered for supply consistency and operational responsiveness.</p>
                </div>
              </div>
              {/* Animated Accent */}
              <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full border-[40px] opacity-10 animate-float transition-transform duration-1000 group-hover:scale-150" style={{ borderColor: mainColor }}></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-3xl opacity-20 transition-transform duration-1000 group-hover:-translate-x-20 group-hover:-translate-y-20" style={{ backgroundColor: mainColor }}></div>
            </div>

            <div className="space-y-12">
              <Reveal>
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-2 rounded-full" style={{ backgroundColor: mainColor }}></div>
                  <span className="text-[12px] font-black uppercase tracking-[0.5em]" style={{ color: mainColor }}>CORPORATE PROFILE</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-12 text-slate-900 leading-[1.1] tracking-tighter">Trusted Industrial Consumables Partner for Mining & Heavy Industries</h2>
                <div className="space-y-8 text-slate-600 text-xl leading-relaxed font-medium">
                  <p className="border-l-4 pl-8 border-green-100">
                    <span className="font-black text-slate-900">PT Akal Karya Indonesia</span> is an Indonesia-based industrial trading and supply company specializing in non-chemical consumables for mining, smelter, and heavy equipment industries.

                  </p>
                  <p className="pl-8">
                    We support operational reliability by supplying products required for maintenance, repair, and daily operations, helping our clients maintain productivity, safety, and equipment performance.
                  </p>
                </div>
                
                <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
                  {[
                    "Maintenance & Repair",
                    "Daily Operations Support",
                    "Equipment Performance",
                    "Site Safety Standards"
                  ].map((item, i) => (
                    <Reveal key={i} delay={0.1 * i}>
                      <div className="group flex items-center space-x-5 p-6 rounded-3xl transition-all duration-300 hover:bg-slate-50 hover:shadow-xl hover:-translate-y-2">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#66b879] group-hover:text-white group-hover:rotate-12" style={{ backgroundColor: mainColor + '15', color: mainColor }}>
                          <CheckCircle2 size={24} />
                        </div>
                    "Maintenance & Repair",
                    "Daily Operations Support",
                    "Equipment Performance",
                    "Site Safety Standards"
                  ].map((item, i) => (
                    <Reveal key={i} delay={0.1 * i}>
                      <div className="group flex items-center space-x-5 p-6 rounded-3xl transition-all duration-300 hover:bg-slate-50 hover:shadow-xl hover:-translate-y-2">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:bg-[#66b879] group-hover:text-white group-hover:rotate-12" style={{ backgroundColor: mainColor + '15', color: mainColor }}>
                          <CheckCircle2 size={24} />
                        </div>
                        <span className="text-sm font-black text-slate-800 tracking-tight uppercase tracking-widest">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Slider/Grid */}
      <section className="py-40 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <Logo className="w-full h-full" color={mainColor} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-32">
            <Reveal width="100%">
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Strategic Impact</h2>
              <div className="w-32 h-3 mx-auto mb-10 rounded-full" style={{ backgroundColor: mainColor }}></div>
              <p className="text-slate-500 max-w-2xl mx-auto font-semibold text-xl">Operational challenges met with engineered solutions and logistics excellence.</p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {industries.map((ind, i) => (
              <Reveal key={i} delay={0.1 * i} width="100%">
                <div className="bg-white p-14 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-4xl hover:-translate-y-6 transition-all duration-700 text-center group h-full flex flex-col items-center">
                  <div className="p-8 rounded-[2rem] mb-10 transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white group-hover:scale-110 shadow-xl" style={{ backgroundColor: mainColor + '10', color: mainColor }}>
                    {ind.icon}
                  </div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-[0.3em] leading-relaxed">{ind.name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <Reveal>
              <span className="text-[12px] font-black uppercase tracking-[0.6em] block mb-6" style={{ color: mainColor }}>PRODUCT ECOSYSTEM</span>
              <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">Comprehensive Products for Mining & Smelter Operations<br/>for Mining & Smelter Operations</h2>
            </Reveal>
            <Reveal>
              <a href="#contact" className="group flex items-center font-black text-slate-400 hover:text-slate-900 transition-all text-sm uppercase tracking-widest pb-2 border-b-2 border-slate-100 hover:border-slate-900">
                Full Specification <ChevronRight className="ml-3 group-hover:translate-x-3 transition-transform" />
              </a>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {productCategories.map((cat, i) => (
              <Reveal key={i} delay={0.1 * i} width="100%">
                <div className="group flex flex-col p-14 border border-slate-100 rounded-[4rem] bg-slate-50 hover:bg-white hover:shadow-5xl transition-all duration-1000 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-[15] transition-transform duration-[1.5s] ease-in-out"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-12 p-6 bg-white rounded-3xl inline-block shadow-2xl group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 group-hover:rotate-[360deg]">
                      {cat.icon}
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tighter">{cat.title}</h3>
                    <p className="text-sm text-slate-500 font-bold mb-12 leading-relaxed italic">"{cat.description}"</p>
                    
                    <div className="space-y-4">
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 border-b border-slate-200 pb-4">Core Inventory</p>
                      <div className="flex flex-wrap gap-3">
                        {cat.items.map((item, idx) => (
                          <span key={idx} className="inline-block px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black text-slate-800 uppercase tracking-widest shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-default">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            
            {/* Global Reach Card */}
            <Reveal width="100%" delay={0.4}>
              <div className="p-16 rounded-[4rem] flex flex-col justify-center text-white relative overflow-hidden h-full group transition-all duration-700 hover:scale-[1.02]" style={{ backgroundColor: mainColor }}>
                <div className="absolute inset-0 bg-black/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <Globe className="w-20 h-20 mb-10 text-white/50 animate-float" />
                  <h3 className="text-4xl font-black mb-8 tracking-tighter leading-tight">Global Sourcing Infrastructure</h3>
                  <p className="text-white/80 font-semibold mb-12 text-xl leading-relaxed">Leveraging a premium network of manufacturers to ensure consistent site operational excellence.</p>
                  <a href="#contact" className="group text-white font-black text-xs uppercase tracking-[0.4em] flex items-center space-x-6 bg-white/20 w-fit px-10 py-5 rounded-full border border-white/30 hover:bg-white hover:text-[#66b879] transition-all shadow-2xl">
                    <span>INQUIRE</span>
                    <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="max-w-3xl">
              <Reveal>
                <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9]">Why Choose Us</h2>
                <p className="text-slate-400 text-2xl font-bold tracking-tight">The benchmark for industrial supply reliability.</p>
              </Reveal>
            </div>
            <div className="hidden md:block w-48 h-4 rounded-full" style={{ backgroundColor: mainColor }}></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-20">
            {[
              { title: "Targeted Expertise", desc: "Specialized knowledge in Mining, Smelter, and Heavy Industry requirements." },
              { title: "Qualified Network", desc: "Rigorous manufacturer selection to guarantee field performance." },
              { title: "Agile Operations", desc: "Streamlined logistics designed for remote site accessibility." },
              { title: "Direct Pipeline", desc: "Professional coordination from technical brief to after-sales support." },
              { title: "Verified Integrity", desc: "Building sustainable business value through transparent supply chains." },
              { title: "Safety Adherence", desc: "Compliance focused products that align with global safety mandates." }
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="flex flex-col group border-l-4 border-white/5 pl-12 hover:border-[#66b879] transition-all duration-700">
                  <div className="text-8xl font-black mb-8 opacity-5 transition-all duration-700 group-hover:opacity-60 group-hover:-translate-y-4" style={{ color: mainColor }}>{i + 1}</div>
                  <h4 className="font-black text-2xl mb-6 tracking-tight group-hover:text-[#66b879] transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-base leading-relaxed font-semibold">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-32">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="text-[12px] font-black uppercase tracking-[0.6em] block mb-10" style={{ color: mainColor }}>COMMUNICATIONS</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-14 tracking-tighter leading-[1.1]">Partnering for Industrial Success</h2>
              </Reveal>
              
              <div className="space-y-16 mt-20">
                {[
                  { icon: <MapPin size={28} style={{ color: mainColor }} />, label: "Headquarters", val: "Palma Tower, Floor 18 Unit D1, South Jakarta, 12310" },
                  { icon: <Mail size={28} style={{ color: mainColor }} />, label: "Corporate Inquiry", val: "arya@akasia.id", link: "mailto:arya@akasia.id" },
                  { icon: <MessageCircle size={28} className="text-green-600" />, label: "WhatsApp Official", val: "+62 851-7226-7530", link: "https://wa.me/6285172267530" }
                ].map((item, i) => (
                  <Reveal key={i} delay={0.2 + (i * 0.1)}>
                    <div className="flex items-start space-x-8 group">
                      <div className="p-6 rounded-[2rem] flex-shrink-0 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-2xl" style={{ backgroundColor: mainColor + '10' }}>
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="font-black text-slate-400 mb-3 uppercase text-[11px] tracking-[0.4em]">{item.label}</h5>
                        {item.link ? (
                          <a href={item.link} className="text-slate-900 font-black text-2xl hover:text-[#66b879] transition-all decoration-[#66b879] decoration-4 tracking-tighter">{item.val}</a>
                        ) : (
                          <p className="text-lg text-slate-600 leading-relaxed font-bold italic pr-10">{item.val}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <Reveal width="100%" delay={0.3}>
                <div className="bg-slate-50 p-12 md:p-20 rounded-[4rem] border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                  <form className="grid gap-12 relative z-10" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="relative group">
                        <input type="text" className="w-full px-0 py-5 bg-transparent border-b-4 border-slate-200 outline-none focus:border-[#66b879] transition-all font-black text-xl text-slate-900 peer" placeholder=" " />
                        <label className="absolute left-0 top-5 text-slate-400 font-black text-xs uppercase tracking-[0.3em] transition-all peer-focus:-translate-y-12 peer-focus:text-[#66b879] peer-[:not(:placeholder-shown)]:-translate-y-12 peer-[:not(:placeholder-shown)]:text-[#66b879]">Full Identity</label>
                      </div>
                      <div className="relative group">
                        <input type="email" className="w-full px-0 py-5 bg-transparent border-b-4 border-slate-200 outline-none focus:border-[#66b879] transition-all font-black text-xl text-slate-900 peer" placeholder=" " />
                        <label className="absolute left-0 top-5 text-slate-400 font-black text-xs uppercase tracking-[0.3em] transition-all peer-focus:-translate-y-12 peer-focus:text-[#66b879] peer-[:not(:placeholder-shown)]:-translate-y-12 peer-[:not(:placeholder-shown)]:text-[#66b879]">Work Email</label>
                      </div>
                    </div>
                    <div className="relative group">
                      <textarea className="w-full px-0 py-5 bg-transparent border-b-4 border-slate-200 outline-none focus:border-[#66b879] transition-all font-black text-xl text-slate-900 h-40 peer resize-none" placeholder=" "></textarea>
                      <label className="absolute left-0 top-5 text-slate-400 font-black text-xs uppercase tracking-[0.3em] transition-all peer-focus:-translate-y-12 peer-focus:text-[#66b879] peer-[:not(:placeholder-shown)]:-translate-y-12 peer-[:not(:placeholder-shown)]:text-[#66b879]">Requirement Brief</label>
                    </div>
                    <button className="group w-full text-white font-black py-8 rounded-3xl transition-all duration-500 shadow-[0_30px_60px_rgba(102,184,121,0.4)] tracking-[0.5em] text-sm hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center space-x-6" style={{ backgroundColor: mainColor }}>
                      <span>SEND TRANSMISSION</span>
                      <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 pt-40 pb-20 border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-24 mb-32">
            <div className="col-span-2">
              <div className="flex items-center space-x-5 mb-12 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <Logo className="w-16 h-16 relative z-10 transition-transform duration-1000 group-hover:rotate-[360deg]" color={mainColor} />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-3xl leading-tight tracking-tighter uppercase text-slate-800">PT AKAL KARYA</span>
                  <span className="text-[12px] font-black tracking-[0.5em] uppercase" style={{ color: mainColor }}>INDONESIA</span>
                </div>
              </div>
              <p className="text-slate-500 text-lg max-w-sm leading-relaxed font-semibold mb-12">
                Advancing industrial reliability through precision sourcing and supply chain integrity.
              </p>
            </div>
            
            <div>
              <h5 className="font-black text-slate-900 mb-12 uppercase tracking-[0.5em] text-[11px]">System Map</h5>
              <ul className="space-y-8">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="group flex items-center text-slate-500 text-sm hover:text-slate-900 transition-all font-black tracking-[0.1em] uppercase">
                      <span className="w-0 group-hover:w-4 h-0.5 bg-green-500 mr-0 group-hover:mr-3 transition-all"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-black text-slate-900 mb-12 uppercase tracking-[0.5em] text-[11px]">Corporate Office</h5>
              <p className="text-slate-400 text-[11px] leading-[2] font-black uppercase tracking-widest mb-12">
                Palma Tower, Floor 18 Unit D1<br />
                JL. RA Kartini II-S Kav. 6<br />
                South Jakarta, 12310
              </p>
              <div className="pt-10 border-t border-slate-200">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] block">PROTOCOL: INDUSTRIAL_V2.5</span>
              </div>
            </div>
          </div>
          
          <div className="pt-20 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-slate-400 text-[11px] font-black uppercase tracking-[0.6em]">
            <p>© {new Date().getFullYear()} PT AKAL KARYA INDONESIA. INTEGRATED SYSTEMS.</p>
            <div className="flex space-x-16 mt-10 md:mt-0">
              <span className="hover:text-slate-800 transition-colors cursor-pointer border-b border-transparent hover:border-slate-800">PRIVACY PROTOCOL</span>
              <span style={{ color: mainColor }} className="animate-pulse">NODE: JAKARTA_HUB</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Animation Definitions */}
      <style>{`
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    </>
  )
}

export default App
