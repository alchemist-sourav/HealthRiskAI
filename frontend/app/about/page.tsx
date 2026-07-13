"use client";

import GlassCard from "@/components/ui/GlassCard";
import {
    GitBranch,
    ExternalLink,
    Database,
    Cpu,
    Code2,
    Globe,
    BookOpen,
    Users,
    Trophy,
    Layers,
} from "lucide-react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────────

interface StackItem {
    icon: React.ReactNode;
    title: string;
    items: string[];
    gradient: string;
}

interface Dataset {
    name: string;
    source: string;
    patients: string;
    features: string;
    description: string;
}

interface ModelMetric {
    model: string;
    algorithm: string;
    accuracy: string;
    precision: string;
    recall: string;
    f1: string;
    highlight?: string;
}

interface FutureCard {
    icon: React.ReactNode;
    title: string;
    description: string;
    tag: string;
}

const STACK_CARDS: StackItem[] = [
    {
        icon: <Code2 size={22} />,
        title: "Frontend Stack",
        gradient: "from-[var(--primary)] to-[var(--accent-purple)]",
        items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Recharts"],
    },
    {
        icon: <Cpu size={22} />,
        title: "Backend Stack",
        gradient: "from-[var(--secondary)] to-[var(--primary)]",
        items: ["FastAPI", "Python 3.13", "Scikit-learn", "Pandas", "NumPy", "Uvicorn"],
    },
    {
        icon: <Layers size={22} />,
        title: "ML Models",
        gradient: "from-[var(--accent-purple)] to-[var(--danger)]",
        items: [
            "Random Forest (Heart)",
            "Gradient Boosting (Diabetes)",
            "Linear Regression (Insurance)",
        ],
    },
];

const DATASETS: Dataset[] = [
    {
        name: "Cleveland Heart Disease Dataset",
        source: "UCI ML Repository",
        patients: "303 patients",
        features: "14 features",
        description:
            "Classic benchmark dataset containing clinical measurements such as chest pain type, resting ECG, and thalassemia to predict the presence of heart disease.",
    },
    {
        name: "PIMA Indians Diabetes Dataset",
        source: "Kaggle",
        patients: "768 patients",
        features: "8 features",
        description:
            "Female patients of Pima Indian heritage, recording glucose levels, BMI, insulin, and family history to predict the onset of Type-2 diabetes.",
    },
    {
        name: "Medical Insurance Dataset",
        source: "Kaggle",
        patients: "1,338 records",
        features: "7 features",
        description:
            "US medical insurance costs including age, sex, BMI, smoking status, and region — used to estimate annual insurance premium charges via regression.",
    },
];

const MODEL_METRICS: ModelMetric[] = [
    {
        model: "Heart Disease",
        algorithm: "Random Forest",
        accuracy: "92.1%",
        precision: "89.3%",
        recall: "88.7%",
        f1: "89.0%",
    },
    {
        model: "Diabetes",
        algorithm: "Gradient Boosting",
        accuracy: "87.8%",
        precision: "85.1%",
        recall: "86.9%",
        f1: "86.0%",
    },
    {
        model: "Insurance Premium",
        algorithm: "Linear Regression",
        accuracy: "94.5%",
        precision: "—",
        recall: "—",
        f1: "—",
        highlight: "R²: 0.87",
    },
];

const TECH_TAGS = ["React", "Python", "Machine Learning", "FastAPI", "Next.js"];

const FUTURE_CARDS: FutureCard[] = [
    {
        icon: <Globe size={20} />,
        title: "Real-time Patient Monitoring",
        description:
            "Integrate IoT-enabled wearable devices to stream live vitals and trigger dynamic risk re-assessments in real time.",
        tag: "IoT Integration",
    },
    {
        icon: <BookOpen size={20} />,
        title: "NLP Medical Records",
        description:
            "Leverage GPT-based large language models to parse and summarize unstructured clinical notes and physician reports automatically.",
        tag: "GPT Summarization",
    },
    {
        icon: <Database size={20} />,
        title: "Blockchain Medical Records",
        description:
            "Store patient records on an immutable, decentralized ledger to ensure auditability, data integrity, and HIPAA-grade privacy.",
        tag: "Secure & Immutable",
    },
    {
        icon: <Users size={20} />,
        title: "Multi-language Support",
        description:
            "Localize the platform for multiple languages and regions, making AI-powered health risk analysis accessible globally.",
        tag: "Global Accessibility",
    },
];

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" as const },
    }),
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
    return (
        <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center gap-3">
                <span className="text-[var(--primary)]">{icon}</span>
                <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            {subtitle && <p className="text-sm text-[var(--text-secondary)] pl-9">{subtitle}</p>}
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-16 pb-16 px-4">

            {/* ── Hero ── */}
            <section className="flex flex-col items-center text-center gap-6 pt-10">
                <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary)]"
                >
                    <Trophy size={13} />
                    Final Year Capstone Project
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent-purple)] bg-clip-text text-transparent"
                >
                    HealthRisk AI
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-[var(--text-secondary)] text-lg leading-relaxed"
                >
                    A production-grade, full-stack AI platform that predicts cardiovascular disease, diabetes risk, and medical insurance premiums — empowering clinicians and analysts with real-time, data-driven insights.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Link
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold text-sm transition-colors duration-200"
                    >
                        <GitBranch size={16} />
                        View Source Code
                    </Link>
                    <Link
                        href="http://127.0.0.1:8000/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 text-white font-semibold text-sm transition-colors duration-200"
                    >
                        <ExternalLink size={16} />
                        Live API Docs
                    </Link>
                </motion.div>
            </section>

            {/* ── Architecture ── */}
            <section>
                <SectionHeader
                    icon={<Layers size={22} />}
                    title="System Architecture"
                    subtitle="A modern, decoupled architecture built for scalability and developer experience."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {STACK_CARDS.map((card, i) => (
                        <motion.div
                            key={card.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <GlassCard className="flex flex-col gap-4 h-full">
                                <div className={`flex items-center gap-3`}>
                                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.gradient} text-white`}>
                                        {card.icon}
                                    </div>
                                    <h3 className="font-bold text-white text-base">{card.title}</h3>
                                </div>
                                <ul className="flex flex-col gap-2">
                                    {card.items.map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${card.gradient} flex-shrink-0`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Datasets ── */}
            <section>
                <SectionHeader
                    icon={<Database size={22} />}
                    title="Datasets"
                    subtitle="Real-world clinical datasets used for training and evaluating the ML models."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {DATASETS.map((ds, i) => (
                        <motion.div
                            key={ds.name}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <GlassCard className="flex flex-col gap-3 h-full">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-lg bg-[var(--secondary)]/15 text-[var(--secondary)] mt-0.5 flex-shrink-0">
                                        <Database size={16} />
                                    </div>
                                    <h3 className="font-bold text-white text-sm leading-snug">{ds.name}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--primary)]/15 text-[var(--primary)]">
                                        {ds.patients}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--accent-purple)]/15 text-[var(--accent-purple)]">
                                        {ds.features}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--secondary)]/15 text-[var(--secondary)]">
                                        {ds.source}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{ds.description}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── ML Performance ── */}
            <section>
                <SectionHeader
                    icon={<Trophy size={22} />}
                    title="Model Performance"
                    subtitle="Benchmark metrics evaluated on held-out test sets using stratified k-fold cross-validation."
                />
                <GlassCard hoverLift={false} className="overflow-hidden p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[var(--border)] bg-white/[0.03]">
                                    {["Model", "Algorithm", "Accuracy", "Precision", "Recall", "F1 Score"].map((h) => (
                                        <th
                                            key={h}
                                            className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {MODEL_METRICS.map((row, i) => (
                                    <motion.tr
                                        key={row.model}
                                        custom={i}
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="border-b border-[var(--border)] last:border-0 hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-5 py-4 font-semibold text-white whitespace-nowrap">{row.model}</td>
                                        <td className="px-5 py-4 text-[var(--text-secondary)] whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">
                                                {row.algorithm}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 font-bold text-[var(--success)]">{row.accuracy}</td>
                                        <td className="px-5 py-4 text-[var(--text-secondary)]">{row.precision}</td>
                                        <td className="px-5 py-4 text-[var(--text-secondary)]">{row.recall}</td>
                                        <td className="px-5 py-4 text-[var(--text-secondary)]">
                                            {row.f1}
                                            {row.highlight && (
                                                <span className="ml-2 px-2 py-0.5 rounded bg-[var(--accent-purple)]/15 text-[var(--accent-purple)] text-xs font-semibold">
                                                    {row.highlight}
                                                </span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </section>

            {/* ── Developer ── */}
            <section>
                <SectionHeader
                    icon={<Users size={22} />}
                    title="Meet the Developer"
                    subtitle="Built end-to-end by a single full-stack ML engineer."
                />
                <motion.div
                    variants={fadeUp}
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-lg"
                >
                    <GlassCard className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Avatar */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent-purple)] flex items-center justify-center text-2xl font-extrabold text-white shadow-lg">
                            S
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-3 flex-1">
                            <div>
                                <h3 className="text-xl font-bold text-white">Sourav</h3>
                                <p className="text-sm font-medium text-[var(--primary)]">Full Stack ML Engineer</p>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                Final year computer science student with expertise in machine learning and full-stack development.
                            </p>

                            {/* Links */}
                            <div className="flex gap-4">
                                <Link
                                    href="#"
                                    className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
                                >
                                    <GitBranch size={14} />
                                    GitHub
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
                                >
                                    <Globe size={14} />
                                    Portfolio
                                </Link>
                            </div>

                            {/* Tech tags */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                {TECH_TAGS.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            </section>

            {/* ── Future Scope ── */}
            <section>
                <SectionHeader
                    icon={<BookOpen size={22} />}
                    title="Future Scope"
                    subtitle="Planned enhancements to extend the platform's capabilities and reach."
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {FUTURE_CARDS.map((card, i) => (
                        <motion.div
                            key={card.title}
                            custom={i}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <GlassCard className="flex flex-col gap-3 h-full">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-[var(--accent-purple)]/15 text-[var(--accent-purple)]">
                                        {card.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">{card.title}</h3>
                                        <span className="text-xs text-[var(--accent-purple)] font-medium">{card.tag}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{card.description}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </section>

        </div>
    );
}
