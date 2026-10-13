import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-semibold text-slate-900">GoPratle</div>
            <p className="mt-2 max-w-md text-sm text-slate-600">
              Match the right professionals for your next event with a clear, guided requirement process.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-slate-600">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <Link href="/requirements" className="hover:text-slate-900">Requirements</Link>
            <Link href="/requirements/new" className="hover:text-slate-900">Post a requirement</Link>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
          © 2026 GoPratle. Built for event planning and talent coordination.
        </div>
      </div>
    </footer>
  );
}
