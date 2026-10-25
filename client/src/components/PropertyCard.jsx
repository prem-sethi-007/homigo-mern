import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFallbackImage } from '../utils/propertyImage';

const TYPE_LABEL = { flat: 'Flat', room: 'Room', pg: 'PG' };
const TYPE_BADGE = {
  flat: 'bg-navy text-white',
  room: 'bg-brand text-white',
  pg: 'bg-sage text-ink',
};
const FURNISH_LABEL = {
  furnished: 'Furnished',
  semi: 'Semi-furnished',
  unfurnished: 'Unfurnished',
};

function formatRent(n) {
  if (typeof n !== 'number') return '';
  return `₹${n.toLocaleString('en-IN')}`;
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
  const [imgFailed, setImgFailed] = useState(false);

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
  const ownImage = !imgFailed && images && images[0] ? images[0] : null;
  const imageSrc = ownImage || getFallbackImage(property).card;

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
    typeof bedrooms === 'number' && bedrooms > 0 && `${bedrooms} BHK`,
    furnishing && FURNISH_LABEL[furnishing],
  ].filter(Boolean);

  return (
    <Link to={`/properties/${_id}`} className="block group">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-soft shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Bottom fade so the type badge stays legible on any photo */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent pointer-events-none"
        />

        {/* Availability badge */}
        <div className="absolute top-4 left-4">
          {available !== false ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] bg-white/95 text-sage-dark px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sage-dark" />
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
            'absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 hover:bg-white hover:scale-110 shadow-sm flex items-center justify-center disabled:opacity-60 transition ' +
            (favorited ? 'text-brand' : 'text-muted-soft hover:text-brand')
          }
        >
          <HeartIcon filled={favorited} />
        </button>

        {/* Type badge */}
        {type && TYPE_LABEL[type] && (
          <span
            className={`absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm ${TYPE_BADGE[type]}`}
          >
            {TYPE_LABEL[type]}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-navy font-medium">
              {city || 'Location'}
            </p>
            <h3 className="mt-1 font-display text-xl text-ink line-clamp-1 leading-snug group-hover:text-brand transition">
              {title}
            </h3>
          </div>
          <p className="text-right whitespace-nowrap">
            <span className="font-display text-xl text-brand">
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
