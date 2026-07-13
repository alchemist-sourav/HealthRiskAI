"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    hoverLift?: boolean;
}

export default function GlassCard({ children, className = "", hoverLift = true, ...props }: GlassCardProps) {
    return (
        <motion.div
            className={`glass-card rounded-2xl p-6 ${className}`}
            whileHover={hoverLift ? { y: -5, transition: { duration: 0.2 } } : {}}
            {...props}
        >
            {children}
        </motion.div>
    );
}
