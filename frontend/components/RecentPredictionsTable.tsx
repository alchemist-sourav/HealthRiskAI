"use client";

import GlassCard from "./ui/GlassCard";
import RiskBadge from "./ui/RiskBadge";

const mockPredictions = [
    { id: "PAT-001", age: 45, heart: "Low", diabetes: "Medium", premium: "₹14,250", date: "Today, 10:45 AM" },
    { id: "PAT-002", age: 62, heart: "High", diabetes: "High", premium: "₹32,100", date: "Today, 09:12 AM" },
    { id: "PAT-003", age: 31, heart: "Low", diabetes: "Low", premium: "₹8,400", date: "Yesterday, 14:30 PM" },
    { id: "PAT-004", age: 55, heart: "Medium", diabetes: "Low", premium: "₹18,900", date: "Yesterday, 11:20 AM" },
];

export default function RecentPredictionsTable() {
    return (
        <GlassCard className="w-full overflow-hidden" hoverLift={false}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Recent Predictions</h3>
                <button className="text-sm text-primary hover:text-primary-hover font-medium">View All</button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-border text-text-secondary text-sm">
                            <th className="pb-3 font-medium px-4">Patient ID</th>
                            <th className="pb-3 font-medium px-4">Age</th>
                            <th className="pb-3 font-medium px-4">Heart Risk</th>
                            <th className="pb-3 font-medium px-4">Diabetes Risk</th>
                            <th className="pb-3 font-medium px-4">Est. Premium</th>
                            <th className="pb-3 font-medium px-4 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockPredictions.map((row, idx) => (
                            <tr key={idx} className="border-b border-border/50 hover:bg-surface/50 transition-colors group">
                                <td className="py-4 px-4 font-medium text-white">{row.id}</td>
                                <td className="py-4 px-4 text-text-secondary">{row.age}</td>
                                <td className="py-4 px-4"><RiskBadge level={row.heart} /></td>
                                <td className="py-4 px-4"><RiskBadge level={row.diabetes} /></td>
                                <td className="py-4 px-4 font-medium">{row.premium}</td>
                                <td className="py-4 px-4 text-right text-text-secondary text-sm">{row.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassCard>
    );
}
