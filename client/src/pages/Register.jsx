import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
    city: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 mb-24 px-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
          Join HOMIGO
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink">
          Create your account.
        </h1>
        <p className="mt-3 text-sm text-muted">
          Find your home. Find your people.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 bg-white border border-line rounded-2xl p-8 space-y-5 shadow-sm"
      >
        <FormField
          label="Name"
          name="name"
          value={form.name}
          onChange={updateField}
          required
          autoComplete="name"
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          required
          autoComplete="email"
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={updateField}
          minLength={6}
          required
          autoComplete="new-password"
        />

        <label className="block">
          <span className="text-sm font-medium text-ink">I am a</span>
          <select
            name="role"
            value={form.role}
            onChange={updateField}
            className="mt-1.5 w-full border border-line rounded-full px-4 py-2.5 bg-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/40 transition"
          >
            <option value="tenant">Tenant (looking for a place)</option>
            <option value="owner">Owner (listing a property)</option>
          </select>
        </label>

        <FormField
          label="City (optional)"
          name="city"
          value={form.city}
          onChange={updateField}
        />
        <FormField
          label="Phone (optional)"
          name="phone"
          value={form.phone}
          onChange={updateField}
        />

        {error && <p className="text-sm text-error-dark">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand text-white hover:bg-brand-dark rounded-full py-3 font-medium disabled:opacity-50 transition shadow-sm"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-muted mt-6 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-dark font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
