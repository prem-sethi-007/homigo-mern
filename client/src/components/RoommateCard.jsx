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

const PETS_LABEL = {
  no: 'No pets',
  okay: 'Okay with pets',
  yes: 'Has pets',
};

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
    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
      {children}
    </span>
  );
}

function scoreColor(score) {
  if (score >= 80) return 'bg-emerald-100 text-emerald-700';
  if (score >= 60) return 'bg-indigo-100 text-indigo-700';
  if (score >= 40) return 'bg-slate-100 text-slate-700';
  return 'bg-slate-100 text-slate-500';
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
  const areasPreview = preferredAreas.slice(0, 3).join(', ');
  const extraAreas = preferredAreas.length - 3;

  return (
    <Link
      to={`/roommates/${_id}`}
      className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-400 hover:shadow-md transition"
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold flex-shrink-0">
          {initials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{name}</h3>
          <p className="text-sm text-slate-600 truncate">
            {[city, occupation].filter(Boolean).join(' · ') || '—'}
          </p>
        </div>
        {match ? (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${scoreColor(
              match.score
            )}`}
            title="Compatibility score"
          >
            {match.score}% match
          </span>
        ) : (
          typeof age === 'number' && (
            <span className="text-xs font-medium text-slate-500">
              Age {age}
            </span>
          )
        )}
      </div>

      {budget && (
        <p className="mt-4 text-sm font-semibold text-slate-900">{budget}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {lifestyle && <Pill>{LIFESTYLE_LABEL[lifestyle] || lifestyle}</Pill>}
        {smoking && <Pill>{SMOKING_LABEL[smoking] || smoking}</Pill>}
        {pets && <Pill>{PETS_LABEL[pets] || pets}</Pill>}
      </div>

      {areasPreview && (
        <p className="mt-3 text-xs text-slate-500 truncate">
          Prefers: {areasPreview}
          {extraAreas > 0 && ` +${extraAreas} more`}
        </p>
      )}

      {match && (match.reasons?.length > 0 || match.notes?.length > 0) && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          {match.reasons?.slice(0, 3).map((r) => (
            <p key={r} className="text-xs text-emerald-700">
              + {r}
            </p>
          ))}
          {match.notes?.slice(0, 2).map((n) => (
            <p key={n} className="text-xs text-slate-500">
              · {n}
            </p>
          ))}
        </div>
      )}
    </Link>
  );
}
