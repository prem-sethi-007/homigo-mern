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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand font-semibold">
            Favorites
          </p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl text-ink">
            Saved properties
          </h1>
          <p className="mt-2 text-muted">
            Listings you've hearted to compare later.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-sm text-muted">{visible.length} saved</p>
        )}
      </div>

      <div className="mt-8">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading favorites...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-6 text-center">
            <p className="font-semibold text-error-dark">
              Could not load favorites
            </p>
            <p className="mt-1 text-sm text-muted">{state.message}</p>
            <button
              onClick={load}
              className="mt-4 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && visible.length === 0 && (
          <div className="bg-white border border-line rounded-2xl p-10 text-center">
            <p className="font-semibold text-ink">
              No saved properties yet
            </p>
            <p className="mt-2 text-sm text-muted">
              Tap the heart on any property to save it here.
            </p>
            <Link
              to="/properties"
              className="inline-block mt-5 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
            >
              Browse properties
            </Link>
          </div>
        )}

        {state.status === 'success' && visible.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
