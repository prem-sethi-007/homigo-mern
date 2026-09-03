import { Link } from 'react-router-dom';

const TYPE_LABEL = { flat: 'Flat', room: 'Room', pg: 'PG' };
const FURNISH_LABEL = {
  furnished: 'Furnished',
  semi: 'Semi-furnished',
  unfurnished: 'Unfurnished',
};

function formatRent(n) {
  if (typeof n !== 'number') return '';
  return `₹${n.toLocaleString('en-IN')}/mo`;
}

function Pill({ children }) {
  return (
    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
      {children}
    </span>
  );
}

function Placeholder() {
  return (
    <div className="w-full aspect-[4/3] bg-slate-100 flex items-center justify-center text-slate-300">
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

export default function PropertyCard({ property }) {
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

  return (
    <Link
      to={`/properties/${_id}`}
      className="block bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-400 hover:shadow-md transition"
    >
      {images && images[0] ? (
        <img
          src={images[0]}
          alt={title}
          className="w-full aspect-[4/3] object-cover"
        />
      ) : (
        <Placeholder />
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 line-clamp-1">{title}</h3>
          {available === false && (
            <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded whitespace-nowrap">
              Not available
            </span>
          )}
        </div>

        {city && <p className="mt-1 text-sm text-slate-600">{city}</p>}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {type && <Pill>{TYPE_LABEL[type] || type}</Pill>}
          {typeof bedrooms === 'number' && bedrooms > 0 && (
            <Pill>{bedrooms} BHK</Pill>
          )}
          {furnishing && (
            <Pill>{FURNISH_LABEL[furnishing] || furnishing}</Pill>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <p className="text-lg font-semibold text-slate-900">
            {formatRent(rent)}
          </p>
          {owner && owner.name && (
            <p className="text-xs text-slate-500 truncate">by {owner.name}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
