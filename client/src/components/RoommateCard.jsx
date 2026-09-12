import { Link } from 'react-router-dom';

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

function scoreBg(score) {
  if (score >= 80) return 'bg-sage text-white';
  if (score >= 60) return 'bg-brand text-white';
  return 'bg-sand text-ink';
}

export default function RoommateCard({ profile, match }) {
  const {
    _id,
    age,
    occupation,
    city,
    budgetMin,
    budgetMax,
    preferredAreas = [],
    lifestyle,
    smoking,
    pets,
    user,
  } = profile;

  const name = user?.name || 'Anonymous';
  const budget = formatBudget(budgetMin, budgetMax);

  const metaBits = [
    typeof age === 'number' && `${age} yrs`,
    occupation,
    lifestyle && LIFESTYLE_LABEL[lifestyle],
  ].filter(Boolean);

  return (
    <Link
      to={`/roommates/${_id}`}
      className="block bg-white border border-line rounded-2xl p-6 hover:border-brand/40 hover:shadow-sm transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-full bg-brand-soft text-brand flex items-center justify-center font-display text-lg flex-shrink-0">
            {initials(name)}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              {city || 'City'}
            </p>
            <h3 className="mt-1 font-display text-xl text-ink truncate leading-tight">
              {name}
            </h3>
          </div>
        </div>
        {match && (
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${scoreBg(
              match.score
            )}`}
            title="Compatibility score"
          >
            {match.score}%
          </span>
        )}
      </div>

      <div className="mt-5 border-t border-line pt-5 space-y-3">
        {budget && (
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              Budget
            </p>
            <p className="font-display text-lg text-ink">
              {budget}
              <span className="text-xs text-muted"> /mo</span>
            </p>
          </div>
        )}
        {metaBits.length > 0 && (
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              About
            </p>
            <p className="text-sm text-ink text-right">{metaBits.join(' · ')}</p>
          </div>
        )}
        {(smoking || pets) && (
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              Lifestyle
            </p>
            <p className="text-sm text-muted text-right">
              {[smoking && SMOKING_LABEL[smoking], pets && PETS_LABEL[pets]]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
        )}
        {preferredAreas.length > 0 && (
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              Prefers
            </p>
            <p className="text-sm text-muted text-right truncate max-w-[60%]">
              {preferredAreas.slice(0, 2).join(', ')}
              {preferredAreas.length > 2 && ` +${preferredAreas.length - 2}`}
            </p>
          </div>
        )}
      </div>

      {match && (match.reasons?.length > 0 || match.notes?.length > 0) && (
        <div className="mt-5 border-t border-line pt-4 space-y-1.5">
          {match.reasons?.slice(0, 3).map((r) => (
            <p
              key={r}
              className="text-xs text-sage-dark flex items-start gap-2"
            >
              <span className="mt-1.5 w-1 h-1 rounded-full bg-sage flex-shrink-0" />
              {r}
            </p>
          ))}
          {match.notes?.slice(0, 1).map((n) => (
            <p
              key={n}
              className="text-xs text-muted flex items-start gap-2"
            >
              <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-soft flex-shrink-0" />
              {n}
            </p>
          ))}
        </div>
      )}
    </Link>
  );
}
