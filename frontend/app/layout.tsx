import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "HealthRisk AI — Healthcare Intelligence Platform",
    template: "%s | HealthRisk AI",
  },
  description:
    "AI-powered healthcare intelligence platform. Predict heart disease, diabetes risk, and insurance premiums with production-grade machine learning models.",
  keywords: ["healthcare", "AI", "machine learning", "heart disease", "diabetes", "insurance", "risk prediction"],
  authors: [{ name: "Sourav" }],
  creator: "Sourav",
  openGraph: {
    title: "HealthRisk AI",
    description: "AI-powered healthcare intelligence platform",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        {/* Ambient animated gradient-mesh background */}
        <div className="app-bg" aria-hidden="true" />

        {/* Mobile Navigation overlay - only rendered on small screens */}
        <MobileNav />

        {/* Desktop layout */}
        <div className="hidden md:flex h-screen overflow-hidden p-4 gap-4 relative z-10">
          <Sidebar />
          <div className="flex-1 flex flex-col glass-panel overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-8 relative">
              <PageTransition>{children}</PageTransition>
            </main>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden flex-col min-h-screen relative z-10">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 pb-24">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </body>
    </html>
  );
}
