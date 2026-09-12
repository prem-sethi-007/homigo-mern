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
const PETS_LABEL = { no: 'No pets', okay: 'Okay with pets', yes: 'Has pets' };
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
  if (hasMin && hasMax) return `${fmt(min)} – ${fmt(max)}`;
  if (hasMin) return `${fmt(min)}+`;
  return `up to ${fmt(max)}`;
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
        if (active) setState({ status: 'success', profile: data.profile });
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
    <div className="max-w-5xl mx-auto px-6 pt-8 pb-24">
      <Link
        to="/roommates"
        className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition"
      >
        ← Back to roommates
      </Link>

      <div className="mt-6">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading profile…</div>
        )}

        {state.status === 'error' && (
          <div className="border border-line rounded-2xl p-14 text-center">
            <p className="font-display text-2xl text-ink">
              {state.notFound
                ? 'Roommate profile not found.'
                : 'Could not load profile.'}
            </p>
            {!state.notFound && (
              <p className="mt-3 text-sm text-muted">{state.message}</p>
            )}
            <Link
              to="/roommates"
              className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
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
    <>
      {/* Header */}
      <div className="border-b border-line pb-10">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-brand-soft text-brand flex items-center justify-center font-display text-2xl flex-shrink-0">
            {initials(name)}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
              {city || 'City'}
            </p>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
              {name}
            </h1>
            {occupation && (
              <p className="mt-4 text-lg text-muted italic font-display">
                {occupation}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {bio && (
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
                About
              </p>
              <p className="mt-4 text-ink/85 leading-relaxed whitespace-pre-line text-lg font-display italic">
                "{bio}"
              </p>
            </section>
          )}

          <section>
            <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
              Preferences
            </p>
            <dl className="mt-5 divide-y divide-line">
              <Row
                label="Age"
                value={typeof age === 'number' ? String(age) : null}
              />
              <Row label="Gender" value={GENDER_LABEL[gender] || null} />
              <Row label="Occupation" value={occupation} />
              <Row label="City" value={city} />
              <Row
                label="Lifestyle"
                value={lifestyle && LIFESTYLE_LABEL[lifestyle]}
              />
              <Row
                label="Smoking"
                value={smoking && SMOKING_LABEL[smoking]}
              />
              <Row label="Pets" value={pets && PETS_LABEL[pets]} />
            </dl>
          </section>

          {preferredAreas.length > 0 && (
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
                Preferred areas
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {preferredAreas.map((a) => (
                  <span
                    key={a}
                    className="text-sm bg-white border border-line text-ink px-4 py-1.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {budget && (
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                Budget
              </p>
              <p className="mt-3 font-display text-3xl text-ink">
                {budget}
                <span className="text-base text-muted"> /mo</span>
              </p>
            </div>
          )}

          <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
              Reach out
            </p>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              Say hi and see if you're a good fit.
            </p>
            {user?.email ? (
              <a
                href={`mailto:${user.email}?subject=${encodeURIComponent(
                  'Roommate on HOMIGO'
                )}`}
                className="mt-5 block text-center bg-brand text-white hover:bg-brand-dark px-5 py-3 rounded-full text-sm font-medium transition"
              >
                Contact {name.split(' ')[0]}
              </a>
            ) : (
              <button
                disabled
                className="mt-5 w-full text-center bg-sand text-muted px-5 py-3 rounded-full text-sm font-medium cursor-not-allowed"
              >
                Contact info unavailable
              </button>
            )}
            <p className="mt-3 text-[11px] text-muted-soft text-center">
              In-app chat coming later.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-xs uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className="text-sm text-ink font-medium">{value}</dd>
    </div>
  );
}
