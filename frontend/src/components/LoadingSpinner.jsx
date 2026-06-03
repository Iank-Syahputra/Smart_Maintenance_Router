export default function LoadingSpinner({ fullScreen = false }) {
  const cls = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white/80 z-50"
    : "flex items-center justify-center py-12";

  return (
    <div className={cls}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <span className="text-sm text-gray-500">Memuat...</span>
      </div>
    </div>
  );
}
