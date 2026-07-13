"use client";

import { Search, Bell, Sun, Moon, Plus, Menu, Command, User, Settings as SettingsIcon, LogOut } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header
      className="h-[72px] border-b border-border bg-surface/40 backdrop-blur-2xl flex justify-between items-center px-4 md:px-7 relative z-40 shrink-0"
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
        <div className="relative">
          <button
            onClick={() => {
              setNotificationsOpen(!notificationsOpen);
              setProfileOpen(false);
            }}
            className="p-2.5 text-text-secondary hover:text-white bg-surface hover:bg-surface-secondary rounded-xl transition relative"
            aria-label="Notifications — 3 new"
          >
            <Bell size={18} aria-hidden="true" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border border-surface shadow-[0_0_8px_var(--danger)]" aria-hidden="true" />
          </button>
          
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-80 glass-panel p-4 shadow-2xl z-50 origin-top-right"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-white">Notifications</h3>
                  <span className="text-[10px] uppercase text-primary font-bold">Mark all read</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-surface-secondary/50 rounded-xl border border-border">
                    <p className="text-sm text-white"><strong>Heart AI</strong> flagged a high-risk patient.</p>
                    <p className="text-xs text-text-muted mt-1">2 mins ago</p>
                  </div>
                  <div className="p-3 bg-surface-secondary/50 rounded-xl border border-border">
                    <p className="text-sm text-white">Simulation batch complete.</p>
                    <p className="text-xs text-text-muted mt-1">1 hour ago</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick action */}
        <Link
          href="/predict"
          className="btn-primary flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition hidden sm:flex"
          aria-label="New prediction — analyze a patient"
        >
          <Plus size={16} aria-hidden="true" />
          <span>Analyze Patient</span>
        </Link>

        {/* Profile avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationsOpen(false);
            }}
            className="w-10 h-10 rounded-xl bg-grad-purple flex items-center justify-center text-white text-sm font-bold shadow-lg hover:scale-105 transition ml-1"
            aria-label="User profile"
          >
            S
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 glass-panel p-2 shadow-2xl z-50 origin-top-right flex flex-col gap-1"
              >
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="text-sm font-semibold text-white">Sourav</p>
                  <p className="text-xs text-text-muted">admin@healthrisk.ai</p>
                </div>
                <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-text-secondary hover:text-white transition">
                  <User size={16} /> Profile
                </Link>
                <Link href="#" className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-text-secondary hover:text-white transition">
                  <SettingsIcon size={16} /> Settings
                </Link>
                <div className="h-px bg-border my-1" />
                <button className="flex items-center gap-2 px-3 py-2 hover:bg-danger/10 hover:text-danger rounded-lg text-sm text-text-secondary transition w-full text-left">
                  <LogOut size={16} /> Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
