import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TYPE_LABEL = { flat: 'Flat', room: 'Room', pg: 'PG' };
const FURNISH_LABEL = {
  furnished: 'Furnished',
  semi: 'Semi-furnished',
  unfurnished: 'Unfurnished',
};

function formatRent(n) {
  if (typeof n !== 'number') return '';
  return `₹${n.toLocaleString('en-IN')}`;
}

function Placeholder() {
  return (
    <div
      className="w-full h-full flex items-center justify-center text-white/25"
      style={{
        background: 'linear-gradient(160deg, #995F2F 0%, #622B14 100%)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        className="w-20 h-20"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.5 1.5 0 0 1 2.12 0L22.28 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h4.125v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

export default function PropertyCard({ property }) {
  const { user, isFavorited, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);

  const {
    _id,
    title,
    city,
    type,
    rent,
    bedrooms,
    furnishing,
    available,
    images,
    owner,
  } = property;

  const favorited = user ? isFavorited(_id) : false;

  async function handleHeart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (pending) return;
    setPending(true);
    try {
      await toggleFavorite(_id);
    } catch {
      // toggleFavorite reverts on error
    }
    setPending(false);
  }

  const heartTitle = !user
    ? 'Log in to save'
    : favorited
    ? 'Remove from favorites'
    : 'Save to favorites';

  const metaBits = [
    type && TYPE_LABEL[type],
    typeof bedrooms === 'number' && bedrooms > 0 && `${bedrooms} BHK`,
    furnishing && FURNISH_LABEL[furnishing],
  ].filter(Boolean);

  return (
    <Link to={`/properties/${_id}`} className="block group">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand-soft">
        {images && images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <Placeholder />
        )}

        {/* Availability badge */}
        <div className="absolute top-4 left-4">
          {available !== false ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] bg-white/95 text-ink px-3 py-1.5 rounded-full">
              Available
            </span>
          ) : (
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] bg-ink/80 text-white px-3 py-1.5 rounded-full">
              Not available
            </span>
          )}
        </div>

        {/* Heart */}
        <button
          type="button"
          onClick={handleHeart}
          disabled={pending}
          aria-label={heartTitle}
          title={heartTitle}
          className={
            'absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 hover:bg-white shadow-sm flex items-center justify-center disabled:opacity-60 transition ' +
            (favorited ? 'text-brand' : 'text-muted-soft')
          }
        >
          <HeartIcon filled={favorited} />
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              {city || 'Location'}
            </p>
            <h3 className="mt-1 font-display text-xl text-ink line-clamp-1 leading-snug">
              {title}
            </h3>
          </div>
          <p className="text-right whitespace-nowrap">
            <span className="font-display text-xl text-ink">
              {formatRent(rent)}
            </span>
            <span className="text-xs text-muted"> /mo</span>
          </p>
        </div>

        {metaBits.length > 0 && (
          <p className="mt-3 text-xs text-muted tracking-wide">
            {metaBits.join(' · ')}
          </p>
        )}

        {owner?.name && (
          <p className="mt-2 text-xs text-muted-soft">by {owner.name}</p>
        )}
      </div>
    </Link>
  );
}
