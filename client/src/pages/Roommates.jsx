import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { roommateService } from '../services/roommateService';
import RoommateCard from '../components/RoommateCard';
import RoommateTabs from '../components/RoommateTabs';

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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-semibold">
            Roommates
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl text-ink">
            Find someone to share your place with
          </h1>
          <p className="mt-2 text-muted">
            People currently looking for a compatible flatmate.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-sm text-muted">
            {state.profiles.length} profile
            {state.profiles.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <RoommateTabs current="all" />

      <div className="mt-8">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading roommates...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-6 text-center">
            <p className="font-semibold text-error-dark">
              Could not load roommate profiles
            </p>
            <p className="mt-1 text-sm text-muted">{state.message}</p>
            <button
              onClick={load}
              className="mt-4 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && state.profiles.length === 0 && (
          <div className="bg-white border border-line rounded-2xl p-10 text-center">
            <p className="font-semibold text-ink">
              No roommate profiles yet
            </p>
            <p className="mt-2 text-sm text-muted">
              Be the first! Create your own profile so others can find you.
            </p>
            <Link
              to="/roommate-profile"
              className="inline-block mt-5 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
            >
              Create my profile
            </Link>
          </div>
        )}

        {state.status === 'success' && state.profiles.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {state.profiles.map((p) => (
              <RoommateCard key={p._id} profile={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
