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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Recommended for you
          </h1>
          <p className="mt-1 text-slate-600">
            Suggestions based on your preferences.
          </p>
        </div>
        {state.status === 'success' && !state.needsProfile && (
          <p className="text-sm text-slate-500">
            {state.profiles.length} suggestion
            {state.profiles.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <RoommateTabs current="recommended" />

      <div className="mt-4 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
        Recommendations are based on your stated preferences. You can still{' '}
        <Link to="/roommates" className="underline hover:text-slate-800">
          browse everyone
        </Link>
        .
      </div>

      <div className="mt-6">
        {state.status === 'loading' && (
          <div className="text-sm text-slate-500">
            Loading recommendations...
          </div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load recommendations
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

        {state.status === 'success' && state.needsProfile && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">
              Create your roommate profile to get recommendations
            </p>
            <p className="mt-2 text-sm text-slate-600">
              We use your preferences (city, budget, lifestyle) to rank other
              users for you.
            </p>
            <Link
              to="/roommate-profile"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Create my profile
            </Link>
          </div>
        )}

        {state.status === 'success' &&
          !state.needsProfile &&
          state.profiles.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <p className="font-semibold text-slate-900">
                No one to recommend yet
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Nobody else has posted a roommate profile — check back later.
              </p>
              <Link
                to="/roommates"
                className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
              >
                Browse all
              </Link>
            </div>
          )}

        {state.status === 'success' &&
          !state.needsProfile &&
          state.profiles.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
