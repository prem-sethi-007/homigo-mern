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
  if (hasMin && hasMax) return `${fmt(min)} – ${fmt(max)}`;
  if (hasMin) return `${fmt(min)}+`;
  return `up to ${fmt(max)}`;
}

function Pill({ children }) {
  return (
    <span className="text-xs bg-sand-soft text-ink px-2.5 py-1 rounded-full font-medium">
      {children}
    </span>
  );
}

function scoreColor(score) {
  if (score >= 80) return 'bg-sage-soft text-sage-dark';
  if (score >= 60) return 'bg-brand-soft text-brand-dark';
  return 'bg-sand-soft text-muted';
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
      className="block bg-white border border-line rounded-2xl p-5 hover:border-brand/40 hover:shadow-md transition"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-soft text-brand flex items-center justify-center font-semibold flex-shrink-0 text-lg">
          {initials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink truncate">{name}</h3>
          <p className="text-sm text-muted truncate">
            {[city, occupation].filter(Boolean).join(' · ') || '—'}
          </p>
        </div>
        {match ? (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${scoreColor(
              match.score
            )}`}
            title="Compatibility score"
          >
            {match.score}% match
          </span>
        ) : (
          typeof age === 'number' && (
            <span className="text-xs font-medium text-muted-soft">
              Age {age}
            </span>
          )
        )}
      </div>

      {budget && (
        <p className="mt-5 text-lg font-bold text-ink font-display">
          {budget}
          <span className="text-sm font-medium text-muted"> /mo</span>
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {lifestyle && <Pill>{LIFESTYLE_LABEL[lifestyle] || lifestyle}</Pill>}
        {smoking && <Pill>{SMOKING_LABEL[smoking] || smoking}</Pill>}
        {pets && <Pill>{PETS_LABEL[pets] || pets}</Pill>}
      </div>

      {areasPreview && (
        <p className="mt-3 text-xs text-muted-soft truncate">
          Prefers: {areasPreview}
          {extraAreas > 0 && ` +${extraAreas} more`}
        </p>
      )}

      {match && (match.reasons?.length > 0 || match.notes?.length > 0) && (
        <div className="mt-4 pt-4 border-t border-line space-y-1">
          {match.reasons?.slice(0, 3).map((r) => (
            <p key={r} className="text-xs text-sage-dark flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full bg-sage flex-shrink-0" />
              {r}
            </p>
          ))}
          {match.notes?.slice(0, 2).map((n) => (
            <p key={n} className="text-xs text-muted flex items-start gap-1.5">
              <span className="mt-1 w-1 h-1 rounded-full bg-muted-soft flex-shrink-0" />
              {n}
            </p>
          ))}
        </div>
      )}
    </Link>
  );
}
