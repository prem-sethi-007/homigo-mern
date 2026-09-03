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

function Pill({ children }) {
  return (
    <span className="text-xs bg-sand-soft text-ink px-2.5 py-1 rounded-full font-medium">
      {children}
    </span>
  );
}

function Placeholder() {
  return (
    <div className="w-full aspect-[4/3] bg-sand-soft flex items-center justify-center text-brand/40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.2"
        stroke="currentColor"
        className="w-16 h-16"
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
      // toggleFavorite already reverted on error
    }
    setPending(false);
  }

  const heartTitle = !user
    ? 'Log in to save'
    : favorited
    ? 'Remove from favorites'
    : 'Save to favorites';

  return (
    <Link
      to={`/properties/${_id}`}
      className="block bg-white border border-line rounded-2xl overflow-hidden hover:border-brand/40 hover:shadow-md transition"
    >
      <div className="relative">
        {images && images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full aspect-[4/3] object-cover"
          />
        ) : (
          <Placeholder />
        )}

        <div className="absolute top-3 left-3 flex gap-1.5">
          {available !== false ? (
            <span className="text-xs font-medium bg-sage-soft text-sage-dark px-2.5 py-1 rounded-full">
              Available
            </span>
          ) : (
            <span className="text-xs font-medium bg-white/95 text-muted px-2.5 py-1 rounded-full">
              Not available
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleHeart}
          disabled={pending}
          aria-label={heartTitle}
          title={heartTitle}
          className={
            'absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 hover:bg-white shadow flex items-center justify-center disabled:opacity-60 transition ' +
            (favorited ? 'text-brand' : 'text-muted-soft')
          }
        >
          <HeartIcon filled={favorited} />
        </button>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-ink line-clamp-1 text-base">
          {title}
        </h3>
        {city && <p className="mt-0.5 text-sm text-muted">{city}</p>}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {type && <Pill>{TYPE_LABEL[type] || type}</Pill>}
          {typeof bedrooms === 'number' && bedrooms > 0 && (
            <Pill>{bedrooms} BHK</Pill>
          )}
          {furnishing && (
            <Pill>{FURNISH_LABEL[furnishing] || furnishing}</Pill>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-2">
          <div>
            <p className="text-xl font-bold text-ink font-display">
              {formatRent(rent)}
              <span className="text-sm font-medium text-muted"> /mo</span>
            </p>
          </div>
          {owner && owner.name && (
            <p className="text-xs text-muted-soft truncate max-w-[45%]">
              by {owner.name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
