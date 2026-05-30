import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Menu, X, Target, Diamond, Zap, Flame, Dumbbell, Brain, Leaf, 
  ShieldCheck, MapPin, Phone, Mail, Instagram, MessageCircle, Star
} from "lucide-react";
import afrozImg from "@assets/image_1780174766920.png";
import bouchaImg from "@assets/image_1780174812055.png";
import prajanImg from "@assets/image_1780174836450.png";
import coachShehalaImg from "@assets/2026-05-31_01h05_32_1780178130753.png";
import coachCharitaImg from "@assets/2026-05-31_01h04_44_1780178130755.png";
import coachAlhamdImg from "@assets/2026-05-31_01h05_04_1780178130756.png";
import coachSabryImg from "@assets/2026-05-31_01h05_19_1780178130756.png";
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
              { name: "Mohamed Sabry", role: "Head Coach & Founder", img: coachSabryImg, handle: "@mohamedsabry729" },
              { name: "Charita Rambukwella", role: "Bodybuilding Trainer", img: coachCharitaImg, handle: "@kingslayer_cr" },
              { name: "Coach Shehala", role: "Fitness & HIIT Coach", img: coachShehalaImg, handle: "@coach_shehala" },
              { name: "Coach Alhamdolliah", role: "Strength Specialist", img: coachAlhamdImg, handle: "@alhamdolliah9999" }
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
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{coach.role}</p>
                <p className="text-xs text-primary/50 tracking-wide">{coach.handle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GOOGLE REVIEWS */}
      <section className="py-32 bg-secondary/30 border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 mb-6 border border-primary/30 text-primary text-xs font-semibold tracking-[0.22em] uppercase rounded-full">
              Google Reviews
            </div>
            <h2 className="text-6xl md:text-8xl font-heading leading-none mb-4" style={{ letterSpacing: '0.04em' }}>
              What Our Members Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-white font-bold text-lg ml-1">5.0</span>
              <span className="text-muted-foreground text-sm ml-1">on Google</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Afroz Khan",
                time: "7 months ago",
                img: afrozImg,
                reviews: "4 reviews · 2 photos",
                text: "This gym is one of the best places to transform yourself and achieve your fitness goals. It is a professional, well-equipped gym with a great atmosphere. The gym instructor is highly professional, dedicated, and disciplined, always ensuring we stay on track to reach our goals. Through personal training sessions and his constant guidance, I was able to achieve what I had always dreamed of. In just 3 months, I transformed myself with a healthy weight gain of 8 kgs, thanks to his strict monitoring and continuous support."
              },
              {
                name: "بوحه بوحه",
                time: "4 months ago",
                img: bouchaImg,
                reviews: "4 reviews · 1 photo",
                text: "This gym is great and worth joining because the manager is cheerful and friendly. I've been there for two months and I've changed completely, thanks to God and then Captain Sabry, because he helps you with everything, even nutrition. Honestly, Captain, you deserve the best place in Dubai because you have vast experience, and you're also cheerful and help you expertly. Thank you so much for your service."
              },
              {
                name: "Prajan Chettri",
                time: "5 months ago",
                img: prajanImg,
                reviews: "4 reviews · 1 photo",
                text: "I've been working out at HIIT ZONE for a few months now, and I can honestly say it's been one of the best fitness decisions I've made. The facilities are clean, well-maintained, and always have the equipment I need for a good workout. The trainer #SABRY is super knowledgeable, motivating, and really cares about helping you reach your goals. I've seen real progress and always feel supported. Highly recommend!"
              }
            ].map((review, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }}>
                <Card className="bg-background border-border h-full flex flex-col hover:border-primary/30 transition-colors">
                  <CardContent className="p-7 flex flex-col gap-5 h-full">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-sm leading-tight truncate">{review.name}</p>
                        <p className="text-muted-foreground text-xs mt-0.5">{review.reviews}</p>
                      </div>
                      {/* Google G */}
                      <div className="ml-auto shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>

                    {/* Stars + date */}
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-muted-foreground text-xs">{review.time}</span>
                    </div>

                    {/* Review text */}
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Overall rating bar */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-background border border-border rounded-xl max-w-lg mx-auto">
            <div className="text-center sm:border-r sm:border-border sm:pr-6">
              <p className="text-5xl font-bold text-primary leading-none">5.0</p>
              <div className="flex gap-0.5 justify-center mt-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-xs text-muted-foreground mt-1 tracking-widest uppercase">Google Rating</p>
            </div>
            <div className="sm:pl-6 text-center">
              <p className="text-white text-sm font-semibold mb-1">Based on real member reviews</p>
              <p className="text-muted-foreground text-xs leading-relaxed">Verified on Google Maps · Business Bay, Dubai</p>
                <a 
href="https://www.google.com/maps/place/Hiitzone+Gym+in+Barsha+Heights/@25.0960634,55.1786285,15z/data=!4m19!1m10!3m9!1s0x3e5f6bc68e54da5d:0xae663aed253a617b!2sHiitzone+Gym+in+Barsha+Heights!8m2!3d25.0961156!4d55.1786049!10e5!14m1!1BCg0KCS9tLzAxNnl4NzAB!16s%2Fg%2F11vt7tmmv4!3m7!1s0x3e5f6bc68e54da5d:0xae663aed253a617b!8m2!3d25.0961156!4d55.1786049!9m1!1b1!16s%2Fg%2F11vt7tmmv4?entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-primary hover:underline font-semibold tracking-wide"
                >
                View all reviews on Google
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </a>
            </div>
          </motion.div>
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
                <Button
                  variant="outline"
                  className="w-full h-12 uppercase font-semibold tracking-widest text-sm"
                  onClick={() =>
                    window.open(
                      "https://wa.me/971568445703?text=Hi!%20I%20am%20interested%20in%20the%20Essential%20membership%20at%20HIITZONE%20Gym.",
                      "_blank"
                    )
                  }
                >
                  Select Plan
                </Button>
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
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/971568445703?text=Hi!%20I%20am%20interested%20in%20the%20Performance%20membership%20at%20HIITZONE%20Gym.",
                      "_blank"
                    )
                  }
                >
                  Select Performance
                </Button>
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
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/971568445703?text=Hi!%20I%20am%20interested%20in%20the%20Elite%20membership%20at%20HIITZONE%20Gym.",
                      "_blank"
                    )
                  }
                >
                  Select Elite
                </Button>
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
            <h2
              className="text-7xl md:text-[110px] font-heading leading-none mb-6 drop-shadow-2xl"
              style={{ letterSpacing: '0.04em' }}
            >
              Ready To Transform<br />
              <span className="text-primary">Your Body?</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 font-medium tracking-[0.25em] uppercase mb-14">
              The first step is the hardest. We make the rest inevitable.
            </p>
            <Button
              size="lg"
              className="h-20 px-16 text-base font-semibold uppercase tracking-widest shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)] transition-shadow"
              onClick={() =>
                window.open(
                  "https://wa.me/971568445703?text=Hi!%20I%20would%20like%20to%20book%20a%20free%20trial%20at%20HIITZONE%20Gym.",
                  "_blank"
                )
              }
            >
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
          href="https://wa.me/971568445703"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
          data-testid="floating-whatsapp"
        >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
