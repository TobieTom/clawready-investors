"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  Activity,
  Layers,
  Settings,
  Bell,
  ArrowRight,
  Pencil,
  Pause,
  Play,
  Square,
  SlidersHorizontal,
  Check,
} from "lucide-react";

/* ── Types ────────────────────────────────────────── */
type AgentStatus = "active" | "paused" | "stopped";

interface Agent {
  id: string;
  defaultName: string;
  strategy: string;
  strategyColor: string;
  initialStatus: AgentStatus;
  startedSecondsAgo: number;
  pnl: string;
  pnlPct: string;
  pnlPositive: boolean;
  lastAction: string;
}

interface ActivityItem {
  id: number;
  time: string;
  agent: string;
  agentColor: string;
  action: string;
}

/* ── Data ─────────────────────────────────────────── */
const AGENTS: Agent[] = [
  {
    id: "dca-alpha",
    defaultName: "DCA Alpha",
    strategy: "DCA Bot",
    strategyColor: "#3b82f6",
    initialStatus: "active",
    startedSecondsAgo: 2 * 3600 + 34 * 60 + 12,
    pnl: "+$847.20",
    pnlPct: "+8.4%",
    pnlPositive: true,
    lastAction: "Bought 12.4 SOL at $142.30 · 3m ago",
  },
  {
    id: "guard-dog",
    defaultName: "Guard Dog",
    strategy: "Portfolio Guard",
    strategyColor: "#10b981",
    initialStatus: "active",
    startedSecondsAgo: 1 * 3600 + 15 * 60 + 30,
    pnl: "+$400.30",
    pnlPct: "+4.1%",
    pnlPositive: true,
    lastAction: "Rebalanced USDC allocation · 7m ago",
  },
  {
    id: "yield-max",
    defaultName: "Yield Max",
    strategy: "Yield Hunter",
    strategyColor: "#f59e0b",
    initialStatus: "paused",
    startedSecondsAgo: 4 * 3600 + 12 * 60,
    pnl: "+$0.00",
    pnlPct: "0%",
    pnlPositive: false,
    lastAction: "Paused by user · 2h ago",
  },
];

const CHART_DATA = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 89 },
  { day: "Wed", value: -45 },
  { day: "Thu", value: 210 },
  { day: "Fri", value: 180 },
  { day: "Sat", value: 340 },
  { day: "Sun", value: 354 },
];

type NavItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
  scrollId?: string;
  isToast?: boolean;
  active?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "My Agents", icon: Bot, scrollId: "section-agents" },
  { label: "Activity", icon: Activity, scrollId: "section-activity" },
  { label: "Strategies", icon: Layers, href: "/strategies" },
  { label: "Settings", icon: Settings, isToast: true },
];

const INITIAL_ACTIVITY: ActivityItem[] = [
  { id: 1, time: "12:47:03", agent: "DCA Alpha", agentColor: "#3b82f6", action: "Bought 12.4 SOL at $142.30" },
  { id: 2, time: "12:43:51", agent: "Guard Dog", agentColor: "#10b981", action: "Rebalanced USDC allocation" },
  { id: 3, time: "12:40:22", agent: "DCA Alpha", agentColor: "#3b82f6", action: "Price check: SOL at $142.15" },
  { id: 4, time: "12:38:09", agent: "Yield Max", agentColor: "#f59e0b", action: "Pool APY check: Orca 34.2%" },
  { id: 5, time: "12:35:44", agent: "Guard Dog", agentColor: "#10b981", action: "Stop-loss threshold updated: $129.40" },
  { id: 6, time: "12:31:18", agent: "DCA Alpha", agentColor: "#3b82f6", action: "Bought 8.2 SOL at $141.80" },
  { id: 7, time: "12:28:55", agent: "Yield Max", agentColor: "#f59e0b", action: "Compounded yield: +$12.40" },
  { id: 8, time: "12:24:33", agent: "Guard Dog", agentColor: "#10b981", action: "Allocation drift: 2.3% — monitoring" },
  { id: 9, time: "12:20:17", agent: "DCA Alpha", agentColor: "#3b82f6", action: "DCA interval passed — waiting for dip" },
  { id: 10, time: "12:15:02", agent: "Yield Max", agentColor: "#f59e0b", action: "Moved $240 to Orca SOL/USDC pool" },
  { id: 11, time: "12:10:44", agent: "Guard Dog", agentColor: "#10b981", action: "Portfolio value: $10,430" },
  { id: 12, time: "12:07:29", agent: "DCA Alpha", agentColor: "#3b82f6", action: "Slippage check: 0.12% — OK" },
  { id: 13, time: "12:03:11", agent: "Yield Max", agentColor: "#f59e0b", action: "APY scan complete: Orca 34.2%" },
  { id: 14, time: "11:58:56", agent: "Guard Dog", agentColor: "#10b981", action: "Rebalanced SOL/USDC 60/40" },
  { id: 15, time: "11:54:38", agent: "DCA Alpha", agentColor: "#3b82f6", action: "Bought 6.0 SOL at $140.90" },
  { id: 16, time: "11:50:21", agent: "Yield Max", agentColor: "#f59e0b", action: "Auto-compounded: +$8.70" },
  { id: 17, time: "11:46:05", agent: "Guard Dog", agentColor: "#10b981", action: "Take-profit at $155.00 — watching" },
  { id: 18, time: "11:42:49", agent: "DCA Alpha", agentColor: "#3b82f6", action: "Wallet balance verified: 45.2 SOL" },
  { id: 19, time: "11:38:30", agent: "Yield Max", agentColor: "#f59e0b", action: "Pool liquidity checked: $2.4M" },
  { id: 20, time: "11:33:14", agent: "Guard Dog", agentColor: "#10b981", action: "Agent heartbeat — all systems nominal" },
];

const LIVE_TEMPLATES: [string, string, string][] = [
  ["DCA Alpha", "#3b82f6", "Price check: SOL at $142.55"],
  ["Guard Dog", "#10b981", "Portfolio drift check — nominal"],
  ["DCA Alpha", "#3b82f6", "Slippage check: 0.09% — OK"],
  ["Guard Dog", "#10b981", "Stop-loss threshold verified"],
  ["DCA Alpha", "#3b82f6", "Next DCA interval in 42m"],
  ["Guard Dog", "#10b981", "Allocation drift: 1.1% — OK"],
  ["DCA Alpha", "#3b82f6", "Bought 1.2 SOL at $142.40"],
  ["Guard Dog", "#10b981", "Heartbeat — all systems nominal"],
];

/* ── Utilities ────────────────────────────────────── */
function formatRuntime(baseSeconds: number, tick: number, active: boolean): string {
  if (!active) return "Paused";
  const total = baseSeconds + tick;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}h ${m}m ${String(s).padStart(2, "0")}s`;
}

/* ── Sidebar ──────────────────────────────────────── */
function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-screen hidden md:flex flex-col"
      style={{
        width: 240,
        background: "#060606",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        zIndex: 40,
      }}
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.06)]">
        <Link
          href="/"
          className="font-mono font-bold text-white text-sm tracking-tight hover:text-[#8b5cf6] transition-colors"
        >
          ClawReady
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, icon: Icon, href, scrollId, isToast, active }) => {
          const sharedStyle = {
            color: active ? "#8b5cf6" : "#64748b",
            background: active ? "rgba(139,92,246,0.08)" : "transparent",
            borderLeft: `3px solid ${active ? "#8b5cf6" : "transparent"}`,
          };
          const sharedClass =
            "flex items-center gap-3 px-3 py-2.5 text-[14px] transition-colors duration-150 hover:text-white w-full text-left";

          if (isToast) {
            return (
              <button
                key={label}
                onClick={() => toast("Settings coming soon", { icon: "⚙️" })}
                className={sharedClass}
                style={sharedStyle}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </button>
            );
          }
          if (scrollId) {
            return (
              <a
                key={label}
                href={`#${scrollId}`}
                className={sharedClass}
                style={sharedStyle}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{label}</span>
              </a>
            );
          }
          return (
            <Link
              key={label}
              href={href!}
              className={sharedClass}
              style={sharedStyle}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className={active ? "font-medium" : ""}>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Wallet pill */}
      <div className="px-4 py-4 border-t border-[rgba(255,255,255,0.06)]">
        <div
          className="flex items-center gap-2.5 px-3 py-2.5"
          style={{
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] live-dot flex-shrink-0" />
          <span className="font-mono text-[12px] text-[#666] flex-1 truncate">
            7xKp...3mNq
          </span>
          <span
            className="font-mono text-[10px] px-1.5 py-0.5 flex-shrink-0"
            style={{ background: "rgba(245,158,11,0.12)", color: "#f59e0b" }}
          >
            Devnet
          </span>
        </div>
      </div>
    </aside>
  );
}

/* ── Top bar ──────────────────────────────────────── */
function TopBar() {
  return (
    <div
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 border-b border-[rgba(255,255,255,0.06)]"
      style={{
        background: "rgba(2,2,7,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span
        className="text-[20px] font-bold text-white"
        style={{ letterSpacing: "-0.02em" }}
      >
        Overview
      </span>

      <div className="flex items-center gap-3">
        {/* Bell */}
        <button className="relative p-2 text-[#333] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
        </button>

        {/* Deploy */}
        <Link
          href="/deploy"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#8b5cf6] text-white font-semibold text-[13px] hover:bg-[#7c3aed] transition-colors group"
        >
          Deploy New Agent
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/deploy"
          className="sm:hidden flex items-center justify-center w-9 h-9 bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

/* ── Stat card ────────────────────────────────────── */
function StatCard({
  label,
  value,
  sub,
  valueColor,
  dot,
}: {
  label: string;
  value: string;
  sub?: string;
  valueColor?: string;
  dot?: string;
}) {
  return (
    <div
      className="p-5 flex flex-col gap-2 transition-all duration-200 cursor-default"
      style={{
        background: "#0d0d18",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 24px rgba(139,92,246,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      <span className="label-mono">{label}</span>
      <div className="flex items-center gap-2">
        {dot && (
          <span
            className="w-2 h-2 rounded-full live-dot flex-shrink-0"
            style={{ background: dot }}
          />
        )}
        <span
          className="text-[28px] font-black leading-none"
          style={{ color: valueColor ?? "#fff", letterSpacing: "-0.03em" }}
        >
          {value}
        </span>
      </div>
      {sub && <span className="text-[12px] text-[#444]">{sub}</span>}
    </div>
  );
}

/* ── Agent card ───────────────────────────────────── */
function AgentCard({
  agent,
  name,
  status,
  tick,
  onTogglePause,
  onStop,
  onRename,
}: {
  agent: Agent;
  name: string;
  status: AgentStatus;
  tick: number;
  onTogglePause: () => void;
  onStop: () => void;
  onRename: (newName: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = status === "active";
  const runtime = formatRuntime(agent.startedSecondsAgo, tick, isActive);

  function commitName() {
    const trimmed = draftName.trim();
    if (trimmed) onRename(trimmed);
    else setDraftName(name);
    setEditing(false);
  }

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  useEffect(() => {
    setDraftName(name);
  }, [name]);

  return (
    <div
      className="flex flex-col"
      style={{
        background: "#0d0d18",
        border: "1px solid rgba(255,255,255,0.06)",
        borderTop: `3px solid ${agent.strategyColor}`,
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[rgba(255,255,255,0.04)]">
        <div className="flex items-start justify-between gap-2 mb-3">
          {editing ? (
            <input
              ref={inputRef}
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              onBlur={commitName}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitName();
                if (e.key === "Escape") {
                  setDraftName(name);
                  setEditing(false);
                }
              }}
              className="text-[17px] font-bold text-white bg-transparent border-b border-[#8b5cf6] outline-none flex-1 pb-0.5"
              style={{ letterSpacing: "-0.02em" }}
            />
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="text-[17px] font-bold text-white truncate"
                style={{ letterSpacing: "-0.02em" }}
              >
                {name}
              </span>
              <button
                onClick={() => setEditing(true)}
                className="text-[#2a2a2a] hover:text-[#666] transition-colors flex-shrink-0"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <span
            className="font-mono text-[10px] px-2 py-0.5 flex-shrink-0"
            style={{
              color: agent.strategyColor,
              background: `${agent.strategyColor}18`,
              border: `1px solid ${agent.strategyColor}30`,
            }}
          >
            {agent.strategy}
          </span>
        </div>

        {/* Status + runtime */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? "live-dot" : ""}`}
              style={{ background: isActive ? "#10b981" : "#f59e0b" }}
            />
            <span
              className="text-[12px] font-medium"
              style={{ color: isActive ? "#10b981" : "#f59e0b" }}
            >
              {isActive ? "Active" : "Paused"}
            </span>
          </div>
          <span className="text-[#222]">·</span>
          <span className="font-mono text-[12px] text-[#3a3a3a]">{runtime}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-3 flex-1">
        <p className="font-mono text-[11px] text-[#3a3a3a] leading-relaxed">
          {agent.lastAction}
        </p>

        <div className="flex items-baseline gap-2">
          <span
            className="text-[22px] font-black"
            style={{
              color: agent.pnlPositive ? "#10b981" : "#ef4444",
              letterSpacing: "-0.03em",
            }}
          >
            {agent.pnl}
          </span>
          <span
            className="font-mono text-[12px]"
            style={{ color: agent.pnlPositive ? "#10b981" : "#ef4444" }}
          >
            {agent.pnlPct}
          </span>
        </div>
      </div>

      {/* Footer — action buttons */}
      <div className="px-5 py-4 border-t border-[rgba(255,255,255,0.04)] flex items-center gap-2">
        {/* Pause / Resume */}
        <button
          onClick={onTogglePause}
          className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-150 hover:brightness-110"
          style={{
            background: isActive ? "rgba(245,158,11,0.1)" : "rgba(16,185,129,0.1)",
            color: isActive ? "#f59e0b" : "#10b981",
            border: `1px solid ${isActive ? "rgba(245,158,11,0.2)" : "rgba(16,185,129,0.2)"}`,
          }}
        >
          {isActive ? (
            <>
              <Pause className="w-3 h-3" /> Pause
            </>
          ) : (
            <>
              <Play className="w-3 h-3" /> Resume
            </>
          )}
        </button>

        {/* Reconfigure */}
        <Link
          href="/deploy"
          className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium text-[#444] hover:text-white transition-all duration-150 hover:border-[rgba(255,255,255,0.2)]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <SlidersHorizontal className="w-3 h-3" /> Reconfigure
        </Link>

        {/* Stop */}
        <button
          onClick={onStop}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-150 hover:brightness-110"
          style={{
            background: "rgba(239,68,68,0.08)",
            color: "#ef4444",
            border: "1px solid rgba(239,68,68,0.15)",
          }}
        >
          <Square className="w-3 h-3" /> Stop
        </button>
      </div>
    </div>
  );
}

/* ── Stop modal ───────────────────────────────────── */
function StopModal({
  agentName,
  onCancel,
  onConfirm,
}: {
  agentName: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        className="w-full max-w-[400px] p-8 modal-enter"
        style={{
          background: "#0d0d18",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h3
          className="text-[22px] font-bold text-white mb-2"
          style={{ letterSpacing: "-0.02em" }}
        >
          Stop {agentName}?
        </h3>
        <p className="text-[14px] text-[#555] leading-relaxed mb-8">
          This will permanently stop your agent. All positions will remain open
          — you will need to manage them manually. This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-[14px] font-medium text-[#555] hover:text-white transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-[14px] font-bold text-white transition-colors hover:brightness-110"
            style={{ background: "#ef4444" }}
          >
            Confirm Stop
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Live activity feed ───────────────────────────── */
function LiveActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div
      className="flex flex-col"
      style={{
        background: "#0d0d18",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.06)] flex items-center gap-3">
        <h2
          className="text-[16px] font-bold text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Live Activity
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] live-dot" />
          <span className="label-mono text-[#10b981]">LIVE</span>
        </div>
      </div>

      {/* Feed */}
      <div
        className="flex flex-col overflow-y-auto px-6 py-3"
        style={{
          maxHeight: 420,
          scrollbarWidth: "thin",
          scrollbarColor: "#8b5cf6 transparent",
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0"
            style={{ opacity: Math.max(0.28, 1 - i * 0.042) }}
          >
            <span className="font-mono text-[11px] text-[#252525] w-[68px] flex-shrink-0 tabular-nums">
              {item.time}
            </span>
            <span
              className="font-mono text-[10px] px-1.5 py-0.5 flex-shrink-0 whitespace-nowrap"
              style={{
                color: item.agentColor,
                background: `${item.agentColor}15`,
              }}
            >
              {item.agent}
            </span>
            <span className="text-[12px] text-[#555] flex-1 truncate">
              {item.action}
            </span>
            <Check className="w-3 h-3 text-[#10b981] flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Performance chart ────────────────────────────── */
function PerformanceChart() {
  const MAX_ABS = Math.max(...CHART_DATA.map((d) => Math.abs(d.value)));
  const CHART_H = 160;
  const GRID_FRACS = [0.25, 0.5, 0.75];
  const DAY_LABEL_H = 24;

  return (
    <div
      className="flex flex-col"
      style={{
        background: "#0d0d18",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="px-6 py-5 border-b border-[rgba(255,255,255,0.06)]">
        <h2
          className="text-[16px] font-bold text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          Portfolio Performance{" "}
          <span className="font-normal text-[#2a2a2a] text-[14px]">(7 days)</span>
        </h2>
      </div>

      <div className="pl-6 pr-12 pt-5 pb-6">
        {/* Chart */}
        <div
          className="flex gap-2 relative"
          style={{ height: CHART_H + DAY_LABEL_H + 20, overflow: "visible" }}
        >
          {/* Grid lines (absolute, within bar area) */}
          {GRID_FRACS.map((frac) => (
            <div
              key={frac}
              className="absolute left-0 right-0 pointer-events-none"
              style={{
                bottom: DAY_LABEL_H + frac * CHART_H,
                borderTop: "1px dashed rgba(255,255,255,0.05)",
              }}
            />
          ))}

          {CHART_DATA.map(({ day, value }, i) => {
            const isPositive = value >= 0;
            const barH = Math.round((Math.abs(value) / MAX_ABS) * CHART_H);

            return (
              <div
                key={day}
                className="flex-1 flex flex-col items-center"
                style={{ gap: 0 }}
              >
                {/* Dollar label */}
                <span
                  className="font-mono text-[10px] mb-2"
                  style={{
                    color: isPositive ? "#8b5cf6" : "#ef4444",
                    height: 16,
                    lineHeight: "16px",
                  }}
                >
                  {isPositive ? "+" : "-"}${Math.abs(value)}
                </span>

                {/* Bar area */}
                <div
                  className="w-full flex items-end"
                  style={{ height: CHART_H }}
                >
                  <div
                    className="bar-grow w-full"
                    style={{
                      height: barH,
                      background: isPositive ? "#8b5cf6" : "#ef4444",
                      animationDelay: `${i * 0.1}s`,
                      opacity: isPositive ? 1 : 0.9,
                    }}
                  />
                </div>

                {/* Day label */}
                <span
                  className="label-mono mt-2"
                  style={{ height: DAY_LABEL_H, lineHeight: `${DAY_LABEL_H}px` }}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#8b5cf6]" />
            <span className="label-mono">Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-[#ef4444]" />
            <span className="label-mono">Negative</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile bottom nav ────────────────────────────── */
function MobileBottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 flex"
      style={{
        background: "#060606",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {NAV_ITEMS.map(({ label, icon: Icon, href, scrollId, isToast, active }) => {
        const sharedClass = "flex-1 flex flex-col items-center gap-1 py-3 transition-colors";
        const sharedStyle = { color: active ? "#8b5cf6" : "#333" };

        if (isToast) {
          return (
            <button
              key={label}
              onClick={() => toast("Settings coming soon", { icon: "⚙️" })}
              className={sharedClass}
              style={sharedStyle}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-mono">{label}</span>
            </button>
          );
        }
        if (scrollId) {
          return (
            <a
              key={label}
              href={`#${scrollId}`}
              className={sharedClass}
              style={sharedStyle}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-mono">{label}</span>
            </a>
          );
        }
        return (
          <Link
            key={label}
            href={href!}
            className={sharedClass}
            style={sharedStyle}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-mono">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function DashboardPage() {
  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>(
    () => Object.fromEntries(AGENTS.map((a) => [a.id, a.initialStatus]))
  );
  const [agentNames, setAgentNames] = useState<Record<string, string>>(
    () => Object.fromEntries(AGENTS.map((a) => [a.id, a.defaultName]))
  );
  const [tick, setTick] = useState(0);
  const [stopModal, setStopModal] = useState<{
    open: boolean;
    agentId: string | null;
  }>({ open: false, agentId: null });
  const [activity, setActivity] = useState<ActivityItem[]>(INITIAL_ACTIVITY);
  const templateIdxRef = useRef(0);

  // Runtime ticker — 1s
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // Live activity — new item every 8s
  useEffect(() => {
    const id = setInterval(() => {
      const [agent, color, action] =
        LIVE_TEMPLATES[templateIdxRef.current % LIVE_TEMPLATES.length];
      templateIdxRef.current++;
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setActivity((prev) =>
        [{ id: Date.now(), time, agent, agentColor: color, action }, ...prev].slice(
          0,
          50
        )
      );
    }, 8000);
    return () => clearInterval(id);
  }, []);

  // Handlers
  function togglePause(agentId: string) {
    setAgentStatuses((prev) => ({
      ...prev,
      [agentId]: prev[agentId] === "active" ? "paused" : "active",
    }));
  }

  function confirmStop() {
    if (stopModal.agentId) {
      setAgentStatuses((prev) => ({
        ...prev,
        [stopModal.agentId!]: "stopped",
      }));
    }
    setStopModal({ open: false, agentId: null });
  }

  // Computed
  const visibleAgents = AGENTS.filter((a) => agentStatuses[a.id] !== "stopped");
  const activeCount = visibleAgents.filter(
    (a) => agentStatuses[a.id] === "active"
  ).length;
  const stoppingAgent = AGENTS.find((a) => a.id === stopModal.agentId);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col ml-0 md:ml-[240px] min-h-screen pb-16 md:pb-0">
        <TopBar />

        <div className="flex-1 px-4 md:px-8 py-6 flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              label="Active Agents"
              value={String(visibleAgents.length)}
              sub={`${activeCount} running`}
              dot="#10b981"
            />
            <StatCard
              label="Total P&L"
              value="+$1,247.50"
              sub="+12.4% this month"
              valueColor="#10b981"
            />
            <StatCard label="Value Managed" value="$10,430" sub="across 3 agents" />
            <StatCard label="Transactions Today" value="47" sub="last 24 hours" />
          </div>

          {/* Agents */}
          <div id="section-agents">
            <h2
              className="text-[16px] font-bold text-white mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              My Agents ({visibleAgents.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {visibleAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  name={agentNames[agent.id]}
                  status={agentStatuses[agent.id]}
                  tick={tick}
                  onTogglePause={() => togglePause(agent.id)}
                  onStop={() => setStopModal({ open: true, agentId: agent.id })}
                  onRename={(newName) =>
                    setAgentNames((prev) => ({ ...prev, [agent.id]: newName }))
                  }
                />
              ))}

              {visibleAgents.length === 0 && (
                <div
                  className="col-span-full py-16 flex flex-col items-center gap-4 border border-dashed border-[rgba(255,255,255,0.06)]"
                  style={{ background: "#0d0d18" }}
                >
                  <Bot className="w-8 h-8 text-[#1a1a1a]" />
                  <p className="text-[14px] text-[#333]">No active agents</p>
                  <Link
                    href="/deploy"
                    className="flex items-center gap-2 px-4 py-2 bg-[#8b5cf6] text-white text-[13px] font-semibold hover:bg-[#7c3aed] transition-colors"
                  >
                    Deploy an Agent
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Activity feed + chart */}
          <div id="section-activity" className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <LiveActivityFeed items={activity} />
            <PerformanceChart />
          </div>
        </div>
      </main>

      <MobileBottomNav />

      {/* Stop modal */}
      {stopModal.open && stoppingAgent && (
        <StopModal
          agentName={agentNames[stoppingAgent.id]}
          onCancel={() => setStopModal({ open: false, agentId: null })}
          onConfirm={confirmStop}
        />
      )}
    </div>
  );
}
