export default function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white border border-line rounded-2xl p-6 hover:shadow-sm hover:border-brand/30 transition">
      <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-5 font-semibold text-ink text-lg">{title}</h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{children}</p>
    </div>
  );
}
