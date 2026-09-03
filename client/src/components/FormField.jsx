export default function FormField({ label, ...inputProps }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        {...inputProps}
        className="mt-1.5 w-full border border-line rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition"
      />
    </label>
  );
}
