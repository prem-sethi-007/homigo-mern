import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/PropertyCard';
import ConfirmDialog from '../components/ConfirmDialog';

export default function MyListings() {
  const [state, setState] = useState({ status: 'loading' });
  const [flash, setFlash] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function load() {
    let active = true;
    setState({ status: 'loading' });
    propertyService
      .mine()
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

  async function confirmDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await propertyService.remove(toDelete._id);
      setState((s) =>
        s.status === 'success'
          ? {
              ...s,
              properties: s.properties.filter((p) => p._id !== toDelete._id),
            }
          : s
      );
      setFlash({ kind: 'success', message: `Deleted "${toDelete.title}".` });
      setToDelete(null);
    } catch (err) {
      setFlash({
        kind: 'error',
        message:
          err.response?.data?.message ||
          err.message ||
          'Could not delete the property.',
      });
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Listings</h1>
          <p className="mt-1 text-slate-600">
            Properties you've posted on HOMIGO.
          </p>
        </div>
        <Link
          to="/properties/new"
          className="text-sm font-medium bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded"
        >
          + Add property
        </Link>
      </div>

      {flash && (
        <div
          className={
            'mt-6 rounded-lg px-4 py-3 text-sm ' +
            (flash.kind === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-700')
          }
        >
          <div className="flex items-start justify-between gap-3">
            <span>{flash.message}</span>
            <button
              onClick={() => setFlash(null)}
              className="text-xs font-medium underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        {state.status === 'loading' && (
          <div className="text-sm text-slate-500">Loading your listings...</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-red-200 rounded-xl p-6 text-center">
            <p className="font-semibold text-red-700">
              Could not load your listings
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
            <p className="font-semibold text-slate-900">
              You haven't listed any properties yet
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Add your first listing so tenants can find it.
            </p>
            <Link
              to="/properties/new"
              className="inline-block mt-4 bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded font-medium"
            >
              Add a property
            </Link>
          </div>
        )}

        {state.status === 'success' && state.properties.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.properties.map((p) => (
              <div key={p._id} className="flex flex-col gap-2">
                <PropertyCard property={p} />
                <div className="flex gap-2">
                  <Link
                    to={`/properties/${p._id}/edit`}
                    className="flex-1 text-center text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setToDelete(p)}
                    className="flex-1 text-sm font-medium bg-white border border-red-200 text-red-700 hover:bg-red-50 px-3 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this property?"
        message={
          toDelete
            ? `"${toDelete.title}" will be permanently removed. This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
        submitting={deleting}
        danger
      />
    </div>
  );
}
