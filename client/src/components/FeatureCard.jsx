export default function FeatureCard({ icon, title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{children}</p>
    </div>
  );
}
