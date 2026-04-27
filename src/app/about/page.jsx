import Link from "next/link";

/* ── stat pill ── */
const Stat = ({ value, label }) => (
  <div className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
    <span className="text-3xl font-black text-white tracking-tight">{value}</span>
    <span className="text-white/35 text-xs uppercase tracking-widest">{label}</span>
  </div>
);

/* ── team card ── */
const TeamCard = ({ initials, name, role, accent }) => (
  <div className="group flex flex-col items-center gap-4 p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-emerald-400/25 hover:bg-white/[0.05] transition-all duration-300 text-center">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-lg font-black text-zinc-900`}>
      {initials}
    </div>
    <div>
      <p className="text-white font-semibold text-sm">{name}</p>
      <p className="text-white/35 text-xs mt-0.5">{role}</p>
    </div>
  </div>
);

/* ── value card ── */
const ValueCard = ({ icon, title, desc }) => (
  <div className="group flex gap-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-emerald-400/25 hover:bg-white/[0.05] transition-all duration-300">
    <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-lg shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-white font-semibold text-sm mb-1">{title}</p>
      <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
    </div>
  </div>
);

const stats = [
  { value: "4K+",  label: "Active Users"   },
  { value: "12K+", label: "Items Listed"   },
  { value: "98%",  label: "Satisfaction"   },
  { value: "30+",  label: "Countries"      },
];

const values = [
  {
    icon: "⚡",
    title: "Speed First",
    desc: "Every interaction is optimised for sub-100ms response times so you never wait.",
  },
  {
    icon: "🔒",
    title: "Privacy by Design",
    desc: "Your data belongs to you. We never sell it, share it, or use it for ads.",
  },
  {
    icon: "🌍",
    title: "Built for Everyone",
    desc: "Accessible, localised, and designed to work for teams of any size, anywhere.",
  },
  {
    icon: "🤝",
    title: "Community Driven",
    desc: "Our roadmap is shaped by the people who use the product every single day.",
  },
];

const team = [
  { initials: "AK", name: "Amir Khan",    role: "Founder & CEO",        accent: "from-emerald-400 to-cyan-400"   },
  { initials: "SR", name: "Sara Rahman",  role: "Head of Design",       accent: "from-violet-400 to-blue-400"   },
  { initials: "TN", name: "Tom Nguyen",   role: "Lead Engineer",        accent: "from-rose-400 to-orange-400"   },
  { initials: "PM", name: "Priya Mehta",  role: "Product Manager",      accent: "from-amber-400 to-yellow-300"  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">

      {/* ══ HERO ══════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden">

        {/* glow blobs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative flex flex-col items-center gap-5 max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
            Our Story
          </span>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.07]">
            Built with purpose.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Designed for people.
            </span>
          </h1>

          <p className="text-white/45 text-lg md:text-xl max-w-2xl leading-relaxed">
            We started with a simple idea — managing items online shouldn't be painful.
            So we built the platform we always wished existed: fast, clean, and genuinely
            a joy to use.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent" />
      </section>

      {/* ══ STATS ═════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </section>

      {/* ══ MISSION ═══════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Text */}
            <div className="flex flex-col gap-5">
              <span className="inline-flex w-fit items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Empowering anyone to list, discover, and manage — effortlessly.
              </h2>
              <p className="text-white/45 text-sm leading-relaxed">
                From independent sellers to large teams, our platform gives every user
                the same powerful tools. No steep learning curve, no bloated dashboards —
                just a clean workspace that gets out of your way and lets you focus on what matters.
              </p>
              <p className="text-white/45 text-sm leading-relaxed">
                We believe great software should feel invisible. When it works perfectly,
                you barely notice it — you just notice how much more you're getting done.
              </p>
            </div>

            {/* Visual card */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] bg-gradient-to-br from-emerald-950/40 via-zinc-900/60 to-zinc-950 p-10 flex flex-col gap-6 min-h-[320px] justify-center">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/15 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none" />

              {/* Mini feature list */}
              {[
                "Instant item publishing",
                "Real-time search & filters",
                "Secure user accounts",
                "Mobile-first responsive design",
                "Fast global CDN delivery",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white/60 text-sm">{f}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══ VALUES ════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              Values
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">What we stand for</h2>
            <p className="text-white/40 text-sm max-w-md leading-relaxed">
              These aren't just words on a wall — they're the decisions we make every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => <ValueCard key={v.title} {...v} />)}
          </div>

        </div>
      </section>

      {/* ══ TEAM ══════════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              Team
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">The people behind it</h2>
            <p className="text-white/40 text-sm max-w-md leading-relaxed">
              A small, focused team obsessed with craft, clarity, and shipping things that work.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((t) => <TeamCard key={t.name} {...t} />)}
          </div>

        </div>
      </section>

      {/* ══ CTA BANNER ════════════════════════════ */}
      <section className="px-6 md:px-12 lg:px-20 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-emerald-400/20 bg-gradient-to-br from-emerald-950/60 via-zinc-950 to-zinc-950 px-10 py-16 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

            <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-3 max-w-xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Ready to get started?
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Join thousands of users already listing and discovering items on our platform.
                No credit card required.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10">
              <Link
                href="/signup"
                className="bg-emerald-400 text-zinc-900 font-semibold text-sm px-8 py-3.5 rounded-xl text-center hover:opacity-90 hover:-translate-y-px transition-all duration-200 shadow-[0_0_30px_rgba(52,211,153,0.25)]"
              >
                Create free account
              </Link>
              <Link
                href="/items"
                className="text-white/50 hover:text-white text-sm px-8 py-3.5 rounded-xl text-center border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-200"
              >
                Browse items
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}