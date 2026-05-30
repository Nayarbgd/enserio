import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Menu, X, Target, Diamond, Zap, Flame, Dumbbell, Brain, Leaf, 
  ShieldCheck, MapPin, Phone, Mail, Instagram, MessageCircle, Play 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80",
  about: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  coachMarcus: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=500&q=80",
  coachSarah: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=500&q=80",
  coachDavid: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
  coachAria: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=500&q=80",
  facilityMain: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1400&q=80",
  facilityHiit: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80",
  facilityRecovery: "https://images.unsplash.com/photo-1581009137042-c6173ad8af59?auto=format&fit=crop&w=700&q=80",
  videoBg: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1920&q=80",
  finalCta: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1920&q=80",
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
    nextSunday.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextSunday.getTime() - now;
      if (distance < 0) { clearInterval(timer); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", inquiryType: "", message: "" }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">

      {/* 1. TOP URGENCY BAR */}
      <div className="w-full bg-primary text-primary-foreground py-2 px-4 flex flex-col sm:flex-row justify-center items-center text-sm font-bold tracking-widest z-50 relative">
        <span className="text-center">FOUNDING MEMBER OFFER &mdash; 50% OFF First Month | Ends Sunday</span>
        <span className="sm:ml-6 mt-1 sm:mt-0 font-mono text-xs bg-black/20 px-3 py-1 rounded">
          {String(timeLeft.days).padStart(2, '0')}:{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>

      {/* 2. STICKY NAVIGATION */}
      <nav className="sticky top-0 w-full z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-3xl font-heading text-primary" data-testid="logo" style={{ letterSpacing: '0.08em' }}>
            HIITZONE
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-[0.18em] uppercase">
            <button onClick={() => scrollTo('home')} className="hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollTo('membership')} className="hover:text-primary transition-colors">Membership</button>
            <button onClick={() => scrollTo('trainers')} className="hover:text-primary transition-colors">Trainers</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>

          <div className="hidden md:block">
            <Button onClick={() => scrollTo('membership')} className="rounded-full font-semibold uppercase tracking-widest px-8 text-sm" data-testid="nav-join-btn">
              Join Now
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="mobile-menu-toggle">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 flex flex-col space-y-5 shadow-2xl">
            <button onClick={() => scrollTo('home')} className="text-left font-heading text-3xl" style={{ letterSpacing: '0.06em' }}>Home</button>
            <button onClick={() => scrollTo('about')} className="text-left font-heading text-3xl" style={{ letterSpacing: '0.06em' }}>About</button>
            <button onClick={() => scrollTo('membership')} className="text-left font-heading text-3xl" style={{ letterSpacing: '0.06em' }}>Membership</button>
            <button onClick={() => scrollTo('trainers')} className="text-left font-heading text-3xl" style={{ letterSpacing: '0.06em' }}>Trainers</button>
            <button onClick={() => scrollTo('contact')} className="text-left font-heading text-3xl" style={{ letterSpacing: '0.06em' }}>Contact</button>
            <Button onClick={() => scrollTo('membership')} className="w-full mt-4 font-semibold uppercase tracking-widest" size="lg">Join Now</Button>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/75 via-black/60 to-background" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 w-full text-center flex flex-col items-center">
          <motion.div {...fadeUp}>
            <h1 className="text-7xl md:text-[110px] lg:text-[150px] font-heading leading-none mb-8" style={{ letterSpacing: '0.06em' }}>
              <span className="block text-white drop-shadow-2xl">Discover Your</span>
              <span className="block text-primary drop-shadow-2xl">Power Within</span>
            </h1>
            <p className="text-base md:text-xl text-white/70 font-medium tracking-[0.25em] uppercase mb-14 max-w-xl mx-auto">
              Elite Fitness Experience in Dubai
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-sm font-semibold uppercase tracking-widest" onClick={() => scrollTo('membership')} data-testid="hero-primary-btn">
                Start Your Transformation
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-10 text-sm font-semibold uppercase tracking-widest border-2 hover:bg-white/5" onClick={() => scrollTo('membership')} data-testid="hero-secondary-btn">
                View Memberships
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 pt-12 border-t border-white/15 max-w-3xl mx-auto">
              {[
                { num: "500+", label: "Members" },
                { num: "15+", label: "Expert Trainers" },
                { num: "ELITE", label: "Premium Equipment" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl md:text-6xl font-heading text-primary mb-2" style={{ letterSpacing: '0.06em' }}>{stat.num}</div>
                  <div className="text-xs tracking-[0.22em] uppercase text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TRUST BAR */}
      <section className="bg-secondary/50 py-14 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 text-xs tracking-[0.3em] text-muted-foreground font-semibold uppercase">
            As Seen In / Trusted By
          </div>
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Time Out Dubai", "Gulf News", "Esquire Middle East", "Muscle & Fitness", "Dubai Sports Council"].map((brand) => (
              <div key={brand} className="px-5 py-3 border border-border/50 bg-background/50 rounded flex items-center justify-center font-semibold text-sm tracking-widest text-muted-foreground hover:text-white transition-colors uppercase" data-testid={`trust-logo-${brand}`}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY / ABOUT */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(201,168,76,0.08)]">
            <img
              src={IMAGES.about}
              alt="Athlete training at HIITZONE"
              className="absolute inset-0 w-full h-full object-cover object-center grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60" />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              Our Philosophy
            </div>
            <h2 className="text-6xl md:text-8xl font-heading leading-none mb-8" style={{ letterSpacing: '0.04em' }}>
              Discipline is the Foundation
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              HIITZONE isn't just a gym; it's a proving ground. We've stripped away the distractions to focus purely on performance, mindset, and unmatched results. In the heart of Business Bay, we forge the elite.
            </p>

            <div className="space-y-6">
              {[
                { icon: Target, title: "Precision Focus", desc: "No wasted movement. Every second engineered for maximum output." },
                { icon: Diamond, title: "Uncompromising Quality", desc: "From the equipment to the air filtration, only the absolute best." },
                { icon: Zap, title: "Electric Atmosphere", desc: "Train in an environment that pulls greatness out of you." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                    <item.icon className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-widest uppercase mb-1 font-sans">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. TRAINING PROGRAMS */}
      <section className="py-32 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              What We Offer
            </div>
            <h2 className="text-6xl md:text-8xl font-heading leading-none" style={{ letterSpacing: '0.04em' }}>
              Programs Built For Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Flame, title: "HIIT Training", desc: "High-intensity intervals designed to shred fat and push your cardiovascular limits to the absolute edge." },
              { icon: Dumbbell, title: "Strength & Conditioning", desc: "Build raw power and functional strength using elite-grade free weights and specialized equipment." },
              { icon: Brain, title: "Mental Performance", desc: "Rewire your mindset. Focus, discipline, and endurance training for high-performing individuals." },
              { icon: Leaf, title: "Nutrition Mastery", desc: "Bespoke fuel protocols. What you do outside the gym matters just as much as what you do inside." }
            ].map((prog, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Card className="bg-background border-t-2 border-t-primary border-x-border border-b-border h-full hover:bg-secondary/50 transition-colors group">
                  <CardHeader>
                    <prog.icon className="w-9 h-9 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="font-heading text-3xl" style={{ letterSpacing: '0.06em' }}>{prog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                      {prog.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ELITE COACHES */}
      <section id="trainers" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
                The Masters
              </div>
              <h2 className="text-6xl md:text-8xl font-heading leading-none" style={{ letterSpacing: '0.04em' }}>
                Elite Coaches
              </h2>
            </div>
            <Button variant="outline" className="h-12 px-8 font-semibold uppercase tracking-widest text-sm">
              Meet The Full Team
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Marcus Vance", role: "Performance Coach", img: IMAGES.coachMarcus },
              { name: "Sarah Chen", role: "HIIT Specialist", img: IMAGES.coachSarah },
              { name: "David Stone", role: "Strength Expert", img: IMAGES.coachDavid },
              { name: "Aria Knight", role: "Nutrition Coach", img: IMAGES.coachAria }
            ].map((coach, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="group cursor-pointer">
                <div className="aspect-square rounded-lg mb-5 border border-white/5 relative overflow-hidden group-hover:border-primary/50 transition-colors">
                  <img
                    src={coach.img}
                    alt={coach.name}
                    className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-1" style={{ letterSpacing: '0.06em' }}>{coach.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{coach.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-32 bg-secondary/30 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              Results
            </div>
            <h2 className="text-6xl md:text-8xl font-heading leading-none" style={{ letterSpacing: '0.04em' }}>
              The Transformation
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                name: "James R.",
                dur: "12 WEEKS",
                quote: "HIITZONE didn't just change my body; it rewired my mindset for success. The intensity here is unmatched anywhere in Dubai.",
                tag: "-15KG FAT / +5KG MUSCLE"
              },
              {
                name: "Lina K.",
                dur: "16 WEEKS",
                quote: "The atmosphere here is electric. Every session feels like an event. Best decision I've made for my health and sanity.",
                tag: "POST-PREGNANCY RECOVERY"
              }
            ].map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.2 }}>
                <Card className="bg-background border-border overflow-hidden h-full">
                  <div className="flex aspect-[2/1] border-b border-border">
                    <div className="flex-1 bg-neutral-900 flex items-center justify-center border-r border-border relative">
                      <span className="text-white/15 font-semibold text-lg tracking-widest uppercase">Before</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative">
                      <span className="text-primary/40 font-semibold text-lg tracking-widest uppercase">After</span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-primary font-heading text-2xl" style={{ letterSpacing: '0.06em' }}>{t.name}</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold tracking-widest rounded">{t.dur}</span>
                    </div>
                    <p className="text-base italic text-muted-foreground mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
                    <div className="text-xs font-semibold tracking-[0.22em] text-white/40 uppercase border-t border-white/10 pt-4">
                      {t.tag}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FACILITY GALLERY */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
                The Facility
              </div>
              <h2 className="text-6xl md:text-8xl font-heading leading-none" style={{ letterSpacing: '0.04em' }}>
                Peak Performance Environment
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground text-right hidden md:block text-sm leading-relaxed">
              State-of-the-art equipment. Bespoke lighting. Audiophile sound system. Designed for those who demand excellence.
            </p>
          </div>

          <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[580px]">
            <div className="lg:col-span-8 h-full rounded-lg border border-white/5 relative group overflow-hidden">
              <img src={IMAGES.facilityMain} alt="HIITZONE Main Floor" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 scale-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading text-4xl mb-1" style={{ letterSpacing: '0.06em' }}>Main Floor</h3>
                <p className="text-muted-foreground text-xs tracking-widest uppercase">Custom Rogue Rigs & Free Weights</p>
              </div>
            </div>
            <div className="lg:col-span-4 h-full flex flex-col gap-4">
              <div className="flex-1 rounded-lg border border-white/5 relative group overflow-hidden">
                <img src={IMAGES.facilityHiit} alt="HIIT Studio" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="font-heading text-2xl text-primary" style={{ letterSpacing: '0.06em' }}>HIIT Studio</h3>
                </div>
              </div>
              <div className="flex-1 rounded-lg border border-white/5 relative group overflow-hidden">
                <img src={IMAGES.facilityRecovery} alt="Recovery Zone" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <h3 className="font-heading text-2xl text-primary" style={{ letterSpacing: '0.06em' }}>Recovery Zone</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. VIDEO TOUR */}
      <section className="py-32 border-y border-white/5 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.videoBg})` }}
        />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-heading leading-none mb-14" style={{ letterSpacing: '0.04em' }}>
            Take A Tour Inside HIITZONE
          </h2>

          <motion.div {...fadeUp} className="relative aspect-video w-full max-w-5xl mx-auto bg-black/50 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary/40">
              <Play className="w-10 h-10 text-primary ml-2" fill="currentColor" />
            </div>
          </motion.div>

          <p className="mt-8 text-muted-foreground tracking-widest uppercase text-xs font-semibold">
            See why Dubai's elite choose HIITZONE
          </p>
        </div>
      </section>

      {/* 11. MEMBERSHIP PRICING */}
      <section id="membership" className="py-32 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              Pricing
            </div>
            <h2 className="text-6xl md:text-8xl font-heading leading-none" style={{ letterSpacing: '0.04em' }}>
              Membership Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0 }}>
              <Card className="bg-background border-border p-8 h-full">
                <h3 className="font-heading text-3xl text-muted-foreground mb-2" style={{ letterSpacing: '0.06em' }}>Essential</h3>
                <div className="mb-6"><span className="text-4xl font-bold">AED 599</span> <span className="text-muted-foreground text-xs uppercase tracking-widest">/ 1 Month</span></div>
                <ul className="space-y-4 mb-8 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Full facility access</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> 4 Group classes/month</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Locker room access</li>
                </ul>
                <Button variant="outline" className="w-full h-12 uppercase font-semibold tracking-widest text-sm">Select Plan</Button>
              </Card>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="relative z-10 md:-my-4">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs font-semibold tracking-widest uppercase px-4 py-1 rounded-full shadow-lg">Most Popular &bull; Save 20%</span>
              </div>
              <Card className="bg-card border-primary shadow-[0_0_50px_rgba(201,168,76,0.18)] p-8 h-full">
                <h3 className="font-heading text-4xl text-primary mb-2" style={{ letterSpacing: '0.06em' }}>Performance</h3>
                <div className="mb-6"><span className="text-5xl font-bold">AED 1,499</span> <span className="text-muted-foreground text-xs uppercase tracking-widest">/ 3 Months</span></div>
                <ul className="space-y-4 mb-8 text-sm">
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Unlimited facility access</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Unlimited group classes</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> 1 Personal training session/mo</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Premium locker & towel service</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Guest pass (1/month)</li>
                </ul>
                <Button className="w-full h-14 uppercase font-semibold tracking-widest text-base">Select Performance</Button>
              </Card>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="bg-background border-border p-8 h-full">
                <h3 className="font-heading text-3xl text-muted-foreground mb-2" style={{ letterSpacing: '0.06em' }}>Elite</h3>
                <div className="mb-6"><span className="text-4xl font-bold">AED 4,999</span> <span className="text-muted-foreground text-xs uppercase tracking-widest">/ 1 Year</span></div>
                <ul className="space-y-4 mb-8 text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Unlimited everything</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Priority class booking</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Dedicated private locker</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> Recovery zone access</li>
                  <li className="flex gap-2 items-center"><Target className="w-4 h-4 text-primary shrink-0"/> VIP event invitations</li>
                </ul>
                <Button variant="outline" className="w-full h-12 uppercase font-semibold tracking-widest text-sm">Select Elite</Button>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]">
              Only 12 Elite memberships remaining this month.
            </p>
          </div>
        </div>
      </section>

      {/* 12. GUARANTEE */}
      <section className="py-24 bg-secondary/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="w-14 h-14 text-primary mx-auto mb-8" />
          <h2 className="text-5xl md:text-6xl font-heading leading-none mb-6" style={{ letterSpacing: '0.04em' }}>
            The HIITZONE Guarantee
          </h2>
          <p className="text-base text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            We are confident in our facility and our coaches. Experience HIITZONE for 7 days risk-free. If you don't feel the difference in the atmosphere, the equipment, and the training quality, we'll refund your membership. No questions asked.
          </p>
          <Button size="lg" className="h-14 px-10 font-semibold uppercase tracking-widest text-sm">
            Claim Your Free Trial
          </Button>
        </div>
      </section>

      {/* 13. FAQ ACCORDION */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              Got Questions?
            </div>
            <h2 className="text-5xl md:text-7xl font-heading leading-none" style={{ letterSpacing: '0.04em' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "Do I need prior fitness experience to join?", a: "No. While we cater to elite athletes, our coaches scale every program to your current level. The only requirement is the discipline to show up and give it everything you have." },
              { q: "What are the gym opening hours?", a: "We are open 24/7 for Elite members. For Essential and Performance members, standard hours are 5:00 AM to 11:00 PM, 365 days a year." },
              { q: "Is personal training included in the membership?", a: "The Performance plan includes 1 session per month. The Elite plan includes unlimited group classes and priority booking. Personal training packages can be added to any membership level." },
              { q: "Where exactly are you located in Business Bay?", a: "We are located on the ground floor of the Apex Tower, directly facing the canal. Complimentary valet parking is available for all members." },
              { q: "Can I pause or cancel my membership?", a: "Performance and Elite memberships can be paused for up to 30 days per year for travel or medical reasons. Cancellations require 30 days' notice." }
            ].map((item, i) => (
              <AccordionItem key={i} value={`item-${i + 1}`} className="border-border bg-card px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
                <AccordionTrigger className="text-base font-semibold hover:no-underline tracking-wide text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="relative py-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${IMAGES.finalCta})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-7xl md:text-[110px] font-heading leading-none mb-6 drop-shadow-2xl" style={{ letterSpacing: '0.04em' }}>
              Ready To Transform<br/><span className="text-primary">Your Body?</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 font-medium tracking-[0.25em] uppercase mb-14">
              The first step is the hardest. We make the rest inevitable.
            </p>
            <Button size="lg" className="h-20 px-16 text-base font-semibold uppercase tracking-widest shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)] transition-shadow">
              Book Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 15. CONTACT SECTION */}
      <section id="contact" className="py-32 border-t border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              Get In Touch
            </div>
            <h2 className="text-6xl md:text-7xl font-heading leading-none mb-10" style={{ letterSpacing: '0.04em' }}>
              Command Your Space
            </h2>

            <div className="space-y-7 mb-12">
              {[
                { icon: MapPin, label: "Location", value: "Apex Tower, Ground Floor, Business Bay, Dubai" },
                { icon: Phone, label: "Phone", value: "+971 4 123 4567" },
                { icon: Mail, label: "Email", value: "elite@hiitzone.ae" },
                { icon: Instagram, label: "Instagram", value: "@hiitzonedubai" }
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex gap-4 items-center text-muted-foreground hover:text-white transition-colors">
                  <div className="w-11 h-11 bg-card border border-border flex items-center justify-center rounded shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold uppercase tracking-widest text-white text-xs mb-0.5">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="aspect-[4/3] bg-neutral-900 border border-border rounded-lg relative overflow-hidden flex items-center justify-center">
              <div className="text-muted-foreground/20 font-heading text-3xl uppercase tracking-widest" style={{ letterSpacing: '0.06em' }}>Map Placeholder</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-2xl">
            <h3 className="font-heading text-3xl mb-8 border-b border-border pb-4" style={{ letterSpacing: '0.06em' }}>Send an Inquiry</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-input border-transparent focus-visible:border-primary focus-visible:ring-primary/20 h-12" data-testid="input-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} className="bg-input border-transparent focus-visible:border-primary focus-visible:ring-primary/20 h-12" data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="inquiryType" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Inquiry Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input border-transparent focus:border-primary h-12" data-testid="select-inquiry">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="membership">Membership Info</SelectItem>
                        <SelectItem value="pt">Personal Training</SelectItem>
                        <SelectItem value="corporate">Corporate Wellness</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase tracking-widest text-xs font-semibold text-muted-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="How can we help you?" className="resize-none bg-input border-transparent focus-visible:border-primary focus-visible:ring-primary/20 min-h-[120px]" {...field} data-testid="textarea-message" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full h-14 uppercase font-semibold tracking-widest text-sm mt-4" data-testid="button-submit">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* 16. FOOTER */}
      <footer className="bg-background pt-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="font-heading text-4xl text-primary mb-6" style={{ letterSpacing: '0.08em' }}>
              HIITZONE
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Dubai's elite high-intensity training facility. Uncompromising quality, elite coaching, and a community built on discipline and results.
            </p>
          </div>

          <div className="flex flex-col md:items-center">
            <h4 className="font-semibold uppercase tracking-widest text-xs mb-6">Quick Links</h4>
            <div className="flex flex-col space-y-3 text-muted-foreground text-sm uppercase tracking-widest">
              {[['home','Home'],['about','About'],['membership','Membership'],['trainers','Trainers'],['contact','Contact']].map(([id, label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="hover:text-primary transition-colors text-left md:text-center">{label}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="font-semibold uppercase tracking-widest text-xs mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors" data-testid="social-ig"><Instagram size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors" data-testid="social-wa"><MessageCircle size={16} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors" data-testid="social-phone"><Phone size={16} /></a>
            </div>
          </div>
        </div>

        <div className="bg-secondary/50 py-6 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} HIITZONE FITNESS L.L.C. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="#"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
        data-testid="floating-whatsapp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
