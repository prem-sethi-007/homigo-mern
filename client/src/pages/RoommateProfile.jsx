import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { roommateService } from '../services/roommateService';
import FormField from '../components/FormField';

const EMPTY = {
  age: '',
  gender: '',
  occupation: '',
  city: '',
  budgetMin: '',
  budgetMax: '',
  preferredAreas: '',
  lifestyle: '',
  smoking: '',
  pets: '',
  bio: '',
};

function hydrate(p) {
  if (!p) return EMPTY;
  return {
    age: p.age ?? '',
    gender: p.gender || '',
    occupation: p.occupation || '',
    city: p.city || '',
    budgetMin: p.budgetMin ?? '',
    budgetMax: p.budgetMax ?? '',
    preferredAreas: Array.isArray(p.preferredAreas)
      ? p.preferredAreas.join(', ')
      : '',
    lifestyle: p.lifestyle || '',
    smoking: p.smoking || '',
    pets: p.pets || '',
    bio: p.bio || '',
  };
}

function toPayload(f) {
  return {
    age: f.age === '' ? undefined : Number(f.age),
    gender: f.gender || undefined,
    occupation: f.occupation.trim(),
    city: f.city.trim(),
    budgetMin: f.budgetMin === '' ? undefined : Number(f.budgetMin),
    budgetMax: f.budgetMax === '' ? undefined : Number(f.budgetMax),
    preferredAreas: f.preferredAreas
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    lifestyle: f.lifestyle || undefined,
    smoking: f.smoking || undefined,
    pets: f.pets || undefined,
    bio: f.bio.trim(),
  };
}

export default function RoommateProfile() {
  const [state, setState] = useState({ status: 'loading' });
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState('');

  useEffect(() => {
    let active = true;
    setState({ status: 'loading' });
    roommateService
      .getMyProfile()
      .then((data) => {
        if (!active) return;
        setForm(hydrate(data.profile));
        setState({ status: 'hasProfile', profile: data.profile });
      })
      .catch((err) => {
        if (!active) return;
        if (err.response?.status === 404) {
          setForm(EMPTY);
          setState({ status: 'noProfile' });
        } else {
          setState({
            status: 'error',
            message: err.response?.data?.message || err.message,
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  function updateField(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setFlash('');
    setSubmitting(true);
    try {
      const payload = toPayload(form);
      const isEdit = state.status === 'hasProfile';
      const saved = isEdit
        ? await roommateService.updateMyProfile(payload)
        : await roommateService.createMyProfile(payload);
      setForm(hydrate(saved.profile));
      setState({ status: 'hasProfile', profile: saved.profile });
      setFlash(isEdit ? 'Profile updated.' : 'Profile created.');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (state.status === 'loading') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-sm text-muted">
        Loading your roommate profile...
      </div>
    );
  }

  if (state.status === 'error') {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border border-error-soft rounded-2xl p-6 text-center">
          <p className="font-semibold text-error-dark">Could not load profile</p>
          <p className="mt-1 text-sm text-muted">{state.message}</p>
        </div>
      </div>
    );
  }

  const isEdit = state.status === 'hasProfile';

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/dashboard"
        className="text-sm text-muted hover:text-ink transition"
      >
        ← Back to dashboard
      </Link>

      <div className="mt-4">
        <p className="text-xs uppercase tracking-widest text-brand font-semibold">
          Roommate profile
        </p>
        <h1 className="mt-1 font-display text-3xl text-ink">
          {isEdit ? 'Your preferences' : 'Set your preferences'}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {isEdit
            ? "Update what you're looking for — matches update immediately."
            : 'Tell others your preferences so they can match with you.'}
        </p>
      </div>

      {flash && (
        <div className="mt-5 rounded-xl px-4 py-3 text-sm bg-sage-soft/70 border border-sage-soft text-sage-dark">
          {flash}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white border border-line rounded-2xl p-6 space-y-6 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            label="Age"
            name="age"
            type="number"
            min="16"
            max="100"
            value={form.age}
            onChange={updateField}
            placeholder="e.g. 23"
          />
          <label className="block">
            <span className="text-sm font-medium text-ink">Gender</span>
            <select
              name="gender"
              value={form.gender}
              onChange={updateField}
              className="mt-1.5 w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <FormField
            label="Occupation"
            name="occupation"
            value={form.occupation}
            onChange={updateField}
            placeholder="Student, Software eng."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            label="City"
            name="city"
            value={form.city}
            onChange={updateField}
            placeholder="e.g. Bengaluru"
          />
          <FormField
            label="Budget min (₹)"
            name="budgetMin"
            type="number"
            min="0"
            value={form.budgetMin}
            onChange={updateField}
            placeholder="e.g. 8000"
          />
          <FormField
            label="Budget max (₹)"
            name="budgetMax"
            type="number"
            min="0"
            value={form.budgetMax}
            onChange={updateField}
            placeholder="e.g. 20000"
          />
        </div>

        <FormField
          label="Preferred areas"
          name="preferredAreas"
          value={form.preferredAreas}
          onChange={updateField}
          placeholder="Koramangala, HSR, Indiranagar"
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-ink">Lifestyle</span>
            <select
              name="lifestyle"
              value={form.lifestyle}
              onChange={updateField}
              className="mt-1.5 w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              <option value="">Not specified</option>
              <option value="quiet">Quiet</option>
              <option value="social">Social</option>
              <option value="balanced">Balanced</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Smoking</span>
            <select
              name="smoking"
              value={form.smoking}
              onChange={updateField}
              className="mt-1.5 w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              <option value="">Not specified</option>
              <option value="no">No</option>
              <option value="occasionally">Occasionally</option>
              <option value="yes">Yes</option>
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-ink">Pets</span>
            <select
              name="pets"
              value={form.pets}
              onChange={updateField}
              className="mt-1.5 w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              <option value="">Not specified</option>
              <option value="no">No</option>
              <option value="okay">Okay with pets</option>
              <option value="yes">Have pets</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-ink">Bio</span>
          <textarea
            name="bio"
            rows={4}
            value={form.bio}
            onChange={updateField}
            className="mt-1.5 w-full border border-line rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
            placeholder="A short intro so people know what you're like..."
          />
        </label>

        {error && <p className="text-sm text-error-dark">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="text-sm font-medium bg-brand text-white hover:bg-brand-dark px-5 py-2 rounded-md disabled:opacity-50 transition shadow-sm"
          >
            {submitting
              ? 'Saving...'
              : isEdit
              ? 'Save changes'
              : 'Create profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
