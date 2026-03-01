import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  TrendingDown,
  Shield,
  TrendingUp,
  Target,
  ArrowRight,
  Clock,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────── */

const RISK_COLORS: Record<string, string> = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#ef4444",
};

const COMPLEXITY_COLORS: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

const STRATEGIES = [
  {
    num: "01",
    name: "DCA Bot",
    icon: TrendingDown,
    risk: "Low Risk",
    riskLevel: "Low",
    color: "#3b82f6",
    desc: "Automatically buy on dips. Average your entry price over time without lifting a finger. Set your interval, amount, and asset — the agent handles the rest, 24 hours a day.",
    params: [
      "Hourly / Daily / Weekly",
      "Any Solana token",
      "Auto-buy on dip",
      "Custom budget cap",
    ],
    metric: "↑ 12.4%",
    metricLabel: "avg weekly return",
    bestFor:
      "Investors accumulating long-term positions without emotional bias.",
    pattern:
      "repeating-linear-gradient(-45deg, rgba(59,130,246,0.12), rgba(59,130,246,0.12) 1px, transparent 1px, transparent 8px)",
    patternSize: "11px 11px",
  },
  {
    num: "02",
    name: "Portfolio Guard",
    icon: Shield,
    risk: "Medium Risk",
    riskLevel: "Medium",
    color: "#10b981",
    desc: "Set stop-loss and take-profit thresholds. Protect your gains around the clock. The agent monitors your positions and executes instantly — no delays, no sleep, no emotion.",
    params: [
      "Stop-loss triggers",
      "Take-profit targets",
      "24/7 monitoring",
      "Wallet-wide coverage",
    ],
    metric: "$1,240",
    metricLabel: "avg saved per week",
    bestFor:
      "Holders who want downside protection without constant screen-watching.",
    pattern:
      "repeating-linear-gradient(0deg, rgba(16,185,129,0.1), rgba(16,185,129,0.1) 1px, transparent 1px, transparent 14px)",
    patternSize: "100% 14px",
  },
  {
    num: "03",
    name: "Yield Hunter",
    icon: TrendingUp,
    risk: "Medium Risk",
    riskLevel: "Medium",
    color: "#f59e0b",
    desc: "Scan all major Solana liquidity pools for the highest APY. Auto-compound yield and rebalance daily. Move capital to where returns are highest — automatically.",
    params: [
      "Orca / Raydium / Meteora",
      "Auto-compound",
      "Daily rebalance",
      "Min APY threshold",
    ],
    metric: "34.2%",
    metricLabel: "APY on Orca pools",
    bestFor:
      "Yield-seekers who want their idle capital working at maximum efficiency.",
    pattern:
      "radial-gradient(circle, rgba(245,158,11,0.12) 1px, transparent 1px)",
    patternSize: "14px 14px",
  },
  {
    num: "04",
    name: "Token Sniper",
    icon: Target,
    risk: "High Risk",
    riskLevel: "High",
    color: "#ef4444",
    desc: "Detect new token launches on Jupiter and Raydium. Execute buys within milliseconds of listing. Set your budget, filters, and let the sniper do the work.",
    params: [
      "< 200ms execution",
      "Jupiter + Raydium",
      "Rug-pull filters",
      "Auto take-profit",
    ],
    metric: "8–40%",
    metricLabel: "return per trade",
    bestFor:
      "Experienced traders hunting early-entry opportunities on new launches.",
    pattern: `repeating-linear-gradient(0deg, rgba(239,68,68,0.08), rgba(239,68,68,0.08) 1px, transparent 1px, transparent 10px),
      repeating-linear-gradient(90deg, rgba(239,68,68,0.08), rgba(239,68,68,0.08) 1px, transparent 1px, transparent 10px)`,
    patternSize: "10px 10px",
  },
];

const TABLE_ROWS = [
  {
    name: "DCA Bot",
    color: "#3b82f6",
    risk: "Low",
    market: "Bear / Sideways",
    returns: "↑ 12.4% weekly",
    time: "45 sec",
    complexity: "Beginner",
  },
  {
    name: "Portfolio Guard",
    color: "#10b981",
    risk: "Medium",
    market: "All Conditions",
    returns: "15–30% drawdown saved",
    time: "30 sec",
    complexity: "Beginner",
  },
  {
    name: "Yield Hunter",
    color: "#f59e0b",
    risk: "Medium",
    market: "Bull / Sideways",
    returns: "34.2% APY",
    time: "60 sec",
    complexity: "Intermediate",
  },
  {
    name: "Token Sniper",
    color: "#ef4444",
    risk: "High",
    market: "High Volatility",
    returns: "8–40% per trade",
    time: "90 sec",
    complexity: "Advanced",
  },
];

const FAQ_ITEMS = [
  {
    q: "How does ClawReady keep my funds safe?",
    a: "ClawReady agents operate entirely on-chain via your connected wallet. We never hold custody of your funds — all trades are signed by your wallet and executed via Jupiter or Raydium's open protocols. You can withdraw or stop any agent at any time.",
  },
  {
    q: "Can I stop or modify a deployed agent?",
    a: "Yes. From your dashboard you can pause, reconfigure, or permanently stop any agent with a single click. Changes take effect on the next execution cycle. Paused agents retain their configuration so you can resume without re-deploying.",
  },
  {
    q: "What network do the agents run on?",
    a: "All agents currently run on Solana Devnet for the Spark Hackathon. Mainnet deployment is on the roadmap. Your connected wallet (Phantom or Solflare) determines which network is used.",
  },
  {
    q: "Do I need to keep my browser open?",
    a: "No. Once deployed, agents run independently on ClawReady's infrastructure and interact with Solana directly. You can close your browser and the agent continues operating — you'll see all activity in your dashboard next time you log in.",
  },
];

/* ── Page header ──────────────────────────────────── */
function PageHeader() {
  return (
    <section className="pt-16 pb-20 px-8 max-w-[1400px] mx-auto">
      {/* Label */}
      <p className="label-mono mb-5" style={{ color: "#8b5cf6" }}>
        Strategies
      </p>

      {/* Heading */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
        <h1
          className="text-[52px] md:text-[68px] font-black text-white leading-none"
          style={{ letterSpacing: "-0.04em", maxWidth: 720 }}
        >
          Four ways to put
          <br />
          your portfolio to work.
        </h1>

        <div className="flex flex-col gap-4 lg:items-end pb-1">
          <p
            className="text-[15px] text-[#555] leading-relaxed lg:text-right"
            style={{ maxWidth: 300 }}
          >
            Each strategy is an autonomous AI agent.
            <br />
            Deploy in under 60 seconds. No code required.
          </p>
          <Link
            href="/deploy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8b5cf6] text-white font-bold text-[14px] rounded-[4px] hover:bg-[#7c3aed] active:scale-[0.98] transition-all duration-150 group w-fit"
          >
            Deploy an Agent
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mt-14 h-px w-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
    </section>
  );
}

/* ── Strategy card (horizontal full-width) ────────── */
function StrategyCard({ s }: { s: (typeof STRATEGIES)[0] }) {
  const Icon = s.icon;
  return (
    <div
      style={{
        borderTop: `3px solid ${s.color}`,
        background: "#060606",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: s.pattern,
          backgroundSize: s.patternSize,
        }}
        aria-hidden
      />

      <div className="relative flex flex-col md:flex-row">
        {/* ── Left: identity (40%) ── */}
        <div
          className="md:w-[40%] p-8 md:p-14 flex flex-col justify-between relative overflow-hidden"
          style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Watermark number */}
          <span
            className="absolute bottom-2 right-4 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: 180,
              color: s.color,
              opacity: 0.06,
              lineHeight: 1,
            }}
            aria-hidden
          >
            {s.num}
          </span>

          <div className="relative">
            {/* Icon badge */}
            <div
              className="w-10 h-10 rounded-[4px] flex items-center justify-center mb-8"
              style={{
                background: `${s.color}18`,
                border: `1px solid ${s.color}35`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: s.color }} />
            </div>

            {/* Mono number */}
            <p className="label-mono mb-2" style={{ color: s.color }}>
              {s.num}
            </p>

            {/* Name */}
            <h2
              className="text-[36px] font-black text-white leading-none mb-5"
              style={{ letterSpacing: "-0.03em" }}
            >
              {s.name}
            </h2>

            {/* Risk badge */}
            <span
              className="inline-block px-2.5 py-1 text-[11px] font-mono rounded-[3px] mb-6"
              style={{
                background: `${RISK_COLORS[s.riskLevel]}14`,
                color: RISK_COLORS[s.riskLevel],
                border: `1px solid ${RISK_COLORS[s.riskLevel]}30`,
              }}
            >
              {s.risk}
            </span>

            {/* Description */}
            <p className="text-[15px] text-[#555] leading-relaxed">
              {s.desc}
            </p>
          </div>
        </div>

        {/* ── Right: details (60%) ── */}
        <div className="md:w-[60%] p-8 md:p-14 flex flex-col justify-between gap-10">
          <div>
            {/* Parameters */}
            <p className="label-mono mb-4">Parameters</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {s.params.map((param) => (
                <span
                  key={param}
                  className="px-3 py-1.5 text-[13px] font-mono text-[#777] rounded-[3px]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {param}
                </span>
              ))}
            </div>

            {/* Metric */}
            <div
              className="text-[56px] font-black leading-none mb-1"
              style={{ color: s.color, letterSpacing: "-0.04em" }}
            >
              {s.metric}
            </div>
            <p className="label-mono mb-8">{s.metricLabel}</p>

            {/* Best for */}
            <p className="text-[14px] text-[#444] leading-relaxed">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.12em] mr-2"
                style={{ color: "#333" }}
              >
                Best for
              </span>
              {s.bestFor}
            </p>
          </div>

          {/* Deploy CTA */}
          <div>
            <Link
              href="/deploy"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-[14px] rounded-[4px] transition-all duration-150 group hover:opacity-90"
              style={{
                background: `${s.color}14`,
                color: s.color,
                border: `1px solid ${s.color}35`,
              }}
            >
              Deploy {s.name}
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Strategy card stack ──────────────────────────── */
function StrategyCards() {
  return (
    <section className="px-8 pb-20 max-w-[1400px] mx-auto">
      <div
        className="flex flex-col"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          gap: 1,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        {STRATEGIES.map((s) => (
          <StrategyCard key={s.name} s={s} />
        ))}
      </div>
    </section>
  );
}

/* ── Comparison table ─────────────────────────────── */
function ComparisonTable() {
  return (
    <section className="py-20 px-8 max-w-[1400px] mx-auto">
      <p className="label-mono mb-3">Side by side</p>
      <h2
        className="text-[40px] font-black text-white mb-12"
        style={{ letterSpacing: "-0.03em" }}
      >
        Compare strategies
      </h2>

      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
          <thead>
            <tr
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              {[
                "Strategy",
                "Risk",
                "Best Market",
                "Avg Return",
                "Deploy Time",
                "Complexity",
                "",
              ].map((h, i) => (
                <th
                  key={i}
                  className="label-mono pb-4 text-left"
                  style={{ paddingRight: 28, whiteSpace: "nowrap" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row) => (
              <tr
                key={row.name}
                className="group"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
              >
                {/* Strategy name */}
                <td className="py-5 pr-7">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-0.5 h-5 rounded-full flex-shrink-0"
                      style={{ background: row.color }}
                    />
                    <span className="text-[15px] font-bold text-white whitespace-nowrap">
                      {row.name}
                    </span>
                  </div>
                </td>

                {/* Risk */}
                <td className="py-5 pr-7">
                  <span
                    className="px-2.5 py-1 text-[11px] font-mono rounded-[3px] whitespace-nowrap"
                    style={{
                      background: `${RISK_COLORS[row.risk]}14`,
                      color: RISK_COLORS[row.risk],
                      border: `1px solid ${RISK_COLORS[row.risk]}30`,
                    }}
                  >
                    {row.risk}
                  </span>
                </td>

                {/* Best Market */}
                <td
                  className="py-5 pr-7 text-[14px] text-[#555] whitespace-nowrap"
                >
                  {row.market}
                </td>

                {/* Avg Return */}
                <td
                  className="py-5 pr-7 text-[13px] font-mono text-[#777] whitespace-nowrap"
                >
                  {row.returns}
                </td>

                {/* Deploy Time */}
                <td className="py-5 pr-7">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Clock
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: "#444" }}
                    />
                    <span className="text-[13px] font-mono text-[#555]">
                      {row.time}
                    </span>
                  </div>
                </td>

                {/* Complexity */}
                <td className="py-5 pr-7">
                  <span
                    className="text-[12px] font-mono whitespace-nowrap"
                    style={{ color: COMPLEXITY_COLORS[row.complexity] }}
                  >
                    {row.complexity}
                  </span>
                </td>

                {/* Deploy button (hover-reveal) */}
                <td className="py-5 text-right">
                  <Link
                    href="/deploy"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[12px] font-mono rounded-[3px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      color: "#8b5cf6",
                      border: "1px solid rgba(139,92,246,0.25)",
                    }}
                  >
                    Deploy
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ── FAQ accordion ────────────────────────────────── */
function FAQSection() {
  return (
    <section
      className="py-20 px-8 max-w-[1400px] mx-auto"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
        {/* Left label */}
        <div>
          <p className="label-mono mb-3">Common questions</p>
          <h2
            className="text-[40px] font-black text-white leading-tight"
            style={{ letterSpacing: "-0.03em" }}
          >
            FAQ
          </h2>
          <p className="mt-4 text-[14px] text-[#444] leading-relaxed">
            Everything you need to know before deploying your first agent.
          </p>
        </div>

        {/* Right: accordion */}
        <div>
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <summary
                className="flex items-center justify-between py-6 cursor-pointer select-none text-[16px] font-semibold text-white"
                style={{ listStyle: "none", outline: "none" }}
              >
                <span className="pr-6">{item.q}</span>
                {/* + / × icon */}
                <span
                  className="w-6 h-6 flex-shrink-0 flex items-center justify-center text-[#444] transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </summary>
              <p className="pb-7 text-[15px] text-[#555] leading-relaxed pr-12">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bottom CTA ───────────────────────────────────── */
function CTASection() {
  return (
    <section className="pt-[30px] pb-20 px-8 flex justify-center items-center">
      <div
        className="relative w-full max-w-[680px]"
        style={{ boxShadow: "0 0 120px rgba(139,92,246,0.12)" }}
      >
        {/* SVG animated border — same as landing page */}
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
            stroke="rgba(139,92,246,0.6)"
            strokeWidth="1.5"
            className="cta-border-rect"
          />
        </svg>

        <div className="px-10 md:px-20 py-20 text-center">
          <h2
            className="text-[52px] font-black text-white leading-tight mb-4"
            style={{ letterSpacing: "-0.04em" }}
          >
            Pick your strategy.
            <br />
            Deploy in 60 seconds.
          </h2>
          <p className="text-[15px] text-[#555] mb-10 leading-relaxed">
            No code. No credit card. Just your wallet.
            <br />
            Start with any strategy — switch any time.
          </p>
          <Link
            href="/deploy"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8b5cf6] text-white font-bold text-[15px] rounded-[4px] hover:bg-[#7c3aed] active:scale-[0.98] transition-all duration-150 group"
          >
            Deploy an Agent
            <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
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
          {(
            [
              { label: "Strategies", href: "/strategies" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Docs", href: "#" },
              { label: "GitHub", href: "#" },
            ] as { label: string; href: string }[]
          ).map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[#333] hover:text-[#777] text-[13px] transition-colors"
            >
              {label}
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
export default function StrategiesPage() {
  return (
    <div>
      <Navbar />
      <main className="pt-[60px]">
        <PageHeader />
        <StrategyCards />
        <ComparisonTable />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
