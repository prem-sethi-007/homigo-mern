import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

export default function Favorites() {
  const { favoriteIds } = useAuth();
  const [state, setState] = useState({ status: 'loading' });

  function load() {
    let active = true;
    setState({ status: 'loading' });
    propertyService
      .getFavorites()
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

  useEffect(() => load(), []);

  const visible =
    state.status === 'success'
      ? state.properties.filter((p) => favoriteIds.has(String(p._id)))
      : [];

  return (
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      <div className="flex items-end justify-between flex-wrap gap-6 border-b border-line pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
            Favorites
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
            Saved properties.
          </h1>
          <p className="mt-4 text-muted max-w-xl">
            Places you've hearted to compare later.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {visible.length} saved
          </p>
        )}
      </div>

      <div className="mt-10">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading favorites…</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-8 text-center">
            <p className="font-display text-lg text-error-dark">
              Could not load favorites
            </p>
            <p className="mt-2 text-sm text-muted">{state.message}</p>
            <button
              onClick={load}
              className="mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && visible.length === 0 && (
          <div className="border border-line rounded-2xl p-14 text-center">
            <p className="font-display text-2xl text-ink">
              No saved properties yet.
            </p>
            <p className="mt-3 text-sm text-muted">
              Tap the heart on any property to save it here.
            </p>
            <Link
              to="/properties"
              className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Browse properties
            </Link>
          </div>
        )}

        {state.status === 'success' && visible.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
