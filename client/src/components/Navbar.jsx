import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function navClass({ isActive }) {
  return (
    'text-sm tracking-wide transition pb-1 border-b-2 ' +
    (isActive
      ? 'text-brand font-semibold border-brand'
      : 'text-muted hover:text-ink border-transparent')
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
          className="flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink"
        >
          <span className="w-3 h-3 rounded-[4px] rotate-45 bg-gradient-to-br from-brand to-marigold shadow-glow" />
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
              <NavLink to="/dashboard" className={navClass}>
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-white border border-line hover:border-brand/40 hover:text-brand text-ink px-4 py-1.5 rounded-full transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm text-muted hover:text-brand transition hidden sm:inline"
              >
                Log in
              </NavLink>
              <Link
                to="/register"
                className="text-sm font-medium bg-brand-gradient text-white hover:brightness-110 px-5 py-2 rounded-full transition shadow-glow"
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
