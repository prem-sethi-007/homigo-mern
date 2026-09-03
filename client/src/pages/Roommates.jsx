import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { roommateService } from '../services/roommateService';
import RoommateCard from '../components/RoommateCard';

export default function Roommates() {
  const [state, setState] = useState({ status: 'loading' });

  function load() {
    let active = true;
    setState({ status: 'loading' });
    roommateService
      .list()
      .then((data) => {
        if (active)
          setState({
            status: 'success',
            profiles: data.profiles || [],
          });
      })
      .catch((err) => {
        if (active)
          setState({
            status: 'error',
            message: err.response?.data?.message || err.message,
          });
      });
    return () => {
      active = false;
    };
  }

  useEffect(() => load(), []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Find roommates</h1>
          <p className="mt-1 text-slate-600">
            People looking for a compatible place to share.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-sm text-slate-500">
            {state.profiles.length} profile
            {state.profiles.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <div className="mt-8">
        {state.status === 'loading' && (
          <div className="text-sm text-slate-500">Loading roommates...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load roommate profiles
            </p>
            <p className="mt-1 text-sm text-slate-600">{state.message}</p>
            <button
              onClick={load}
              className="mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && state.profiles.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">
              No roommate profiles yet
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Be the first! Create your own profile so others can find you.
            </p>
            <Link
              to="/roommate-profile"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Create my profile
            </Link>
          </div>
        )}

        {state.status === 'success' && state.profiles.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.profiles.map((p) => (
              <RoommateCard key={p._id} profile={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
