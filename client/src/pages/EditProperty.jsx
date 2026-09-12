import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyForm from '../components/PropertyForm';
import { useAuth } from '../context/AuthContext';

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loadState, setLoadState] = useState({ status: 'loading' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoadState({ status: 'loading' });
    propertyService
      .getById(id)
      .then((data) => {
        if (active) setLoadState({ status: 'ready', property: data.property });
      })
      .catch((err) => {
        if (!active) return;
        const status = err.response?.status;
        setLoadState({
          status: 'error',
          notFound: status === 404,
          message: err.response?.data?.message || err.message,
        });
      });
    return () => {
      active = false;
    };
  }, [id]);

  async function handleSubmit(payload) {
    setError('');
    setSubmitting(true);
    try {
      await propertyService.update(id, payload);
      navigate(`/properties/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loadState.status === 'loading') {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-16 text-sm text-muted">
        Loading property…
      </div>
    );
  }

  if (loadState.status === 'error') {
    return (
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="border border-line rounded-2xl p-14 text-center">
          <p className="font-display text-2xl text-ink">
            {loadState.notFound
              ? 'Property not found.'
              : 'Could not load property.'}
          </p>
          {!loadState.notFound && (
            <p className="mt-3 text-sm text-muted">{loadState.message}</p>
          )}
          <Link
            to="/properties/mine"
            className="inline-block mt-6 bg-brand text-white hover:bg-brand-dark px-5 py-2.5 rounded-full text-sm font-medium transition"
          >
            Back to My Listings
          </Link>
        </div>
      </div>
    );
  }

  const p = loadState.property;
  const ownerId = p.owner?._id || p.owner;
  if (String(ownerId) !== String(user._id)) {
    return <Navigate to="/properties/mine" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <Link
        to="/properties/mine"
        className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition"
      >
        ← Back to My Listings
      </Link>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
          Edit property
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink">
          Update {p.title}.
        </h1>
      </div>

      <div className="mt-10">
        <PropertyForm
          initial={p}
          submitLabel="Save changes"
          submitting={submitting}
          error={error}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
