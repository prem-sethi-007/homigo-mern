import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-slate-900">
            HOMIGO
          </Link>
          <div className="hidden sm:flex items-center gap-5 text-sm">
            <Link
              to="/properties"
              className="text-slate-600 hover:text-slate-900"
            >
              Browse
            </Link>
            <Link
              to="/roommates"
              className="text-slate-600 hover:text-slate-900"
            >
              Roommates
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-slate-600 hidden sm:inline">
                Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <Link
                to="/favorites"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Favorites
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 px-3 py-1.5 rounded"
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
