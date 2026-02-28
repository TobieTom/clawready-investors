"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Strategies", href: "/strategies" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/[0.07] shadow-2xl shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0">
            {/* Rotating outer ring */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(6,182,212,0.3))",
                animation: "rotate-slow 6s linear infinite",
              }}
            />
            {/* Inner hexagon */}
            <div
              className="relative z-10 w-8 h-8 flex items-center justify-center"
              style={{
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              }}
            >
              <span className="text-white text-[10px] font-black tracking-tighter">
                CR
              </span>
            </div>
          </div>
          <span className="text-white font-bold text-base tracking-tight group-hover:text-purple-200 transition-colors">
            ClawReady
          </span>
        </Link>

        {/* ── Center nav ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="relative text-sm text-slate-400 hover:text-white transition-colors duration-200 group py-1"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* ── Right actions ── */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 text-sm text-purple-300 border border-purple-500/40 rounded-full hover:border-purple-400/70 hover:text-purple-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)] active:scale-95 transition-all duration-200">
            Connect Wallet
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-white font-medium bg-purple-600 rounded-full hover:bg-purple-500 hover:shadow-[0_0_24px_rgba(124,58,237,0.5)] active:scale-95 transition-all duration-200">
            <Zap className="w-3.5 h-3.5" />
            Launch Agent
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden glass border-t border-white/[0.06] overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.06]">
            <button className="w-full px-4 py-2.5 text-sm text-purple-300 border border-purple-500/40 rounded-full">
              Connect Wallet
            </button>
            <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm text-white font-medium bg-purple-600 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              Launch Agent
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
