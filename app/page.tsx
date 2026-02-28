import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Lock,
  TrendingDown,
  Shield,
  TrendingUp,
  Target,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────── */

const TERMINAL_LINES = [
  {
    text: "DCA Bot → Bought 12.4 SOL at $142.30",
    status: "✓",
    color: "#10b981",
  },
  {
    text: "Portfolio Guard → Rebalanced USDC allocation",
    status: "✓",
    color: "#10b981",
  },
  {
    text: "Yield Hunter → Moved $2,400 to Orca pool (APY 34.2%)",
    status: "✓",
    color: "#10b981",
  },
  {
    text: "Token Sniper → Detected: $CLAW listed on Jupiter",
    status: "✓",
    color: "#10b981",
  },
  {
    text: "DCA Bot → Next buy scheduled in 3h 42m",
    status: "⟳",
    color: "#f59e0b",
  },
  {
    text: "Portfolio Guard → Stop-loss updated: $129.40",
    status: "✓",
    color: "#10b981",
  },
];

const TICKER_CONTENT =
  "DCA Bot ↑ 12.4% this week  ·  Portfolio Guard saved $1,240 in drawdown  ·  Yield Hunter: 34.2% APY  ·  Token Sniper: 3 trades executed today  ·  28 agents deployed on devnet  ·  OpenClaw × Solana  ·  ";

const BENTO_STRATEGIES = [
  { name: "DCA Bot", risk: "Low", color: "#3b82f6" },
  { name: "Portfolio Guard", risk: "Medium", color: "#10b981" },
  { name: "Yield Hunter", risk: "Medium", color: "#f59e0b" },
  { name: "Token Sniper", risk: "High", color: "#ef4444" },
];

const BAR_DATA = [
  { label: "Jan", manual: 42, ai: 64 },
  { label: "Feb", manual: 28, ai: 71 },
  { label: "Mar", manual: 51, ai: 89 },
];

const STRATEGIES = [
  {
    name: "DCA Bot",
    icon: TrendingDown,
    risk: "Low Risk",
    color: "#3b82f6",
    desc: "Automatically buy on dips. Average your entry price over time without lifting a finger.",
    stat: "↑ 12.4% avg weekly",
    pattern:
      "repeating-linear-gradient(-45deg, rgba(59,130,246,0.05), rgba(59,130,246,0.05) 1px, transparent 1px, transparent 8px)",
  },
  {
    name: "Portfolio Guard",
    icon: Shield,
    risk: "Medium Risk",
    color: "#10b981",
    desc: "Set stop-loss and take-profit thresholds. Protect your gains around the clock.",
    stat: "$1,240 saved last week",
    pattern:
      "repeating-linear-gradient(0deg, rgba(16,185,129,0.05), rgba(16,185,129,0.05) 1px, transparent 1px, transparent 14px)",
  },
  {
    name: "Yield Hunter",
    icon: TrendingUp,
    risk: "Medium Risk",
    color: "#f59e0b",
    desc: "Scan liquidity pools for highest APY. Auto-compound and rebalance daily.",
    stat: "34.2% APY on Orca",
    pattern:
      "radial-gradient(circle, rgba(245,158,11,0.08) 1px, transparent 1px) 0 0 / 14px 14px",
  },
  {
    name: "Token Sniper",
    icon: Target,
    risk: "High Risk",
    color: "#ef4444",
    desc: "Detect new token launches and execute buys within milliseconds of listing.",
    stat: "3 trades today",
    pattern: `repeating-linear-gradient(0deg, rgba(239,68,68,0.04), rgba(239,68,68,0.04) 1px, transparent 1px, transparent 10px),
      repeating-linear-gradient(90deg, rgba(239,68,68,0.04), rgba(239,68,68,0.04) 1px, transparent 1px, transparent 10px)`,
  },
];

/* ── Hero ─────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="min-h-screen pt-[60px] flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 py-20 items-center">
        {/* Left: text */}
        <div>
          <h1
            className="text-[80px] md:text-[110px] lg:text-[130px] font-black leading-none text-white"
            style={{ letterSpacing: "-0.04em" }}
          >
            DEPLOY.
          </h1>

          <p
            className="mt-6 text-[17px] text-[#555] leading-relaxed max-w-sm"
            style={{ fontWeight: 400 }}
          >
            OpenClaw AI agents.
            <br />
            Zero code. Under 60 seconds.
          </p>

          {/* Live pill */}
          <div className="mt-8 inline-flex items-center gap-2.5 px-4 py-2 border border-[rgba(255,255,255,0.08)] rounded-[4px]">
            <span
              className="w-2 h-2 rounded-full bg-[#10b981] live-dot flex-shrink-0"
              aria-hidden
            />
            <span className="text-[13px] text-[#555] font-mono">
              3 agents active on devnet
            </span>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#8b5cf6] text-white font-bold text-[15px] rounded-[4px] hover:bg-[#7c3aed] active:scale-[0.98] transition-all duration-150 group">
              Start Deploying
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Right: animated terminal */}
        <div
          className="border border-[rgba(255,255,255,0.07)] h-[360px] lg:h-[460px] flex flex-col overflow-hidden"
          style={{ background: "#060606" }}
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(255,255,255,0.06)] flex-shrink-0">
            <span className="label-mono">Agent Activity Feed</span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#10b981] live-dot"
                aria-hidden
              />
              <span className="label-mono text-[#10b981]">LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="flex-1 px-5 py-4 flex flex-col gap-3 overflow-hidden font-mono text-[13px]">
            {TERMINAL_LINES.map((line, i) => (
              <div
                key={i}
                className="terminal-line flex items-center gap-2.5"
                style={{ animationDelay: `${0.4 + i * 0.6}s` }}
              >
                <span className="text-[#333] flex-shrink-0">›</span>
                <span className="text-[#777] flex-1 truncate">{line.text}</span>
                <span className="flex-shrink-0" style={{ color: line.color }}>
                  {line.status}
                </span>
              </div>
            ))}

            {/* Blinking cursor after last line */}
            <div className="terminal-cursor-wrap flex items-center gap-2.5">
              <span className="text-[#333]">›</span>
              <span className="terminal-cursor" />
            </div>
          </div>

          {/* Terminal footer bar */}
          <div className="px-5 py-2.5 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between flex-shrink-0">
            <span className="label-mono">solana devnet</span>
            <span className="label-mono text-[#8b5cf6]">
              slot #289,481,420
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Metrics ticker ───────────────────────────────── */
function MetricsTicker() {
  return (
    <div className="border-y border-[rgba(255,255,255,0.06)] overflow-hidden py-3.5">
      <div className="ticker-track select-none">
        {[0, 1].map((n) => (
          <span
            key={n}
            className="font-mono text-[12px] text-[#333] pr-16 whitespace-nowrap"
            aria-hidden={n === 1}
          >
            {TICKER_CONTENT}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Bento grid ───────────────────────────────────── */
function BentoSection() {
  return (
    <section className="py-20 px-8 max-w-[1400px] mx-auto">
      <h2
        className="text-[44px] md:text-[52px] font-black text-white mb-10 leading-none"
        style={{ letterSpacing: "-0.04em" }}
      >
        Everything you need.
      </h2>

      <div className="bento-grid">
        {/* Panel 1 — Strategies */}
        <div className="bento-cell bento-p1 flex flex-col">
          <span className="label-mono mb-6">Strategies</span>
          <p
            className="text-[22px] font-bold text-white mb-auto"
            style={{ letterSpacing: "-0.02em" }}
          >
            4 battle-tested
            <br />
            strategies
          </p>
          <div className="flex flex-col gap-0 mt-8">
            {BENTO_STRATEGIES.map(({ name, risk, color }, i) => (
              <div
                key={name}
                className="flex items-center justify-between py-3"
                style={{
                  borderTop:
                    i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span className="text-[15px] font-semibold text-white">
                  {name}
                </span>
                <span className="font-mono text-[12px]" style={{ color }}>
                  — {risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2 — Non-custodial */}
        <div className="bento-cell bento-p2 flex flex-col justify-between">
          <Lock className="w-5 h-5 text-[#555] mb-4" />
          <div>
            <p
              className="text-[18px] font-bold text-white mb-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              Non-custodial
            </p>
            <p className="text-[13px] text-[#444] leading-relaxed">
              Your keys never leave your wallet. We have zero access to your
              funds.
            </p>
          </div>
        </div>

        {/* Panel 3 — Solana Devnet */}
        <div className="bento-cell bento-p3 flex flex-col justify-between">
          <div
            className="w-5 h-5 rounded-full mb-4 flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, #9945ff 0%, #14f195 100%)",
            }}
          />
          <div>
            <p
              className="text-[18px] font-bold text-white mb-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              Live on Solana
              <br />
              Devnet
            </p>
            <p className="font-mono text-[11px] text-[#444]">
              Slot #289,481,420
            </p>
          </div>
        </div>

        {/* Panel 4 — Bar chart */}
        <div className="bento-cell bento-p4 flex flex-col">
          <span className="label-mono mb-4">AI vs Manual</span>
          <div className="flex items-end gap-4 flex-1">
            {BAR_DATA.map(({ label, manual, ai }, gi) => (
              <div key={label} className="flex-1 flex flex-col gap-1">
                <div className="flex items-end gap-1 h-20">
                  {/* Manual bar */}
                  <div className="flex-1 flex items-end">
                    <div
                      className="bar-grow w-full bg-[#1c1c1c]"
                      style={{
                        height: `${manual}%`,
                        animationDelay: `${0.3 + gi * 0.4}s`,
                      }}
                    />
                  </div>
                  {/* AI bar */}
                  <div className="flex-1 flex items-end">
                    <div
                      className="bar-grow w-full bg-[#8b5cf6]"
                      style={{
                        height: `${ai}%`,
                        animationDelay: `${0.5 + gi * 0.4}s`,
                      }}
                    />
                  </div>
                </div>
                <span className="label-mono text-center">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#1c1c1c] border border-[#333]" />
              <span className="label-mono">Manual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-[#8b5cf6]" />
              <span className="label-mono text-[#8b5cf6]">AI Agent</span>
            </div>
          </div>
        </div>

        {/* Panel 5 — Deploy steps */}
        <div className="bento-cell bento-p5 flex flex-col">
          <span className="label-mono mb-6">Deploy in 3 steps</span>
          <div className="flex flex-col gap-5 flex-1 justify-center">
            {[
              { n: "01", title: "Connect Wallet" },
              { n: "02", title: "Choose Strategy" },
              { n: "03", title: "Deploy Agent" },
            ].map(({ n, title }) => (
              <div key={n} className="flex items-center gap-4 group">
                <span className="font-mono text-[11px] text-[#333] w-6 flex-shrink-0">
                  {n}
                </span>
                <span className="text-[14px] text-[#888] group-hover:text-white transition-colors flex-1">
                  {title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#333] group-hover:text-[#8b5cf6] transition-colors flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Strategy blocks ──────────────────────────────── */
function StrategySection() {
  return (
    <section className="py-20">
      <div className="px-8 max-w-[1400px] mx-auto mb-8 flex items-end justify-between">
        <h2
          className="text-[36px] md:text-[44px] font-black text-white leading-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          Pick your edge.
        </h2>
        <span className="label-mono hidden md:block">Scroll to explore →</span>
      </div>

      <div className="strategy-track px-8">
        {STRATEGIES.map(({ name, icon: Icon, risk, color, desc, stat, pattern }) => (
          <div
            key={name}
            className="strategy-block"
            style={{ borderTopColor: color, backgroundImage: pattern }}
          >
            {/* Rotated strategy name — left spine */}
            <div className="strategy-vert-name" style={{ color }}>
              {name}
            </div>

            {/* Main content */}
            <div className="strategy-content">
              {/* Top */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-9 h-9 flex items-center justify-center border"
                    style={{
                      background: `${color}18`,
                      borderColor: `${color}30`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span
                    className="font-mono text-[11px] px-2.5 py-1 border"
                    style={{ color, borderColor: `${color}30` }}
                  >
                    {risk}
                  </span>
                </div>

                <h3
                  className="text-[18px] font-bold text-white mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {name}
                </h3>
                <p className="text-[13px] text-[#555] leading-relaxed">
                  {desc}
                </p>
              </div>

              {/* Stat */}
              <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.06)]">
                <p className="font-mono text-[12px]" style={{ color }}>
                  {stat}
                </p>
              </div>

              {/* Deploy button — revealed on hover */}
              <button
                className="strategy-deploy-btn mt-4 flex items-center gap-1.5 text-[13px] font-semibold"
                style={{ color }}
              >
                Deploy This Strategy
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {/* Trailing spacer */}
        <div className="flex-shrink-0 w-8" aria-hidden />
      </div>
    </section>
  );
}

/* ── Social proof ─────────────────────────────────── */
function SocialProofSection() {
  return (
    <section className="py-28 px-8 max-w-[1400px] mx-auto">
      {/* Primary pull quote */}
      <div className="max-w-3xl">
        <blockquote
          className="text-[40px] md:text-[52px] italic text-white leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          &ldquo;I deployed my first AI agent in 40 seconds. It&rsquo;s unlike
          anything in DeFi.&rdquo;
        </blockquote>
        <p className="font-mono text-[13px] text-[#444] mt-5">
          — Maya T., Retail Investor
        </p>
      </div>

      {/* Secondary quotes — asymmetric placement */}
      <div className="mt-24 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5">
          <blockquote className="text-[17px] text-[#2e2e2e] italic leading-relaxed">
            &ldquo;ClawReady turned our manual DCA strategy into an automated
            system in under a minute.&rdquo;
          </blockquote>
          <p className="font-mono text-[11px] text-[#252525] mt-3">
            — Alex K., Fund Manager
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <blockquote className="text-[17px] text-[#2e2e2e] italic leading-relaxed">
            &ldquo;Portfolio Guard saved me from a 30% drawdown. No code, no
            stress.&rdquo;
          </blockquote>
          <p className="font-mono text-[11px] text-[#252525] mt-3">
            — Ryan S., DeFi Researcher
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ────────────────────────────────────── */
function CTASection() {
  return (
    <section
      id="deploy"
      className="py-24 px-8 flex justify-center items-center"
    >
      <div className="relative w-full max-w-2xl">
        {/* SVG animated border */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <rect
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            stroke="#8b5cf6"
            strokeWidth="1"
            className="cta-border-rect"
          />
        </svg>

        <div className="px-10 md:px-20 py-20 text-center">
          <h2
            className="text-[40px] md:text-[52px] font-black text-white leading-tight mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Put your portfolio
            <br />
            on autopilot.
          </h2>
          <p className="text-[15px] text-[#555] mb-10 leading-relaxed">
            Deploy an OpenClaw AI agent in under 60 seconds.
            <br />
            No code. No credit card. Just your wallet.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8b5cf6] text-white font-bold text-[15px] rounded-[4px] hover:bg-[#7c3aed] active:scale-[0.98] transition-all duration-150 group">
            Start Deploying
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] py-6 px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono font-bold text-white text-sm tracking-tight">
          ClawReady
        </span>
        <nav className="flex gap-8">
          {["Strategies", "Dashboard", "Docs", "GitHub"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#333] hover:text-[#777] text-[13px] transition-colors flex items-center gap-1"
            >
              {link}
            </a>
          ))}
        </nav>
        <p className="font-mono text-[11px] text-[#252525] text-center">
          Built by @TobieTom for Spark Hackathon #1 · Powered by OpenClaw ×
          Solana
        </p>
      </div>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MetricsTicker />
      <BentoSection />
      <MetricsTicker />
      <StrategySection />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </main>
  );
}
