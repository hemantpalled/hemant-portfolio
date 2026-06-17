import { lazy, Suspense, useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "motion/react";
import {
  ArrowRight,
  Code,
  Palette,
  Zap,
  Sparkles,
  Layers,
  Globe,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Phone,
  Send,
  Award,
  Briefcase,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import portfolioImage from "../../static/images/portfolio_black_and_white.png"

// ─── Lazy-reveal hook ──────────────────────────────────────────────────────
function useLazyReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (revealed) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, revealed]);
  return { ref, revealed };
}

// ─── Reusable animated section wrapper ────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const { ref, revealed } = useLazyReveal();
  const initial =
    direction === "left"
      ? { opacity: 0, x: -50 }
      : direction === "right"
      ? { opacity: 0, x: 50 }
      : { opacity: 0, y: 50 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={revealed ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated number counter ──────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, revealed } = useLazyReveal(0.5);
  useEffect(() => {
    if (!revealed) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 30);
    return () => clearInterval(timer);
  }, [revealed, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── DATA ──────────────────────────────────────────────────────────────────
const features = [
  { icon: Code,     title: "Clean Code",  description: "Maintainable and scalable code following best practices", grad: "from-blue-500 to-cyan-400" },
  { icon: Palette,  title: "Design First",description: "Beautiful interfaces crafted with attention to detail",  grad: "from-violet-500 to-purple-400" },
  { icon: Zap,      title: "Performance", description: "Blazing-fast, optimized web experiences",               grad: "from-orange-500 to-amber-400" },
  { icon: Sparkles, title: "Innovation",  description: "Fresh ideas and creative solutions for every project",   grad: "from-pink-500 to-rose-400" },
  { icon: Layers,   title: "Full Stack",  description: "End-to-end: from UI to APIs, databases and cloud",      grad: "from-green-500 to-teal-400" },
  { icon: Globe,    title: "Web First",   description: "Pixel-perfect, responsive on every screen and device",  grad: "from-indigo-500 to-blue-400" },
];

const stats = [
  { label: "Projects", value: 2,  suffix: "+" },
  { label: "Clients",  value: 1,  suffix: "+" },
  { label: "Years",    value: 3,   suffix: "+" },
  { label: "Tech stack", value: 12, suffix: "+" },
];

const skills = [
  "JavaScript / TypeScript", "React / Next.js", "Python", "HTML & CSS",
  "UI/UX Design", "Figma", "Git / GitHub",
  "PostgreSQL", "Docker", "AWS", "PostgreSQL", "FastAPI", "Laravel", "Linux", "Postman",
];

const timeline = [
  { icon: Briefcase,     year: "2024 – 2026", title: "Associate Developer",      org: "Infanion software solutions PVT LTD.",   desc: "Full stack developer and mentoring junior engineers" },
  { icon: Briefcase,     year: "2023 – 2024",    title: "Trainee Developer",  org: "Infanion software solutions PVT LTD.",      desc: "Built responsive web apps for belgian client" },
  // { icon: Award,         year: "2023",            title: "Best Web App Award",    org: "Dev Summit",           desc: "Recognised for outstanding UX in a SaaS product" },
  { icon: GraduationCap, year: "2014 – 2018",    title: "Bachelor's in Mechanical Engineering",      org: "VTU Belagavi",      desc: "Mechanical Engineering with a focus on design and development" },
];

const projects = [
  { id: 1, title: "Workforce Management System",   desc: "Modern HR management platform designed to simplify workforce operations with staff scheduling, time tracking, real-time payroll automation, and digital contract management.",        image: "https://images.unsplash.com/photo-1604074131228-9d48b811bd80?w=800&q=80", tags: ["React", "Laravel", "Python", "PostgreSQL"],          live: "#", code: "#" },
  // { id: 2, title: "Mobile Banking App",    desc: "Secure transactions, budget tracking, and financial insights at a glance.",    image: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=800&q=80", tags: ["React Native", "TypeScript", "Firebase"],         live: "#", code: "#" },
  // { id: 3, title: "Real Estate Platform",  desc: "Property listings with advanced search, virtual tours, and agent tools.",      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=800&q=80", tags: ["Next.js", "Tailwind", "Prisma", "PostgreSQL"],    live: "#", code: "#" },
  // { id: 4, title: "Brand Identity System", desc: "Full identity: logo, palette, typography, and design-system guidelines.",      image: "https://images.unsplash.com/photo-1590102426275-8d1c367070d3?w=800&q=80", tags: ["Figma", "Illustrator", "Branding"],               live: "#", code: "#" },
  // { id: 5, title: "Task Management Tool",  desc: "Kanban boards, time tracking, and real-time team collaboration.",              image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", tags: ["Vue.js", "Express", "Socket.io"],                 live: "#", code: "#" },
  { id: 6, title: "Portfolio Website",     desc: "Designed and developed a modern, responsive portfolio website showcasing projects, skills, and professional experience. Focused on clean UI/UX, performance optimization, and accessibility best practices.",   image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80", tags: ["React", "Motion", "Tailwind", "Vite"],                   live: "https://hemantpalled.github.io/hemant-portfolio/", code: "#" },
];

const contactInfo = [
  { icon: Mail,    label: "Email",    value: "hemantpalled@gmail.com",  href: "mailto:hemantpalled@gmail.com" },
  { icon: Phone,   label: "Phone",    value: "+91 8496002817",  href: "tel:+918496002817" },
  { icon: MapPin,  label: "Location", value: "Banglore, Karnataka",  href: "#" },
];

const TECHS = ["React", "TypeScript", "Next.js", "Figma", "AWS", "PostgreSQL", "Docker"];

// ─── Particle field ────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: 0.5 + Math.random() * 1.5,
  dur: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}));

// ═══════════════════════════════════════════════════════════════════════════
export function SinglePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY  = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroOp = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 22 });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          §1  HERO
      ══════════════════════════════════════════════════════════════ */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">

        {/* — Gradient mesh background — */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/25 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/15 rounded-full blur-[90px]" />
        </div>

        {/* — Animated particle field — */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {PARTICLES.map((p) => (
            <motion.circle
              key={p.id}
              cx={`${p.x}%`}
              cy={`${p.y}%`}
              r={p.r}
              fill="white"
              fillOpacity={0.25}
              animate={{
                cy: [`${p.y}%`, `${p.y - 4}%`, `${p.y}%`],
                fillOpacity: [0.15, 0.5, 0.15],
              }}
              transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            />
          ))}
        </svg>

        {/* — Grid lines — */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* — Animated ring — */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5"
          animate={{ scale: [1, 1.06, 1], rotate: [0, 360] }}
          transition={{ scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5"
          animate={{ scale: [1.06, 1, 1.06], rotate: [0, -360] }}
          transition={{ scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 30, repeat: Infinity, ease: "linear" } }}
        />

        {/* — Hero content — */}
        <motion.div
          style={{ y: smoothY, opacity: heroOp }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/70 text-sm"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Available for freelance & full-time roles
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-[96px] font-black text-white mb-2 leading-[1.05] tracking-tight"
          >
            Hi, I'm
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25, type: "spring", stiffness: 120 }}
            className="relative inline-block mb-6"
          >
            <span className="text-6xl sm:text-7xl lg:text-[96px] font-black leading-[1.05] tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 via-50% to-pink-400 bg-clip-text text-transparent">
             Hemant Palled
            </span>
            {/* underline draw-in */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xl sm:text-2xl text-white/55 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            A passionate <span className="text-cyan-400 font-medium">designer</span> &{" "}
            <span className="text-purple-400 font-medium">developer</span> crafting{" "}
            beautiful, fast &{" "}
            <span className="text-pink-400 font-medium">meaningful</span> digital experiences
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
              >
                View My Work <ArrowRight className="h-5 w-5" />
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-semibold text-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
              >
                Get In Touch
              </button>
            </motion.div>
          </motion.div>

          {/* Tech pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-2"
          >
            {["React", "TypeScript", "Next.js", "Laravel", "Python", "Docker", "FastAPI", "PostgreSQL", "Linux", "AWS"].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.07 }}
                className="px-3 py-1 rounded-full bg-white/8 border border-white/12 text-white/50 text-xs font-medium"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs hover:text-white/60 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.button>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §2  ABOUT
      ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="scroll-mt-16">
        {/* Bio */}
        <div className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <Reveal direction="left">
                <span className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-3 block">About Me</span>
                <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                  Building the web,<br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">one pixel at a time</span>
                </h2>
                <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                  I'm a passionate developer and designer with a love for creating
                  beautiful, functional web experiences that make a difference.
                </p>
                <p className="text-lg text-gray-600 mb-5 leading-relaxed">
                  With over 3 years of experience, I specialise in modern, responsive
                  applications using cutting-edge technologies. Clean code and intuitive
                  UX are at the heart of everything I ship.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  When I'm not coding, you'll find me exploring design trends,
                  contributing to open source, or sharing knowledge with the community.
                </p>
              </Reveal>
              <Reveal direction="right" delay={0.15}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl -z-10" />
                  <ImageWithFallback
                    // src="https://images.unsplash.com/photo-1517530094915-500495b15ade?w=800&q=80"
                    src={portfolioImage}
                    alt="Profile"
                    className="rounded-2xl shadow-2xl w-full h-auto relative z-10"
                  />
                  {/* floating badge */}
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-5 py-3 border border-gray-100 z-20"
                  >
                    <p className="text-2xl font-black text-gray-900">3+</p>
                    <p className="text-xs text-gray-500">Years experience</p>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.1}>
                  <div className="text-5xl font-black mb-1">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="py-28 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest text-purple-400 uppercase mb-3 block">Skills</span>
              <h2 className="text-4xl font-black text-white mb-4">Tech Stack & Tools</h2>
              <p className="text-white/40 max-w-xl mx-auto">Technologies I work with on a daily basis</p>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill, i) => (
                <Reveal key={skill} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.5)" }}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 text-center cursor-default transition-colors"
                  >
                    <p className="font-semibold text-white/80 text-sm">{skill}</p>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-28 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest text-blue-500 uppercase mb-3 block">What I Do</span>
              <h2 className="text-4xl font-black text-gray-900 mb-4">My Expertise</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Combining creativity with technical skill to ship exceptional products</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${f.grad} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.grad} flex items-center justify-center mb-5 shadow-md`}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="py-28 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest text-pink-500 uppercase mb-3 block">Journey</span>
              <h2 className="text-4xl font-black text-gray-900 mb-4">My Story</h2>
              <p className="text-gray-500">Career highlights and education</p>
            </Reveal>
            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />
              <div className="space-y-8">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={i} delay={i * 0.12}>
                      <div className="relative flex gap-6 pl-16">
                        <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md shadow-purple-200">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                          <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{item.year}</span>
                          <h3 className="text-lg font-bold text-gray-900 mt-3 mb-1">{item.title}</h3>
                          <p className="text-purple-500 font-medium text-sm mb-2">{item.org}</p>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          Marquee strip (transition)
      ══════════════════════════════════════════════════════════════ */}
      <div className="py-10 bg-gray-950 overflow-hidden border-y border-white/5">
        <div className="flex gap-16">
          {[0, 1].map((pass) => (
            <motion.div
              key={pass}
              className="flex gap-16 shrink-0"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {TECHS.map((t) => (
                <span key={t} className="text-white/25 font-semibold text-lg select-none whitespace-nowrap">{t}</span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          §3  PROJECTS
      ══════════════════════════════════════════════════════════════ */}
      <section id="projects" className="scroll-mt-16 py-28 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-cyan-400 uppercase mb-3 block">Work</span>
            <h2 className="text-5xl font-black text-white mb-4">Selected Projects</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">
              A curated collection of projects showcasing my skills in development, design, and problem-solving.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/25 transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <ImageWithFallback
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2">
                      <a href={p.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-gray-900 rounded-lg text-xs font-semibold hover:bg-white transition-colors">
                        <ExternalLink className="h-3 w-3" /> Live
                      </a>
                      <a href={p.code} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white rounded-lg text-xs font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm border border-white/20">
                        <Github className="h-3 w-3" /> Code
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                    <p className="text-white/50 text-sm mb-4 leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-full bg-white/8 border border-white/10 text-white/60 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          §4  CONTACT
      ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="scroll-mt-16 py-28 bg-white relative overflow-hidden">
        {/* decorative rings */}
        {[350, 550, 750].map((s, i) => (
          <motion.div
            key={i}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border border-purple-100"
            style={{ width: s, height: s }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-purple-500 uppercase mb-3 block">Contact</span>
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Let's{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Work Together
              </span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Have a question or want to collaborate? I'd love to hear from you.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Reveal direction="left">
              <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl shadow-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="name" className="text-gray-700 font-medium mb-1.5 block">Name</Label>
                      <Input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="border-gray-200 focus:border-purple-400" />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-medium mb-1.5 block">Email</Label>
                      <Input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className="border-gray-200 focus:border-purple-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-gray-700 font-medium mb-1.5 block">Subject</Label>
                    <Input id="subject" name="subject" required value={form.subject} onChange={handleChange} placeholder="What's this about?" className="border-gray-200 focus:border-purple-400" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700 font-medium mb-1.5 block">Message</Label>
                    <Textarea id="message" name="message" required value={form.message} onChange={handleChange} placeholder="Tell me about your project…" rows={5} className="border-gray-200 focus:border-purple-400 resize-none" />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-purple-300/30 hover:shadow-purple-300/50 transition-shadow">
                      <Send className="h-5 w-5" /> Send Message
                    </button>
                  </motion.div>
                </form>
              </div>
            </Reveal>

            {/* Info */}
            <Reveal direction="right" delay={0.15}>
              <div className="flex flex-col gap-6">
                {/* Gradient card */}
                <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-10 text-white">
                  <h3 className="text-2xl font-bold mb-3">Let's Connect</h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    I'm always open to discussing new projects, creative ideas, or
                    opportunities to be part of your vision.
                  </p>
                  <div className="space-y-5">
                    {contactInfo.map(({ icon: Icon, label, value, href }) => (
                      <a key={label} href={href} className="flex items-center gap-4 hover:opacity-80 transition-opacity group">
                        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs mb-0.5">{label}</p>
                          <p className="font-medium">{value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3">Response Time</h4>
                  <p className="text-gray-500 text-sm mb-5 leading-relaxed">
                    I typically respond within 24–48 hours. Don't hesitate to follow up if you haven't heard back.
                  </p>
                  <h4 className="font-bold text-gray-900 mb-3">Working Hours</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Mon – Fri: 9:00 AM – 6:00 PM (IST)<br />
                    Weekends: Limited availability
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
