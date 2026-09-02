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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={IcPlus}
          title="Add a Property"
          description="List a flat, room or PG for tenants to discover."
          comingSoon
        />
        <DashboardCard
          icon={IcList}
          title="My Listings"
          description="Manage the properties you've posted so far."
          comingSoon
        />
        <DashboardCard
          icon={IcChart}
          title="Listing Insights"
          description="See how many people are viewing and saving your properties."
          comingSoon
        />
      </div>

      <div className="mt-8 bg-white border border-slate-200 rounded-xl p-8 text-center">
        <p className="font-semibold text-slate-900">
          You haven't listed any properties yet.
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Once property management is enabled, your listings will appear here.
        </p>
      </div>
    </div>
  );
}
