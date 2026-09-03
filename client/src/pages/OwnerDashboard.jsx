import { Link } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';

const IcPlus = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const IcList = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const IcChart = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

export default function OwnerDashboard() {
  return (
    <div>
      <div className="bg-brand text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest text-brand-soft">
              Get started
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl">
              List a property in minutes
            </h2>
            <p className="mt-2 text-sm text-brand-soft/90">
              Add photos, rent and amenities. Tenants across cities can find
              your listing right away.
            </p>
          </div>
          <Link
            to="/properties/new"
            className="bg-white text-brand hover:bg-brand-soft px-5 py-2.5 rounded-md text-sm font-semibold transition shadow-sm whitespace-nowrap"
          >
            + Add a property
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={IcPlus}
          title="Add a Property"
          description="List a flat, room or PG for tenants to discover."
          to="/properties/new"
        />
        <DashboardCard
          icon={IcList}
          title="My Listings"
          description="Manage the properties you've posted so far."
          to="/properties/mine"
        />
        <DashboardCard
          icon={IcChart}
          title="Listing Insights"
          description="See how many people are viewing and saving your properties."
          comingSoon
        />
      </div>
    </div>
  );
}
