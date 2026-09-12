import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { roommateService } from '../services/roommateService';
import RoommateCard from '../components/RoommateCard';
import RoommateTabs from '../components/RoommateTabs';

export default function Recommended() {
  const [state, setState] = useState({ status: 'loading' });

  function load() {
    let active = true;
    setState({ status: 'loading' });
    roommateService
      .getRecommendations()
      .then((data) => {
        if (active)
          setState({
            status: 'success',
            needsProfile: !!data.needsProfile,
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
            For you
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
            People you might click with.
          </h1>
          <p className="mt-4 text-muted max-w-xl">
            Ranked from your stated preferences. A suggestion — not a filter.
            You can still <Link to="/roommates" className="underline decoration-brand/40 hover:decoration-brand transition">browse everyone</Link>.
          </p>
        </div>
        {state.status === 'success' && !state.needsProfile && (
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {state.profiles.length} suggestion
            {state.profiles.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <RoommateTabs current="recommended" />

      <div className="mt-10">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading recommendations…</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-8 text-center">
            <p className="font-display text-lg text-error-dark">
              Could not load recommendations
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

        {state.status === 'success' && state.needsProfile && (
          <div className="border border-line rounded-2xl p-14 text-center bg-sand-soft/40">
            <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
              Set up first
            </p>
            <p className="mt-4 font-display text-3xl text-ink">
              Create your profile to get recommendations.
            </p>
            <p className="mt-4 text-sm text-muted max-w-md mx-auto leading-relaxed">
              We use your preferences — city, budget, lifestyle — to rank
              other users for you.
            </p>
            <Link
              to="/roommate-profile"
              className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Create my profile
            </Link>
          </div>
        )}

        {state.status === 'success' &&
          !state.needsProfile &&
          state.profiles.length === 0 && (
            <div className="border border-line rounded-2xl p-14 text-center">
              <p className="font-display text-2xl text-ink">
                No one to recommend yet.
              </p>
              <p className="mt-3 text-sm text-muted">
                Nobody else has posted a roommate profile — check back later.
              </p>
              <Link
                to="/roommates"
                className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
              >
                Browse all
              </Link>
            </div>
          )}

        {state.status === 'success' &&
          !state.needsProfile &&
          state.profiles.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.profiles.map(({ profile, match }) => (
                <RoommateCard
                  key={profile._id}
                  profile={profile}
                  match={match}
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
