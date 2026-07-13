"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console in dev; replace with error tracking service in prod
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-text-primary min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-danger/10 border border-danger/20 flex items-center justify-center">
            <AlertTriangle size={32} className="text-danger" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
            <p className="text-text-secondary text-sm leading-relaxed">
              An unexpected error occurred. This is likely a temporary issue.
              {error.digest && (
                <span className="block mt-1 text-text-muted text-xs">Error ID: {error.digest}</span>
              )}
            </p>
          </div>
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-medium transition"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
