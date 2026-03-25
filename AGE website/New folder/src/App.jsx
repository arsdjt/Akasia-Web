import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { 
  Truck, 
  Droplets, 
  FlaskConical, 
  ShieldCheck, 
  Factory, 
  Navigation, 
  MapPin, 
  Mail, 
  Phone,
  ArrowRight,
  Menu,
  X,
  Zap,
  Leaf,
  Settings,
  Download,
  MessageCircle,
  Shovel,
  Wind,
  Sun,
  Layers,
  CheckCircle2,
  Anchor,
  Activity,
  Box,
  Globe
} from 'lucide-react';

// --- Font Import ---
const GlobalStyle = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..0,800;1,300..0,800&display=swap');
    body {
      font-family: 'Open Sans', sans-serif !important;
    }
    h1, h2, h3, h4, .font-black {
      font-weight: 800 !important;
    }
  `}} />
);

// --- Global Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-[#ffde59] origin-left z-[120]" 
      style={{ scaleX }} 
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Solutions', href: '#services' },
    { name: 'Products', href: '#portfolio' },
    { name: 'Logistics', href: '#services' },
    { name: 'About Us', href: '#about-us' }
  ];

  return (
    <>
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            {/* Adjusted Logo Container: 64px -> 80px -> 96px */}
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#ffde59] rounded-lg flex items-center justify-center font-black text-xl md:text-2xl lg:text-3xl text-slate-900 shadow-sm shrink-0 transition-all duration-300">
              AGE
            </div>
          </motion.div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block bg-[#ffde59] text-slate-900 px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:shadow-lg transition-all"
            >
              REQUEST A QUOTE
            </motion.button>
            <button 
              onClick={() => setMenuOpen(true)}
              className="group p-2 hover:bg-slate-100 rounded-full transition-colors relative"
              aria-label="Open Menu"
            >
              <Menu size={24} className="md:w-7 md:h-7 text-slate-900 transition-transform group-hover:rotate-12" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-[#ffde59] flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:bg-black/10 rounded-full transition-colors"
            >
              <X size={32} className="md:w-10 md:h-10 text-slate-900" />
            </button>
            
            <div className="flex flex-col space-y-6 md:space-y-8 text-center px-6">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1) }}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 hover:text-white transition-colors tracking-tighter uppercase"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const BackgroundGrid = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 5000], [0, -200]);

  return (
    <motion.div 
      style={{ y }}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.05]"
    >
      <div className="absolute inset-0" style={{ 
        backgroundImage: 'radial-gradient(#ffde59 1px, transparent 1px)', 
        backgroundSize: '60px 60px' 
      }} />
    </motion.div>
  );
};

const ClientCarousel = () => {
  const clients = [
    "AMMAN MINERAL",
    "FREEPORT INDONESIA",
    "PERTAMINA",
    "PT. KAN",
    "DONGGI SENORO"
  ];

  const extendedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-12 md:py-20 bg-white overflow-hidden border-y border-slate-50 relative">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
        <h2 className="text-center text-[10px] md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-slate-400">
          A Trusted Partner to Indonesia’s Industrial Giants
        </h2>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {extendedClients.map((client, idx) => (
            <div 
              key={idx} 
              className="mx-6 md:mx-12 flex items-center justify-center grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group cursor-default"
            >
              <span className="text-xl sm:text-2xl md:text-4xl font-black tracking-tighter text-slate-900 transition-colors">
                {client.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? "group-hover:text-[#ffde59] transition-colors" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StatCounter = ({ end, label, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div 
      ref={ref} 
      variants={fadeUp}
      className="space-y-1 md:space-y-2"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-400">
        {label}
      </div>
    </motion.div>
  );
};

const PortfolioCard = ({ icon: Icon, category, items, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } }
    }}
    whileHover={{ y: -8, border: '1px solid #ffde59', boxShadow: "0 30px 60px -12px rgba(255, 222, 89, 0.1)" }}
    className="bg-white border border-slate-100 p-6 md:p-8 rounded-2xl md:rounded-3xl transition-all duration-500 group relative overflow-hidden h-full flex flex-col"
  >
    <div className="absolute top-0 right-0 w-20 h-20 md:w-24 md:h-24 bg-[#ffde59]/10 rounded-bl-full -mr-6 -mt-6 md:-mr-8 md:-mt-8 transition-all group-hover:bg-[#ffde59]/30" />
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-[#ffde59] transition-all duration-300 shrink-0">
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-slate-900" />
      </div>
      <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight group-hover:text-slate-900 transition-colors uppercase tracking-tighter">
        {category}
      </h3>
    </div>
    
    <div className="space-y-5 md:space-y-6 flex-grow">
      {items.map((section, idx) => (
        <div key={idx} className="space-y-1.5">
          <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#ffde59]">{section.title}</div>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
            {section.content}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

const OperationalPillar = ({ icon: Icon, title, description, points }) => (
  <motion.div 
    variants={fadeUp}
    className="group p-6 md:p-8 bg-white border border-slate-50 hover:border-[#ffde59] rounded-2xl md:rounded-3xl transition-all duration-500 h-full flex flex-col"
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 md:mb-6 group-hover:bg-[#ffde59] transition-all duration-300 shrink-0">
      <Icon className="w-6 h-6 md:w-7 md:h-7 text-slate-900" />
    </div>
    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 uppercase tracking-tighter">{title}</h3>
    <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-5 md:mb-6 flex-grow">{description}</p>
    <ul className="space-y-2 md:space-y-3">
      {points.map((p, i) => (
        <li key={i} className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-bold text-slate-700">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffde59] shrink-0" />
          {p}
        </li>
      ))}
    </ul>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true });

  const handleForm = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 scroll-smooth overflow-x-hidden relative">
      <GlobalStyle />
      <ScrollProgress />
      <BackgroundGrid />
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ffde59] rounded-full blur-[120px] pointer-events-none"
          />
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 mb-6 md:mb-8 leading-[1] md:leading-[0.9]">
              Powering <br />
              <span className="relative inline-block text-slate-900 group">
                Indonesia's
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1.2 }}
                  className="absolute -bottom-1 md:-bottom-2 left-0 h-2 md:h-4 bg-[#ffde59] -z-10 group-hover:h-full transition-all duration-500 opacity-80"
                />
              </span><br />
              Downstream.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="max-w-2xl mx-auto mb-8 md:mb-12 text-base md:text-xl text-slate-700 font-semibold leading-relaxed"
          >
            Providing essential chemical products and specialized environmental solutions to support safe, sustainable, and efficient operations across the nation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#ffde59] text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest shadow-xl shadow-yellow-500/20 transition-all"
            >
              Explore Products
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto border-2 border-slate-900 text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
            >
              Our Solutions
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-12 bg-[#ffde59]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scroll</span>
        </motion.div>
      </section>

      {/* 3. ABOUT US */}
      <section id="about-us" className="py-16 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="text-[#ffde59] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">The Strategic Advantage</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 mb-6 md:mb-8 leading-tight tracking-tighter">
                Operational Excellence <br />Built on Expertise.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-8 md:mb-12">
                AGE is backed by a team of industry experts and state-of-the-art technology to ensure operational excellence for industrial clients. We integrate safety with large-scale logistical precision.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                <StatCounter end={100} suffix="%" label="B3 Compliance" />
                <StatCounter end={50} suffix="T" label="Fleet Capacity" />
                <StatCounter end={24} suffix="/7" label="On-Site Reliability" />
                <StatCounter end={15} suffix="+" label="Years Expertise" />
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-4 md:gap-6 mt-8 lg:mt-0"
            >
              {[
                { title: "Licensed Expertise", desc: "Fully authorized for Hazardous Material (B3) Import & Transport.", icon: ShieldCheck },
                { title: "Specialized Fleet", desc: "Dedicated chemical tankers and hazardous material carriers tailored for mining.", icon: Truck },
                { title: "Operational Depth", desc: "Significant expertise in smelting operations managed by industry shareholders.", icon: Factory },
                { title: "On-Site Reliability", desc: "We maintain consignment stock at key client sites, such as Amman Mineral.", icon: Activity }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-5 md:p-6 bg-white border border-slate-50 rounded-2xl flex items-start gap-4 md:gap-5 hover:shadow-xl hover:border-[#ffde59] transition-all group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl flex items-center justify-center shadow-sm shrink-0 group-hover:bg-[#ffde59] transition-all">
                    <item.icon className="text-slate-900 w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-tighter mb-1">{item.title}</h4>
                    <p className="text-[10px] md:text-xs text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ClientCarousel />

      {/* 4. PORTFOLIO */}
      <section id="portfolio" className="py-16 md:py-32 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-24">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mb-4 md:mb-6 leading-tight"
            >
              Product Portfolio
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              className="h-2 md:h-3 bg-[#ffde59] mx-auto" 
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <PortfolioCard index={0} icon={Shovel} category="Mining & Smelting Solutions" items={[{ title: "Extraction Agents", content: "Sulfuric Acid for nickel leaching, Nitric Acid for oxidation, and Cyanide solutions." }, { title: "Refining Additives", content: "Borax and Silica Sand used as fluxes, and Carbon Coke as a reducing agent." }, { title: "Process Chemicals", content: "Hydrogen Peroxide, Activated Carbon, and Sodium-based compounds." }]} />
            <PortfolioCard index={1} icon={Droplets} category="Oil & Gas and EOR Chemicals" items={[{ title: "Drilling & Production", content: "Barite, Bentonite, and polymer viscosifiers alongside scale inhibitors." }, { title: "Enhanced Recovery (EOR)", content: "Specialized surfactants, alkaline chemicals, and high-molecular-weight polymers." }]} />
            <PortfolioCard index={2} icon={Leaf} category="Agrochemicals & Fertilizer Inputs" items={[{ title: "Raw Materials", content: "Potassium Chloride, Phosphate Rock, Urea, and Ammonium Nitrate." }, { title: "Processing Aids", content: "Phosphoric and Sulfuric acids, plus specialized anti-caking and coating agents." }]} />
            <PortfolioCard index={3} icon={Wind} category="Power Plant & Water Treatment" items={[{ title: "Boiler & Cooling", content: "Oxygen scavengers, scale inhibitors, and biocides to prevent fouling." }, { title: "Environmental", content: "Lime, Ammonia, and Activated Carbon for effective flue gas treatment." }]} />
            <PortfolioCard index={4} icon={Sun} category="Hydroprocessing & Green Energy" items={[{ title: "Catalysts", content: "Nickel, Cobalt-Molybdenum, and Precious Metal catalysts for hydrogenation." }, { title: "Auxiliaries", content: "High-purity Hydrogen gas and specialized Zeolite catalysts." }]} />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.05)" }}
              className="bg-[#ffde59] p-8 rounded-2xl md:rounded-3xl flex flex-col justify-center items-center text-center shadow-xl group cursor-pointer transition-all min-h-[300px] border border-[#ffde59]"
            >
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.6 }} className="w-14 h-14 md:w-16 md:h-16 bg-white/40 rounded-full flex items-center justify-center mb-5 md:mb-6 shrink-0">
                <Box className="w-7 h-7 md:w-8 md:h-8 text-slate-900" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 md:mb-4 uppercase tracking-tighter leading-tight">Request Custom Spec</h3>
              <p className="text-slate-800 text-xs md:text-sm font-bold mb-6 md:mb-8">Need a specific chemical formulation or bulk procurement plan?</p>
              <button className="bg-slate-900 text-[#ffde59] px-6 md:px-8 py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg group-hover:bg-slate-800 transition-colors">Contact Sales</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section id="services" className="py-16 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6 md:gap-8">
            <div className="max-w-xl">
              <span className="text-[#ffde59] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block">Specialized Services</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[1.1]">Operational <br className="hidden sm:block" />Pillars.</h2>
            </div>
            <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] max-w-xs md:text-right leading-relaxed">
              Mastering the complex logistics of the heavy downstream industry.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid lg:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ffde59] rounded-lg flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                Logistics & Transportation
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <OperationalPillar icon={ShieldCheck} title="Hazardous Materials" description="Safe transport of B3 chemical waste and solvents using ADR-certified fleets." points={["Real-time GPS Tracking", "ADR-Certified Trucks", "Regulatory Compliance"]} />
                <OperationalPillar icon={Factory} title="Heavy Material Slag" description="Transporting smelting byproducts with reinforced dump trucks." points={["50-ton Capacity", "Reinforced Fleet", "Bulk Site Removal"]} />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 mt-12 lg:mt-0">
              <h4 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-3 uppercase tracking-tighter">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-[#ffde59] rounded-lg flex items-center justify-center shrink-0">
                  <Leaf className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                Environmental Services
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <OperationalPillar icon={Droplets} title="Tailing Management" description="Design, installation, and monitoring of industrial tailing systems." points={["Liner Installation", "IoT Monitoring", "Satellite Tracking"]} />
                <OperationalPillar icon={FlaskConical} title="Bioremediation" description="Biological treatment for heavy metals and cyanide decontamination." points={["Specialized Bacteria", "On-site Treatment", "Soil Restoration"]} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="py-16 md:py-24 bg-[#ffde59] relative overflow-hidden">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-6 md:mb-8 leading-[1.1]">Discuss Your Operational <br className="hidden sm:block" />Requirements.</motion.h2>
          <p className="text-sm md:text-lg text-slate-800 font-bold mb-8 md:mb-12 uppercase tracking-widest leading-relaxed">Connect with our team of experts today.</p>
          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl space-y-4 md:space-y-6" onSubmit={handleForm}>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              <input className="w-full bg-slate-50 border-none p-4 md:p-5 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-[#ffde59] font-bold text-sm transition-all" placeholder="Your Name" required />
              <input className="w-full bg-slate-50 border-none p-4 md:p-5 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-[#ffde59] font-bold text-sm transition-all" placeholder="Work Email" type="email" required />
            </div>
            <textarea className="w-full bg-slate-50 border-none p-4 md:p-5 rounded-xl md:rounded-2xl h-32 focus:ring-2 focus:ring-[#ffde59] font-bold text-sm transition-all resize-none" placeholder="How can we support your operation?" required />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${formSubmitted ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-black/10'}`}>
              {formSubmitted ? (<>Success <CheckCircle2 className="w-5 h-5" /></>) : (<>Request a Quote <div className="animate-pulse w-2 h-2 bg-[#ffde59] rounded-full" /></>)}
            </motion.button>
          </motion.form>
        </div>
      </section>

      <footer ref={footerRef} className="bg-white pt-16 md:pt-24 pb-12 overflow-hidden border-b-[12px] md:border-b-[20px] border-[#ffde59] relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={footerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }} className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2 mb-6 md:mb-8">
                {/* Adjusted Footer Logo Container: 80px -> 112px */}
                <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-900 rounded-lg flex items-center justify-center font-black text-xl md:text-3xl text-[#ffde59] shadow-md transition-all duration-300">
                  AGE
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed mb-6 md:mb-8 max-w-sm mt-4">PT Artha Graha Ekapada (AGE) is a leader in Indonesian downstream logistics and chemical distribution.</p>
              <div className="flex gap-4">
                <motion.a whileHover={{ y: -5, color: '#ffde59' }} href="#" className="w-8 h-8 md:w-10 md:h-10 bg-slate-50 rounded-full flex items-center justify-center transition-all"><Globe size={18} /></motion.a>
                <motion.a whileHover={{ y: -5, color: '#ffde59' }} href="#" className="w-8 h-8 md:w-10 md:h-10 bg-slate-50 rounded-full flex items-center justify-center transition-all"><Anchor size={18} /></motion.a>
              </div>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-3 gap-10 md:gap-12">
              <div className="space-y-4 md:space-y-6">
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">Company</h4>
                <div className="space-y-3 md:space-y-4 flex flex-col">
                  {['About Us', 'Services', 'Portfolio', 'Contact'].map(link => (
                    <motion.a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} whileHover={{ x: 5, color: '#ffde59' }} className="text-xs md:text-sm font-black text-slate-900 transition-colors">{link}</motion.a>
                  ))}
                </div>
              </div>

              <div className="space-y-4 md:space-y-6 sm:col-span-2">
                <h4 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">Headquarters</h4>
                <div className="space-y-6">
                  <div className="flex gap-3 md:gap-4 items-start">
                    <MapPin className="text-[#ffde59] w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">Palma Tower, 18th Floor Unit D1, TB Simatupang, <br className="hidden sm:block" />South Jakarta 12310, Indonesia.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                    <motion.a whileHover={{ color: '#ffde59' }} href="mailto:ronald@arthagrahaekapada.com" className="group">
                      <div className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1">Email</div>
                      <div className="text-xs md:text-sm font-black text-slate-900 transition-all inline-block underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-[#ffde59]">ronald@arthagrahaekapada.com</div>
                    </motion.a>
                    <motion.a whileHover={{ color: '#ffde59' }} href="https://wa.me/6281944988467" className="group">
                      <div className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 mb-1">WhatsApp</div>
                      <div className="text-xs md:text-sm font-black text-slate-900 transition-all inline-block underline decoration-transparent decoration-2 underline-offset-4 group-hover:decoration-[#ffde59]">+62 819-4498-8467</div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <div className="mt-12 md:mt-20 pt-8 md:pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-widest text-center">© 2026 PT Artha Graha Ekapada. All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FAB */}
      <motion.a href="https://wa.me/6281944988467" target="_blank" rel="noopener noreferrer" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#ffde59] text-slate-900 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/30 md:w-16 md:h-16">
        <MessageCircle className="w-7 h-7 fill-slate-900" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-slate-900"></span>
        </span>
      </motion.a>
    </div>
  );
}