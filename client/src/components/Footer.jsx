import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-sand-soft">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-4">
          <div className="sm:col-span-2 max-w-sm">
            <p className="text-white font-display text-2xl flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-brand" />
              HOMIGO
            </p>
            <p className="mt-4 text-sm text-sand-soft/70 leading-relaxed">
              A city-based accommodation platform for students and working
              professionals — find flats, rooms, and the right people to live
              with.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/properties" className="hover:text-white transition">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link to="/roommates" className="hover:text-white transition">
                  Find Roommates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">
              Account
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/register" className="hover:text-white transition">
                  Sign up
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition">
                  Log in
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-sand-soft/50 tracking-wide">
          <p>HOMIGO — a MERN college project · 2026</p>
          <p>Find your home. Find your people.</p>
        </div>
      </div>
    </footer>
  );
}
