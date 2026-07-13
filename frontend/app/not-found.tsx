import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6 px-4">
      {/* Glow */}
      <div
        className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10"
        aria-hidden="true"
      />

      <div className="text-8xl font-black tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        404
      </div>

      <div className="flex flex-col gap-2 max-w-md">
        <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
        <p className="text-text-secondary text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Head back to the
          dashboard to continue your analysis.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/dashboard"
          className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-medium transition shadow-lg shadow-primary/20 text-sm"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/predict"
          className="bg-surface hover:bg-card text-white border border-border px-5 py-2.5 rounded-xl font-medium transition text-sm"
        >
          Analyze Patient
        </Link>
      </div>
    </div>
  );
}
