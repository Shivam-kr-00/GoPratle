'use client';

import Link from 'next/link';

import RequirementsList from '@/components/RequirementsList';

export default function RequirementsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Saved requirements</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Event requirements</h1>
        </div>
        <Link
          href="/requirements/new"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Create a requirement
        </Link>
      </div>

      <RequirementsList />
    </div>
  );
}
