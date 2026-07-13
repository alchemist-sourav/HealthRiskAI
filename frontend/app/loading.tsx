export default function Loading() {
  return (
    <div
      className="flex items-center justify-center h-full min-h-[60vh]"
      role="status"
      aria-label="Loading page content"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-surface" aria-hidden="true" />
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
            aria-hidden="true"
          />
        </div>
        <p className="text-text-secondary text-sm font-medium">Loading…</p>
      </div>
    </div>
  );
}
