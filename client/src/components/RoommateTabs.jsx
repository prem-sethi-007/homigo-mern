import { Link } from 'react-router-dom';

function tabClass(active) {
  const base =
    'pb-3 text-xs font-semibold uppercase tracking-[0.2em] border-b-2 transition ';
  return (
    base +
    (active
      ? 'border-brand text-ink'
      : 'border-transparent text-muted hover:text-ink')
  );
}

export default function RoommateTabs({ current }) {
  return (
    <div className="mt-8 border-b border-line">
      <nav className="flex gap-10 -mb-px">
        <Link to="/roommates" className={tabClass(current === 'all')}>
          Browse all
        </Link>
        <Link
          to="/roommates/recommended"
          className={tabClass(current === 'recommended')}
        >
          Recommended
        </Link>
      </nav>
    </div>
  );
}
