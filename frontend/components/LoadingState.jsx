export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-8">
      <div className="flex items-center gap-3 text-slate-600">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
