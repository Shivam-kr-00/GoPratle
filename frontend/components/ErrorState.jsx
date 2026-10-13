export default function ErrorState({ title = 'Something went wrong', message, action }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-left">
      <h3 className="text-lg font-semibold text-rose-900">{title}</h3>
      {message ? <p className="mt-2 text-sm text-rose-700">{message}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
