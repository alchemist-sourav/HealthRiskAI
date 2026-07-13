"use client";

import { motion } from "framer-motion";

/** Shimmer bar helper */
function Shimmer() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      aria-hidden="true"
    />
  );
}

/** Single card skeleton */
function CardSkeleton({ height = "h-[160px]" }: { height?: string }) {
  return (
    <div className={`glass-card ${height} relative overflow-hidden`} aria-hidden="true">
      <Shimmer />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="w-1/2 h-5 bg-surface rounded-md" />
          <div className="w-8 h-8 bg-surface rounded-full" />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <div className="w-16 h-3 bg-surface rounded-md" />
            <div className="w-20 h-7 bg-surface rounded-md" />
          </div>
          <div className="w-16 h-16 bg-surface rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** Default export — stacked single-column skeleton matching the results column */
export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4" role="status" aria-label="Loading prediction results…">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton height="h-[120px]" />
    </div>
  );
}
