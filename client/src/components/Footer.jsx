import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-sand-soft">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-3">
        <div>
          <p className="text-white font-bold text-xl flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand" />
            HOMIGO
          </p>
          <p className="mt-3 text-sm text-sand-soft/70 max-w-xs">
            Find Your Home. Find Your People. A city-based accommodation
            platform for students and working professionals.
          </p>
        </div>

        <div>
          <p className="text-white text-sm font-semibold tracking-wide uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
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
          <p className="text-white text-sm font-semibold tracking-wide uppercase">
            Account
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
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
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 text-xs text-sand-soft/50 text-center">
          HOMIGO — a MERN college project
        </div>
      </div>
    </footer>
  );
}
