"use client";
import { useEffect } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
    decimals?: number;
}

export default function AnimatedCounter({ value, prefix = "", suffix = "", duration = 1.5, decimals = 0 }: AnimatedCounterProps) {
    const spring = useSpring(value, { duration: duration * 1000, bounce: 0 });

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    const display = useTransform(spring, (current) => {
        return prefix + current.toFixed(decimals) + suffix;
    });

    return <motion.span>{display}</motion.span>;
}
