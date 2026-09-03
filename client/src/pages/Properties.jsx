import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';

export default function Properties() {
  const [state, setState] = useState({ status: 'loading' });

  function load() {
    let active = true;
    setState({ status: 'loading' });
    propertyService
      .list()
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

  useEffect(() => {
    return load();
  }, []);

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

      <div className="mt-8">
        {state.status === 'loading' && <LoadingGrid />}

        {state.status === 'error' && (
          <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load properties
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

        {state.status === 'success' && state.properties.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="font-semibold text-slate-900">No properties yet</p>
            <p className="mt-2 text-sm text-slate-600">
              Check back soon - or sign up as an Owner to be the first to list
              one.
            </p>
            <Link
              to="/"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Back to home
            </Link>
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
