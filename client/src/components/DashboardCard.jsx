import { Link } from 'react-router-dom';

// Full class names so Tailwind can see them.
const TONES = {
  brand: {
    icon: 'bg-brand-soft text-brand',
    hover: 'hover:border-brand/40',
  },
  teal: {
    icon: 'bg-teal-soft text-teal-dark',
    hover: 'hover:border-teal/40',
  },
  marigold: {
    icon: 'bg-marigold-soft text-marigold-dark',
    hover: 'hover:border-marigold/50',
  },
  sage: {
    icon: 'bg-sage-soft text-sage-dark',
    hover: 'hover:border-sage/40',
  },
};

export default function DashboardCard({
  title,
  description,
  icon,
  to,
  comingSoon = false,
  tone = 'brand',
}) {
  const clickable = to && !comingSoon;
  const t = TONES[tone] || TONES.brand;

  const inner = (
    <div
      className={
        'h-full bg-white border border-line rounded-2xl p-6 flex items-start gap-4 transition ' +
        (clickable
          ? `${t.hover} hover:shadow-lift hover:-translate-y-0.5`
          : 'opacity-75')
      }
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${t.icon}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg text-ink">{title}</h3>
          {comingSoon && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-marigold-dark bg-marigold-soft px-2 py-0.5 rounded-full">
              Soon
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );

  return clickable ? (
    <Link to={to} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
