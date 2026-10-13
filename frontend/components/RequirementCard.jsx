import Link from 'next/link';

const categoryLabels = {
  planner: 'Event Planner',
  performer: 'Performer',
  crew: 'Crew',
};

const formatDate = (value) => {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export default function RequirementCard({ requirement }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
            {categoryLabels[requirement.category] || requirement.category}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{requirement.eventName}</h3>
        </div>

        <Link
          href={`/requirements/${requirement._id}`}
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
        >
          View Details
        </Link>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <span className="font-medium text-slate-500">Event type:</span> {requirement.eventType || '—'}
        </div>
        <div>
          <span className="font-medium text-slate-500">Location:</span> {requirement.location || '—'}
        </div>
        <div>
          <span className="font-medium text-slate-500">Dates:</span>{' '}
          {requirement.startDate && requirement.endDate
            ? `${formatDate(requirement.startDate)} to ${formatDate(requirement.endDate)}`
            : formatDate(requirement.startDate) || '—'}
        </div>
        <div>
          <span className="font-medium text-slate-500">Created:</span> {formatDate(requirement.createdAt)}
        </div>
      </div>
    </article>
  );
}
