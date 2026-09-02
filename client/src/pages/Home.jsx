import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FeatureCard from '../components/FeatureCard';

const HomeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.5 1.5 0 0 1 2.12 0L22.28 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125h4.125v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const UsersIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const ShieldIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 4.556-3.045 8.412-7.213 9.615a1.503 1.503 0 0 1-.87 0C8.744 20.412 5.7 16.556 5.7 12V6.375a1.5 1.5 0 0 1 .928-1.387c.31-.128 6.24-2.488 6.372-2.488s6.061 2.36 6.372 2.488a1.5 1.5 0 0 1 .928 1.387V12Z" />
  </svg>
);

const STEPS = [
  {
    step: 1,
    title: 'Create an account',
    desc: 'Sign up as a Tenant (looking for a home) or an Owner (listing a property).',
  },
  {
    step: 2,
    title: 'Explore your city',
    desc: 'Browse listings, save favorites, and check out roommate profiles.',
  },
  {
    step: 3,
    title: 'Find your fit',
    desc: 'Reach out, move in, and settle into your new home with the right people.',
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
            City-based accommodation
          </p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
            HOMIGO
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-slate-700 font-medium">
            Find Your Home. Find Your People.
          </p>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            Discover flats, rooms and PGs across your city - and match with
            compatible roommates who fit your lifestyle. Made for students and
            working professionals.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/properties"
              className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium"
            >
              Browse Properties
            </Link>
            <Link
              to="/roommates"
              className="bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium"
            >
              Find Roommates
            </Link>
          </div>

          {!user && (
            <p className="mt-6 text-sm text-slate-500">
              New here?{' '}
              <Link
                to="/register"
                className="text-slate-900 font-medium hover:underline"
              >
                Create a free account
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900">
            Everything you need to move in
          </h2>
          <p className="mt-2 text-center text-slate-600">
            One place for both sides of the move.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <FeatureCard icon={HomeIcon} title="Discover Properties">
              Search flats, private rooms and PGs across your city, filtered by
              rent, type and amenities.
            </FeatureCard>
            <FeatureCard icon={UsersIcon} title="Compatible Roommates">
              Match with people who share your budget, schedule and lifestyle -
              not just the room.
            </FeatureCard>
            <FeatureCard icon={ShieldIcon} title="Owner-Verified Listings">
              Each listing is posted by the owner themselves, so what you see is
              what you get.
            </FeatureCard>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-slate-900">
            How it works
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-slate-900 text-white flex items-center justify-center font-semibold">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {user ? `Welcome back, ${user.name}` : 'Ready to find your home?'}
          </h2>
          <p className="mt-3 text-slate-600">
            {user
              ? 'Jump into your dashboard to pick up where you left off.'
              : 'Join HOMIGO to start browsing properties and roommates in your city.'}
          </p>
          <div className="mt-8">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-slate-900 text-white hover:bg-slate-800 px-6 py-3 rounded-lg font-medium"
              >
                Get started - it's free
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
