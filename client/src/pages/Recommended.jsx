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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-semibold">
            Recommendations
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl text-ink">
            People we think you'll click with
          </h1>
          <p className="mt-2 text-muted">
            Ranked by your stated preferences — a suggestion, not a filter.
          </p>
        </div>
        {state.status === 'success' && !state.needsProfile && (
          <p className="text-sm text-muted">
            {state.profiles.length} suggestion
            {state.profiles.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <RoommateTabs current="recommended" />

      <div className="mt-5 text-xs text-muted bg-sand-soft/60 border border-line rounded-xl px-4 py-2.5">
        Recommendations are based on your stated preferences. You can still{' '}
        <Link to="/roommates" className="underline text-brand hover:text-brand-dark">
          browse everyone
        </Link>
        .
      </div>

      <div className="mt-8">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading recommendations...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-6 text-center">
            <p className="font-semibold text-error-dark">
              Could not load recommendations
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

        {state.status === 'success' && state.needsProfile && (
          <div className="bg-white border border-line rounded-2xl p-10 text-center">
            <p className="font-semibold text-ink">
              Create your roommate profile to get recommendations
            </p>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              We use your preferences — city, budget, lifestyle — to rank other
              users for you.
            </p>
            <Link
              to="/roommate-profile"
              className="inline-block mt-5 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
            >
              Create my profile
            </Link>
          </div>
        )}

        {state.status === 'success' &&
          !state.needsProfile &&
          state.profiles.length === 0 && (
            <div className="bg-white border border-line rounded-2xl p-10 text-center">
              <p className="font-semibold text-ink">
                No one to recommend yet
              </p>
              <p className="mt-2 text-sm text-muted">
                Nobody else has posted a roommate profile — check back later.
              </p>
              <Link
                to="/roommates"
                className="inline-block mt-5 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
              >
                Browse all
              </Link>
            </div>
          )}

        {state.status === 'success' &&
          !state.needsProfile &&
          state.profiles.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
