export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900">

      <div className="h-56 bg-slate-800"></div>

      <div className="space-y-3 p-4">

        <div className="h-6 w-3/4 rounded bg-slate-800"></div>

        <div className="h-4 w-1/3 rounded bg-slate-800"></div>

        <div className="h-4 w-1/2 rounded bg-slate-800"></div>

      </div>

    </div>
  );
}