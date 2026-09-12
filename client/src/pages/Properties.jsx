import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

const EMPTY_FILTERS = { city: '', type: '', minRent: '', maxRent: '' };
const TYPE_LABEL = { flat: 'Flat', room: 'Room', pg: 'PG' };

function toParams(f) {
  const p = {};
  if (f.city && f.city.trim()) p.city = f.city.trim();
  if (f.type) p.type = f.type;
  if (f.minRent !== '') p.minRent = f.minRent;
  if (f.maxRent !== '') p.maxRent = f.maxRent;
  return p;
}

export default function Properties() {
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);
  const [state, setState] = useState({ status: 'loading' });

  function load(f) {
    let active = true;
    setState({ status: 'loading' });
    propertyService
      .list(toParams(f))
      .then((data) => {
        if (active)
          setState({
            status: 'success',
            properties: data.properties || [],
          });
      })
      .catch((err) => {
        if (active)
          setState({
            status: 'error',
            message: err.response?.data?.message || err.message,
          });
      });
    return () => {
      active = false;
    };
  }

  useEffect(() => load(EMPTY_FILTERS), []);

  function updateField(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setActiveFilters(filters);
    load(filters);
  }

  function handleClear() {
    setFilters(EMPTY_FILTERS);
    setActiveFilters(EMPTY_FILTERS);
    load(EMPTY_FILTERS);
  }

  const hasActive =
    !!activeFilters.city ||
    !!activeFilters.type ||
    activeFilters.minRent !== '' ||
    activeFilters.maxRent !== '';

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-6 border-b border-line pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
            Homes
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
            Browse the marketplace.
          </h1>
          <p className="mt-4 text-muted max-w-xl">
            Flats, private rooms and PGs across cities — filter by budget or
            type, tap the heart to save.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {state.properties.length} listing
            {state.properties.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      {/* Filters */}
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Field
              label="City"
              name="city"
              value={filters.city}
              onChange={updateField}
              placeholder="Bengaluru, Mumbai…"
            />
          </div>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              Type
            </span>
            <select
              name="type"
              value={filters.type}
              onChange={updateField}
              className="mt-2 w-full border border-line rounded-full px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/40 transition"
            >
              <option value="">Any</option>
              <option value="flat">Flat</option>
              <option value="room">Room</option>
              <option value="pg">PG</option>
            </select>
          </label>
          <Field
            label="Min rent (₹)"
            name="minRent"
            type="number"
            min="0"
            value={filters.minRent}
            onChange={updateField}
            placeholder="0"
          />
          <Field
            label="Max rent (₹)"
            name="maxRent"
            type="number"
            min="0"
            value={filters.maxRent}
            onChange={updateField}
            placeholder="Any"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 justify-end">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm text-muted hover:text-ink transition"
          >
            Clear
          </button>
          <button
            type="submit"
            className="text-sm font-medium bg-brand text-white hover:bg-brand-dark px-6 py-2.5 rounded-full transition"
          >
            Apply filters
          </button>
        </div>
      </form>

      {/* Active chips */}
      {hasActive && (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted">
            Active
          </span>
          {activeFilters.city && <Chip>City · {activeFilters.city}</Chip>}
          {activeFilters.type && (
            <Chip>
              Type · {TYPE_LABEL[activeFilters.type] || activeFilters.type}
            </Chip>
          )}
          {activeFilters.minRent !== '' && (
            <Chip>
              Min · ₹{Number(activeFilters.minRent).toLocaleString('en-IN')}
            </Chip>
          )}
          {activeFilters.maxRent !== '' && (
            <Chip>
              Max · ₹{Number(activeFilters.maxRent).toLocaleString('en-IN')}
            </Chip>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="mt-12">
        {state.status === 'loading' && <LoadingGrid />}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-8 text-center">
            <p className="font-display text-lg text-error-dark">
              Could not load properties
            </p>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
            <button
              onClick={() => load(activeFilters)}
              className="mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && state.properties.length === 0 && (
          <div className="border border-line rounded-2xl p-14 text-center">
            <p className="font-display text-2xl text-ink">
              {hasActive
                ? 'No properties match your filters.'
                : 'No properties yet.'}
            </p>
            <p className="mt-3 text-sm text-muted">
              {hasActive
                ? 'Try broadening your search — or clear filters entirely.'
                : 'Check back soon, or sign up as an Owner to be the first to list.'}
            </p>
            {hasActive ? (
              <button
                onClick={handleClear}
                className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
              >
                Clear filters
              </button>
            ) : (
              <Link
                to="/"
                className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
              >
                Back to home
              </Link>
            )}
          </div>
        )}

        {state.status === 'success' && state.properties.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {state.properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      <input
        {...props}
        className="mt-2 w-full border border-line rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/40 transition"
      />
    </label>
  );
}

function Chip({ children }) {
  return (
    <span className="text-xs font-medium bg-sand-soft text-ink px-3 py-1.5 rounded-full">
      {children}
    </span>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i}>
          <div className="aspect-[4/5] bg-sand-soft rounded-2xl animate-pulse" />
          <div className="mt-4 px-1 space-y-3">
            <div className="h-3 bg-sand-soft rounded animate-pulse w-1/3" />
            <div className="h-5 bg-sand-soft rounded animate-pulse w-3/4" />
            <div className="h-3 bg-sand-soft rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
