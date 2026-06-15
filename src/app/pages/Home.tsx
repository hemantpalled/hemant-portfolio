import { Link } from "react-router";
import { ArrowRight, Code, Palette, Zap, Sparkles, Layers, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { icon: Code, title: "Clean Code", description: "Writing maintainable and scalable code following best practices", color: "from-blue-400 to-cyan-400", bg: "bg-blue-50", text: "text-blue-600" },
  { icon: Palette, title: "Design First", description: "Creating beautiful interfaces with attention to detail", color: "from-purple-400 to-pink-400", bg: "bg-purple-50", text: "text-purple-600" },
  { icon: Zap, title: "Performance", description: "Building fast and optimized web experiences", color: "from-orange-400 to-yellow-400", bg: "bg-orange-50", text: "text-orange-600" },
  { icon: Sparkles, title: "Innovation", description: "Bringing fresh ideas and creative solutions to every project", color: "from-pink-400 to-rose-400", bg: "bg-pink-50", text: "text-pink-600" },
  { icon: Layers, title: "Full Stack", description: "Handling everything from frontend to backend seamlessly", color: "from-green-400 to-teal-400", bg: "bg-green-50", text: "text-green-600" },
  { icon: Globe, title: "Web First", description: "Delivering pixel-perfect, responsive experiences on all devices", color: "from-indigo-400 to-violet-400", bg: "bg-indigo-50", text: "text-indigo-600" },
];

const stats = [
  { label: "Projects Completed", value: "50+", color: "text-blue-500" },
  { label: "Happy Clients", value: "30+", color: "text-purple-500" },
  { label: "Years Experience", value: "5+", color: "text-pink-500" },
  { label: "Technologies", value: "20+", color: "text-green-500" },
];

function FloatingOrb({ cx, cy, r, color, delay }: { cx: string; cy: string; r: number; color: string; delay: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.15}
      animate={{ cy: [cy, `${parseInt(cy) - 30}`, cy], scale: [1, 1.1, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const smoothY = useSpring(heroY, { stiffness: 80, damping: 20 });

  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
        {/* Animated SVG background */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <FloatingOrb cx="100" cy="150" r={200} color="#6366f1" delay={0} />
          <FloatingOrb cx="700" cy="100" r={180} color="#ec4899" delay={1.5} />
          <FloatingOrb cx="400" cy="500" r={220} color="#06b6d4" delay={3} />
          <FloatingOrb cx="650" cy="450" r={140} color="#a855f7" delay={2} />
          <FloatingOrb cx="150" cy="450" r={130} color="#f59e0b" delay={4} />
        </svg>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20stroke%3D%22%23ffffff%22%20stroke-width%3D%220.3%22%20stroke-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M60%200H0v60%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

        <motion.div
          style={{ y: smoothY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white/80 backdrop-blur-sm bg-white/5"
              animate={{ boxShadow: ["0 0 0 0 rgba(99,102,241,0)", "0 0 0 12px rgba(99,102,241,0.15)", "0 0 0 0 rgba(99,102,241,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ✨ Available for new projects
            </motion.div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Hemant Palled
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              A passionate designer & developer crafting{" "}
              <span className="text-cyan-400">beautiful</span>,{" "}
              <span className="text-purple-400">fast</span>, and{" "}
              <span className="text-pink-400">meaningful</span> digital experiences
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button asChild size="lg" className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 shadow-lg shadow-blue-500/30">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-sm"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 via-purple-50/40 to-pink-50/60" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label}>
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                >
                  <div className={`text-5xl font-bold mb-2 ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── What I Do ────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-950 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-purple-400 uppercase mb-3 block">What I Do</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">My Expertise</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Combining creativity with technical expertise to build exceptional products
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden cursor-default"
                >
                  {/* gradient hover glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  {/* icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Marquee tech strip ───────────────────────────────────── */}
      <section className="py-10 bg-gray-900 overflow-hidden border-y border-white/5">
        <div className="flex gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, pass) => (
            <motion.div
              key={pass}
              className="flex gap-12 shrink-0"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {["React", "TypeScript", "Node.js", "Tailwind CSS", "Next.js", "GraphQL", "Figma", "AWS", "PostgreSQL", "Docker"].map((tech) => (
                <span key={tech} className="text-white/30 font-medium text-lg select-none">{tech}</span>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
        {/* animated rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-200"
            style={{ width: `${i * 280}px`, height: `${i * 280}px` }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-200 text-purple-600 text-sm font-medium"
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4" />
              Open to opportunities
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Let's Build Something{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Amazing
              </span>
            </h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something the world hasn't seen yet.
            </p>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button asChild size="lg" className="text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 border-0 shadow-xl shadow-purple-500/25 px-10">
                <Link to="/contact">Start a Conversation</Link>
              </Button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
