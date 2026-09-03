import { Link } from 'react-router-dom';

function tabClass(active) {
  const base = 'py-3 text-sm font-medium border-b-2 ';
  return (
    base +
    (active
      ? 'border-slate-900 text-slate-900'
      : 'border-transparent text-slate-600 hover:text-slate-900')
  );
}

export default function RoommateTabs({ current }) {
  return (
    <div className="mt-6 border-b border-slate-200">
      <nav className="flex gap-6 -mb-px">
        <Link to="/roommates" className={tabClass(current === 'all')}>
          Browse all
        </Link>
        <Link
          to="/roommates/recommended"
          className={tabClass(current === 'recommended')}
        >
          Recommended for you
        </Link>
      </nav>
    </div>
  );
}
