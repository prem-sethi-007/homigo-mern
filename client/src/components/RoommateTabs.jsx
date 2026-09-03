import { Link } from 'react-router-dom';

function tabClass(active) {
  const base = 'py-3 text-sm font-medium border-b-2 transition ';
  return (
    base +
    (active
      ? 'border-brand text-ink'
      : 'border-transparent text-muted hover:text-ink')
  );
}

export default function RoommateTabs({ current }) {
  return (
    <div className="mt-6 border-b border-line">
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
