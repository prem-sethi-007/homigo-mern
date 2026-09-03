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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Browse Properties
          </h1>
          <p className="mt-1 text-slate-600">
            Flats, rooms and PGs across cities.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-sm text-slate-500">
            {state.properties.length} listing
            {state.properties.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white border border-slate-200 rounded-xl p-4"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-xs font-medium text-slate-600">City</span>
            <input
              name="city"
              value={filters.city}
              onChange={updateField}
              placeholder="e.g. Bengaluru"
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Type</span>
            <select
              name="type"
              value={filters.type}
              onChange={updateField}
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white"
            >
              <option value="">Any</option>
              <option value="flat">Flat</option>
              <option value="room">Room</option>
              <option value="pg">PG</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Min rent</span>
            <input
              name="minRent"
              type="number"
              min="0"
              value={filters.minRent}
              onChange={updateField}
              placeholder="0"
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Max rent</span>
            <input
              name="maxRent"
              type="number"
              min="0"
              value={filters.maxRent}
              onChange={updateField}
              placeholder="Any"
              className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 justify-end">
          <button
            type="button"
            onClick={handleClear}
            className="text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded"
          >
            Clear filters
          </button>
          <button
            type="submit"
            className="text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 px-4 py-1.5 rounded"
          >
            Apply filters
          </button>
        </div>
      </form>

      {hasActive && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500">Active:</span>
          {activeFilters.city && <Chip>City: {activeFilters.city}</Chip>}
          {activeFilters.type && (
            <Chip>Type: {TYPE_LABEL[activeFilters.type] || activeFilters.type}</Chip>
          )}
          {activeFilters.minRent !== '' && (
            <Chip>
              Min: ₹{Number(activeFilters.minRent).toLocaleString('en-IN')}
            </Chip>
          )}
          {activeFilters.maxRent !== '' && (
            <Chip>
              Max: ₹{Number(activeFilters.maxRent).toLocaleString('en-IN')}
            </Chip>
          )}
        </div>
      )}

      <div className="mt-6">
        {state.status === 'loading' && <LoadingGrid />}

        {state.status === 'error' && (
          <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load properties
            </p>
            <p className="mt-1 text-sm text-slate-600">{state.message}</p>
            <button
              onClick={() => load(activeFilters)}
              className="mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && state.properties.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">
              {hasActive
                ? 'No properties match your filters'
                : 'No properties yet'}
            </p>
            <p className="mt-2 text-sm text-slate-600">
              {hasActive
                ? 'Try broadening your search or clear your filters.'
                : 'Check back soon - or sign up as an Owner to be the first to list one.'}
            </p>
            {hasActive ? (
              <button
                onClick={handleClear}
                className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
              >
                Clear filters
              </button>
            ) : (
              <Link
                to="/"
                className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
              >
                Back to home
              </Link>
            )}
          </div>
        )}

        {state.status === 'success' && state.properties.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
}

function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl overflow-hidden"
        >
          <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-slate-100 rounded animate-pulse w-1/2" />
            <div className="h-5 bg-slate-100 rounded animate-pulse w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
