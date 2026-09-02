import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="text-white font-bold text-lg">HOMIGO</p>
          <p className="mt-2 text-sm text-slate-400">
            Find Your Home. Find Your People.
          </p>
        </div>

        <div>
          <p className="text-white text-sm font-semibold">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/properties" className="hover:text-white">
                Browse Properties
              </Link>
            </li>
            <li>
              <Link to="/roommates" className="hover:text-white">
                Find Roommates
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-semibold">Account</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/register" className="hover:text-white">
                Sign up
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-slate-500 text-center">
          HOMIGO - a MERN college project
        </div>
      </div>
    </footer>
  );
}
