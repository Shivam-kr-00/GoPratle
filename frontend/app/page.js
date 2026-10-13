import Link from 'next/link';
import { ArrowRight, BriefcaseBusiness, CalendarRange, CheckCircle2, MapPin, Music4, Users2 } from 'lucide-react';

const categoryCards = [
  {
    title: 'Event Planner',
    description: 'Outline your event vision, budget, and all the services you need to deliver a flawless experience.',
    href: '/requirements/new',
    icon: BriefcaseBusiness,
    value: 'planner',
  },
  {
    title: 'Performer',
    description: 'Share the talent, timing, genre, and production requirements for your live performance needs.',
    href: '/requirements/new',
    icon: Music4,
    value: 'performer',
  },
  {
    title: 'Crew',
    description: 'Find the specialists, staffing levels, and hands-on support needed for smooth operations.',
    href: '/requirements/new',
    icon: Users2,
    value: 'crew',
  },
];

const processSteps = [
  {
    title: 'Share your event goals',
    description: 'Describe the event, timing, location, and the kind of support you need.',
    icon: CalendarRange,
  },
  {
    title: 'Choose the right category',
    description: 'Select planner, performer, or crew requirements to tighten the brief.',
    icon: MapPin,
  },
  {
    title: 'Review and submit',
    description: 'Check your details and send the requirement to the backend for processing.',
    icon: CheckCircle2,
  },
];

const advantages = [
  'Clear, guided requirement collection for every event type.',
  'Intuitive category-based form flow that keeps submissions organised.',
  'A central platform to manage event briefs and retrieve saved requirement details.',
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-12">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700">
              Event talent coordination
            </span>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Build your event brief without the guesswork.
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-8 text-slate-600">
              GoPratle helps you shape event requirements for planners, performers, and crew in one clean workflow.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/requirements/new"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Post an Event Requirement
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/requirements"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Browse requirements
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Upcoming requirement</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">Annual Music Festival</p>
                  </div>
                  <div className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">Performer</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="mt-2 font-semibold text-slate-900">New Delhi</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <p className="text-sm text-slate-500">Category</p>
                  <p className="mt-2 font-semibold text-slate-900">Performer</p>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                <p className="text-sm text-slate-500">Included needs</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1.5">Singer</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1.5">Rock genre</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1.5">Stage support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Categories</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Choose the right type of support</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categoryCards.map(({ title, description, href, icon: Icon, value }) => (
            <Link key={value} href={href} className="block h-full">
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700">
                  Get started <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">A simple path from request to delivery</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {processSteps.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">Why GoPratle</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Designed for modern event operations</h2>

          <div className="mt-6 space-y-4">
            {advantages.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-sm leading-7 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">Built for clarity</p>
          <h3 className="mt-3 text-2xl font-semibold text-slate-900">A cleaner, faster way to send event briefs</h3>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Submit a concise requirement, keep the event details centralised, and revisit saved briefs whenever you need a fast reference.
          </p>
          <Link
            href="/requirements/new"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Post an Event Requirement
          </Link>
        </div>
      </section>
    </div>
  );
}
