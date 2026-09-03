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

const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Pune',
  'Hyderabad',
  'Chandigarh',
  'Jaipur',
];

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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-sand-soft/50 to-ivory pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3 py-1 text-xs text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            City-based accommodation
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl leading-[1.05] text-ink">
            Find Your Home.
            <br />
            <span className="text-brand">Find Your People.</span>
          </h1>

          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            HOMIGO helps students and working professionals discover flats,
            rooms and PGs — and match with compatible roommates who fit their
            lifestyle.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/properties"
              className="bg-brand text-white hover:bg-brand-dark px-6 py-3 rounded-md font-medium transition shadow-sm"
            >
              Browse Properties
            </Link>
            <Link
              to="/roommates"
              className="bg-white border border-line text-ink hover:bg-sand-soft px-6 py-3 rounded-md font-medium transition"
            >
              Find Roommates
            </Link>
          </div>

          {!user && (
            <p className="mt-6 text-sm text-muted">
              New here?{' '}
              <Link
                to="/register"
                className="text-brand font-medium hover:underline"
              >
                Create a free account
              </Link>
            </p>
          )}

          {/* Cities strip */}
          <div className="mt-14">
            <p className="text-xs uppercase tracking-widest text-muted-soft">
              Now serving
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {CITIES.map((c) => (
                <span
                  key={c}
                  className="text-sm bg-white border border-line text-ink px-3 py-1 rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-ivory">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-brand font-semibold">
              What HOMIGO offers
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-ink">
              Everything you need to move in
            </h2>
            <p className="mt-3 text-muted">
              One place for both sides of the move — the flat, and the people
              in it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <FeatureCard icon={HomeIcon} title="Discover Properties">
              Search flats, private rooms and PGs across your city, filtered by
              rent, type and amenities.
            </FeatureCard>
            <FeatureCard icon={UsersIcon} title="Compatible Roommates">
              Match with people who share your budget, schedule and lifestyle —
              not just the room.
            </FeatureCard>
            <FeatureCard icon={ShieldIcon} title="Owner-Verified Listings">
              Each listing is posted by the owner themselves, so what you see is
              what you get.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-sand-soft/40 border-y border-line">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-brand font-semibold">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl text-ink">
              Move in in three steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-11 h-11 mx-auto rounded-full bg-brand text-white flex items-center justify-center font-semibold shadow-sm">
                  {s.step}
                </div>
                <h3 className="mt-4 font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ivory">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-ink">
            {user ? `Welcome back, ${user.name}` : 'Ready to find your home?'}
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            {user
              ? 'Jump into your dashboard to pick up where you left off.'
              : 'Join HOMIGO to start browsing properties and roommates in your city.'}
          </p>
          <div className="mt-8">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-brand text-white hover:bg-brand-dark px-6 py-3 rounded-md font-medium transition shadow-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-brand text-white hover:bg-brand-dark px-6 py-3 rounded-md font-medium transition shadow-sm"
              >
                Get started — it's free
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
