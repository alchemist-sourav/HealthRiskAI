"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HeartPulse,
  BarChart3,
  FileText,
  Gamepad2,
  Info,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Predict", href: "/predict", icon: HeartPulse },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "AI Report", href: "/report", icon: FileText },
  { name: "Simulation", href: "/simulation", icon: Gamepad2 },
  { name: "About", href: "/about", icon: Info },
];

const secondaryLinks = [
  { name: "Settings", href: "#", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[260px] h-full flex flex-col glass-card relative overflow-hidden z-20 shrink-0 p-4"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/20 blur-[70px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Logo */}
      <div className="flex items-center gap-3 px-2 pt-2 pb-6 relative z-10">
        <div className="relative w-10 h-10 rounded-2xl bg-grad-blue glow-blue flex items-center justify-center shadow-lg">
          <HeartPulse size={20} className="text-white" aria-hidden="true" />
        </div>
        <div className="leading-tight">
          <h1 className="text-[15px] font-extrabold tracking-tight text-white">
            HealthRisk
            <span className="text-primary"> AI</span>
          </h1>
          <p className="text-[10px] text-text-secondary font-medium tracking-wide uppercase">
            Intelligence
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav
        className="flex-1 flex flex-col gap-1 relative z-10"
        role="menubar"
        aria-label="Site navigation"
      >
        <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2">
          Menu
        </p>
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              role="menuitem"
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-300 ${
                isActive ? "text-white font-semibold" : "text-text-secondary hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/25"
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <span
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-text-muted group-hover:text-primary group-hover:bg-primary/10"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="relative z-10 text-sm">{item.name}</span>
              {isActive && (
                <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              )}
            </Link>
          );
        })}

        {/* Settings (coming soon) */}
        <div
          className="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-muted cursor-default opacity-70"
          role="menuitem"
          aria-disabled="true"
          title="Settings — coming soon"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg">
            <Settings size={18} aria-hidden="true" />
          </span>
          <span className="text-sm">Settings</span>
          <span className="ml-auto text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/5 text-text-muted">
            Soon
          </span>
        </div>
      </nav>

      {/* Upgrade / status pill */}
      <div className="relative z-10 mx-1 mb-3 hidden lg:block">
        <div className="rounded-2xl p-3 bg-gradient-to-br from-primary/15 via-surface to-surface-secondary border border-border overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-primary" aria-hidden="true" />
            <p className="text-xs font-semibold text-white">Pro Model</p>
          </div>
          <p className="text-[10px] text-text-secondary leading-snug">
            All 3 engines online &amp; calibrated.
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="relative z-10 mt-auto">
        <div
          className="p-3 rounded-2xl bg-surface-secondary/60 border border-border flex items-center gap-3 hover:border-border-strong transition cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="User profile — Sourav, Admin"
        >
          <div
            className="w-9 h-9 rounded-xl bg-grad-purple flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg"
            aria-hidden="true"
          >
            S
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Sourav</p>
            <p className="text-[10px] text-text-secondary truncate">Administrator</p>
          </div>
          <LogOut
            size={15}
            className="text-text-muted group-hover:text-danger transition shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </aside>
  );
}
