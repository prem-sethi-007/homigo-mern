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
    <div className="max-w-7xl mx-auto px-6 pt-16 pb-24">
      <div className="flex items-end justify-between flex-wrap gap-6 border-b border-line pb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
            My Listings
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-[1.02] tracking-tight text-ink">
            Properties you've posted.
          </h1>
          <p className="mt-4 text-muted max-w-xl">
            Manage rent, availability and details.
          </p>
        </div>
        <Link
          to="/properties/new"
          className="text-sm font-medium bg-brand text-white hover:bg-brand-dark px-6 py-2.5 rounded-full transition shadow-sm"
        >
          + Add property
        </Link>
      </div>

      {flash && (
        <div
          className={
            'mt-6 rounded-2xl px-5 py-3 text-sm border ' +
            (flash.kind === 'success'
              ? 'bg-sage-soft/70 border-sage-soft text-sage-dark'
              : 'bg-error-soft border-error-soft text-error-dark')
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

      <div className="mt-10">
        {state.status === 'loading' && (
          <div className="text-sm text-muted">Loading your listings…</div>
        )}

        {state.status === 'error' && (
          <div className="bg-white border border-error-soft rounded-2xl p-8 text-center">
            <p className="font-display text-lg text-error-dark">
              Could not load your listings
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

        {state.status === 'success' && state.properties.length === 0 && (
          <div className="border border-line rounded-2xl p-14 text-center">
            <p className="font-display text-2xl text-ink">
              You haven't listed any properties yet.
            </p>
            <p className="mt-3 text-sm text-muted">
              Add your first listing so tenants can find it.
            </p>
            <Link
              to="/properties/new"
              className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
            >
              Add a property
            </Link>
          </div>
        )}

        {state.status === 'success' && state.properties.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {state.properties.map((p) => (
              <div key={p._id} className="flex flex-col gap-3">
                <PropertyCard property={p} />
                <div className="flex gap-2">
                  <Link
                    to={`/properties/${p._id}/edit`}
                    className="flex-1 text-center text-sm font-medium bg-white border border-line hover:border-brand/40 text-ink px-4 py-2 rounded-full transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setToDelete(p)}
                    className="flex-1 text-sm font-medium bg-white border border-error-soft text-error-dark hover:bg-error-soft px-4 py-2 rounded-full transition"
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
