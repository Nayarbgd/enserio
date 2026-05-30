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

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Set to next Sunday
    const nextSunday = new Date();
    nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
    nextSunday.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = nextSunday.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

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
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "",
      message: ""
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, this would submit to an API
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      {/* 1. TOP URGENCY BAR */}
      <div className="w-full bg-primary text-primary-foreground py-2 px-4 flex flex-col sm:flex-row justify-center items-center text-sm font-bold tracking-wider z-50 relative">
        <span className="text-center">FOUNDING MEMBER OFFER &mdash; 50% OFF First Month | Ends Sunday</span>
        <span className="sm:ml-4 mt-1 sm:mt-0 font-mono text-xs opacity-90">
          {String(timeLeft.days).padStart(2, '0')}:{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>

      {/* 2. STICKY NAVIGATION */}
      <nav className="sticky top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-3xl font-heading font-black text-primary tracking-tighter" data-testid="logo">
            HIITZONE
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-widest uppercase">
            <button onClick={() => scrollTo('home')} className="hover:text-primary transition-colors">Home</button>
            <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollTo('membership')} className="hover:text-primary transition-colors">Membership</button>
            <button onClick={() => scrollTo('trainers')} className="hover:text-primary transition-colors">Trainers</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-primary transition-colors">Contact</button>
          </div>

          <div className="hidden md:block">
            <Button onClick={() => scrollTo('membership')} className="rounded-full font-bold uppercase tracking-wider px-8" data-testid="nav-join-btn">
              Join Now
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid="mobile-menu-toggle">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 flex flex-col space-y-4 shadow-2xl">
            <button onClick={() => scrollTo('home')} className="text-left font-heading text-2xl uppercase tracking-wider">Home</button>
            <button onClick={() => scrollTo('about')} className="text-left font-heading text-2xl uppercase tracking-wider">About</button>
            <button onClick={() => scrollTo('membership')} className="text-left font-heading text-2xl uppercase tracking-wider">Membership</button>
            <button onClick={() => scrollTo('trainers')} className="text-left font-heading text-2xl uppercase tracking-wider">Trainers</button>
            <button onClick={() => scrollTo('contact')} className="text-left font-heading text-2xl uppercase tracking-wider">Contact</button>
            <Button onClick={() => scrollTo('membership')} className="w-full mt-4 font-bold uppercase" size="lg">Join Now</Button>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* CSS Radial Gradient Background representing dramatic gold light beams */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 w-full text-center flex flex-col items-center">
          <motion.div {...fadeUp}>
            <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black leading-[0.85] tracking-tighter mb-6 uppercase">
              <span className="block text-white drop-shadow-2xl">Discover Your</span>
              <span className="block text-primary drop-shadow-2xl">Power Within</span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground font-medium tracking-[0.2em] uppercase mb-12 max-w-2xl mx-auto">
              Elite Fitness Experience in Dubai
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
              <Button size="lg" className="w-full sm:w-auto h-16 px-10 text-lg font-bold uppercase tracking-wider" onClick={() => scrollTo('membership')} data-testid="hero-primary-btn">
                Start Your Transformation
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 text-lg font-bold uppercase tracking-wider border-2 hover:bg-white/5" onClick={() => scrollTo('membership')} data-testid="hero-secondary-btn">
                View Memberships
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pt-12 border-t border-white/10 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">500+</div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">15+</div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Expert Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">ELITE</div>
                <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Premium Equipment</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. TRUST BAR */}
      <section className="bg-secondary/50 py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 text-sm tracking-[0.3em] text-muted-foreground font-bold uppercase">
            As Seen In / Trusted By
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["Time Out Dubai", "Gulf News", "Esquire Middle East", "Muscle & Fitness", "Dubai Sports Council"].map((brand) => (
              <div key={brand} className="px-6 py-4 border border-border/50 bg-background/50 rounded flex items-center justify-center font-heading font-bold text-xl tracking-wider text-muted-foreground hover:text-white transition-colors" data-testid={`trust-logo-${brand}`}>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PHILOSOPHY / ABOUT */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(201,168,76,0.05)]">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Our Philosophy
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-heading mb-8 leading-[0.9] uppercase">
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
                    <item.icon className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-heading tracking-wide uppercase mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
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
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              What We Offer
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-heading leading-[0.9] uppercase">
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
                    <prog.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="font-heading text-2xl uppercase tracking-wide">{prog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed text-base">
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
              <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                The Masters
              </div>
              <h2 className="text-5xl md:text-7xl font-black font-heading leading-[0.9] uppercase">
                Elite Coaches
              </h2>
            </div>
            <Button variant="outline" className="h-12 px-8 font-bold uppercase tracking-wider">
              Meet The Full Team
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Marcus Vance", role: "Performance Coach", init: "MV" },
              { name: "Sarah Chen", role: "HIIT Specialist", init: "SC" },
              { name: "David Stone", role: "Strength Expert", init: "DS" },
              { name: "Aria Knight", role: "Nutrition Coach", init: "AK" }
            ].map((coach, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="group cursor-pointer">
                <div className="aspect-square bg-gradient-to-t from-neutral-900 to-neutral-800 rounded-lg mb-6 border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-primary/50 transition-colors">
                   <div className="text-6xl font-heading font-black text-white/10 group-hover:text-primary/20 transition-colors">{coach.init}</div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary uppercase tracking-wide mb-1">{coach.name}</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-widest">{coach.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-32 bg-secondary/30 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Results
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-heading leading-[0.9] uppercase">
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
                      <span className="text-white/20 font-heading text-2xl tracking-widest uppercase">Before</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative">
                      <span className="text-primary/40 font-heading text-2xl tracking-widest uppercase">After</span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-primary font-bold font-heading text-xl uppercase">{t.name}</span>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold tracking-widest rounded">{t.dur}</span>
                    </div>
                    <p className="text-lg italic text-muted-foreground mb-6 leading-relaxed">&quot;{t.quote}&quot;</p>
                    <div className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase border-t border-white/10 pt-4">
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
              <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
                The Facility
              </div>
              <h2 className="text-5xl md:text-7xl font-black font-heading leading-[0.9] uppercase">
                Peak Performance Environment
              </h2>
            </div>
            <p className="max-w-sm text-muted-foreground text-right hidden md:block">
              State-of-the-art equipment. Bespoke lighting. Audiophile sound system. Designed for those who demand excellence.
            </p>
          </div>

          <motion.div {...fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[600px]">
            <div className="lg:col-span-8 h-full bg-gradient-to-br from-neutral-900 to-black rounded-lg border border-white/5 relative group overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent group-hover:from-primary/10 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide">Main Floor</h3>
                <p className="text-muted-foreground text-sm tracking-widest uppercase">Custom Rogue Rigs & Free Weights</p>
              </div>
            </div>
            <div className="lg:col-span-4 h-full flex flex-col gap-4">
              <div className="flex-1 bg-gradient-to-br from-neutral-900 to-black rounded-lg border border-white/5 relative group overflow-hidden">
                 <div className="absolute bottom-6 left-6">
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-primary">HIIT Studio</h3>
                </div>
              </div>
              <div className="flex-1 bg-gradient-to-br from-neutral-900 to-black rounded-lg border border-white/5 relative group overflow-hidden">
                 <div className="absolute bottom-6 left-6">
                  <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-primary">Recovery Zone</h3>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. VIDEO TOUR */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black font-heading leading-[0.9] uppercase mb-16">
            Take A Tour Inside HIITZONE
          </h2>
          
          <motion.div {...fadeUp} className="relative aspect-video w-full max-w-5xl mx-auto bg-neutral-900 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm border border-primary flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary/30">
              <Play className="w-10 h-10 text-primary ml-2" fill="currentColor" />
            </div>
          </motion.div>
          
          <p className="mt-8 text-muted-foreground tracking-widest uppercase text-sm font-bold">
            See why Dubai's elite choose HIITZONE
          </p>
        </div>
      </section>

      {/* 11. MEMBERSHIP PRICING */}
      <section id="membership" className="py-32 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Pricing
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-heading leading-[0.9] uppercase">
              Membership Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Essential */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0 }}>
              <Card className="bg-background border-border p-8 h-full">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-muted-foreground mb-2">Essential</h3>
                <div className="mb-6"><span className="text-4xl font-bold">AED 599</span> <span className="text-muted-foreground text-sm uppercase">/ 1 Month</span></div>
                <ul className="space-y-4 mb-8 text-sm">
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> Full facility access</li>
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> 4 Group classes/mo</li>
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> Locker room access</li>
                </ul>
                <Button variant="outline" className="w-full h-12 uppercase font-bold tracking-wider">Select Plan</Button>
              </Card>
            </motion.div>

            {/* Performance (Highlighted) */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="relative z-10 md:-my-4">
              <div className="absolute -top-4 inset-x-0 flex justify-center">
                <span className="bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-lg">Most Popular &bull; Save 20%</span>
              </div>
              <Card className="bg-card border-primary shadow-[0_0_50px_rgba(201,168,76,0.15)] p-8 h-full">
                <h3 className="font-heading text-3xl font-black uppercase tracking-wide text-primary mb-2">Performance</h3>
                <div className="mb-6"><span className="text-5xl font-bold">AED 1,499</span> <span className="text-muted-foreground text-sm uppercase">/ 3 Months</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex gap-2"><Target className="w-5 h-5 text-primary shrink-0"/> Unlimited facility access</li>
                  <li className="flex gap-2"><Target className="w-5 h-5 text-primary shrink-0"/> Unlimited group classes</li>
                  <li className="flex gap-2"><Target className="w-5 h-5 text-primary shrink-0"/> 1 Personal training session/mo</li>
                  <li className="flex gap-2"><Target className="w-5 h-5 text-primary shrink-0"/> Premium locker & towel service</li>
                  <li className="flex gap-2"><Target className="w-5 h-5 text-primary shrink-0"/> Guest pass (1/mo)</li>
                </ul>
                <Button className="w-full h-14 uppercase font-bold tracking-widest text-lg">Select Performance</Button>
              </Card>
            </motion.div>

            {/* Elite */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <Card className="bg-background border-border p-8 h-full">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-wide text-muted-foreground mb-2">Elite</h3>
                <div className="mb-6"><span className="text-4xl font-bold">AED 4,999</span> <span className="text-muted-foreground text-sm uppercase">/ 1 Year</span></div>
                <ul className="space-y-4 mb-8 text-sm">
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> Unlimited everything</li>
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> Priority class booking</li>
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> Dedicated private locker</li>
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> Recovery zone access</li>
                  <li className="flex gap-2"><Target className="w-4 h-4 text-primary shrink-0"/> VIP event invitations</li>
                </ul>
                <Button variant="outline" className="w-full h-12 uppercase font-bold tracking-wider">Select Elite</Button>
              </Card>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-primary font-bold tracking-widest uppercase text-sm drop-shadow-[0_0_10px_rgba(201,168,76,0.5)]">
              Only 12 Elite memberships remaining this month.
            </p>
          </div>
        </div>
      </section>

      {/* 12. GUARANTEE */}
      <section className="py-24 bg-secondary/50 border-y border-border">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-black font-heading leading-[0.9] uppercase mb-6">
            The HIITZONE Guarantee
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            We are confident in our facility and our coaches. Experience HIITZONE for 7 days risk-free. If you don't feel the difference in the atmosphere, the equipment, and the training quality, we'll refund your membership. No questions asked.
          </p>
          <Button size="lg" className="h-14 px-10 font-bold uppercase tracking-widest text-base">
            Claim Your Free Trial
          </Button>
        </div>
      </section>

      {/* 13. FAQ ACCORDION */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Got Questions?
            </div>
            <h2 className="text-5xl font-black font-heading leading-[0.9] uppercase">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-border bg-card px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline font-heading tracking-wide">Do I need prior fitness experience to join?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                No. While we cater to elite athletes, our coaches scale every program to your current level. The only requirement is the discipline to show up and give it everything you have.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-border bg-card px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline font-heading tracking-wide">What are the gym opening hours?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We are open 24/7 for Elite members. For Essential and Performance members, standard hours are 5:00 AM to 11:00 PM, 365 days a year.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-border bg-card px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline font-heading tracking-wide">Is personal training included in the membership?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                The Performance plan includes 1 session per month. The Elite plan includes unlimited group classes and priority booking. Personal training packages can be added to any membership level.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-border bg-card px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline font-heading tracking-wide">Where exactly are you located in Business Bay?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                We are located on the ground floor of the Apex Tower, directly facing the canal. Complimentary valet parking is available for all members.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border-border bg-card px-6 rounded-lg data-[state=open]:border-primary/50 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline font-heading tracking-wide">Can I pause or cancel my membership?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Performance and Elite memberships can be paused for up to 30 days per year for travel or medical reasons. Cancellations require 30 days' notice.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-background to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent z-0" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-6xl md:text-8xl font-black font-heading leading-[0.85] uppercase mb-6 drop-shadow-2xl">
              Ready To Transform<br/><span className="text-primary">Your Body?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-medium tracking-widest uppercase mb-12">
              The first step is the hardest. We make the rest inevitable.
            </p>
            <Button size="lg" className="h-20 px-16 text-xl font-bold uppercase tracking-widest shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)] transition-shadow">
              Book Your Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 15. CONTACT SECTION */}
      <section id="contact" className="py-32 border-t border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-bold tracking-[0.2em] uppercase rounded-full">
              Get In Touch
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-heading leading-[0.9] uppercase mb-10">
              Command Your Space
            </h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4 items-center text-muted-foreground hover:text-white transition-colors">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center rounded">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-white">Location</p>
                  <p>Apex Tower, Ground Floor, Business Bay, Dubai</p>
                </div>
              </div>
              <div className="flex gap-4 items-center text-muted-foreground hover:text-white transition-colors">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center rounded">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-white">Phone</p>
                  <p>+971 4 123 4567</p>
                </div>
              </div>
              <div className="flex gap-4 items-center text-muted-foreground hover:text-white transition-colors">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center rounded">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-white">Email</p>
                  <p>elite@hiitzone.ae</p>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] bg-neutral-900 border border-border rounded-lg relative overflow-hidden flex items-center justify-center">
              <div className="text-muted-foreground/30 font-heading font-black text-4xl uppercase tracking-widest">Map Placeholder</div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-2xl">
            <h3 className="text-2xl font-bold font-heading uppercase tracking-wide mb-8 border-b border-border pb-4">Send an Inquiry</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-input border-transparent focus-visible:border-primary focus-visible:ring-primary/20 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} className="bg-input border-transparent focus-visible:border-primary focus-visible:ring-primary/20 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Inquiry Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-input border-transparent focus:border-primary focus:ring-primary/20 h-12">
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
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-bold text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="resize-none bg-input border-transparent focus-visible:border-primary focus-visible:ring-primary/20 min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-14 uppercase font-bold tracking-widest text-lg mt-4">
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
            <div className="text-4xl font-heading font-black text-primary tracking-tighter mb-6">
              HIITZONE
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Dubai's elite high-intensity training facility. Uncompromising quality, elite coaching, and a community built on discipline and results.
            </p>
          </div>
          
          <div className="flex flex-col md:items-center">
            <h4 className="font-bold uppercase tracking-widest mb-6">Quick Links</h4>
            <div className="flex flex-col space-y-3 text-muted-foreground text-sm uppercase tracking-wider">
              <button onClick={() => scrollTo('home')} className="hover:text-primary transition-colors text-left md:text-center">Home</button>
              <button onClick={() => scrollTo('about')} className="hover:text-primary transition-colors text-left md:text-center">About</button>
              <button onClick={() => scrollTo('membership')} className="hover:text-primary transition-colors text-left md:text-center">Membership</button>
              <button onClick={() => scrollTo('trainers')} className="hover:text-primary transition-colors text-left md:text-center">Trainers</button>
              <button onClick={() => scrollTo('contact')} className="hover:text-primary transition-colors text-left md:text-center">Contact</button>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end">
            <h4 className="font-bold uppercase tracking-widest mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors" data-testid="social-ig">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors" data-testid="social-wa">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-colors" data-testid="social-phone">
                <Phone size={18} />
              </a>
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
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
        data-testid="floating-whatsapp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}