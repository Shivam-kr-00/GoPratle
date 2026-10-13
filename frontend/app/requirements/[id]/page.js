'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { api } from '@/lib/api';
import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';

const categoryLabels = {
  planner: 'Event Planner',
  performer: 'Performer',
  crew: 'Crew',
};

const formatDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
};

function RequirementDetailContent() {
  const params = useParams();
  const { id } = params || {};
  const [requirement, setRequirement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequirement = async () => {
      if (!id) {
        setLoading(false);
        setError('Missing route id.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await api.get(`/api/requirements/${id}`);
        setRequirement(response?.data || null);
      } catch (err) {
        setError(err?.message || 'Unable to load this requirement.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequirement();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <LoadingState message="Loading requirement details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ErrorState
          title="Requirement not found"
          message={error}
          action={
            <Link href="/requirements" className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
              Back to requirements
            </Link>
          }
        />
      </div>
    );
  }

  if (!requirement) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ErrorState title="No requirement found" message="The selected requirement could not be loaded." />
      </div>
    );
  }

  const details = requirement.details || {};

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Requirement detail</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">{requirement.eventName}</h1>
        </div>
        <Link
          href="/requirements"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to requirements
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">Overview</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{requirement.eventName}</h2>
              </div>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {categoryLabels[requirement.category] || requirement.category}
              </span>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Event type</dt>
                <dd className="mt-2 text-sm text-slate-800">{requirement.eventType || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Location</dt>
                <dd className="mt-2 text-sm text-slate-800">{requirement.location || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Start date</dt>
                <dd className="mt-2 text-sm text-slate-800">{formatDate(requirement.startDate)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">End date</dt>
                <dd className="mt-2 text-sm text-slate-800">{formatDate(requirement.endDate)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Venue</dt>
                <dd className="mt-2 text-sm text-slate-800">{requirement.venue || '—'}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">Category details</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {Object.entries(details).length > 0 ? (
                Object.entries(details).map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{key}</p>
                    <p className="mt-2 text-sm text-slate-800">{value || '—'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No extra details were submitted for this category.</p>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">Metadata</p>
            <dl className="mt-4 space-y-4 text-sm text-slate-700">
              <div>
                <dt className="font-medium text-slate-500">Requirement ID</dt>
                <dd className="mt-1 break-all text-slate-800">{requirement._id || '—'}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Created</dt>
                <dd className="mt-1 text-slate-800">{formatDate(requirement.createdAt)}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-500">Updated</dt>
                <dd className="mt-1 text-slate-800">{formatDate(requirement.updatedAt)}</dd>
              </div>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default function RequirementDetailPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading requirement details..." />}>
      <RequirementDetailContent />
    </Suspense>
  );
}
