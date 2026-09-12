export default function FormField({ label, ...inputProps }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        {...inputProps}
        className="mt-1.5 w-full border border-line rounded-full px-4 py-2.5 focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/40 transition"
      />
    </label>
  );
}
