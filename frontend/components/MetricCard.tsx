import { ReactNode } from "react";
import GlassCard from "./ui/GlassCard";
import AnimatedCounter from "./ui/AnimatedCounter";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  colorClass?: string; // e.g. "text-primary"
  bgClass?: string; // e.g. "bg-primary/15"
  borderClass?: string; // e.g. "border-primary/25"
  glowClass?: string; // e.g. "glow-blue"
}

export default function MetricCard({
  title,
  value,
  icon,
  trend,
  prefix = "",
  suffix = "",
  decimals = 0,
  colorClass = "text-primary",
  bgClass = "bg-primary/15",
  borderClass = "border-primary/25",
  glowClass = "glow-blue",
}: MetricCardProps) {
  const isUp = (trend ?? 0) >= 0;
  return (
    <GlassCard className={`flex flex-col gap-4 group relative overflow-hidden ${glowClass}`}>
      {/* hover sheen */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, rgba(255,255,255,0.06), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="flex justify-between items-start relative z-10">
        <div
          className={`w-12 h-12 rounded-2xl ${bgClass} flex items-center justify-center border ${borderClass}`}
        >
          <div className={colorClass}>{icon}</div>
        </div>
        {trend !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-lg ${
              isUp
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}
          >
            {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="relative z-10">
        <p className="text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wide">
          {title}
        </p>
        <h3 className="text-3xl font-extrabold text-white tracking-tight">
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        </h3>
      </div>
    </GlassCard>
  );
}
