"use client";

import {
    PieChart as PieChartIcon,
    TrendingUp,
    BarChart3,
    AlertTriangle,
    Download,
    Activity,
    Users,
    Target,
    Cpu,
} from "lucide-react";
import ChartCard from "@/components/ui/ChartCard";
import GlassCard from "@/components/ui/GlassCard";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    ScatterChart,
    Scatter,
    ZAxis,
    Legend,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from "recharts";

// --- Module-level data (no Math.random inside component) ---

const heatmapData = Array.from({ length: 20 }).map(() => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    z: Math.floor(Math.random() * 1000),
}));

const radarData = [
    { metric: "Accuracy", heart: 92, diabetes: 88, insurance: 95 },
    { metric: "Precision", heart: 89, diabetes: 85, insurance: 93 },
    { metric: "Recall",    heart: 88, diabetes: 87, insurance: 92 },
    { metric: "F1 Score",  heart: 90, diabetes: 86, insurance: 94 },
    { metric: "AUC",       heart: 91, diabetes: 89, insurance: 96 },
];

// --- Stat card data ---
interface StatItem {
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

// --- Page Component ---

export default function AnalyticsPage() {
    // Mock data
    const trendData = [
        { name: "Week 1", heart: 120, diabetes: 80 },
        { name: "Week 2", heart: 132, diabetes: 95 },
        { name: "Week 3", heart: 101, diabetes: 110 },
        { name: "Week 4", heart: 143, diabetes: 105 },
    ];

    const distributionData = [
        { name: "Southwest", value: 400, color: "var(--primary)" },
        { name: "Southeast", value: 300, color: "var(--secondary)" },
        { name: "Northwest", value: 300, color: "var(--accent-purple)" },
        { name: "Northeast", value: 200, color: "var(--success)" },
    ];

    const statItems: StatItem[] = [
        {
            label: "Total Analyses",
            value: "12,847",
            icon: <Activity size={22} />,
            color: "var(--primary)",
        },
        {
            label: "Avg Risk Score",
            value: "34.2%",
            icon: <TrendingUp size={22} />,
            color: "var(--warning)",
        },
        {
            label: "High Risk Patients",
            value: "847",
            icon: <Users size={22} />,
            color: "var(--danger)",
        },
        {
            label: "Accuracy Avg",
            value: "91.7%",
            icon: <Target size={22} />,
            color: "var(--success)",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-10">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Interactive Analytics</h1>
                    <p className="text-text-secondary">
                        Deep dive into population health trends and financial risk distributions.
                    </p>
                </div>
                <button className="bg-surface hover:bg-card text-white border border-border px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
                    <Download size={16} /> Export Data
                </button>
            </div>

            {/* Summary Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {statItems.map((stat) => (
                    <GlassCard
                        key={stat.label}
                        hoverLift={true}
                        className="flex items-center gap-4 !p-5"
                    >
                        <div
                            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 15%, transparent)`, color: stat.color }}
                        >
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary font-medium uppercase tracking-wide mb-0.5">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold tracking-tight" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Prediction Trends (AreaChart) — with Legend */}
                <div className="lg:col-span-2">
                    <ChartCard title="Prediction Trends" icon={<TrendingUp size={18} />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--danger)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDiabetes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="var(--warning)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: "var(--text-secondary)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: "var(--text-secondary)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "12px",
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ paddingTop: "8px", fontSize: "13px", color: "var(--text-secondary)" }}
                                    formatter={(value) => (value === "heart" ? "Heart Disease" : "Diabetes")}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="heart"
                                    stroke="var(--danger)"
                                    fillOpacity={1}
                                    fill="url(#colorHeart)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="diabetes"
                                    stroke="var(--warning)"
                                    fillOpacity={1}
                                    fill="url(#colorDiabetes)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Insurance Distribution (PieChart) — with Legend */}
                <div className="lg:col-span-1">
                    <ChartCard title="Insurance Distribution" icon={<PieChartIcon size={18} />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "12px",
                                    }}
                                    itemStyle={{ color: "#fff" }}
                                />
                                <Legend
                                    layout="vertical"
                                    align="right"
                                    verticalAlign="middle"
                                    wrapperStyle={{ fontSize: "12px", color: "var(--text-secondary)" }}
                                    iconType="circle"
                                    iconSize={8}
                                />
                                <Pie
                                    data={distributionData}
                                    cx="40%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {distributionData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke="rgba(0,0,0,0)"
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Patient Statistics (BarChart) */}
                <div className="lg:col-span-1">
                    <ChartCard title="Patient Statistics" icon={<BarChart3 size={18} />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={distributionData}
                                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: "var(--text-secondary)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "12px",
                                    }}
                                />
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {distributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Risk Heatmap (ScatterChart) */}
                <div className="lg:col-span-2">
                    <ChartCard title="Risk Heatmap (Age vs Premium)" icon={<AlertTriangle size={18} />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    name="Age"
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: "var(--text-secondary)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="y"
                                    name="Premium"
                                    stroke="var(--text-secondary)"
                                    tick={{ fill: "var(--text-secondary)" }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <ZAxis
                                    type="number"
                                    dataKey="z"
                                    range={[60, 400]}
                                    name="Risk Factor"
                                />
                                <Tooltip
                                    cursor={{ strokeDasharray: "3 3" }}
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "12px",
                                    }}
                                />
                                <Scatter name="Patients" data={heatmapData} fill="var(--primary)" opacity={0.6} />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>

                {/* Model Comparison (RadarChart) — NEW */}
                <div className="lg:col-span-3">
                    <ChartCard title="Model Performance Comparison" icon={<Cpu size={18} />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                                <PolarGrid stroke="var(--border)" />
                                <PolarAngleAxis
                                    dataKey="metric"
                                    tick={{ fill: "var(--text-secondary)", fontSize: 13 }}
                                />
                                <PolarRadiusAxis
                                    angle={90}
                                    domain={[70, 100]}
                                    tick={{ fill: "var(--text-secondary)", fontSize: 11 }}
                                    tickCount={4}
                                />
                                <Radar
                                    name="Heart Model"
                                    dataKey="heart"
                                    stroke="var(--danger)"
                                    fill="var(--danger)"
                                    fillOpacity={0.15}
                                    strokeWidth={2}
                                />
                                <Radar
                                    name="Diabetes Model"
                                    dataKey="diabetes"
                                    stroke="var(--warning)"
                                    fill="var(--warning)"
                                    fillOpacity={0.15}
                                    strokeWidth={2}
                                />
                                <Radar
                                    name="Insurance Model"
                                    dataKey="insurance"
                                    stroke="var(--primary)"
                                    fill="var(--primary)"
                                    fillOpacity={0.15}
                                    strokeWidth={2}
                                />
                                <Legend
                                    wrapperStyle={{
                                        paddingTop: "12px",
                                        fontSize: "13px",
                                        color: "var(--text-secondary)",
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)",
                                        borderRadius: "12px",
                                    }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </ChartCard>
                </div>
            </div>
        </div>
    );
}
