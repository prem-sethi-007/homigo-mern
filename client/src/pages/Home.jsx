import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <h1 className="text-5xl font-bold text-slate-900">HOMIGO</h1>
      <p className="mt-3 text-lg text-slate-600">
        Find Your Home. Find Your People.
      </p>
      <p className="mt-6 max-w-xl mx-auto text-slate-500">
        A city-based accommodation platform for students and working
        professionals. Discover flats, rooms and compatible roommates in your
        city.
      </p>

      <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
        {user ? (
          <Link
            to="/dashboard"
            className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium"
            >
              I already have an account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
