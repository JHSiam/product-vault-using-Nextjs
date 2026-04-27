import Link from "next/link";

/* ─────────────────────────────────────────────
   Shared accent palette (emerald — matches Navbar)
   bg-zinc-950  →  base page background
   emerald-400  →  primary accent
   white/x      →  muted text layers
───────────────────────────────────────────── */

// ── tiny reusable badge ──────────────────────
const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
    {children}
  </span>
);

// ── section wrapper ──────────────────────────
const Section = ({ children, className = "" }) => (
  <section className={`px-6 md:px-12 lg:px-20 ${className}`}>
    <div className={`max-w-7xl mx-auto`}>{children}</div>
  </section>
);

// ── section heading block ────────────────────
const SectionHeading = ({ badge, title, subtitle }) => (
  <div className="flex flex-col items-center text-center gap-4 mb-14">
    {badge && <Badge>{badge}</Badge>}
    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-2xl">
      {title}
    </h2>
    {subtitle && (
      <p className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
const Hero = () => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

    {/* Background glow blobs */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[100px]" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>

    {/* Content */}
    <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
      <Badge>Now in public beta</Badge>

      <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
        Everything you need,{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          nothing you don't.
        </span>
      </h1>

      <p className="text-white/50 text-lg md:text-xl max-w-2xl leading-relaxed">
        A beautifully crafted platform built for speed, clarity, and scale.
        Manage your items, track performance, and ship faster than ever before.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <Link
          href="/signup"
          className="bg-emerald-400 text-zinc-900 font-semibold text-sm px-7 py-3.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shadow-[0_0_24px_rgba(52,211,153,0.25)]"
        >
          Get started for free
        </Link>
        <Link
          href="/items"
          className="text-white/60 hover:text-white text-sm px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
        >
          Browse items →
        </Link>
      </div>

      {/* Social proof strip */}
      <div className="flex items-center gap-3 mt-6 text-white/30 text-xs tracking-wide">
        <span className="flex -space-x-2">
          {["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-rose-500"].map(
            (c, i) => (
              <span
                key={i}
                className={`w-6 h-6 rounded-full border-2 border-zinc-950 ${c}`}
              />
            )
          )}
        </span>
        <span>Trusted by 4,000+ teams worldwide</span>
      </div>
    </div>

    {/* Bottom fade into next section */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
  </section>
);

/* ══════════════════════════════════════════════
   SECTION 1 — FEATURES
══════════════════════════════════════════════ */
const features = [
  {
    icon: "⚡",
    title: "Blazing Fast",
    desc: "Optimised rendering and edge caching keeps every interaction under 100ms, no matter the load.",
  },
  {
    icon: "🗂",
    title: "Smart Organisation",
    desc: "Tag, filter, and sort your items with an intuitive system that scales from 10 to 10,000 entries.",
  },
  {
    icon: "🔒",
    title: "Secure by Default",
    desc: "End-to-end encryption, role-based access, and audit logs come built-in — not bolted on.",
  },
  {
    icon: "📊",
    title: "Live Analytics",
    desc: "Real-time dashboards surface the metrics that matter so you can act before problems escalate.",
  },
  {
    icon: "🔗",
    title: "Seamless Integrations",
    desc: "Connect with your existing tools in minutes via our REST API and growing library of plugins.",
  },
  {
    icon: "🌍",
    title: "Global CDN",
    desc: "Deployed across 30+ regions, your content is always served from the edge closest to your users.",
  },
];

const Features = () => (
  <Section className="py-28">
    <SectionHeading
      badge="Features"
      title="Built for builders who mean business"
      subtitle="Every feature is crafted with intent — no fluff, no filler, just tools that work."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map(({ icon, title, desc }) => (
        <div
          key={title}
          className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-emerald-400/30 hover:bg-white/[0.05] transition-all duration-300 cursor-default overflow-hidden"
        >
          {/* hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

          <div className="text-2xl mb-4">{icon}</div>
          <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
          <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
        </div>
      ))}
    </div>
  </Section>
);

/* ══════════════════════════════════════════════
   SECTION 2 — FEATURED ITEMS
══════════════════════════════════════════════ */
const items = [
  { tag: "Design", title: "Minimal Desk Setup", price: "$129", heat: "🔥 Trending" },
  { tag: "Tech", title: "Wireless Mechanical Keyboard", price: "$249", heat: "⭐ Top Rated" },
  { tag: "Audio", title: "Studio Monitor Headphones", price: "$189", heat: "🆕 New" },
  { tag: "Lifestyle", title: "Leather Cable Organiser", price: "$49", heat: "💎 Staff Pick" },
];

const Items = () => (
  <Section className="py-28">
    <SectionHeading
      badge="Items"
      title="Handpicked for you"
      subtitle="Fresh additions curated by our team — updated every week."
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {items.map(({ tag, title, price, heat }) => (
        <Link
          href="/items"
          key={title}
          className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.03] hover:border-emerald-400/30 hover:bg-white/[0.05] overflow-hidden transition-all duration-300"
        >
          {/* Placeholder image area */}
          <div className="relative h-44 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] px-2 py-1 rounded-full bg-zinc-950/70 text-white/50 border border-white/10 uppercase tracking-widest">
                {tag}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                {heat}
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="text-white font-medium text-sm leading-snug group-hover:text-emerald-400 transition-colors duration-200">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-white font-bold text-base">{price}</span>
              <span className="text-white/30 text-xs group-hover:text-emerald-400 transition-colors duration-200">
                View →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="flex justify-center mt-10">
      <Link
        href="/items"
        className="text-white/50 hover:text-white text-sm px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
      >
        View all items →
      </Link>
    </div>
  </Section>
);

/* ══════════════════════════════════════════════
   SECTION 3 — TESTIMONIALS
══════════════════════════════════════════════ */
const testimonials = [
  {
    quote:
      "This platform completely changed how our team manages inventory. What used to take hours now takes minutes.",
    name: "Sarah K.",
    role: "Operations Lead, Acme Co.",
    avatar: "SK",
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    quote:
      "The UI is genuinely a joy to use. Clean, fast, and everything is exactly where you'd expect it to be.",
    name: "Marcus T.",
    role: "Founder, Buildspace",
    avatar: "MT",
    accent: "from-violet-400 to-blue-400",
  },
  {
    quote:
      "We onboarded 200 SKUs in a single afternoon. The import tools and filtering system are world-class.",
    name: "Priya M.",
    role: "Product Manager, Loop Inc.",
    avatar: "PM",
    accent: "from-rose-400 to-orange-400",
  },
];

const Testimonials = () => (
  <Section className="py-28">
    <SectionHeading
      badge="Testimonials"
      title="Loved by teams everywhere"
      subtitle="Don't take our word for it — hear from the people using it every day."
    />

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {testimonials.map(({ quote, name, role, avatar, accent }) => (
        <div
          key={name}
          className="group flex flex-col gap-5 p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300"
        >
          {/* Stars */}
          <div className="flex gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} className="text-emerald-400 text-sm">★</span>
            ))}
          </div>

          <p className="text-white/60 text-sm leading-relaxed flex-1">"{quote}"</p>

          <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${accent} flex items-center justify-center text-xs font-bold text-zinc-900 shrink-0`}
            >
              {avatar}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{name}</p>
              <p className="text-white/35 text-xs">{role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

/* ══════════════════════════════════════════════
   SECTION 4 — CTA BANNER
══════════════════════════════════════════════ */
const Banner = () => (
  <Section className="py-28">
    <div className="relative rounded-3xl overflow-hidden border border-emerald-400/20 bg-gradient-to-br from-emerald-950/60 via-zinc-950 to-zinc-950 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">

      {/* Background glow */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-4 max-w-xl relative z-10">
        <Badge>Limited offer</Badge>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
          Start managing smarter{" "}
          <span className="text-emerald-400">today.</span>
        </h2>
        <p className="text-white/45 text-base leading-relaxed">
          Join thousands of teams already saving time. No credit card required —
          get full access free for 14 days.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 relative z-10">
        <Link
          href="/signup"
          className="bg-emerald-400 text-zinc-900 font-semibold text-sm px-8 py-3.5 rounded-xl text-center hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 shadow-[0_0_30px_rgba(52,211,153,0.3)]"
        >
          Create free account
        </Link>
        <Link
          href="/about"
          className="text-white/50 hover:text-white text-sm px-8 py-3.5 rounded-xl text-center border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
        >
          Learn more
        </Link>
      </div>
    </div>
  </Section>
);

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Hero />
      <Features />
      <Items />
      <Testimonials />
      <Banner />
    </main>
  );
}