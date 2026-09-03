import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';

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
    <span className="bg-sand-soft text-ink px-3 py-1 rounded-full text-sm font-medium">
      {children}
    </span>
  );
}

function PlaceholderHero() {
  return (
    <div className="w-full h-full flex items-center justify-center text-brand/30">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.2"
        stroke="currentColor"
        className="w-24 h-24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.5 1.5 0 0 1 2.12 0L22.28 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h4.125v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </div>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    propertyService
      .getById(id)
      .then((data) => {
        if (active)
          setState({ status: 'success', property: data.property });
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
        to="/properties"
        className="text-sm text-muted hover:text-ink transition"
      >
        ← Back to properties
      </Link>

      <div className="mt-4">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading property...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-line rounded-2xl p-10 text-center">
            <p className="font-semibold text-ink">
              {state.notFound
                ? 'Property not found'
                : 'Could not load property'}
            </p>
            {!state.notFound && (
              <p className="mt-2 text-sm text-muted">{state.message}</p>
            )}
            <Link
              to="/properties"
              className="inline-block mt-5 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
            >
              Back to browse
            </Link>
          </div>
        )}

        {state.status === 'success' && <Detail property={state.property} />}
      </div>
    </div>
  );
}

function Detail({ property }) {
  const {
    title,
    description,
    city,
    address,
    rent,
    bedrooms,
    furnishing,
    type,
    amenities = [],
    images = [],
    available,
    owner,
  } = property;

  return (
    <>
      <div className="rounded-2xl overflow-hidden bg-sand-soft aspect-[16/9] border border-line">
        {images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <PlaceholderHero />
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
                {title}
              </h1>
              {city && (
                <p className="mt-2 text-muted">
                  {city}
                  {address ? ` · ${address}` : ''}
                </p>
              )}
            </div>
            {available ? (
              <span className="text-xs font-medium bg-sage-soft text-sage-dark px-3 py-1 rounded-full whitespace-nowrap">
                Available
              </span>
            ) : (
              <span className="text-xs font-medium bg-sand-soft text-muted px-3 py-1 rounded-full whitespace-nowrap">
                Not available
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {type && <Pill>{TYPE_LABEL[type] || type}</Pill>}
            {typeof bedrooms === 'number' && bedrooms > 0 && (
              <Pill>{bedrooms} BHK</Pill>
            )}
            {furnishing && (
              <Pill>{FURNISH_LABEL[furnishing] || furnishing}</Pill>
            )}
          </div>

          {description && (
            <div className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand">
                Description
              </h2>
              <p className="mt-3 text-ink/85 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {amenities.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand">
                Amenities
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <span
                    key={a}
                    className="text-sm bg-white border border-line text-ink px-3 py-1.5 rounded-full"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
            <p className="text-xs uppercase tracking-widest text-muted">
              Monthly rent
            </p>
            <p className="text-3xl font-bold text-ink font-display mt-2">
              {formatRent(rent)}
              <span className="text-base font-medium text-muted"> /mo</span>
            </p>
          </div>

          {owner && (
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-semibold text-muted uppercase tracking-widest">
                Listed by
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-soft text-brand flex items-center justify-center font-semibold flex-shrink-0">
                  {(owner.name?.[0] || '?').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate">{owner.name}</p>
                  {owner.city && (
                    <p className="text-sm text-muted truncate">{owner.city}</p>
                  )}
                </div>
              </div>

              {owner.email ? (
                <a
                  href={`mailto:${owner.email}?subject=${encodeURIComponent(
                    'Inquiry about ' + title
                  )}`}
                  className="mt-5 block text-center bg-brand text-white hover:bg-brand-dark px-4 py-2.5 rounded-md font-medium transition shadow-sm"
                >
                  Contact owner
                </a>
              ) : (
                <button
                  disabled
                  className="mt-5 w-full text-center bg-sand text-muted px-4 py-2.5 rounded-md font-medium cursor-not-allowed"
                >
                  Contact info unavailable
                </button>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
