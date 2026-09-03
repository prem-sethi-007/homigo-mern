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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Saved properties
          </h1>
          <p className="mt-1 text-slate-600">
            Listings you've hearted to compare later.
          </p>
        </div>
        {state.status === 'success' && (
          <p className="text-sm text-slate-500">{visible.length} saved</p>
        )}
      </div>

      <div className="mt-6">
        {state.status === 'loading' && (
          <div className="text-sm text-slate-500">Loading favorites...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load favorites
            </p>
            <p className="mt-1 text-sm text-slate-600">{state.message}</p>
            <button
              onClick={load}
              className="mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {state.status === 'success' && visible.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">
              No saved properties yet
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Tap the heart on any property to save it here.
            </p>
            <Link
              to="/properties"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Browse properties
            </Link>
          </div>
        )}

        {state.status === 'success' && visible.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
