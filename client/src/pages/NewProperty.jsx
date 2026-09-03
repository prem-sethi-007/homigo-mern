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
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link
        to="/dashboard"
        className="text-sm text-slate-600 hover:text-slate-900"
      >
        &larr; Back to dashboard
      </Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Add a property
      </h1>
      <p className="mt-1 text-sm text-slate-600">
        List a flat, room or PG for tenants to discover.
      </p>

      <div className="mt-6">
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
