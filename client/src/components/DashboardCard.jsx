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
        'h-full bg-white border border-slate-200 rounded-xl p-5 flex items-start gap-4 ' +
        (clickable
          ? 'hover:border-slate-400 hover:shadow-sm transition'
          : 'opacity-80')
      }
    >
      <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          {comingSoon && (
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Coming soon
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
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
