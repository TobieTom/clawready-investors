import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Bot,
  ChevronRight,
  Clock,
  Code2,
  DollarSign,
  ExternalLink,
  Github,
  Layout,
  Lock,
  Shield,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-16">
      {/* CSS orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          style={{
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.08) 35%, rgba(6,182,212,0.05) 60%, transparent 72%)",
            filter: "blur(48px)",
            animation: "orb-pulse 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(124,58,237,0.22) 0%, transparent 65%)",
            filter: "blur(20px)",
            animation: "orb-pulse 4.5s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-600/10 text-sm mb-8"
          style={{ animation: "fadeInUp 0.6s 0s ease both" }}
        >
          <span>🏆</span>
          <span className="shimmer-text font-medium">
            Spark Hackathon #1 — OpenClaw for Investors
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-[82px] font-black tracking-tight leading-none mb-6"
          style={{ animation: "fadeInUp 0.6s 0.1s ease both" }}
        >
          <span className="block text-white">The Smartest Way to Deploy</span>
          <span
            className="block mt-2"
            style={{
              background:
                "linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #7c3aed 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            AI Trading Agents on Solana
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: "fadeInUp 0.6s 0.2s ease both" }}
        >
          OpenClaw is powerful. We made it effortless. Deploy, monitor and
          control AI agents in under 60 seconds —{" "}
          <span className="text-slate-200">
            no code, no CLI, no compromise.
          </span>
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          style={{ animation: "fadeInUp 0.6s 0.3s ease both" }}
        >
          <button
            className="group flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl text-base hover:bg-purple-500 active:scale-95 transition-all duration-200"
            style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
          >
            Launch My First Agent
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 text-slate-300 border border-white/10 font-medium rounded-xl text-base hover:border-white/20 hover:text-white hover:bg-white/[0.04] active:scale-95 transition-all duration-200">
            See How It Works
          </button>
        </div>

        {/* Trust signals */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
          style={{ animation: "fadeInUp 0.6s 0.4s ease both" }}
        >
          {[
            { icon: "🔒", text: "Non-custodial" },
            { icon: "⚡", text: "Live on Solana Devnet" },
            { icon: "🛡️", text: "Open Source" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              {icon}
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   STATS
───────────────────────────────────────────────────────── */
const STATS = [
  {
    icon: Clock,
    value: "< 60s",
    label: "Deploy Time",
    color: "text-purple-400",
    iconBg: "rgba(124,58,237,0.12)",
  },
  {
    icon: Code2,
    value: "0",
    label: "Lines of Code",
    color: "text-cyan-400",
    iconBg: "rgba(6,182,212,0.12)",
  },
  {
    icon: Layout,
    value: "4",
    label: "Strategies",
    color: "text-emerald-400",
    iconBg: "rgba(16,185,129,0.12)",
  },
  {
    icon: DollarSign,
    value: "$0",
    label: "Platform Fees",
    color: "text-amber-400",
    iconBg: "rgba(245,158,11,0.12)",
  },
];

function StatsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
            {STATS.map(({ icon: Icon, value, label, color, iconBg }) => (
              <div
                key={label}
                className="group flex flex-col items-center text-center p-6 rounded-xl hover:bg-white/[0.03] hover:shadow-[0_0_30px_rgba(124,58,237,0.12)] cursor-default transition-all duration-300"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: iconBg }}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <span className="text-4xl md:text-5xl font-black text-white mb-1 tabular-nums">
                  {value}
                </span>
                <span className="text-sm text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────────────────── */
const STEPS = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    desc: "Link your Phantom or Solflare wallet in one click. We never touch your keys — everything stays non-custodial.",
  },
  {
    step: "02",
    icon: Target,
    title: "Choose a Strategy",
    desc: "Pick from DCA, Portfolio Guard, Yield Hunter, or Token Sniper. Configure risk tolerance in under a minute.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Deploy & Monitor",
    desc: "Your OpenClaw AI agent goes live instantly. Watch it trade in real-time from your live dashboard.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-1 h-10 bg-gradient-to-b from-purple-500 to-transparent rounded-full flex-shrink-0" />
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1">
              Simple by design
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              How It Works
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map(({ step, icon: Icon, title, desc }) => (
            <div
              key={step}
              className="step-card group glass rounded-2xl p-8 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(124,58,237,0.15)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Watermark step number */}
              <span className="absolute -right-3 -top-6 text-[110px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
                {step}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-600/30 group-hover:border-purple-500/40 transition-all duration-300">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   STRATEGIES
───────────────────────────────────────────────────────── */
const STRATEGIES = [
  {
    name: "DCA Bot",
    desc: "Automatically buy on dips and average your entry price over time. Set it, forget it.",
    icon: TrendingDown,
    risk: "Low",
    riskClass: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    borderColor: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    name: "Portfolio Guard",
    desc: "Set stop-loss and take-profit thresholds. Your AI agent protects your gains around the clock.",
    icon: Shield,
    risk: "Medium",
    riskClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    borderColor: "#10b981",
    glow: "rgba(16,185,129,0.15)",
  },
  {
    name: "Yield Hunter",
    desc: "Continuously scan liquidity pools and yield farms for the highest APY opportunities.",
    icon: TrendingUp,
    risk: "Medium",
    riskClass: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    borderColor: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    name: "Token Sniper",
    desc: "Detect new token launches and execute buys within milliseconds of listing.",
    icon: Target,
    risk: "High",
    riskClass: "text-red-400 bg-red-400/10 border-red-400/20",
    borderColor: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
  },
];

function StrategySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Choose Your Strategy
        </h2>
        <p className="text-slate-400 text-center mb-14 max-w-xl mx-auto">
          Four battle-tested strategies built for every risk profile. Deploy any
          of them in seconds.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {STRATEGIES.map(
            ({
              name,
              desc,
              icon: Icon,
              risk,
              riskClass,
              borderColor,
              glow,
            }) => (
              <div
                key={name}
                className="strategy-card group glass rounded-2xl p-8 border-l-[3px] relative overflow-hidden"
                style={
                  {
                    borderLeftColor: borderColor,
                    "--hover-glow": `0 8px 40px ${glow}`,
                  } as React.CSSProperties
                }
              >
                {/* Subtle dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.018] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${borderColor}1a`,
                        border: `1px solid ${borderColor}30`,
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: borderColor }}
                      />
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${riskClass}`}
                    >
                      {risk} Risk
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
                  <p className="text-slate-400 text-sm mb-7 leading-relaxed">
                    {desc}
                  </p>

                  <button
                    className="flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-200"
                    style={{ color: borderColor }}
                  >
                    Deploy This
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SOCIAL PROOF
───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    initials: "AK",
    name: "Alex K.",
    role: "Crypto Fund Manager",
    quote:
      "ClawReady turned our manual DCA strategy into a fully automated system in under a minute. The interface is unlike anything I've seen in DeFi.",
    avatarColor: "#7c3aed",
  },
  {
    initials: "MT",
    name: "Maya T.",
    role: "Retail Investor",
    quote:
      "I'm not technical at all, but I deployed my first AI agent in 45 seconds. Portfolio Guard alone saved me from a brutal 30% drawdown last week.",
    avatarColor: "#06b6d4",
  },
  {
    initials: "RS",
    name: "Ryan S.",
    role: "DeFi Researcher",
    quote:
      "Finally — a UI that doesn't assume you have a CS degree. OpenClaw's power with zero friction. The Yield Hunter strategy is worth it alone.",
    avatarColor: "#10b981",
  },
];

function SocialProofSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Built for serious investors
        </h2>
        <p className="text-slate-400 text-center mb-14">
          Early adopters are already putting their portfolios on autopilot.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ initials, name, role, quote, avatarColor }) => (
            <div
              key={name}
              className="glass rounded-2xl p-8 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(124,58,237,0.1)] transition-all duration-300"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-7">
                &ldquo;{quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: avatarColor }}
                >
                  {initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-slate-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(6,182,212,0.06) 50%, rgba(124,58,237,0.08) 100%)",
        }}
      />

      {/* Top purple gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.7), rgba(6,182,212,0.5), transparent)",
        }}
      />
      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)",
        }}
      />

      {/* CSS "particles" — multi-box-shadow dot field */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "56px 56px",
          animation: "float-dot 9s ease-in-out infinite",
          opacity: 0.4,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundPosition: "28px 28px",
          animation: "float-dot 12s ease-in-out infinite reverse",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
          Ready to put your portfolio
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #a855f7, #06b6d4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            on autopilot?
          </span>
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Join investors using AI to trade smarter on Solana. Deploy your first
          agent in under 60 seconds — no credit card, no CLI.
        </p>
        <button
          className="inline-flex items-center gap-2.5 px-10 py-5 bg-purple-600 text-white font-bold text-lg rounded-xl hover:bg-purple-500 active:scale-95 transition-all duration-200"
          style={{ animation: "pulse-glow 2.5s ease-in-out infinite" }}
        >
          Launch My First Agent
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-12 px-6 relative">
      {/* Top purple gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 items-start">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-8 h-8 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              }}
            >
              <span className="text-white text-[9px] font-black">CR</span>
            </div>
            <span className="text-white font-bold text-sm">ClawReady</span>
          </div>
          <p className="text-slate-500 text-sm">
            AI trading agents for the modern investor.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 md:justify-center">
          {["Strategies", "Dashboard", "Docs", "GitHub"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors flex items-center gap-1"
            >
              {link === "GitHub" && <Github className="w-3.5 h-3.5" />}
              {link}
            </a>
          ))}
        </div>

        {/* Credits */}
        <div className="md:text-right">
          <p className="text-slate-500 text-sm">
            Built by{" "}
            <a
              href="#"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              @TobieTom
            </a>{" "}
            for Spark Hackathon #1
          </p>
          <p className="text-slate-600 text-xs mt-1">
            Powered by OpenClaw × Solana
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <StrategySection />
      <SocialProofSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
