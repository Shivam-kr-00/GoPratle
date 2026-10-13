export default function CategoryCard({ title, description, value, icon: Icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      aria-pressed={selected}
      className={[
        'group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200',
        selected
          ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-2 ring-indigo-200'
          : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
          selected ? 'border-indigo-500 bg-indigo-600 text-white' : 'border-slate-200 bg-slate-50 text-slate-700',
        ].join(' ')}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <div className="text-base font-semibold text-slate-900">{title}</div>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </button>
  );
}
