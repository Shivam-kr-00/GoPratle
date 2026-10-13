import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="GoPratle home">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
            G
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">GoPratle</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition hover:text-slate-900">Home</Link>
          <Link href="/requirements" className="transition hover:text-slate-900">Requirements</Link>
          <Link href="/requirements/new" className="transition hover:text-slate-900">New requirement</Link>
        </div>

        <Link
          href="/requirements/new"
          className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
        >
          Post an Event Requirement
        </Link>
      </nav>
    </header>
  );
}
