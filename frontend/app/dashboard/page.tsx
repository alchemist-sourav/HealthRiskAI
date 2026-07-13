"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import {
  Users,
  HeartPulse,
  ShieldCheck,
  ActivitySquare,
  ArrowRight,
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
  Brain,
  Zap,
  Clock,
  Server,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Target,
} from "lucide-react";
import Link from "next/link";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ui/ChartCard";
import GlassCard from "@/components/ui/GlassCard";
import RecentPredictionsTable from "@/components/RecentPredictionsTable";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────────────────

interface DashboardData {
  overview: { patients: number; high_risk: number; low_risk: number; medium_risk: number };
  heart: { accuracy: number; roc_auc: number };
  insurance: { average_premium: number; highest_prediction: number; lowest_prediction: number };
  hospital: { risk_score: number };
}

// ── Static module-level data (no re-creation on render) ────────────────────────

const aiInsights = [
  { id: 1, text: "Heart disease risk elevated in 45–65 age group this month", tag: "Cardiovascular", tagColor: "bg-danger/10 text-danger", dotColor: "bg-danger" },
  { id: 2, text: "Insurance premiums trending upward in Southeast region", tag: "Insurance", tagColor: "bg-primary/10 text-primary", dotColor: "bg-primary" },
  { id: 3, text: "Diabetes risk 18% higher in smokers vs non-smokers", tag: "Metabolic", tagColor: "bg-warning/10 text-warning", dotColor: "bg-warning" },
  { id: 4, text: "Hospital readmission rates down 6% after new protocol", tag: "Hospital", tagColor: "bg-success/10 text-success", dotColor: "bg-success" },
];

const activityItems = [
  { id: 1, text: "Patient PAT-007 analyzed", timestamp: "2 min ago", iconKey: "brain", iconColor: "text-primary bg-primary/10" },
  { id: 2, text: "New diabetes model deployed (v2.1)", timestamp: "18 min ago", iconKey: "zap", iconColor: "text-warning bg-warning/10" },
  { id: 3, text: "Report generated for PAT-002", timestamp: "1 hr ago", iconKey: "check", iconColor: "text-success bg-success/10" },
  { id: 4, text: "System backup complete", timestamp: "3 hr ago", iconKey: "server", iconColor: "text-secondary bg-secondary/10" },
  { id: 5, text: "Anomaly detected in risk pipeline", timestamp: "5 hr ago", iconKey: "alert", iconColor: "text-danger bg-danger/10" },
];

const statPills = [
  { label: "2,847 Predictions Made", color: "text-primary bg-primary/10 border-primary/20" },
  { label: "99.2% Uptime", color: "text-success bg-success/10 border-success/20" },
  { label: "3 ML Models Active", color: "text-secondary bg-secondary/10 border-secondary/20" },
];

const riskData = [
  { name: "Low", value: 65, color: "#22C55E" },
  { name: "Medium", value: 25, color: "#F59E0B" },
  { name: "High", value: 10, color: "#EF4444" },
];

const accuracyData = [
  { name: "Heart", accuracy: 92, color: "#EF4444" },
  { name: "Diabetes", accuracy: 88, color: "#F59E0B" },
  { name: "Insurance", accuracy: 95, color: "#4F8CFF" },
];

const trendData = [
  { month: "Jan", premium: 12000 }, { month: "Feb", premium: 12500 },
  { month: "Mar", premium: 14000 }, { month: "Apr", premium: 13800 },
  { month: "May", premium: 15200 }, { month: "Jun", premium: 16100 },
];

const radarData = [
  { metric: "Accuracy", heart: 92, diabetes: 88, insurance: 95 },
  { metric: "Precision", heart: 89, diabetes: 85, insurance: 93 },
  { metric: "Recall",    heart: 88, diabetes: 87, insurance: 92 },
  { metric: "F1 Score",  heart: 90, diabetes: 86, insurance: 94 },
  { metric: "AUC",       heart: 91, diabetes: 89, insurance: 96 },
];

const quickActions = [
  { label: "Analyze Patient", href: "/predict", icon: <Stethoscope size={14} aria-hidden="true" />, style: "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20" },
  { label: "Analytics", href: "/analytics", icon: <Target size={14} aria-hidden="true" />, style: "bg-surface hover:bg-card text-white border border-border" },
  { label: "Simulation", href: "/simulation", icon: <ActivitySquare size={14} aria-hidden="true" />, style: "bg-surface hover:bg-card text-white border border-border" },
  { label: "Generate Report", href: "/report", icon: <ArrowRight size={14} aria-hidden="true" />, style: "bg-surface hover:bg-card text-white border border-border" },
];

// ── Icon resolver (avoids JSX in module-level array) ──────────────────────────
function ActivityIcon({ iconKey }: { iconKey: string }) {
  switch (iconKey) {
    case "brain": return <Brain size={16} aria-hidden="true" />;
    case "zap":   return <Zap   size={16} aria-hidden="true" />;
    case "check": return <CheckCircle2 size={16} aria-hidden="true" />;
    case "server":return <Server size={16} aria-hidden="true" />;
    default:      return <AlertCircle size={16} aria-hidden="true" />;
  }
}

// ── Dashboard Page ─────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboard = (isRetry = false) => {
    if (isRetry) {
      setLoading(true);
      setError(false);
    }
    api
      .get("/dashboard")
      .then((res) => { setData(res.data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full" role="status" aria-label="Loading dashboard">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-4 border-surface" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
          </div>
          <p className="text-text-secondary text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
        <AlertCircle size={48} className="text-danger opacity-60" aria-hidden="true" />
        <div>
          <p className="text-white font-semibold">Failed to connect to backend</p>
          <p className="text-text-secondary text-sm mt-1">Make sure the FastAPI server is running on port 8000.</p>
        </div>
        <button
          onClick={() => fetchDashboard(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-medium transition text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
      {/* ── Hero ── */}
      <section
        className="relative rounded-2xl overflow-hidden glass-card border-none bg-gradient-to-br from-primary/10 via-surface to-surface p-6 md:p-8 shadow-2xl"
        aria-label="Dashboard hero"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-2xl">
          {/* Live badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-success/10 border border-success/30 text-success text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="System status: Live"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-success inline-block"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            Live System
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight">HealthRisk AI</h1>
          <p className="text-text-secondary text-base md:text-lg mb-6 leading-relaxed font-medium">
            AI Powered Healthcare Risk Analytics Platform
          </p>

          {/* Quick action buttons */}
          <div className="flex flex-wrap gap-3 mb-5" role="group" aria-label="Quick actions">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition text-sm ${action.style}`}
              >
                {action.icon}
                {action.label}
              </Link>
            ))}
          </div>

          {/* Stat pills */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            role="list"
            aria-label="System statistics"
          >
            {statPills.map((pill, i) => (
              <motion.span
                key={pill.label}
                role="listitem"
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${pill.color}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              >
                {pill.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6 KPI Cards ── */}
      <section aria-label="Key performance indicators">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard title="Total Patients"   value={data.overview.patients}            icon={<Users         size={24} aria-hidden="true" />} trend={12}   colorClass="text-primary"       bgClass="bg-primary/10"       borderClass="border-primary/20" />
          <MetricCard title="High Risk"        value={data.overview.high_risk}           icon={<AlertCircle   size={24} aria-hidden="true" />} trend={-3.2} colorClass="text-danger"        bgClass="bg-danger/10"        borderClass="border-danger/20" />
          <MetricCard title="Heart Accuracy"   value={data.heart.accuracy * 100}         icon={<HeartPulse    size={24} aria-hidden="true" />} trend={5.2}  colorClass="text-danger"        bgClass="bg-danger/10"        borderClass="border-danger/20" decimals={1} suffix="%" />
          <MetricCard title="Avg Premium"      value={data.insurance.average_premium}    icon={<ShieldCheck   size={24} aria-hidden="true" />} trend={2.1}  colorClass="text-success"       bgClass="bg-success/10"       borderClass="border-success/20" prefix="₹" />
          <MetricCard title="Hospital Risk"    value={data.hospital.risk_score}          icon={<ActivitySquare size={24} aria-hidden="true" />} trend={-1.4} colorClass="text-warning"       bgClass="bg-warning/10"       borderClass="border-warning/20" />
          <MetricCard title="Model ROC-AUC"    value={data.heart.roc_auc * 100}          icon={<Target        size={24} aria-hidden="true" />} trend={1.8}  colorClass="text-accent-purple" bgClass="bg-accent-purple/10" borderClass="border-accent-purple/20" decimals={1} suffix="%" />
        </div>
      </section>

      {/* ── Charts Row 1 ── */}
      <section aria-label="Risk and accuracy charts">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <ChartCard title="Risk Distribution" icon={<PieChartIcon size={20} aria-hidden="true" />}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "12px" }} itemStyle={{ color: "#fff" }} />
                <Legend wrapperStyle={{ fontSize: "12px", color: "var(--text-secondary)" }} iconType="circle" iconSize={8} />
                <Pie data={riskData} cx="50%" cy="45%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                  {riskData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0)" />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Model Accuracy" icon={<BarChart3 size={20} aria-hidden="true" />}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "12px" }} />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]} name="Accuracy %">
                  {accuracyData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Insurance Trend" icon={<TrendingUp size={20} aria-hidden="true" />}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F8CFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F8CFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-secondary)" tick={{ fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "12px" }} />
                <Area type="monotone" dataKey="premium" stroke="#4F8CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorPremium)" name="Premium ₹" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </section>

      {/* ── Radar Chart ── */}
      <section aria-label="ML Model performance radar">
        <ChartCard title="ML Model Performance Radar" icon={<Target size={20} aria-hidden="true" />}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} />
              <Radar name="Heart Model"     dataKey="heart"     stroke="#EF4444" fill="#EF4444" fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Diabetes Model"  dataKey="diabetes"  stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Insurance Model" dataKey="insurance" stroke="#4F8CFF" fill="#4F8CFF" fillOpacity={0.12} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: "13px", color: "var(--text-secondary)", paddingTop: "8px" }} />
              <Tooltip contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "12px" }} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* ── AI Insights + Activity ── */}
      <section aria-label="AI insights and recent activity">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* AI Insights */}
          <GlassCard className="flex flex-col gap-4" hoverLift={false}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-purple/10 flex items-center justify-center" aria-hidden="true">
                <Brain size={18} className="text-accent-purple" />
              </div>
              <div>
                <h2 className="text-base font-semibold">AI Insights</h2>
                <p className="text-xs text-text-secondary">Generated by ML models</p>
              </div>
            </div>
            <div className="flex flex-col gap-3" role="list">
              {aiInsights.map((insight, i) => (
                <motion.div
                  key={insight.id}
                  role="listitem"
                  className="flex items-start gap-3 p-3 rounded-xl bg-background/40 border border-border hover:border-accent-purple/30 transition-colors"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${insight.dotColor}`} aria-hidden="true" />
                  <p className="flex-1 text-sm leading-snug min-w-0">{insight.text}</p>
                  <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${insight.tagColor}`}>
                    {insight.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Latest Activity */}
          <GlassCard className="flex flex-col gap-4" hoverLift={false}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center" aria-hidden="true">
                <Clock size={18} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-base font-semibold">Latest Activity</h2>
                <p className="text-xs text-text-secondary">Recent system events</p>
              </div>
            </div>
            <div className="flex flex-col gap-2" role="list">
              {activityItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  role="listitem"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-background/40 transition-colors group"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconColor}`}>
                    <ActivityIcon iconKey={item.iconKey} />
                  </div>
                  <p className="flex-1 text-sm group-hover:text-white transition-colors">{item.text}</p>
                  <span className="text-xs text-text-muted shrink-0">{item.timestamp}</span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── Recent Predictions ── */}
      <section aria-label="Recent predictions">
        <RecentPredictionsTable />
      </section>
    </div>
  );
}
