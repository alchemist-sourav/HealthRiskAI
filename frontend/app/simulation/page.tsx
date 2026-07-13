"use client";

import GlassCard from "@/components/ui/GlassCard";
import ScenarioCard from "@/components/ui/ScenarioCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import {
    Gamepad2,
    Settings2,
    Play,
    Building2,
    ShieldCheck,
    Pill,
    Skull,
    Activity,
    ShieldAlert,
    TrendingUp,
    TrendingDown,
    Minus,
    Clock,
    Loader2,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SimulationResult {
    revenue: string;
    claims: string;
    investment: string;
    riskScore: number;
    portfolioValue: string;
}

interface HistoryEntry {
    scenario: string;
    timestamp: string;
    riskScore: number;
}

const SCENARIO_RESULTS: Record<string, SimulationResult> = {
    "Global Pandemic": {
        revenue: "-₹4.2B",
        claims: "+340%",
        investment: "-₹1.8B",
        riskScore: 94,
        portfolioValue: "-28%",
    },
    "Drug Approval": {
        revenue: "+₹2.1B",
        claims: "-18%",
        investment: "+₹890M",
        riskScore: 12,
        portfolioValue: "+15%",
    },
    "Insurance Fraud": {
        revenue: "-₹890M",
        claims: "+67%",
        investment: "-₹450M",
        riskScore: 71,
        portfolioValue: "-8%",
    },
    "Hospital Crisis": {
        revenue: "-₹1.2B",
        claims: "+45%",
        investment: "-₹320M",
        riskScore: 58,
        portfolioValue: "-12%",
    },
};

function getValueSentiment(value: string): "positive" | "negative" | "neutral" {
    if (value.startsWith("+")) return "positive";
    if (value.startsWith("-")) return "negative";
    return "neutral";
}

function getRiskSentiment(score: number): "positive" | "negative" | "neutral" {
    if (score <= 30) return "positive";
    if (score >= 70) return "negative";
    return "neutral";
}

interface SentimentBadgeProps {
    sentiment: "positive" | "negative" | "neutral";
    label: string;
}

function SentimentBadge({ sentiment, label }: SentimentBadgeProps) {
    const config = {
        positive: {
            className: "bg-success/10 text-success border border-success/30",
            Icon: TrendingUp,
        },
        negative: {
            className: "bg-danger/10 text-danger border border-danger/30",
            Icon: TrendingDown,
        },
        neutral: {
            className: "bg-warning/10 text-warning border border-warning/30",
            Icon: Minus,
        },
    }[sentiment];

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${config.className}`}>
            <config.Icon size={11} />
            {label}
        </span>
    );
}

interface MetricCardProps {
    label: string;
    value: string;
    sentiment: "positive" | "negative" | "neutral";
    delay?: number;
}

function MetricCard({ label, value, sentiment, delay = 0 }: MetricCardProps) {
    const sentimentLabel =
        sentiment === "positive" ? "Positive" : sentiment === "negative" ? "Negative" : "Neutral";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="glass-card rounded-xl p-4 flex flex-col gap-2"
        >
            <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">{label}</p>
            <p
                className={`text-2xl font-bold ${
                    sentiment === "positive"
                        ? "text-success"
                        : sentiment === "negative"
                        ? "text-danger"
                        : "text-warning"
                }`}
            >
                {value}
            </p>
            <SentimentBadge sentiment={sentiment} label={sentimentLabel} />
        </motion.div>
    );
}

export default function SimulationPage() {
    const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
    const [running, setRunning] = useState(false);
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [history, setHistory] = useState<HistoryEntry[]>([]);

    const handleRunSimulation = () => {
        if (!selectedScenario || running) return;

        setRunning(true);
        setSimulationResult(null);

        setTimeout(() => {
            const result = SCENARIO_RESULTS[selectedScenario];
            setSimulationResult(result);
            setRunning(false);

            const entry: HistoryEntry = {
                scenario: selectedScenario,
                timestamp: new Date().toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
                riskScore: result.riskScore,
            };

            setHistory((prev) => [entry, ...prev].slice(0, 5));
        }, 2000);
    };

    const buttonLabel = running
        ? "Running..."
        : selectedScenario
        ? "Run Simulation"
        : "Select a Scenario First";

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-10">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2 tracking-tight flex items-center gap-3">
                        <Gamepad2 className="text-secondary" size={32} /> HealthRisk Lab
                    </h1>
                    <p className="text-text-secondary">
                        Simulate market conditions and extreme medical scenarios.
                    </p>
                </div>
                <button
                    onClick={handleRunSimulation}
                    disabled={!selectedScenario || running}
                    className="bg-secondary hover:bg-secondary/80 disabled:opacity-40 disabled:cursor-not-allowed text-surface px-6 py-2 rounded-xl font-bold transition flex items-center gap-2 shadow-lg shadow-secondary/20"
                >
                    {running ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Play size={18} />
                    )}
                    {buttonLabel}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                {/* Portfolios */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                        <Settings2 size={20} className="text-primary" /> Portfolios
                    </h2>

                    <GlassCard className="flex flex-col gap-4 border-l-4 border-l-primary" hoverLift={false}>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold flex items-center gap-2">
                                <Building2 size={16} className="text-primary" /> Hospital Network
                            </h3>
                            <span className="text-xs bg-surface px-2 py-1 rounded text-text-secondary">
                                Active
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Total Asset Value</p>
                            <p className="text-2xl font-bold">₹12.4B</p>
                        </div>
                    </GlassCard>

                    <GlassCard className="flex flex-col gap-4 border-l-4 border-l-success" hoverLift={false}>
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold flex items-center gap-2">
                                <ShieldCheck size={16} className="text-success" /> Insurance Corp
                            </h3>
                            <span className="text-xs bg-surface px-2 py-1 rounded text-text-secondary">
                                Active
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-text-secondary">Risk Exposure</p>
                            <p className="text-2xl font-bold text-success">Low</p>
                        </div>
                    </GlassCard>
                </div>

                {/* Scenarios + Results */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                        <Skull size={20} className="text-danger" /> Stress Test Scenarios
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            {
                                title: "Global Pandemic",
                                description:
                                    "Simulate a severe viral outbreak affecting 30% of the population.",
                                icon: <Skull size={20} />,
                                colorClass: "danger",
                            },
                            {
                                title: "Drug Approval",
                                description:
                                    "Simulate a major pharmaceutical breakthrough lowering treatment costs.",
                                icon: <Pill size={20} />,
                                colorClass: "success",
                            },
                            {
                                title: "Insurance Fraud",
                                description:
                                    "Simulate a 15% increase in fraudulent claims across networks.",
                                icon: <ShieldAlert size={20} />,
                                colorClass: "warning",
                            },
                            {
                                title: "Hospital Crisis",
                                description:
                                    "Simulate a localized natural disaster affecting ICU capacity.",
                                icon: <Activity size={20} />,
                                colorClass: "primary",
                            },
                        ].map((scenario) => {
                            const isSelected = selectedScenario === scenario.title;
                            return (
                                <div
                                    key={scenario.title}
                                    className={`rounded-2xl transition-all ${
                                        isSelected
                                            ? "ring-2 ring-[var(--primary)] bg-[var(--primary)]/5"
                                            : ""
                                    }`}
                                >
                                    <ScenarioCard
                                        title={scenario.title}
                                        description={scenario.description}
                                        icon={scenario.icon}
                                        colorClass={scenario.colorClass}
                                        onClick={() =>
                                            setSelectedScenario(
                                                isSelected ? null : scenario.title
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Results Panel */}
                    <AnimatePresence mode="wait">
                        {running && !simulationResult && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center gap-5 border-dashed border-border"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Loader2 size={48} className="text-secondary" />
                                </motion.div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        Simulating Portfolio Impact...
                                    </h3>
                                    <p className="text-text-secondary text-sm">
                                        Running{" "}
                                        <span className="text-secondary font-semibold">
                                            {selectedScenario}
                                        </span>{" "}
                                        stress test
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {[0, 0.15, 0.3].map((delay, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 rounded-full bg-secondary"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{
                                                duration: 0.9,
                                                repeat: Infinity,
                                                delay,
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {simulationResult && !running && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <Activity size={18} className="text-secondary" />
                                        Simulation Results —{" "}
                                        <span className="text-secondary">{selectedScenario}</span>
                                    </h3>
                                    <SentimentBadge
                                        sentiment={getRiskSentiment(simulationResult.riskScore)}
                                        label={`Risk: ${simulationResult.riskScore}/100`}
                                    />
                                </div>

                                {/* 2x2 + 1 metric grid */}
                                <div className="grid grid-cols-2 gap-3">
                                    <MetricCard
                                        label="Hospital Revenue"
                                        value={simulationResult.revenue}
                                        sentiment={getValueSentiment(simulationResult.revenue)}
                                        delay={0}
                                    />
                                    <MetricCard
                                        label="Insurance Claims"
                                        value={simulationResult.claims}
                                        sentiment={
                                            simulationResult.claims.startsWith("+")
                                                ? "negative"
                                                : "positive"
                                        }
                                        delay={0.08}
                                    />
                                    <MetricCard
                                        label="Pharma Investment"
                                        value={simulationResult.investment}
                                        sentiment={getValueSentiment(simulationResult.investment)}
                                        delay={0.16}
                                    />
                                    <MetricCard
                                        label="Portfolio Value"
                                        value={simulationResult.portfolioValue}
                                        sentiment={getValueSentiment(
                                            simulationResult.portfolioValue
                                        )}
                                        delay={0.24}
                                    />
                                </div>

                                {/* Risk Score card (full width) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.32 }}
                                    className="glass-card rounded-xl p-4 flex items-center justify-between"
                                >
                                    <div className="flex flex-col gap-1">
                                        <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                                            Risk Score
                                        </p>
                                        <div className="flex items-baseline gap-2">
                                            <span
                                                className={`text-3xl font-bold ${
                                                    simulationResult.riskScore >= 70
                                                        ? "text-danger"
                                                        : simulationResult.riskScore >= 40
                                                        ? "text-warning"
                                                        : "text-success"
                                                }`}
                                            >
                                                <AnimatedCounter
                                                    value={simulationResult.riskScore}
                                                    suffix="/100"
                                                    duration={1.2}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-24 h-3 rounded-full bg-surface overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: `${simulationResult.riskScore}%`,
                                            }}
                                            transition={{ duration: 1.2, ease: "easeOut" }}
                                            className={`h-full rounded-full ${
                                                simulationResult.riskScore >= 70
                                                    ? "bg-danger"
                                                    : simulationResult.riskScore >= 40
                                                    ? "bg-warning"
                                                    : "bg-success"
                                            }`}
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}

                        {!running && !simulationResult && (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center border-dashed border-border bg-surface/30"
                            >
                                <Play size={48} className="text-text-muted mb-4 opacity-50" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Simulation Engine Idle
                                </h3>
                                <p className="text-text-secondary max-w-md">
                                    {selectedScenario
                                        ? `Scenario "${selectedScenario}" selected. Click Run Simulation to begin.`
                                        : "Select a portfolio and a stress test scenario, then click Run Simulation to view real-time financial and health impact modeling."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Scenario History */}
            <AnimatePresence>
                {history.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <GlassCard hoverLift={false} className="flex flex-col gap-4">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Clock size={18} className="text-text-secondary" /> Simulation
                                History
                            </h2>
                            <div className="flex flex-col gap-2">
                                {history.map((entry, i) => (
                                    <motion.div
                                        key={`${entry.scenario}-${entry.timestamp}`}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface/40 border border-border/40"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                                            <span className="font-medium text-sm">
                                                {entry.scenario}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <SentimentBadge
                                                sentiment={getRiskSentiment(entry.riskScore)}
                                                label={`Risk Score: ${entry.riskScore}`}
                                            />
                                            <span className="text-xs text-text-muted tabular-nums">
                                                {entry.timestamp}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
