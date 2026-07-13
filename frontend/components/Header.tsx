"use client";

import { Search, Bell, Sun, Moon, Plus, Menu, Command } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <header
      className="h-[68px] border-b border-border flex justify-between items-center px-4 md:px-7 relative z-20 shrink-0"
      role="banner"
    >
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          className="md:hidden p-2 text-text-secondary hover:text-white bg-surface hover:bg-surface-secondary rounded-xl transition"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-mobile-nav"))}
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block flex-1 max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            size={16}
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search patients, reports, models…"
            aria-label="Search patients and reports"
            className="glass-input w-full pl-10 pr-16 py-2.5 text-sm"
          />
          <kbd className="hidden lg:flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted border border-border rounded-md px-1.5 py-0.5">
            <Command size={10} /> K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Theme toggle */}
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="p-2.5 text-text-secondary hover:text-white bg-surface hover:bg-surface-secondary rounded-xl transition relative group"
          aria-label={`Toggle theme (currently ${theme})`}
        >
          {theme === "dark" ? (
            <Moon size={18} aria-hidden="true" />
          ) : (
            <Sun size={18} aria-hidden="true" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="p-2.5 text-text-secondary hover:text-white bg-surface hover:bg-surface-secondary rounded-xl transition relative"
          aria-label="Notifications — 3 new"
        >
          <Bell size={18} aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-surface shadow-[0_0_8px_var(--danger)]" aria-hidden="true" />
        </button>

        {/* Quick action */}
        <Link
          href="/predict"
          className="btn-primary flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold transition hidden sm:flex"
          aria-label="New prediction — analyze a patient"
        >
          <Plus size={16} aria-hidden="true" />
          <span>Analyze Patient</span>
        </Link>

        {/* Profile avatar */}
        <button
          className="w-10 h-10 rounded-xl bg-grad-purple flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-105 transition ml-1"
          aria-label="User profile — Sourav"
        >
          S
        </button>
      </div>
    </header>
  );
}
