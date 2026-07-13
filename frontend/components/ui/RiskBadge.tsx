"use client";

interface RiskBadgeProps {
  level: "Low" | "Medium" | "High" | string;
}

export default function RiskBadge({ level }: RiskBadgeProps) {
  const normalized = level.toLowerCase();
  const isLow = normalized === "low";
  const isMedium = normalized === "medium" || normalized === "moderate";
  const isHigh = normalized === "high";

  let colorClass = "bg-surface text-text-secondary border-border";
  if (isLow) colorClass = "bg-success/10 text-success border-success/30";
  if (isMedium) colorClass = "bg-warning/10 text-warning border-warning/30";
  if (isHigh) colorClass = "bg-danger/10 text-danger border-danger/30";

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass} capitalize`}
      role="status"
      aria-label={`Risk level: ${level}`}
    >
      {level}
    </span>
  );
}
