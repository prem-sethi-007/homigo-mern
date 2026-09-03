import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
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
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 mb-16 bg-white shadow-sm rounded-2xl p-8 border border-line">
      <h1 className="font-display text-3xl text-ink">Log in</h1>
      <p className="mt-1 text-sm text-muted">Welcome back to HOMIGO.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          required
          autoComplete="current-password"
        />

        {error && <p className="text-sm text-error-dark">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-brand text-white hover:bg-brand-dark rounded-md py-2.5 font-medium disabled:opacity-50 transition shadow-sm"
        >
          {submitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="text-sm text-muted mt-6 text-center">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-brand font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
