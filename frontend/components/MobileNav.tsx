"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  HeartPulse,
  Activity,
  FileText,
  Gamepad2,
  Info,
  X,
  LogOut,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Predict", href: "/predict", icon: HeartPulse },
  { name: "Analytics", href: "/analytics", icon: Activity },
  { name: "Simulation", href: "/simulation", icon: Gamepad2 },
  { name: "AI Report", href: "/report", icon: FileText },
  { name: "About", href: "/about", icon: Info },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Listen for the custom event dispatched from Header
  useEffect(() => {
    const handler = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-nav", handler);
    return () => window.removeEventListener("toggle-mobile-nav", handler);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-full w-72 z-50 md:hidden flex flex-col glass-card rounded-none rounded-r-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">❤️</span>
                <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  HealthRisk AI
                </h2>
              </div>
              <button
                onClick={close}
                className="p-2 text-text-secondary hover:text-white rounded-lg hover:bg-surface transition"
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-1" role="navigation">
              {links.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={close}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary/10 border border-primary/20 text-white font-medium"
                        : "text-text-secondary hover:text-white hover:bg-surface"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-primary" : ""}
                      aria-hidden="true"
                    />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Profile */}
            <div className="p-3 border-t border-border">
              <div className="p-3 rounded-xl bg-surface border border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-accent-purple flex items-center justify-center text-white text-xs font-bold shrink-0">
                  S
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">Sourav</p>
                  <p className="text-[10px] text-text-secondary truncate">Admin</p>
                </div>
                <LogOut size={14} className="text-text-secondary shrink-0" aria-hidden="true" />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
