import { Link } from 'react-router-dom';

export default function DashboardCard({
  title,
  description,
  icon,
  to,
  comingSoon = false,
}) {
  const clickable = to && !comingSoon;

  const inner = (
    <div
      className={
        'h-full bg-white border border-line rounded-2xl p-5 flex items-start gap-4 transition ' +
        (clickable
          ? 'hover:border-brand/40 hover:shadow-md'
          : 'opacity-80')
      }
    >
      <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-ink">{title}</h3>
          {comingSoon && (
            <span className="text-xs font-medium text-muted bg-sand-soft px-2 py-0.5 rounded-full">
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted leading-relaxed">
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
