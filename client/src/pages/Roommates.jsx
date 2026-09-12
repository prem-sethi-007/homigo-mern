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
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      <div className="flex items-end justify-between flex-wrap gap-6 border-b border-line pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
            People
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
            Meet your future flatmate.
          </h1>
          <p className="mt-4 text-muted max-w-xl">
            Everyone below is currently looking to share a place. Reach out
            when you find a good fit.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {state.profiles.length} profile
            {state.profiles.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <RoommateTabs current="all" />

      <div className="mt-10">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading roommates…</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-8 text-center">
            <p className="font-display text-lg text-error-dark">
              Could not load roommate profiles
            </p>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
            <button
              onClick={load}
              className="mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && state.profiles.length === 0 && (
          <div className="border border-line rounded-2xl p-14 text-center">
            <p className="font-display text-2xl text-ink">
              No roommate profiles yet.
            </p>
            <p className="mt-3 text-sm text-muted max-w-md mx-auto">
              Be the first — post a small profile so others in your city can
              find you.
            </p>
            <Link
              to="/roommate-profile"
              className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Create my profile
            </Link>
          </div>
        )}

        {state.status === 'success' && state.profiles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {state.profiles.map((p) => (
              <RoommateCard key={p._id} profile={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
