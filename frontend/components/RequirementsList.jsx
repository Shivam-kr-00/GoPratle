'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { api } from '@/lib/api';
import ErrorState from './ErrorState';
import LoadingState from './LoadingState';
import RequirementCard from './RequirementCard';

export default function RequirementsList() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRequirements = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/api/requirements');
      setRequirements(Array.isArray(response?.data) ? response.data : []);
    } catch (err) {
      setError(err?.message || 'Unable to load requirements at the moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  if (loading) {
    return <LoadingState message="Loading saved requirements..." />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load requirements"
        message={error}
        action={
          <button
            type="button"
            onClick={loadRequirements}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Retry
          </button>
        }
      />
    );
  }

  if (requirements.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <h3 className="text-xl font-semibold text-slate-900">No requirements yet</h3>
        <p className="mt-2 text-sm text-slate-600">Create your first event requirement to get started.</p>
        <Link
          href="/requirements/new"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Create a requirement
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {requirements.map((requirement) => (
        <RequirementCard key={requirement._id || requirement.id} requirement={requirement} />
      ))}
    </div>
  );
}
