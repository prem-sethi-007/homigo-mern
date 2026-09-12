import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Pune',
  'Hyderabad',
  'Chandigarh',
  'Jaipur',
];

function Eyebrow({ children }) {
  return (
    <p className="text-xs uppercase tracking-[0.24em] text-brand font-semibold">
      {children}
    </p>
  );
}

function HouseArt({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M60 220 200 100 340 220" />
      <path d="M90 210 V330 H310 V210" />
      <path d="M180 330 V250 H220 V330" />
      <path d="M120 240 H160 V275 H120 Z" />
      <path d="M240 240 H280 V275 H240 Z" />
      <path d="M60 340 H340" />
    </svg>
  );
}

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Warm gradient background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, #EFE6CE 0%, #F8F5EE 45%, #EFE6CE 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <Eyebrow>For students &amp; working professionals</Eyebrow>

              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink">
                Find your home.
                <br />
                <span className="italic text-brand">Find your people.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                HOMIGO is a city-based accommodation platform for finding
                flats, private rooms and PGs — and matching with roommates
                whose lifestyle actually fits yours.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/properties"
                  className="bg-brand text-white hover:bg-brand-dark px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition shadow-sm"
                >
                  Browse Properties
                </Link>
                <Link
                  to="/roommates"
                  className="bg-white border border-line hover:border-brand/40 text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition"
                >
                  Find Roommates
                </Link>
              </div>

              {!user && (
                <p className="mt-6 text-sm text-muted">
                  New here?{' '}
                  <Link
                    to="/register"
                    className="text-brand-dark font-medium hover:underline"
                  >
                    Create a free account →
                  </Link>
                </p>
              )}
            </div>

            {/* Right: visual card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-line shadow-sm">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, #995F2F 0%, #622B14 100%)',
                  }}
                />
                <HouseArt className="absolute inset-0 w-full h-full text-white/12 p-16" />

                {/* Card content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-sand">
                      Now serving
                    </p>
                    <p className="mt-4 font-display text-2xl leading-snug">
                      7 cities across India — and growing every month.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((c) => (
                      <span
                        key={c}
                        className="text-xs bg-white/12 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom rule / meta (Reference 1 vibe) */}
          <div className="mt-16 md:mt-24 border-t border-line pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <span className="tracking-wide">Bengaluru · India · 2026</span>
            <span className="tracking-wide">homigo · find your home</span>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER — 3 columns editorial */}
      <section className="bg-ivory">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <Eyebrow>What HOMIGO offers</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight tracking-tight text-ink">
              A calmer way to find where you'll actually live.
            </h2>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-3">
            <FeatureBlock
              n="01"
              title="Discover properties"
              body="Search flats, private rooms and PGs across your city — filtered by rent, type and amenities. Owner-verified listings only."
            />
            <FeatureBlock
              n="02"
              title="Meet compatible roommates"
              body="Post a small profile and see who shares your budget, schedule and lifestyle. We rank matches — we never hide people."
            />
            <FeatureBlock
              n="03"
              title="Talk directly"
              body="Reach out over email once you've found the right fit. No middlemen, no bidding, no drama."
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-line bg-sand-soft/30">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-xl mx-auto">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink">
              Move in in three steps.
            </h2>
          </div>

          <div className="mt-16 grid gap-12 sm:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Create an account',
                desc: 'Sign up as a Tenant (looking for a home) or an Owner (listing a property).',
              },
              {
                step: '02',
                title: 'Explore your city',
                desc: 'Browse listings, save favorites, and check out roommate profiles.',
              },
              {
                step: '03',
                title: 'Find your fit',
                desc: 'Reach out, move in, and settle into your new home with the right people.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-full border border-sage text-sage font-display text-lg">
                  {s.step}
                </div>
                <h3 className="mt-6 font-display text-xl text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="bg-ivory">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight tracking-tight text-ink">
            {user
              ? `Welcome back, ${user.name.split(' ')[0]}.`
              : 'Ready to find your home?'}
          </h2>
          <p className="mt-6 text-muted max-w-xl mx-auto leading-relaxed">
            {user
              ? 'Your dashboard is where your saved properties, listings and roommate profile live.'
              : 'Join HOMIGO to start browsing properties and roommates in your city.'}
          </p>
          <div className="mt-10">
            <Link
              to={user ? '/dashboard' : '/register'}
              className="bg-brand text-white hover:bg-brand-dark px-8 py-3.5 rounded-full text-sm font-medium tracking-wide transition shadow-sm"
            >
              {user ? 'Go to Dashboard' : "Get started — it's free"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureBlock({ n, title, body }) {
  return (
    <div>
      <p className="font-display text-xl text-brand">{n}</p>
      <div className="mt-4 h-px w-10 bg-brand/40" />
      <h3 className="mt-6 font-display text-2xl text-ink leading-snug">
        {title}
      </h3>
      <p className="mt-4 text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
