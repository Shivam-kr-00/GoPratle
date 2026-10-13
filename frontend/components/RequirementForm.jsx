'use client';

import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, ClipboardList, MapPin, Sparkles, Users } from 'lucide-react';

import { api } from '@/lib/api';
import CategoryCard from './CategoryCard';
import ProgressIndicator from './ProgressIndicator';

const categoryConfig = {
  planner: {
    title: 'Event Planner',
    description: 'Plan the event structure, scale, and service scope.',
    icon: ClipboardList,
  },
  performer: {
    title: 'Performer',
    description: 'Hire musicians, artists, and live performance talent.',
    icon: Sparkles,
  },
  crew: {
    title: 'Crew',
    description: 'Find the production crew and specialist support you need.',
    icon: Users,
  },
};

const steps = ['Event information', 'Details', 'Review'];

const emptyForm = {
  eventName: '',
  eventType: '',
  startDate: '',
  endDate: '',
  location: '',
  venue: '',
  category: '',
  details: {
    eventScale: '',
    servicesRequired: '',
    expectedBudget: '',
    additionalRequirements: '',
    performerType: '',
    genre: '',
    numberOfPerformers: '',
    crewRole: '',
    numberOfCrew: '',
    experienceLevel: '',
  },
};

const fieldLabels = {
  eventName: 'Event name',
  eventType: 'Event type',
  startDate: 'Start date',
  endDate: 'End date',
  location: 'Location',
  venue: 'Venue',
  category: 'Requirement category',
  eventScale: 'Event scale',
  servicesRequired: 'Services required',
  expectedBudget: 'Expected budget',
  additionalRequirements: 'Additional requirements',
  performerType: 'Performer type',
  genre: 'Genre / performance category',
  numberOfPerformers: 'Number of performers',
  crewRole: 'Crew role',
  numberOfCrew: 'Number of crew members',
  experienceLevel: 'Experience / skill level',
};

const parseNumeric = (value) => {
  if (value === '' || value === null || value === undefined) {
    return '';
  }
  const cleaned = String(value).trim();
  return cleaned === '' ? '' : Number(cleaned);
};

const getValidationErrors = (form) => {
  const errors = {};

  const eventName = String(form.eventName || '').trim();
  if (eventName.length < 3 || eventName.length > 100) {
    errors.eventName = 'Event name must be between 3 and 100 characters.';
  }

  if (!String(form.eventType || '').trim()) {
    errors.eventType = 'Event type is required.';
  }

  if (!String(form.startDate || '').trim()) {
    errors.startDate = 'Start date is required.';
  }

  if (!String(form.endDate || '').trim()) {
    errors.endDate = 'End date is required.';
  }

  if (form.startDate && form.endDate) {
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end < start) {
      errors.endDate = 'End date cannot be earlier than the start date.';
    }
  }

  if (!String(form.location || '').trim()) {
    errors.location = 'Location is required.';
  }

  if (!['planner', 'performer', 'crew'].includes(form.category)) {
    errors.category = 'Please choose a valid category.';
  }

  const categoryDetails = {};

  if (form.category === 'planner') {
    if (!String(form.details?.eventScale || '').trim()) {
      errors.eventScale = 'Event scale is required.';
    }
    if (!String(form.details?.servicesRequired || '').trim()) {
      errors.servicesRequired = 'Services required is required.';
    }
    if (parseNumeric(form.details?.expectedBudget) === '' && String(form.details?.expectedBudget || '').trim()) {
      errors.expectedBudget = 'Budget must be a valid number.';
    }
    if (Object.keys(form.details || {}).some((key) => ['eventScale', 'servicesRequired', 'expectedBudget', 'additionalRequirements'].includes(key) && String(form.details[key] || '').trim())) {
      // keep detail presence validation as above
    }
  }

  if (form.category === 'performer') {
    if (!String(form.details?.performerType || '').trim()) {
      errors.performerType = 'Performer type is required.';
    }
    if (!String(form.details?.genre || '').trim()) {
      errors.genre = 'Genre or performance category is required.';
    }
    if (parseNumeric(form.details?.numberOfPerformers) === '' && String(form.details?.numberOfPerformers || '').trim()) {
      errors.numberOfPerformers = 'Number of performers must be a valid number.';
    }
    if (parseNumeric(form.details?.expectedBudget) === '' && String(form.details?.expectedBudget || '').trim()) {
      errors.expectedBudget = 'Budget must be a valid number.';
    }
  }

  if (form.category === 'crew') {
    if (!String(form.details?.crewRole || '').trim()) {
      errors.crewRole = 'Crew role is required.';
    }
    if (!String(form.details?.experienceLevel || '').trim()) {
      errors.experienceLevel = 'Experience or skill level is required.';
    }
    if (parseNumeric(form.details?.numberOfCrew) === '' && String(form.details?.numberOfCrew || '').trim()) {
      errors.numberOfCrew = 'Number of crew members must be a valid number.';
    }
    if (parseNumeric(form.details?.expectedBudget) === '' && String(form.details?.expectedBudget || '').trim()) {
      errors.expectedBudget = 'Budget must be a valid number.';
    }
  }

  if (form.category) {
    const details = Object.entries(form.details || {}).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null && value !== undefined && String(value).trim() !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});

    if (Object.keys(details).length === 0) {
      errors.details = 'Category-specific details are required for the selected category.';
    }
  }

  return errors;
};

const getCategoryDetails = (form) => {
  if (!form.category) return {};

  if (form.category === 'planner') {
    return {
      eventScale: form.details.eventScale || '',
      servicesRequired: form.details.servicesRequired || '',
      expectedBudget: form.details.expectedBudget || '',
      additionalRequirements: form.details.additionalRequirements || '',
    };
  }

  if (form.category === 'performer') {
    return {
      performerType: form.details.performerType || '',
      genre: form.details.genre || '',
      numberOfPerformers: form.details.numberOfPerformers || '',
      expectedBudget: form.details.expectedBudget || '',
      additionalRequirements: form.details.additionalRequirements || '',
    };
  }

  return {
    crewRole: form.details.crewRole || '',
    numberOfCrew: form.details.numberOfCrew || '',
    experienceLevel: form.details.experienceLevel || '',
    expectedBudget: form.details.expectedBudget || '',
    additionalRequirements: form.details.additionalRequirements || '',
  };
};

export default function RequirementForm() {
  const [form, setForm] = useState(emptyForm);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const categorySummary = useMemo(() => categoryConfig[form.category] || null, [form.category]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const updateDetailField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      details: {
        ...previous.details,
        [field]: value,
      },
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      details: undefined,
    }));
  };

  const validateCurrentStep = () => {
    const nextErrors = {};

    if (currentStep === 0) {
      if (!String(form.eventName || '').trim() || form.eventName.trim().length < 3 || form.eventName.trim().length > 100) {
        nextErrors.eventName = 'Event name must be between 3 and 100 characters.';
      }
      if (!String(form.eventType || '').trim()) {
        nextErrors.eventType = 'Event type is required.';
      }
      if (!String(form.startDate || '').trim()) {
        nextErrors.startDate = 'Start date is required.';
      }
      if (!String(form.endDate || '').trim()) {
        nextErrors.endDate = 'End date is required.';
      }
      if (form.startDate && form.endDate) {
        const start = new Date(form.startDate);
        const end = new Date(form.endDate);
        if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end < start) {
          nextErrors.endDate = 'End date cannot be earlier than the start date.';
        }
      }
      if (!String(form.location || '').trim()) {
        nextErrors.location = 'Location is required.';
      }
      if (!['planner', 'performer', 'crew'].includes(form.category)) {
        nextErrors.category = 'Please select a valid category.';
      }
    }

    if (currentStep === 1) {
      const detailErrors = getValidationErrors(form);
      Object.assign(nextErrors, detailErrors);
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const moveToNextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        eventName: form.eventName.trim(),
        eventType: form.eventType.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        location: form.location.trim(),
        venue: form.venue.trim(),
        category: form.category,
        details: getCategoryDetails(form),
      };

      const response = await api.post('/api/requirements', payload);
      setSubmissionSuccess(response?.data || response || { _id: null });
    } catch (error) {
      const fieldMap = {
        eventName: 'eventName',
        eventType: 'eventType',
        startDate: 'startDate',
        endDate: 'endDate',
        location: 'location',
        venue: 'venue',
        category: 'category',
      };

      const backendErrors = Array.isArray(error?.errors) ? error.errors : [];
      const nextErrors = {};

      backendErrors.forEach((issue) => {
        const fieldName = issue?.field || issue?.path || '';
        const mappedField = fieldMap[fieldName] || fieldName;
        if (mappedField && !nextErrors[mappedField]) {
          nextErrors[mappedField] = issue.message || issue.error || 'Please check this field.';
        }
      });

      if (Object.keys(nextErrors).length) {
        setErrors(nextErrors);
      } else {
        setSubmitError(error?.message || 'Unable to create the requirement. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (field) => errors[field] ? <p className="mt-1 text-sm text-rose-600">{errors[field]}</p> : null;

  const renderStepContent = () => {
    if (currentStep === 0) {
      return (
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="eventName" className="mb-2 block text-sm font-medium text-slate-700">
                Event name <span className="text-rose-500">*</span>
              </label>
              <input
                id="eventName"
                value={form.eventName}
                onChange={(event) => updateField('eventName', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Annual Music Festival"
              />
              {renderFieldError('eventName')}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="eventType" className="mb-2 block text-sm font-medium text-slate-700">
                Event type <span className="text-rose-500">*</span>
              </label>
              <input
                id="eventType"
                value={form.eventType}
                onChange={(event) => updateField('eventType', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="Music Festival, Wedding, Corporate Summit"
              />
              {renderFieldError('eventType')}
            </div>

            <div>
              <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-slate-700">
                Start date <span className="text-rose-500">*</span>
              </label>
              <input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(event) => updateField('startDate', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              {renderFieldError('startDate')}
            </div>

            <div>
              <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-slate-700">
                End date <span className="text-rose-500">*</span>
              </label>
              <input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(event) => updateField('endDate', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              {renderFieldError('endDate')}
            </div>

            <div>
              <label htmlFor="location" className="mb-2 block text-sm font-medium text-slate-700">
                Location <span className="text-rose-500">*</span>
              </label>
              <input
                id="location"
                value={form.location}
                onChange={(event) => updateField('location', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="New Delhi"
              />
              {renderFieldError('location')}
            </div>

            <div>
              <label htmlFor="venue" className="mb-2 block text-sm font-medium text-slate-700">
                Venue
              </label>
              <input
                id="venue"
                value={form.venue}
                onChange={(event) => updateField('venue', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                placeholder="City Convention Centre"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 block text-sm font-medium text-slate-700">
              Requirement category <span className="text-rose-500">*</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(categoryConfig).map(([value, config]) => (
                <CategoryCard
                  key={value}
                  value={value}
                  title={config.title}
                  description={config.description}
                  icon={config.icon}
                  selected={form.category === value}
                  onClick={(selectedCategory) => updateField('category', selectedCategory)}
                />
              ))}
            </div>
            {renderFieldError('category')}
          </div>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          {form.category === 'planner' ? (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="eventScale" className="mb-2 block text-sm font-medium text-slate-700">Event scale or size</label>
                  <input
                    id="eventScale"
                    value={form.details.eventScale || ''}
                    onChange={(event) => updateDetailField('eventScale', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="Large-scale cultural festival"
                  />
                  {renderFieldError('eventScale')}
                </div>
                <div>
                  <label htmlFor="servicesRequired" className="mb-2 block text-sm font-medium text-slate-700">Services required</label>
                  <input
                    id="servicesRequired"
                    value={form.details.servicesRequired || ''}
                    onChange={(event) => updateDetailField('servicesRequired', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="Venue coordination, guest handling"
                  />
                  {renderFieldError('servicesRequired')}
                </div>
                <div>
                  <label htmlFor="expectedBudget" className="mb-2 block text-sm font-medium text-slate-700">Expected budget</label>
                  <input
                    id="expectedBudget"
                    type="number"
                    min="0"
                    value={form.details.expectedBudget || ''}
                    onChange={(event) => updateDetailField('expectedBudget', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="250000"
                  />
                  {renderFieldError('expectedBudget')}
                </div>
                <div>
                  <label htmlFor="additionalRequirements" className="mb-2 block text-sm font-medium text-slate-700">Additional requirements</label>
                  <input
                    id="additionalRequirements"
                    value={form.details.additionalRequirements || ''}
                    onChange={(event) => updateDetailField('additionalRequirements', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                    placeholder="Need onsite coordination and vendor management"
                  />
                </div>
              </div>
            </>
          ) : null}

          {form.category === 'performer' ? (
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="performerType" className="mb-2 block text-sm font-medium text-slate-700">Performer type</label>
                <input
                  id="performerType"
                  value={form.details.performerType || ''}
                  onChange={(event) => updateDetailField('performerType', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Singer, DJ, Stand-up Comedian"
                />
                {renderFieldError('performerType')}
              </div>
              <div>
                <label htmlFor="genre" className="mb-2 block text-sm font-medium text-slate-700">Genre / performance category</label>
                <input
                  id="genre"
                  value={form.details.genre || ''}
                  onChange={(event) => updateDetailField('genre', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Rock, Bollywood, Classical"
                />
                {renderFieldError('genre')}
              </div>
              <div>
                <label htmlFor="numberOfPerformers" className="mb-2 block text-sm font-medium text-slate-700">Number of performers</label>
                <input
                  id="numberOfPerformers"
                  type="number"
                  min="1"
                  value={form.details.numberOfPerformers || ''}
                  onChange={(event) => updateDetailField('numberOfPerformers', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="3"
                />
                {renderFieldError('numberOfPerformers')}
              </div>
              <div>
                <label htmlFor="expectedBudget" className="mb-2 block text-sm font-medium text-slate-700">Expected budget</label>
                <input
                  id="expectedBudget"
                  type="number"
                  min="0"
                  value={form.details.expectedBudget || ''}
                  onChange={(event) => updateDetailField('expectedBudget', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="25000"
                />
                {renderFieldError('expectedBudget')}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="additionalRequirements" className="mb-2 block text-sm font-medium text-slate-700">Additional requirements</label>
                <textarea
                  id="additionalRequirements"
                  rows={4}
                  value={form.details.additionalRequirements || ''}
                  onChange={(event) => updateDetailField('additionalRequirements', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Need a lead vocalist and backup musicians."
                />
              </div>
            </div>
          ) : null}

          {form.category === 'crew' ? (
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="crewRole" className="mb-2 block text-sm font-medium text-slate-700">Crew role or roles required</label>
                <input
                  id="crewRole"
                  value={form.details.crewRole || ''}
                  onChange={(event) => updateDetailField('crewRole', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Lighting technician, camera operator"
                />
                {renderFieldError('crewRole')}
              </div>
              <div>
                <label htmlFor="numberOfCrew" className="mb-2 block text-sm font-medium text-slate-700">Number of crew members</label>
                <input
                  id="numberOfCrew"
                  type="number"
                  min="1"
                  value={form.details.numberOfCrew || ''}
                  onChange={(event) => updateDetailField('numberOfCrew', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="8"
                />
                {renderFieldError('numberOfCrew')}
              </div>
              <div>
                <label htmlFor="experienceLevel" className="mb-2 block text-sm font-medium text-slate-700">Required experience or skill level</label>
                <input
                  id="experienceLevel"
                  value={form.details.experienceLevel || ''}
                  onChange={(event) => updateDetailField('experienceLevel', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="3+ years in live events"
                />
                {renderFieldError('experienceLevel')}
              </div>
              <div>
                <label htmlFor="expectedBudget" className="mb-2 block text-sm font-medium text-slate-700">Expected budget</label>
                <input
                  id="expectedBudget"
                  type="number"
                  min="0"
                  value={form.details.expectedBudget || ''}
                  onChange={(event) => updateDetailField('expectedBudget', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="70000"
                />
                {renderFieldError('expectedBudget')}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="additionalRequirements" className="mb-2 block text-sm font-medium text-slate-700">Additional requirements</label>
                <textarea
                  id="additionalRequirements"
                  rows={4}
                  value={form.details.additionalRequirements || ''}
                  onChange={(event) => updateDetailField('additionalRequirements', event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  placeholder="Need stage setup crew with sound engineering experience."
                />
              </div>
            </div>
          ) : null}

          {!form.category ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              Please select a category to continue.
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-900">Event information</h3>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Event name</dt>
              <dd className="mt-1 text-sm text-slate-800">{form.eventName || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Event type</dt>
              <dd className="mt-1 text-sm text-slate-800">{form.eventType || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Dates</dt>
              <dd className="mt-1 text-sm text-slate-800">
                {form.startDate} {form.endDate ? `to ${form.endDate}` : ''}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Location</dt>
              <dd className="mt-1 text-sm text-slate-800">{form.location || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Venue</dt>
              <dd className="mt-1 text-sm text-slate-800">{form.venue || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Category</dt>
              <dd className="mt-1 text-sm text-slate-800">{categorySummary?.title || form.category}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-900">Category-specific details</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            {Object.entries(getCategoryDetails(form)).length > 0 ? (
              Object.entries(getCategoryDetails(form)).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1 border-b border-slate-200 pb-2 last:border-b-0 last:pb-0">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{fieldLabels[key] || key}</span>
                  <span>{value || '—'}</span>
                </div>
              ))
            ) : (
              <span className="text-slate-500">No details provided.</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (submissionSuccess) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-5 text-2xl font-semibold text-emerald-900">Requirement submitted successfully</h2>
        <p className="mt-2 text-sm text-emerald-700">
          Your requirement has been saved. {submissionSuccess?._id ? `ID: ${submissionSuccess._id}` : ''}
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`/requirements/${submissionSuccess?._id}`}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            View saved requirement
          </a>
          <a
            href="/requirements"
            className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Back to requirements
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">New requirement</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">Tell us about your event</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 sm:flex">
            <CalendarDays className="h-4 w-4 text-indigo-600" />
            <span>Step {currentStep + 1} of {steps.length}</span>
          </div>
        </div>

        <ProgressIndicator currentStep={currentStep} steps={steps} />

        {submitError ? (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {submitError}
          </div>
        ) : null}

        <div className="min-h-[360px]">{renderStepContent()}</div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={currentStep === 0 || isSubmitting}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={moveToNextStep}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit requirement'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
