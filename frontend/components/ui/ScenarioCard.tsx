import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScenarioCardProps {
    title: string;
    description: string;
    icon: ReactNode;
    colorClass: string; // e.g. "danger"
    onClick?: () => void;
}

export default function ScenarioCard({ title, description, icon, colorClass, onClick }: ScenarioCardProps) {
    return (
        <motion.div whileHover={{ scale: 1.02 }} className="cursor-pointer h-full" onClick={onClick}>
            <GlassCard hoverLift={false} className={`h-full border border-border hover:border-[var(--${colorClass})] transition-colors`}>
                <div className={`w-10 h-10 rounded-xl bg-[var(--${colorClass})]/10 flex items-center justify-center text-[var(--${colorClass})] mb-4`}>
                    {icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-text-secondary text-sm">{description}</p>
            </GlassCard>
        </motion.div>
    );
}
