"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Strategies", href: "/strategies" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 60,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="h-full flex items-center justify-between px-8 max-w-[1400px] mx-auto">
        {/* Logo — monospace, left-aligned */}
        <Link
          href="/"
          className="font-mono font-bold text-white text-sm tracking-tight hover:text-[#8b5cf6] transition-colors"
        >
          ClawReady
        </Link>

        {/* Desktop: links + CTA */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-[#555] hover:text-white transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#deploy"
            className="px-4 py-2 text-sm text-white border border-[rgba(255,255,255,0.12)] rounded-[4px] hover:border-[#8b5cf6] hover:text-[#8b5cf6] active:scale-95 transition-all duration-150"
          >
            Start Deploying
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#555] hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Animated purple bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] nav-line"
        style={{ background: "rgba(139,92,246,0.8)" }}
      />

      {/* Mobile drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black border-b border-[rgba(255,255,255,0.06)] overflow-hidden transition-all duration-200 ${
          open ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 py-5 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-[#555] hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="#deploy"
            className="w-fit px-4 py-2 text-sm text-white border border-[rgba(255,255,255,0.12)] rounded-[4px]"
            onClick={() => setOpen(false)}
          >
            Start Deploying
          </Link>
        </div>
      </div>
    </nav>
  );
}
