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
  return `₹${n.toLocaleString('en-IN')}/mo`;
}

function Pill({ children }) {
  return (
    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
      {children}
    </span>
  );
}

function PlaceholderHero() {
  return (
    <div className="w-full h-full flex items-center justify-center text-slate-300">
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
        className="text-sm text-slate-600 hover:text-slate-900"
      >
        &larr; Back to properties
      </Link>

      <div className="mt-4">
        {state.status === 'loading' && (
          <div className="text-slate-500 text-sm">Loading property...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">
              {state.notFound
                ? 'Property not found'
                : 'Could not load property'}
            </p>
            {!state.notFound && (
              <p className="mt-2 text-sm text-slate-600">{state.message}</p>
            )}
            <Link
              to="/properties"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
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
      <div className="rounded-xl overflow-hidden bg-slate-100 aspect-[16/9]">
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

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {title}
              </h1>
              {city && (
                <p className="mt-1 text-slate-600">
                  {city}
                  {address ? ` · ${address}` : ''}
                </p>
              )}
            </div>
            {available ? (
              <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                Available
              </span>
            ) : (
              <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap">
                Not available
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {type && <Pill>{TYPE_LABEL[type] || type}</Pill>}
            {typeof bedrooms === 'number' && bedrooms > 0 && (
              <Pill>{bedrooms} BHK</Pill>
            )}
            {furnishing && (
              <Pill>{FURNISH_LABEL[furnishing] || furnishing}</Pill>
            )}
          </div>

          {description && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Description
              </h2>
              <p className="mt-2 text-slate-700 whitespace-pre-line">
                {description}
              </p>
            </div>
          )}

          {amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Amenities
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {amenities.map((a) => (
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
        </div>

        <aside className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="text-sm text-slate-500">Monthly rent</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {formatRent(rent)}
            </p>
          </div>

          {owner && (
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Listed by
              </p>
              <p className="mt-2 font-semibold text-slate-900">{owner.name}</p>
              {owner.city && (
                <p className="text-sm text-slate-600">{owner.city}</p>
              )}

              {owner.email ? (
                <a
                  href={`mailto:${owner.email}?subject=${encodeURIComponent(
                    'Inquiry about ' + title
                  )}`}
                  className="mt-4 block text-center bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
                >
                  Contact Owner
                </a>
              ) : (
                <button
                  disabled
                  className="mt-4 w-full text-center bg-slate-200 text-slate-500 px-4 py-2 rounded font-medium cursor-not-allowed"
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
