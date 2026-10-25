import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import { getFallbackImage } from '../utils/propertyImage';

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

const TYPE_BADGE = {
  flat: 'bg-navy text-white',
  room: 'bg-brand text-white',
  pg: 'bg-sage text-ink',
};
const AMENITY_TINTS = [
  'bg-navy-soft text-navy border-navy/20',
  'bg-brand-soft text-brand-dark border-brand/20',
  'bg-sage-soft text-sage-dark border-sage-dark/30',
  'bg-white text-ink border-line',
];

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
    <div className="max-w-7xl mx-auto px-6 pt-8 pb-24">
      <Link
        to="/properties"
        className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition"
      >
        ← Back to properties
      </Link>

      <div className="mt-6">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading property…</div>
        )}

        {state.status === 'error' && (
          <div className="border border-line rounded-2xl p-14 text-center">
            <p className="font-display text-2xl text-ink">
              {state.notFound
                ? 'Property not found.'
                : 'Could not load property.'}
            </p>
            {!state.notFound && (
              <p className="mt-3 text-sm text-muted">{state.message}</p>
            )}
            <Link
              to="/properties"
              className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
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

  const [imgFailed, setImgFailed] = useState(false);
  const heroSrc =
    !imgFailed && images[0] ? images[0] : getFallbackImage(property).hero;

  const metaBits = [
    type && TYPE_LABEL[type],
    typeof bedrooms === 'number' && bedrooms > 0 && `${bedrooms} BHK`,
    furnishing && FURNISH_LABEL[furnishing],
  ].filter(Boolean);

  return (
    <>
      {/* Hero image */}
      <div className="relative rounded-3xl overflow-hidden bg-cream-soft aspect-[16/8] shadow-lift">
        <img
          src={heroSrc}
          alt={title}
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent pointer-events-none"
        />
        {type && TYPE_LABEL[type] && (
          <span
            className={`absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-sm ${TYPE_BADGE[type]}`}
          >
            {TYPE_LABEL[type]}
          </span>
        )}
      </div>

      {/* Title + rent row */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3 border-b border-line pb-10">
        <div className="lg:col-span-2">
          <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
            {city || 'Property'}
            {address ? ` · ${address}` : ''}
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.05] tracking-tight text-ink">
            {title}
          </h1>
          {metaBits.length > 0 && (
            <p className="mt-4 text-sm text-muted tracking-wide">
              {metaBits.join(' · ')}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            Monthly rent
          </p>
          <p className="mt-2 font-display text-4xl text-brand">
            {formatRent(rent)}
            <span className="text-base text-muted"> /mo</span>
          </p>
          {available ? (
            <span className="inline-block mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] bg-sage-soft text-sage-dark px-3 py-1.5 rounded-full">
              Available
            </span>
          ) : (
            <span className="inline-block mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] bg-cream-soft text-muted px-3 py-1.5 rounded-full">
              Not available
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {description && (
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
                About this place
              </p>
              <p className="mt-4 text-ink/85 leading-relaxed whitespace-pre-line text-lg font-display">
                {description}
              </p>
            </section>
          )}

          {amenities.length > 0 && (
            <section>
              <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
                Amenities
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {amenities.map((a, i) => (
                  <span
                    key={a}
                    className={`text-sm border px-4 py-1.5 rounded-full ${
                      AMENITY_TINTS[i % AMENITY_TINTS.length]
                    }`}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          {owner && (
            <div className="bg-white border border-line rounded-2xl p-6 shadow-sm sticky top-24">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted">
                Listed by
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-gradient text-white flex items-center justify-center font-semibold flex-shrink-0 shadow-glow">
                  {(owner.name?.[0] || '?').toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-lg text-ink truncate">
                    {owner.name}
                  </p>
                  {owner.city && (
                    <p className="text-xs text-muted truncate">{owner.city}</p>
                  )}
                </div>
              </div>

              {owner.email ? (
                <a
                  href={`mailto:${owner.email}?subject=${encodeURIComponent(
                    'Inquiry about ' + title
                  )}`}
                  className="mt-6 block text-center bg-brand-gradient text-white hover:brightness-110 px-5 py-3 rounded-full text-sm font-medium transition shadow-glow"
                >
                  Contact owner
                </a>
              ) : (
                <button
                  disabled
                  className="mt-6 w-full text-center bg-cream text-muted px-5 py-3 rounded-full text-sm font-medium cursor-not-allowed"
                >
                  Contact info unavailable
                </button>
              )}

              <p className="mt-3 text-[11px] text-muted-soft text-center">
                Replies happen over email.
              </p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
