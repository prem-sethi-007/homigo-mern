import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function navClass({ isActive }) {
  return (
    'text-sm ' +
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
    <nav className="bg-ivory/90 backdrop-blur border-b border-line sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-bold text-ink tracking-tight flex items-center gap-1.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand" />
            HOMIGO
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <NavLink to="/properties" className={navClass}>
              Browse
            </NavLink>
            <NavLink to="/roommates" className={navClass}>
              Roommates
            </NavLink>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted hidden md:inline">
                Hi,{' '}
                <span className="font-semibold text-ink">{user.name}</span>
              </span>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  'text-sm hidden sm:inline ' +
                  (isActive
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink')
                }
              >
                Favorites
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  'text-sm ' +
                  (isActive
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink')
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-sand hover:bg-sand-soft text-ink px-3 py-1.5 rounded-md transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  'text-sm ' +
                  (isActive
                    ? 'text-ink font-semibold'
                    : 'text-muted hover:text-ink')
                }
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                className="text-sm font-medium bg-brand text-white hover:bg-brand-dark px-4 py-1.5 rounded-md transition"
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
