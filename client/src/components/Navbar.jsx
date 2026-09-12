import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function navClass({ isActive }) {
  return (
    'text-sm tracking-wide transition ' +
    (isActive
      ? 'text-ink font-semibold'
      : 'text-muted hover:text-ink')
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-ivory/85 backdrop-blur border-b border-line sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-ink"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-brand" />
          HOMIGO
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <NavLink to="/properties" className={navClass}>
            Properties
          </NavLink>
          <NavLink to="/roommates" className={navClass}>
            Roommates
          </NavLink>
          {user && (
            <NavLink to="/favorites" className={navClass}>
              Favorites
            </NavLink>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted hidden lg:inline">
                {user.name}
              </span>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  'text-sm tracking-wide transition ' +
                  (isActive
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink')
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-white border border-line hover:border-brand/40 text-ink px-4 py-1.5 rounded-full transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm text-muted hover:text-ink transition hidden sm:inline"
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                className="text-sm font-medium bg-brand text-white hover:bg-brand-dark px-5 py-2 rounded-full transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
