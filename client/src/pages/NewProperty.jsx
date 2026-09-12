import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyForm from '../components/PropertyForm';

export default function NewProperty() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(payload) {
    setError('');
    setSubmitting(true);
    try {
      await propertyService.create(payload);
      navigate('/properties/mine');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <Link
        to="/dashboard"
        className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition"
      >
        ← Back to dashboard
      </Link>
      <div className="mt-6">
        <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
          Add a property
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink">
          List a new place.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Add photos, rent and amenities so tenants can find you.
        </p>
      </div>

      <div className="mt-10">
        <PropertyForm
          submitLabel="Create listing"
          submitting={submitting}
          error={error}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
}
