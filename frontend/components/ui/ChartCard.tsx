import GlassCard from "./GlassCard";
import { ReactNode } from "react";

interface ChartCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export default function ChartCard({ title, icon, children }: ChartCardProps) {
    return (
        <GlassCard className="flex flex-col h-full" hoverLift={false}>
            <div className="flex items-center gap-2 mb-4">
                <div className="text-secondary">{icon}</div>
                <h3 className="font-semibold text-lg">{title}</h3>
            </div>
            <div className="flex-1 w-full h-[300px]">
                {children}
            </div>
        </GlassCard>
    );
}
