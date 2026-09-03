import { useState } from 'react';
import FormField from './FormField';

const EMPTY = {
  title: '',
  description: '',
  type: 'flat',
  city: '',
  address: '',
  rent: '',
  bedrooms: '',
  furnishing: '',
  amenities: '',
  images: '',
  available: true,
};

function hydrate(p) {
  if (!p) return EMPTY;
  return {
    title: p.title || '',
    description: p.description || '',
    type: p.type || 'flat',
    city: p.city || '',
    address: p.address || '',
    rent: p.rent ?? '',
    bedrooms: p.bedrooms ?? '',
    furnishing: p.furnishing || '',
    amenities: Array.isArray(p.amenities) ? p.amenities.join(', ') : '',
    images: Array.isArray(p.images) ? p.images.join(', ') : '',
    available: p.available !== false,
  };
}

function toPayload(f) {
  return {
    title: f.title.trim(),
    description: f.description.trim(),
    type: f.type || undefined,
    city: f.city.trim(),
    address: f.address.trim(),
    rent: f.rent === '' ? undefined : Number(f.rent),
    bedrooms: f.bedrooms === '' ? undefined : Number(f.bedrooms),
    furnishing: f.furnishing || undefined,
    amenities: f.amenities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    images: f.images
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    available: !!f.available,
  };
}

export default function PropertyForm({
  initial,
  submitLabel = 'Save',
  submitting = false,
  error,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(() => hydrate(initial));

  function updateField(e) {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(toPayload(form));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-line rounded-2xl p-6 space-y-6 shadow-sm"
    >
      <FormField
        label="Title *"
        name="title"
        value={form.title}
        onChange={updateField}
        required
        placeholder="e.g. 2BHK in Koramangala"
      />

      <label className="block">
        <span className="text-sm font-medium text-ink">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={updateField}
          rows={4}
          className="mt-1.5 w-full border border-line rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
          placeholder="What's the place like?"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-ink">Type</span>
          <select
            name="type"
            value={form.type}
            onChange={updateField}
            className="mt-1.5 w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            <option value="flat">Flat</option>
            <option value="room">Room</option>
            <option value="pg">PG</option>
          </select>
        </label>
        <FormField
          label="City *"
          name="city"
          value={form.city}
          onChange={updateField}
          required
          placeholder="e.g. Bengaluru"
        />
      </div>

      <FormField
        label="Address"
        name="address"
        value={form.address}
        onChange={updateField}
        placeholder="Street / area / landmark"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField
          label="Rent (per month) *"
          name="rent"
          type="number"
          min="0"
          value={form.rent}
          onChange={updateField}
          required
          placeholder="e.g. 25000"
        />
        <FormField
          label="Bedrooms"
          name="bedrooms"
          type="number"
          min="0"
          value={form.bedrooms}
          onChange={updateField}
          placeholder="e.g. 2"
        />
        <label className="block">
          <span className="text-sm font-medium text-ink">Furnishing</span>
          <select
            name="furnishing"
            value={form.furnishing}
            onChange={updateField}
            className="mt-1.5 w-full border border-line rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
          >
            <option value="">Not specified</option>
            <option value="furnished">Furnished</option>
            <option value="semi">Semi-furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </label>
      </div>

      <FormField
        label="Amenities"
        name="amenities"
        value={form.amenities}
        onChange={updateField}
        placeholder="wifi, parking, gym"
      />

      <FormField
        label="Image URLs"
        name="images"
        value={form.images}
        onChange={updateField}
        placeholder="https://... , https://..."
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={updateField}
          className="w-4 h-4 accent-brand"
        />
        <span className="text-sm text-ink">
          Available for tenants right now
        </span>
      </label>

      {error && <p className="text-sm text-error-dark">{error}</p>}

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="text-sm font-medium bg-sand hover:bg-sand-soft text-ink px-4 py-2 rounded-md disabled:opacity-50 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="text-sm font-medium bg-brand text-white hover:bg-brand-dark px-5 py-2 rounded-md disabled:opacity-50 transition shadow-sm"
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
