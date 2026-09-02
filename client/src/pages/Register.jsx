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
    <div className="max-w-md mx-auto mt-10 bg-white shadow rounded-lg p-8">
      <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
      <p className="text-sm text-slate-600 mt-1">
        Join HOMIGO to find your home and your people.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          <span className="text-sm font-medium text-slate-700">I am a</span>
          <select
            name="role"
            value={form.role}
            onChange={updateField}
            className="mt-1 w-full border border-slate-300 rounded px-3 py-2 bg-white"
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

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-slate-900 text-white rounded py-2 font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="text-sm text-slate-600 mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-slate-900 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
