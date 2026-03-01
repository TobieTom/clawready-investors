"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  TrendingDown,
  Shield,
  TrendingUp,
  Target,
  Check,
  ArrowRight,
  ArrowLeft,
  Copy,
  CheckCheck,
} from "lucide-react";

/* ── Types ────────────────────────────────────────── */
type WalletId = "phantom" | "solflare";
type StrategyId = "dca" | "guard" | "hunter" | "sniper";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "pills";
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  helper?: string;
  options?: string[];
}

interface StrategyDef {
  id: StrategyId;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  risk: string;
  color: string;
  desc: string;
  metric: string;
  fields: FieldDef[];
}

/* ── Data ─────────────────────────────────────────── */
const WALLETS = [
  {
    id: "phantom" as WalletId,
    name: "Phantom",
    initial: "P",
    color: "#8b5cf6",
    popular: true,
  },
  {
    id: "solflare" as WalletId,
    name: "Solflare",
    initial: "S",
    color: "#f59e0b",
    popular: false,
  },
];

const STRATEGIES: StrategyDef[] = [
  {
    id: "dca",
    name: "DCA Bot",
    icon: TrendingDown,
    risk: "Low Risk",
    color: "#3b82f6",
    desc: "Automatically buy on dips. Average your entry price over time.",
    metric: "Avg +12.4% vs manual",
    fields: [
      {
        key: "token",
        label: "Token to Buy",
        type: "text",
        placeholder: "Token address or symbol e.g. SOL",
        helper: "Enter a Solana token address or common symbol",
      },
      {
        key: "buyAmount",
        label: "Buy Amount (USDC)",
        type: "number",
        placeholder: "100",
        prefix: "$",
        helper: "Amount to spend per interval",
      },
      {
        key: "frequency",
        label: "Frequency",
        type: "select",
        options: ["Hourly", "Daily", "Weekly"],
        helper: "How often the agent will execute a buy",
      },
      {
        key: "maxTotal",
        label: "Max Total Investment (USDC)",
        type: "number",
        placeholder: "1000",
        prefix: "$",
        helper: "Agent stops after spending this total amount",
      },
      {
        key: "stopLoss",
        label: "Stop-Loss",
        type: "number",
        placeholder: "10",
        suffix: "%",
        helper: "Automatically stop if position drops this much",
      },
    ],
  },
  {
    id: "guard",
    name: "Portfolio Guard",
    icon: Shield,
    risk: "Medium Risk",
    color: "#10b981",
    desc: "Set stop-loss and take-profit thresholds. Protect your gains 24/7.",
    metric: "Protects against drawdown",
    fields: [
      {
        key: "wallet",
        label: "Wallet to Monitor",
        type: "text",
        placeholder: "7xKp...3mNq",
        helper: "Defaults to your connected wallet",
      },
      {
        key: "rebalanceThreshold",
        label: "Rebalance Threshold",
        type: "number",
        placeholder: "5",
        suffix: "%",
        helper: "Trigger rebalance when allocation drifts by this %",
      },
      {
        key: "maxSlippage",
        label: "Max Slippage",
        type: "number",
        placeholder: "1",
        suffix: "%",
        helper: "Maximum acceptable slippage for swaps",
      },
    ],
  },
  {
    id: "hunter",
    name: "Yield Hunter",
    icon: TrendingUp,
    risk: "Medium Risk",
    color: "#f59e0b",
    desc: "Scan liquidity pools for highest APY. Auto-compound daily.",
    metric: "Up to 34.2% APY",
    fields: [
      {
        key: "minApy",
        label: "Min APY Threshold",
        type: "number",
        placeholder: "20",
        suffix: "%",
        helper: "Only enter pools with APY above this threshold",
      },
      {
        key: "maxPosition",
        label: "Max Position Size (USDC)",
        type: "number",
        placeholder: "500",
        prefix: "$",
        helper: "Maximum capital to deploy in a single pool",
      },
      {
        key: "protocols",
        label: "Protocols",
        type: "pills",
        options: ["Raydium", "Orca", "Marinade"],
        helper: "Select the protocols the agent can use",
      },
    ],
  },
  {
    id: "sniper",
    name: "Token Sniper",
    icon: Target,
    risk: "High Risk",
    color: "#ef4444",
    desc: "Detect new token launches and execute buys in milliseconds.",
    metric: "Executes in <200ms",
    fields: [
      {
        key: "targetTokens",
        label: "Target Tokens",
        type: "text",
        placeholder: "SOL, BONK, JUP",
        helper: "Comma-separated token symbols or addresses to monitor",
      },
      {
        key: "maxBuy",
        label: "Max Buy Amount (USDC)",
        type: "number",
        placeholder: "50",
        prefix: "$",
        helper: "Maximum to spend on any single snipe",
      },
      {
        key: "takeProfit",
        label: "Take Profit",
        type: "number",
        placeholder: "50",
        suffix: "%",
        helper: "Automatically sell when position gains this much",
      },
      {
        key: "stopLoss",
        label: "Stop Loss",
        type: "number",
        placeholder: "20",
        suffix: "%",
        helper: "Automatically sell if position drops this much",
      },
    ],
  },
];

const STEP_LABELS = ["Connect Wallet", "Choose Strategy", "Configure & Deploy"];
const INSTANCE_ID = "instance_7xKp3mNq";
const TX_SIG =
  "5KkXP9mNqR3bVwLzTjY8dCfGhP2qRnM7sEaWvBpXtJcFuDs4KmQR";
const MOCK_ADDRESS = "7xKp...3mNq";

/* ── Step indicator ───────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-start w-full px-8 py-6 border-b border-[rgba(255,255,255,0.06)]">
      {STEP_LABELS.map((label, idx) => {
        const step = idx + 1;
        const completed = step < current;
        const active = step === current;
        const isLast = idx === STEP_LABELS.length - 1;

        return (
          <div
            key={step}
            className={`flex items-center ${isLast ? "flex-shrink-0" : "flex-1"}`}
          >
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  completed || active
                    ? "bg-[#8b5cf6]"
                    : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)]"
                } ${active ? "step-pulse" : ""}`}
              >
                {completed ? (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                ) : (
                  <span
                    className={`text-[13px] font-bold leading-none ${
                      active ? "text-white" : "text-[#333]"
                    }`}
                  >
                    {step}
                  </span>
                )}
              </div>
              <span
                className={`hidden md:block text-[11px] font-mono whitespace-nowrap transition-colors duration-300 ${
                  active
                    ? "text-white"
                    : completed
                      ? "text-[#8b5cf6]"
                      : "text-[#333]"
                }`}
              >
                {label}
              </span>
            </div>

            {/* Connector line — aligned to circle center (mt-4 = 16px = half of 32px circle) */}
            {!isLast && (
              <div className="flex-1 h-[1px] mx-3 mt-4 md:mt-4 relative bg-[rgba(255,255,255,0.06)]">
                <div
                  className="absolute inset-y-0 left-0 bg-[#8b5cf6] transition-[width] duration-500 ease-in-out"
                  style={{ width: completed ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Step 1 — Connect Wallet ──────────────────────── */
function Step1({
  selectedWallet,
  onSelectWallet,
  onContinue,
}: {
  selectedWallet: WalletId | null;
  onSelectWallet: (id: WalletId) => void;
  onContinue: () => void;
}) {
  return (
    <div className="p-8">
      <h2
        className="text-[32px] font-extrabold text-white mb-2"
        style={{ letterSpacing: "-0.03em" }}
      >
        Connect your wallet
      </h2>
      <p className="text-[14px] text-[#555] mb-6 leading-relaxed">
        Your keys never leave your browser. ClawReady is fully non-custodial.
      </p>

      {/* Security notice */}
      <div
        className="flex items-start gap-3 px-4 py-3.5 mb-8"
        style={{
          background: "rgba(16,185,129,0.06)",
          borderLeft: "3px solid #10b981",
        }}
      >
        <Shield
          className="w-4 h-4 text-[#10b981] flex-shrink-0 mt-0.5"
        />
        <p className="text-[13px] text-[#555] leading-relaxed">
          This app{" "}
          <span className="text-[#10b981] font-semibold">never requests</span>{" "}
          your seed phrase or private keys.
        </p>
      </div>

      {/* Wallet options */}
      <div className="flex flex-col gap-3 mb-8">
        {WALLETS.map((wallet) => {
          const selected = selectedWallet === wallet.id;
          return (
            <button
              key={wallet.id}
              onClick={() => onSelectWallet(wallet.id)}
              className="w-full flex items-center gap-4 px-4 py-4 text-left transition-all duration-150"
              style={{
                background: selected ? `${wallet.color}0d` : "#060606",
                border: `1px solid ${selected ? wallet.color : "rgba(255,255,255,0.08)"}`,
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[15px] flex-shrink-0"
                style={{
                  background: `${wallet.color}22`,
                  color: wallet.color,
                }}
              >
                {wallet.initial}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-semibold text-white">
                    {wallet.name}
                  </span>
                  {wallet.popular && (
                    <span
                      className="font-mono text-[10px] px-2 py-0.5"
                      style={{
                        background: "rgba(139,92,246,0.15)",
                        color: "#8b5cf6",
                      }}
                    >
                      Most Popular
                    </span>
                  )}
                </div>
                {selected && (
                  <span className="flex items-center gap-1.5 text-[12px] text-[#10b981] mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] live-dot flex-shrink-0" />
                    Connected · {MOCK_ADDRESS}
                  </span>
                )}
              </div>

              {selected && (
                <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <ContinueButton disabled={!selectedWallet} onClick={onContinue} />
    </div>
  );
}

/* ── Step 2 — Choose Strategy ─────────────────────── */
function Step2({
  selectedStrategy,
  onSelectStrategy,
  onContinue,
  onBack,
}: {
  selectedStrategy: StrategyId | null;
  onSelectStrategy: (id: StrategyId) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div className="p-8">
      <BackButton onClick={onBack} />

      <h2
        className="text-[32px] font-extrabold text-white mb-2"
        style={{ letterSpacing: "-0.03em" }}
      >
        Pick your strategy
      </h2>
      <p className="text-[14px] text-[#555] mb-8 leading-relaxed">
        Each strategy is a pre-configured OpenClaw agent. You can adjust
        parameters in the next step.
      </p>

      {/* 2×2 strategy grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {STRATEGIES.map((strategy) => {
          const selected = selectedStrategy === strategy.id;
          const Icon = strategy.icon;
          return (
            <button
              key={strategy.id}
              onClick={() => onSelectStrategy(strategy.id)}
              className="relative flex flex-col p-5 text-left transition-all duration-150"
              style={{
                background: selected ? `${strategy.color}0f` : "#060606",
                border: `1px solid ${selected ? strategy.color : "rgba(255,255,255,0.08)"}`,
                borderTop: selected
                  ? `3px solid ${strategy.color}`
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Checkmark badge */}
              {selected && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: strategy.color }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}

              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-8 h-8 flex items-center justify-center border flex-shrink-0"
                  style={{
                    background: `${strategy.color}18`,
                    borderColor: `${strategy.color}30`,
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: strategy.color }} />
                </div>
                <span
                  className="font-mono text-[10px] px-2 py-0.5"
                  style={{
                    color: strategy.color,
                    border: `1px solid ${strategy.color}30`,
                  }}
                >
                  {strategy.risk}
                </span>
              </div>

              <h3
                className="text-[16px] font-bold text-white mb-1.5"
                style={{ letterSpacing: "-0.02em" }}
              >
                {strategy.name}
              </h3>
              <p className="text-[12px] text-[#444] leading-relaxed mb-4 flex-1">
                {strategy.desc}
              </p>
              <p
                className="font-mono text-[11px]"
                style={{ color: strategy.color }}
              >
                {strategy.metric}
              </p>
            </button>
          );
        })}
      </div>

      <ContinueButton disabled={!selectedStrategy} onClick={onContinue} />
    </div>
  );
}

/* ── Form field ───────────────────────────────────── */
function FormField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  const baseInputStyle: React.CSSProperties = {
    background: "#060606",
    border: `1px solid ${focused ? "#8b5cf6" : "rgba(255,255,255,0.1)"}`,
    color: "#fff",
    outline: "none",
    width: "100%",
    fontSize: "14px",
    transition: "border-color 0.15s ease",
  };

  if (field.type === "select") {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#888]">
          {field.label}
        </label>
        <select
          value={value || field.options![0]}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...baseInputStyle,
            padding: "10px 36px 10px 12px",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            cursor: "pointer",
          }}
        >
          {field.options!.map((opt) => (
            <option
              key={opt}
              value={opt}
              style={{ background: "#0d0d18", color: "#fff" }}
            >
              {opt}
            </option>
          ))}
        </select>
        {field.helper && (
          <p className="text-[11px] text-[#2a2a2a] font-mono">{field.helper}</p>
        )}
      </div>
    );
  }

  if (field.type === "pills") {
    const selected = value ? value.split(",").filter(Boolean) : [];
    const toggle = (opt: string) => {
      const next = selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt];
      onChange(next.join(","));
    };
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-[#888]">
          {field.label}
        </label>
        <div className="flex gap-2 flex-wrap">
          {field.options!.map((opt) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => toggle(opt)}
                className="flex items-center gap-1 px-3 py-1.5 font-mono text-[12px] transition-all duration-150"
                style={{
                  background: active ? "rgba(139,92,246,0.15)" : "#060606",
                  border: `1px solid ${active ? "#8b5cf6" : "rgba(255,255,255,0.1)"}`,
                  color: active ? "#8b5cf6" : "#555",
                }}
              >
                {active && (
                  <Check className="w-3 h-3 flex-shrink-0" strokeWidth={3} />
                )}
                {opt}
              </button>
            );
          })}
        </div>
        {field.helper && (
          <p className="text-[11px] text-[#2a2a2a] font-mono">{field.helper}</p>
        )}
      </div>
    );
  }

  // text or number
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#888]">
        {field.label}
      </label>
      <div className="relative">
        {field.prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] text-[14px] pointer-events-none select-none">
            {field.prefix}
          </span>
        )}
        <input
          type={field.type}
          placeholder={field.placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...baseInputStyle,
            padding: field.prefix
              ? "10px 12px 10px 28px"
              : field.suffix
                ? "10px 32px 10px 12px"
                : "10px 12px",
          }}
        />
        {field.suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444] text-[14px] pointer-events-none select-none">
            {field.suffix}
          </span>
        )}
      </div>
      {field.helper && (
        <p className="text-[11px] text-[#2a2a2a] font-mono">{field.helper}</p>
      )}
    </div>
  );
}

/* ── Config preview ───────────────────────────────── */
function ConfigPreview({
  strategy,
  formData,
}: {
  strategy: StrategyDef;
  formData: Record<string, string>;
}) {
  const pairs = strategy.fields.map((f) => ({
    key: f.label.toLowerCase().replace(/ /g, "_"),
    value:
      formData[f.key] ||
      (f.type === "select" ? f.options![0] : "—"),
  }));

  return (
    <div
      className="mt-6 p-5"
      style={{
        background: "#060606",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <p className="label-mono mb-4">Agent Configuration Preview</p>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[12px] text-[#333]">strategy</span>
          <span
            className="font-mono text-[12px] px-2 py-0.5"
            style={{
              color: strategy.color,
              background: `${strategy.color}15`,
            }}
          >
            {strategy.name}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[12px] text-[#333]">network</span>
          <span className="font-mono text-[12px] text-[#8b5cf6]">
            solana-devnet
          </span>
        </div>
        {pairs.map(({ key, value }) => (
          <div key={key} className="flex items-center justify-between gap-4">
            <span className="font-mono text-[12px] text-[#333] truncate">
              {key}
            </span>
            <span className="font-mono text-[12px] text-[#666] truncate max-w-[200px] text-right">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 3 — Configure & Deploy ─────────────────── */
function Step3({
  strategy,
  formData,
  onFormChange,
  onDeploy,
  isDeploying,
  onBack,
}: {
  strategy: StrategyDef;
  formData: Record<string, string>;
  onFormChange: (key: string, val: string) => void;
  onDeploy: () => void;
  isDeploying: boolean;
  onBack: () => void;
}) {
  return (
    <div className="p-8">
      <BackButton onClick={onBack} />

      <h2
        className="text-[32px] font-extrabold text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Configure your agent
      </h2>
      <span
        className="inline-block font-mono text-[11px] px-2.5 py-1 mb-4"
        style={{
          background: `${strategy.color}18`,
          color: strategy.color,
          border: `1px solid ${strategy.color}30`,
        }}
      >
        {strategy.name}
      </span>
      <p className="text-[14px] text-[#555] mb-8 leading-relaxed">
        Fine-tune the parameters for your agent before deploying to Solana
        Devnet.
      </p>

      {/* Fields */}
      <div className="flex flex-col gap-5">
        {strategy.fields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={formData[field.key] || ""}
            onChange={(val) => onFormChange(field.key, val)}
          />
        ))}
      </div>

      {/* Config preview */}
      <ConfigPreview strategy={strategy} formData={formData} />

      {/* Deploy button */}
      <button
        onClick={onDeploy}
        disabled={isDeploying}
        className="mt-6 w-full flex items-center justify-center gap-2.5 font-bold text-[15px] text-white transition-all duration-150"
        style={{
          height: 56,
          background: "#8b5cf6",
          cursor: isDeploying ? "not-allowed" : "pointer",
          opacity: isDeploying ? 0.85 : 1,
        }}
      >
        {isDeploying ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" className="opacity-20" />
              <path d="M12 2 A10 10 0 0 1 22 12" className="opacity-80" />
            </svg>
            Deploying to Solana Devnet...
          </>
        ) : (
          <>
            Deploy Agent
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}

/* ── Confetti ─────────────────────────────────────── */
const CONFETTI_COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
];

function Confetti() {
  const pieces = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    left: `${4 + (i * 2.9) % 92}%`,
    delay: `${(i * 0.09) % 1.1}s`,
    duration: `${1.3 + (i % 5) * 0.25}s`,
    size: i % 3 === 0 ? 8 : i % 3 === 1 ? 6 : 5,
    borderRadius: i % 2 === 0 ? "50%" : "1px",
    rotate: `${(i * 53) % 360}deg`,
  }));

  return (
    <div
      className="absolute inset-x-0 top-0 overflow-hidden pointer-events-none"
      style={{ height: 200 }}
      aria-hidden
    >
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.left,
            top: -12,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.borderRadius,
            transform: `rotate(${p.rotate})`,
            animation: `confettiFall ${p.duration} ${p.delay} ease-in both`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Success state ────────────────────────────────── */
function SuccessState({
  strategy,
  onReset,
}: {
  strategy: StrategyDef;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative p-8 text-center overflow-hidden">
      <Confetti />

      {/* Animated checkmark */}
      <div className="flex justify-center mb-6 relative z-10">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#10b981"
            strokeWidth="3"
            className="checkmark-circle"
          />
          <polyline
            points="24,40 35,51 56,29"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark-check"
          />
        </svg>
      </div>

      <h2
        className="text-[40px] font-black text-white mb-2 relative z-10"
        style={{ letterSpacing: "-0.03em" }}
      >
        Agent Deployed!
      </h2>
      <p className="text-[15px] text-[#555] mb-8 relative z-10">
        Your OpenClaw agent is now live on Solana Devnet
      </p>

      {/* Instance ID */}
      <div className="flex justify-center mb-4 relative z-10">
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2.5"
          style={{
            background: "#060606",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#10b981] live-dot flex-shrink-0"
            aria-hidden
          />
          <span className="font-mono text-[13px] text-[#8b5cf6]">
            {INSTANCE_ID}
          </span>
        </div>
      </div>

      {/* Transaction signature */}
      <div className="relative z-10 mb-8">
        <p className="label-mono mb-2 text-center">Transaction Signature</p>
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            background: "#060606",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="font-mono text-[12px] text-[#444] flex-1 truncate text-left">
            {TX_SIG}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-[12px] transition-colors flex-shrink-0"
            style={{ color: copied ? "#10b981" : "#555" }}
          >
            {copied ? (
              <CheckCheck className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 relative z-10">
        <Link
          href="/dashboard"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 font-bold text-[15px] bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition-colors group"
        >
          View Dashboard
          <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
        <button
          onClick={onReset}
          className="flex-1 py-3.5 font-bold text-[15px] text-[#555] hover:text-white transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Deploy Another
        </button>
      </div>
    </div>
  );
}

/* ── Shared sub-components ────────────────────────── */
function ContinueButton({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center justify-center gap-2 py-3.5 font-bold text-[15px] transition-all duration-150 group"
      style={{
        background: disabled ? "#0d0d18" : "#8b5cf6",
        color: disabled ? "#333" : "#fff",
        border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : "#8b5cf6"}`,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      Continue
      <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-[13px] text-[#444] hover:text-white transition-colors mb-6"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Back
    </button>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function DeployPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedWallet, setSelectedWallet] = useState<WalletId | null>(null);
  const [selectedStrategyId, setSelectedStrategyId] =
    useState<StrategyId | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);

  const selectedStrategy =
    STRATEGIES.find((s) => s.id === selectedStrategyId) ?? null;

  const handleFormChange = (key: string, val: string) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setIsDeployed(true);
    }, 3000);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedWallet(null);
    setSelectedStrategyId(null);
    setFormData({});
    setIsDeploying(false);
    setIsDeployed(false);
  };

  // Pre-fill connected wallet for Portfolio Guard
  const enrichedFormData =
    selectedStrategyId === "guard" && !formData.wallet
      ? { ...formData, wallet: MOCK_ADDRESS }
      : formData;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[60px] flex items-start justify-center px-4 pb-20">
        <div className="w-full max-w-[680px] mt-16">
          {/* Wizard card */}
          <div
            style={{
              background: "#0d0d18",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 0 80px rgba(139,92,246,0.08)",
            }}
          >
            {/* Step indicator — hidden on success */}
            {!isDeployed && <StepIndicator current={step} />}

            {/* Step content */}
            {isDeployed && selectedStrategy ? (
              <SuccessState
                strategy={selectedStrategy}
                onReset={handleReset}
              />
            ) : step === 1 ? (
              <Step1
                selectedWallet={selectedWallet}
                onSelectWallet={setSelectedWallet}
                onContinue={() => setStep(2)}
              />
            ) : step === 2 ? (
              <Step2
                selectedStrategy={selectedStrategyId}
                onSelectStrategy={setSelectedStrategyId}
                onContinue={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            ) : selectedStrategy ? (
              <Step3
                strategy={selectedStrategy}
                formData={enrichedFormData}
                onFormChange={handleFormChange}
                onDeploy={handleDeploy}
                isDeploying={isDeploying}
                onBack={() => setStep(2)}
              />
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
