"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import GlassCard from "@/components/ui/GlassCard";
import ProgressRing from "@/components/ui/ProgressRing";
import RiskBadge from "@/components/ui/RiskBadge";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import {
    Stethoscope, Activity, Heart, Droplets, ShieldAlert, Shield,
    TrendingDown, Waves, GitBranch, Network, Dna, FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PredictionResult {
    heart: { risk_level: string; risk_probability: string };
    diabetes: { risk_level: string; risk_probability: string };
    insurance: { predicted_charges: number };
}

function getRiskDescription(riskLevel: string): string {
    const level = riskLevel.toLowerCase();
    if (level === "low") return "Low cardiovascular risk detected";
    if (level === "medium" || level === "moderate") return "Moderate risk - monitoring recommended";
    return "High risk - immediate consultation advised";
}

export default function PredictPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        age: 45, sex: "male", bmi: 28, children: 0, smoker: "no", region: "southwest",
        Pregnancies: 1, Glucose: 120, BloodPressure: 80, SkinThickness: 20, Insulin: 80, DiabetesPedigreeFunction: 0.5,
        cp: 0, trestbps: 120, chol: 220, fbs: 0, restecg: 0, thalach: 150, exang: 0, oldpeak: 1, slope: 2, ca: 0, thal: 2,
    });
    const [result, setResult] = useState<PredictionResult | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: isNaN(Number(value)) || value === "male" || value === "female" || value === "yes" || value === "no" || (typeof value === "string" && ["southwest", "southeast", "northwest", "northeast"].includes(value)) ? value : Number(value)
        }));
    };

    async function analyze() {
        setLoading(true);
        setResult(null); // clear old results
        try {
            const [insurance, heart, diabetes] = await Promise.all([
                api.post("/predict/insurance", {
                    age: form.age, sex: form.sex, bmi: form.bmi, children: form.children, smoker: form.smoker, region: form.region,
                }),
                api.post("/predict/heart", {
                    age: form.age, sex: form.sex === "male" ? 1 : 0, cp: form.cp, trestbps: form.trestbps, chol: form.chol, fbs: form.fbs, restecg: form.restecg, thalach: form.thalach, exang: form.exang, oldpeak: form.oldpeak, slope: form.slope, ca: form.ca, thal: form.thal,
                }),
                api.post("/predict/diabetes", {
                    Pregnancies: form.Pregnancies, Glucose: form.Glucose, BloodPressure: form.BloodPressure, SkinThickness: form.SkinThickness, Insulin: form.Insulin, BMI: form.bmi, DiabetesPedigreeFunction: form.DiabetesPedigreeFunction, Age: form.age,
                }),
            ]);

            setResult({ insurance: insurance.data, heart: heart.data, diabetes: diabetes.data });
        } catch (error) {
            console.error("Prediction failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const renderInput = (label: string, name: string, type: string = "number") => (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</label>
            <input
                type={type} name={name} value={form[name as keyof typeof form]} onChange={handleInputChange}
                className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
            />
        </div>
    );

    const renderSelect = (label: string, name: string, options: { value: string; label: string }[]) => (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-secondary uppercase tracking-wider">{label}</label>
            <select
                name={name} value={form[name as keyof typeof form]} onChange={handleInputChange}
                className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition appearance-none"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );

    const getRiskColor = (prob: number) => {
        if (prob < 30) return "var(--success)";
        if (prob < 70) return "var(--warning)";
        return "var(--danger)";
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Patient Analysis</h1>
                    <p className="text-text-secondary">Enter patient parameters to generate AI risk predictions.</p>
                </div>
                {/* Animated submit button */}
                <motion.button
                    onClick={analyze}
                    disabled={loading}
                    animate={loading ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                    transition={loading ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-medium transition flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-primary/20 sticky top-4 z-50"
                >
                    <Stethoscope size={18} /> {loading ? "Analyzing..." : "Analyze Patient"}
                </motion.button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Form Sections */}
                <div className="xl:col-span-2 flex flex-col gap-6">
                    {/* Section 1: General & Lifestyle */}
                    <GlassCard hoverLift={false} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-border pb-3">
                            <Activity size={18} className="text-primary" />
                            <h2 className="font-semibold text-lg">General &amp; Lifestyle</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {renderInput("Age", "age")}
                            {renderSelect("Sex", "sex", [{ value: "male", label: "Male" }, { value: "female", label: "Female" }])}
                            {renderInput("BMI", "bmi")}
                            {renderInput("Children", "children")}
                            {renderSelect("Smoker", "smoker", [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }])}
                            {renderSelect("Region", "region", [{ value: "southwest", label: "Southwest" }, { value: "southeast", label: "Southeast" }, { value: "northwest", label: "Northwest" }, { value: "northeast", label: "Northeast" }])}
                        </div>
                    </GlassCard>

                    {/* Section 2: Cardiovascular Parameters */}
                    <GlassCard hoverLift={false} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-border pb-3">
                            <Heart size={18} className="text-danger" />
                            <h2 className="font-semibold text-lg">Cardiovascular Parameters</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {renderInput("Chest Pain (cp)", "cp")}
                            {renderInput("Resting BP", "trestbps")}
                            {renderInput("Cholesterol", "chol")}
                            {renderInput("Fasting Blood Sugar", "fbs")}
                            {renderInput("Rest ECG", "restecg")}
                            {renderInput("Max Heart Rate", "thalach")}
                        </div>
                    </GlassCard>

                    {/* Section 3: Metabolic Parameters */}
                    <GlassCard hoverLift={false} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-border pb-3">
                            <Droplets size={18} className="text-secondary" />
                            <h2 className="font-semibold text-lg">Metabolic Parameters</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {renderInput("Pregnancies", "Pregnancies")}
                            {renderInput("Glucose", "Glucose")}
                            {renderInput("Blood Pressure", "BloodPressure")}
                            {renderInput("Skin Thickness", "SkinThickness")}
                            {renderInput("Insulin", "Insulin")}
                            {renderInput("Diabetes Pedigree", "DiabetesPedigreeFunction", "number")}
                        </div>
                    </GlassCard>

                    {/* Section 4: Cardiovascular Extension */}
                    <GlassCard hoverLift={false} className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-border pb-3">
                            <Network size={18} className="text-primary" />
                            <h2 className="font-semibold text-lg">Advanced Cardiovascular</h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                    <Activity size={12} className="text-warning" /> Exercise Angina
                                </label>
                                <select
                                    name="exang"
                                    value={form.exang}
                                    onChange={handleInputChange}
                                    className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition appearance-none"
                                >
                                    <option value={0}>No</option>
                                    <option value={1}>Yes</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                    <TrendingDown size={12} className="text-danger" /> ST Depression
                                </label>
                                <input
                                    type="number"
                                    name="oldpeak"
                                    value={form.oldpeak}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    min={0}
                                    className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                    <Waves size={12} className="text-secondary" /> Slope of ST (0–2)
                                </label>
                                <input
                                    type="number"
                                    name="slope"
                                    value={form.slope}
                                    onChange={handleInputChange}
                                    min={0}
                                    max={2}
                                    className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                    <GitBranch size={12} className="text-success" /> Number of Vessels (0–3)
                                </label>
                                <input
                                    type="number"
                                    name="ca"
                                    value={form.ca}
                                    onChange={handleInputChange}
                                    min={0}
                                    max={3}
                                    className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-text-secondary uppercase tracking-wider flex items-center gap-1">
                                    <Dna size={12} className="text-primary" /> Thalassemia
                                </label>
                                <select
                                    name="thal"
                                    value={form.thal}
                                    onChange={handleInputChange}
                                    className="bg-surface border border-border text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition appearance-none"
                                >
                                    <option value={2}>Normal (2)</option>
                                    <option value={1}>Fixed Defect (1)</option>
                                    <option value={3}>Reversable Defect (3)</option>
                                </select>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Results Column */}
                <div className="flex flex-col gap-6">
                    {loading && (
                        <div className="flex flex-col gap-4">
                            <LoadingSkeleton />
                        </div>
                    )}

                    {!loading && result && (
                        <AnimatePresence>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
                                {/* Heart Disease Card */}
                                <GlassCard className="relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                                        <Heart size={80} className="text-danger" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Heart className="text-danger" size={18} /> Heart Disease
                                    </h3>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                                            <RiskBadge level={result.heart.risk_level} />
                                            <p className="text-2xl font-bold text-white">
                                                {Math.round(parseFloat(result.heart.risk_probability) * 100)}%
                                            </p>
                                            <p className="text-xs text-text-secondary leading-snug">
                                                {getRiskDescription(result.heart.risk_level)}
                                            </p>
                                        </div>
                                        <ProgressRing
                                            progress={parseFloat(result.heart.risk_probability) * 100}
                                            size={70}
                                            strokeWidth={6}
                                            color={getRiskColor(parseFloat(result.heart.risk_probability) * 100)}
                                        />
                                    </div>
                                </GlassCard>

                                {/* Diabetes Risk Card */}
                                <GlassCard className="relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                                        <ShieldAlert size={80} className="text-warning" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Activity className="text-warning" size={18} /> Diabetes Risk
                                    </h3>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col gap-2 flex-1 min-w-0">
                                            <RiskBadge level={result.diabetes.risk_level} />
                                            <p className="text-2xl font-bold text-white">
                                                {Math.round(parseFloat(result.diabetes.risk_probability) * 100)}%
                                            </p>
                                            <p className="text-xs text-text-secondary leading-snug">
                                                {getRiskDescription(result.diabetes.risk_level)}
                                            </p>
                                        </div>
                                        <ProgressRing
                                            progress={parseFloat(result.diabetes.risk_probability) * 100}
                                            size={70}
                                            strokeWidth={6}
                                            color={getRiskColor(parseFloat(result.diabetes.risk_probability) * 100)}
                                        />
                                    </div>
                                </GlassCard>

                                {/* Insurance Card */}
                                <GlassCard className="relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                                        <Shield size={80} className="text-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Shield className="text-primary" size={18} /> Insurance Financials
                                    </h3>
                                    <div>
                                        <p className="text-sm text-text-secondary mb-1">Predicted Annual Premium</p>
                                        <p className="text-3xl font-bold text-success">
                                            ₹{result.insurance.predicted_charges.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                        </p>
                                    </div>
                                </GlassCard>

                                {/* View Full Report Button */}
                                <Link href="/report">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-2 w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/60 text-primary font-semibold py-3 px-4 rounded-xl transition cursor-pointer"
                                    >
                                        <FileText size={16} />
                                        View Full Report
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    )}

                    {!loading && !result && (
                        <div className="h-full flex flex-col items-center justify-center text-text-muted border border-dashed border-border rounded-xl bg-surface/30 p-8 text-center min-h-[400px]">
                            <Stethoscope size={48} className="opacity-30 mb-4" />
                            <p>Fill out the parameters and click Analyze to view patient risk predictions.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
