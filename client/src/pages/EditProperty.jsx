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
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm text-muted">
        Loading property...
      </div>
    );
  }

  if (loadState.status === 'error') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border border-line rounded-2xl p-10 text-center">
          <p className="font-semibold text-ink">
            {loadState.notFound
              ? 'Property not found'
              : 'Could not load property'}
          </p>
          {!loadState.notFound && (
            <p className="mt-2 text-sm text-muted">{loadState.message}</p>
          )}
          <Link
            to="/properties/mine"
            className="inline-block mt-5 bg-brand text-white hover:bg-brand-dark px-4 py-2 rounded-md font-medium transition"
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
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/properties/mine"
        className="text-sm text-muted hover:text-ink transition"
      >
        ← Back to My Listings
      </Link>
      <h1 className="mt-4 font-display text-3xl text-ink">Edit property</h1>
      <p className="mt-2 text-sm text-muted">
        Update the details for <span className="font-medium text-ink">{p.title}</span>.
      </p>

      <div className="mt-8">
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
