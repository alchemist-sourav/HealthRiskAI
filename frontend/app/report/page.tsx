"use client";

import GlassCard from "@/components/ui/GlassCard";
import ChartCard from "@/components/ui/ChartCard";
import ProgressRing from "@/components/ui/ProgressRing";
import {
    FileText,
    Download,
    CheckCircle2,
    ShieldAlert,
    Activity,
    Heart,
    Shield,
    TrendingUp,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// --- Module-level static data ---

const riskTimelineData = [
    { month: "Jan", heart: 10, diabetes: 38, insurance: 40 },
    { month: "Feb", heart: 11, diabetes: 39, insurance: 41 },
    { month: "Mar", heart: 10, diabetes: 40, insurance: 42 },
    { month: "Apr", heart: 12, diabetes: 41, insurance: 42 },
    { month: "May", heart: 11, diabetes: 43, insurance: 43 },
    { month: "Jun", heart: 13, diabetes: 44, insurance: 44 },
    { month: "Jul", heart: 12, diabetes: 45, insurance: 45 },
    { month: "Aug", heart: 14, diabetes: 46, insurance: 46 },
    { month: "Sep", heart: 13, diabetes: 47, insurance: 46 },
    { month: "Oct", heart: 15, diabetes: 48, insurance: 47 },
    { month: "Nov", heart: 14, diabetes: 49, insurance: 48 },
    { month: "Dec", heart: 16, diabetes: 51, insurance: 49 },
];

export default function ReportPage() {
    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-border pb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2 tracking-tight flex items-center gap-3">
                        <FileText className="text-primary" size={32} /> AI Health Report
                    </h1>
                    <p className="text-text-secondary">Comprehensive analysis generated on July 12, 2026</p>
                </div>
                <button className="bg-surface hover:bg-card text-white border border-border px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                    <Download size={16} /> Export PDF
                </button>
            </div>

            {/* Score Cards — 3-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Health Score */}
                <GlassCard hoverLift={false} className="flex flex-col items-center gap-3 text-center">
                    <ProgressRing
                        progress={72}
                        size={100}
                        strokeWidth={8}
                        color="var(--success)"
                    />
                    <div>
                        <p className="font-bold text-lg text-white">72 / 100</p>
                        <p className="text-text-secondary text-sm">Health Score</p>
                        <p className="text-xs text-success mt-1">Good — within safe range</p>
                    </div>
                </GlassCard>

                {/* Risk Score */}
                <GlassCard hoverLift={false} className="flex flex-col items-center gap-3 text-center">
                    <ProgressRing
                        progress={28}
                        size={100}
                        strokeWidth={8}
                        color="var(--warning)"
                    />
                    <div>
                        <p className="font-bold text-lg text-white">28 / 100</p>
                        <p className="text-text-secondary text-sm">Risk Score</p>
                        <p className="text-xs text-warning mt-1">Moderate — monitor closely</p>
                    </div>
                </GlassCard>

                {/* Financial Risk */}
                <GlassCard hoverLift={false} className="flex flex-col items-center gap-3 text-center">
                    <ProgressRing
                        progress={45}
                        size={100}
                        strokeWidth={8}
                        color="var(--primary)"
                    />
                    <div>
                        <p className="font-bold text-lg text-white">45 / 100</p>
                        <p className="text-text-secondary text-sm">Financial Risk</p>
                        <p className="text-xs text-primary mt-1">Elevated — review coverage</p>
                    </div>
                </GlassCard>
            </div>

            {/* Overall Score / Hero */}
            <GlassCard
                className="flex flex-col md:flex-row items-center gap-8 justify-between bg-gradient-to-r from-primary/10 to-transparent border-primary/30"
                hoverLift={false}
            >
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2 text-white">Overall Health &amp; Risk Profile</h2>

                    {/* Stat badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 bg-surface/70 border border-border text-text-secondary text-xs px-3 py-1 rounded-full">
                            📅 Generated: July 12, 2026
                        </span>
                        <span className="inline-flex items-center gap-1 bg-surface/70 border border-border text-text-secondary text-xs px-3 py-1 rounded-full">
                            🆔 Patient: PAT-005
                        </span>
                    </div>

                    <p className="text-text-secondary leading-relaxed text-sm">
                        Based on the aggregated predictive models across cardiovascular, metabolic, and financial
                        risk domains, this patient presents a <span className="text-white font-medium">moderate overall health risk profile</span>.
                        Cardiovascular indicators are currently within stable limits with a low 12% heart-disease
                        probability, while metabolic parameters show a 45% elevated risk for type-2 diabetes
                        development over the next five years. Financial projections estimate annual medical charges
                        at ₹14,250, with a potential 18% reduction achievable through sustained preventive
                        care. Immediate lifestyle adjustments — particularly around glucose management and BMI
                        reduction — are strongly advised to improve the 5-year outlook across all three domains.
                    </p>
                </div>
                <div className="flex flex-col items-center shrink-0">
                    <ProgressRing progress={72} size={140} strokeWidth={8} color="var(--success)" />
                    <p className="text-sm font-medium mt-2 text-text-secondary">Health Score</p>
                </div>
            </GlassCard>

            {/* Timeline Analysis */}
            <div className="flex flex-col gap-6 relative mt-2">
                <div className="absolute left-8 top-4 bottom-4 w-px bg-border"></div>

                {/* Heart Analysis */}
                <div className="relative pl-24 pr-4">
                    <div className="absolute left-[26px] top-4 w-4 h-4 rounded-full bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    <GlassCard hoverLift={false} className="border-danger/30">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Heart className="text-danger" size={18} /> Heart Analysis
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                            The cardiovascular prediction model indicates a low risk (12% probability).
                            Cholesterol levels and resting blood pressure are currently well within normal ranges.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-success/10 text-success text-xs px-3 py-1 rounded-md font-medium flex items-center gap-1">
                                <CheckCircle2 size={12} /> Normal BP
                            </span>
                            <span className="bg-success/10 text-success text-xs px-3 py-1 rounded-md font-medium flex items-center gap-1">
                                <CheckCircle2 size={12} /> Optimal Cholesterol
                            </span>
                        </div>
                    </GlassCard>
                </div>

                {/* Diabetes Analysis */}
                <div className="relative pl-24 pr-4">
                    <div className="absolute left-[26px] top-4 w-4 h-4 rounded-full bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                    <GlassCard hoverLift={false} className="border-warning/30">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Activity className="text-warning" size={18} /> Diabetes Analysis
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                            The metabolic prediction model flags a moderate risk (45% probability) for type 2
                            diabetes development within the next 5 years. Fasting glucose is slightly elevated.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-warning/10 text-warning text-xs px-3 py-1 rounded-md font-medium flex items-center gap-1">
                                <ShieldAlert size={12} /> Elevated Glucose
                            </span>
                            <span className="bg-warning/10 text-warning text-xs px-3 py-1 rounded-md font-medium flex items-center gap-1">
                                <ShieldAlert size={12} /> High BMI
                            </span>
                        </div>
                    </GlassCard>
                </div>

                {/* Insurance Analysis */}
                <div className="relative pl-24 pr-4">
                    <div className="absolute left-[26px] top-4 w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_rgba(79,140,255,0.5)]"></div>
                    <GlassCard hoverLift={false} className="border-primary/30">
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                            <Shield className="text-primary" size={18} /> Insurance Analysis
                        </h3>
                        <p className="text-text-secondary text-sm">
                            Predicted annual medical charges are estimated at ₹14,250 based on current health
                            markers and demographic data. Implementing preventive care can reduce these projected
                            costs by up to 18% over the next 24 months.
                        </p>
                    </GlassCard>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mt-2">
                <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GlassCard hoverLift={false} className="bg-surface/50 border-secondary/20">
                        <h3 className="text-base font-bold mb-3 text-secondary">Preventive Measures</h3>
                        <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside marker:text-secondary">
                            <li>Schedule an HbA1c test within the next 30 days.</li>
                            <li>Begin a structured cardiovascular exercise routine (150 mins/week).</li>
                            <li>Monitor daily caloric intake targeting a 5% BMI reduction.</li>
                        </ul>
                    </GlassCard>

                    <GlassCard hoverLift={false} className="bg-surface/50 border-accent-purple/20">
                        <h3 className="text-base font-bold mb-3 text-accent-purple">Lifestyle Advice (6.5/10)</h3>
                        <ul className="space-y-2 text-sm text-text-secondary list-disc list-inside marker:text-accent-purple">
                            <li>Dietary adjustments required to lower glucose spikes.</li>
                            <li>Sleep patterns are adequate.</li>
                            <li>Stress markers are low.</li>
                        </ul>
                    </GlassCard>
                </div>
            </div>

            {/* Medical Advice */}
            <div className="mt-2">
                <GlassCard hoverLift={false} className="border-accent-purple/40">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent-purple">
                        <CheckCircle2 size={22} className="text-accent-purple" />
                        Medical Advice
                    </h2>
                    <ul className="space-y-3">
                        {[
                            "Consult a cardiologist for annual ECG review",
                            "Request fasting lipid panel test",
                            "Consider continuous glucose monitoring if BMI > 30",
                            "Review current medication interactions with physician",
                        ].map((advice) => (
                            <li key={advice} className="flex items-start gap-3 text-sm text-text-secondary">
                                <CheckCircle2
                                    size={16}
                                    className="text-accent-purple shrink-0 mt-0.5"
                                />
                                <span>{advice}</span>
                            </li>
                        ))}
                    </ul>
                </GlassCard>
            </div>

            {/* Risk Progression Forecast */}
            <div className="mt-2">
                <h2 className="text-2xl font-bold mb-4">Risk Progression Forecast</h2>
                <ChartCard title="12-Month Risk Trend" icon={<TrendingUp size={18} />}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={riskTimelineData}
                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
                            <XAxis
                                dataKey="month"
                                tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                                axisLine={{ stroke: "var(--border)" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                                axisLine={{ stroke: "var(--border)" }}
                                tickLine={false}
                                domain={[0, 70]}
                                unit="%"
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "var(--card)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "8px",
                                    color: "white",
                                }}
                                formatter={(value, name) => [
                                    `${value}%`,
                                    String(name).charAt(0).toUpperCase() + String(name).slice(1),
                                ]}
                            />
                            <Legend
                                formatter={(value: string) =>
                                    value.charAt(0).toUpperCase() + value.slice(1)
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="heart"
                                stroke="var(--danger)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="diabetes"
                                stroke="var(--warning)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="insurance"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>
        </div>
    );
}
