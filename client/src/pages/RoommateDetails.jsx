import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { roommateService } from '../services/roommateService';

const LIFESTYLE_LABEL = {
  quiet: 'Quiet',
  social: 'Social',
  balanced: 'Balanced',
};
const SMOKING_LABEL = {
  no: 'Non-smoker',
  occasionally: 'Occasional smoker',
  yes: 'Smoker',
};
const PETS_LABEL = {
  no: 'No pets',
  okay: 'Okay with pets',
  yes: 'Has pets',
};
const GENDER_LABEL = { male: 'Male', female: 'Female', other: 'Other' };

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase();
}

function formatBudget(min, max) {
  const hasMin = typeof min === 'number';
  const hasMax = typeof max === 'number';
  if (!hasMin && !hasMax) return null;
  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;
  if (hasMin && hasMax) return `${fmt(min)} - ${fmt(max)} /mo`;
  if (hasMin) return `${fmt(min)}+ /mo`;
  return `up to ${fmt(max)} /mo`;
}

function Pill({ children }) {
  return (
    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
      {children}
    </span>
  );
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 text-slate-800">{value}</p>
    </div>
  );
}

export default function RoommateDetails() {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    roommateService
      .getById(id)
      .then((data) => {
        if (active)
          setState({ status: 'success', profile: data.profile });
      })
      .catch((err) => {
        if (!active) return;
        const status = err.response?.status;
        setState({
          status: 'error',
          notFound: status === 404,
          message: err.response?.data?.message || err.message,
        });
      });
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <Link
        to="/roommates"
        className="text-sm text-slate-600 hover:text-slate-900"
      >
        &larr; Back to roommates
      </Link>

      <div className="mt-4">
        {state.status === 'loading' && (
          <div className="text-sm text-slate-500">Loading profile...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">
              {state.notFound
                ? 'Roommate profile not found'
                : 'Could not load profile'}
            </p>
            {!state.notFound && (
              <p className="mt-2 text-sm text-slate-600">{state.message}</p>
            )}
            <Link
              to="/roommates"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Back to browse
            </Link>
          </div>
        )}

        {state.status === 'success' && <Detail profile={state.profile} />}
      </div>
    </div>
  );
}

function Detail({ profile }) {
  const {
    age,
    gender,
    occupation,
    city,
    budgetMin,
    budgetMax,
    preferredAreas = [],
    lifestyle,
    smoking,
    pets,
    bio,
    user,
  } = profile;

  const name = user?.name || 'Anonymous';
  const budget = formatBudget(budgetMin, budgetMax);

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl font-semibold flex-shrink-0">
            {initials(name)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {name}
            </h1>
            <p className="mt-1 text-slate-600">
              {[city, occupation].filter(Boolean).join(' · ') || '—'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {lifestyle && <Pill>{LIFESTYLE_LABEL[lifestyle] || lifestyle}</Pill>}
          {smoking && <Pill>{SMOKING_LABEL[smoking] || smoking}</Pill>}
          {pets && <Pill>{PETS_LABEL[pets] || pets}</Pill>}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <DetailRow
            label="Age"
            value={typeof age === 'number' ? String(age) : null}
          />
          <DetailRow label="Gender" value={GENDER_LABEL[gender] || null} />
          <DetailRow label="Occupation" value={occupation} />
          <DetailRow label="City" value={city} />
        </div>

        {preferredAreas.length > 0 && (
          <div className="mt-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Preferred areas
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {preferredAreas.map((a) => (
                <span
                  key={a}
                  className="text-sm bg-slate-100 text-slate-800 px-3 py-1 rounded-full"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {bio && (
          <div className="mt-8">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              About
            </p>
            <p className="mt-2 text-slate-700 whitespace-pre-line">{bio}</p>
          </div>
        )}
      </div>

      <aside className="space-y-4">
        {budget && (
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-500">Budget</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{budget}</p>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Reach out
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Say hi and see if you're a good fit.
          </p>
          {user?.email ? (
            <a
              href={`mailto:${user.email}?subject=${encodeURIComponent(
                'Roommate on HOMIGO'
              )}`}
              className="mt-4 block text-center bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Contact {name.split(' ')[0]}
            </a>
          ) : (
            <button
              disabled
              className="mt-4 w-full text-center bg-slate-200 text-slate-500 px-4 py-2 rounded font-medium cursor-not-allowed"
            >
              Contact info unavailable
            </button>
          )}
          <p className="mt-3 text-xs text-slate-400">
            In-app chat coming later.
          </p>
        </div>
      </aside>
    </div>
  );
}
