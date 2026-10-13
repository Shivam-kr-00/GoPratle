export default function ProgressIndicator({ currentStep, steps }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div
                className={[
                  'flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold',
                  isActive
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : isComplete
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-slate-300 bg-white text-slate-500',
                ].join(' ')}
              >
                {index + 1}
              </div>
              <span className={isActive ? 'text-slate-900' : 'text-slate-500'}>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
