import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import propertyImg from '../assets/home/property.jpg';
import roommatesImg from '../assets/home/roommates.jpg';
import handshakeImg from '../assets/home/handshake.jpg';
import heroImg from '../assets/properties/tower-card.jpg';

const CITIES = [
  'Bengaluru',
  'Mumbai',
  'Delhi',
  'Pune',
  'Hyderabad',
  'Chandigarh',
  'Jaipur',
];

const CITY_CHIP_STYLES = [
  'bg-marigold text-ink',
  'bg-white/90 text-ink',
  'bg-teal text-white',
];

// Full class names so Tailwind can see them.
const ACCENTS = {
  brand: {
    num: 'text-brand',
    line: 'bg-brand',
    tint: 'from-brand/45',
  },
  teal: {
    num: 'text-teal',
    line: 'bg-teal',
    tint: 'from-teal/45',
  },
  marigold: {
    num: 'text-marigold-dark',
    line: 'bg-marigold',
    tint: 'from-marigold/50',
  },
};

const STEPS = [
  {
    step: '01',
    title: 'Create an account',
    desc: 'Sign up as a Tenant (looking for a home) or an Owner (listing a property).',
    circle: 'bg-gradient-to-br from-brand to-[#F08A2C] shadow-glow',
  },
  {
    step: '02',
    title: 'Explore your city',
    desc: 'Browse listings, save favorites, and check out roommate profiles.',
    circle: 'bg-gradient-to-br from-teal-dark to-teal shadow-[0_10px_28px_-10px_rgba(14,143,152,0.6)]',
  },
  {
    step: '03',
    title: 'Find your fit',
    desc: 'Reach out, move in, and settle into your new home with the right people.',
    circle: 'bg-gradient-to-br from-[#F2784B] to-marigold shadow-[0_10px_28px_-10px_rgba(244,166,42,0.7)]',
  },
];

function Eyebrow({ children, className = 'text-brand' }) {
  return (
    <p
      className={`text-xs uppercase tracking-[0.24em] font-semibold ${className}`}
    >
      {children}
    </p>
  );
}

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* Warm-to-cool gradient with colour blobs */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, #FFEED6 0%, #FFFAF2 45%, #DDF2F2 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 -left-24 h-96 w-96 rounded-full bg-marigold/35 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-teal/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-brand/20 px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-brand shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                For students &amp; working professionals
              </span>

              <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-ink">
                Find your home.
                <br />
                <span className="italic bg-gradient-to-r from-brand via-[#E8742A] to-[#F0A02C] bg-clip-text text-transparent pr-2">
                  Find your people.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                HOMIGO is a city-based accommodation platform for finding
                flats, private rooms and PGs — and matching with roommates
                whose lifestyle actually fits yours.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/properties"
                  className="bg-brand-gradient text-white hover:brightness-110 px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition shadow-glow"
                >
                  Browse Properties
                </Link>
                <Link
                  to="/roommates"
                  className="bg-white border border-teal/30 hover:border-teal hover:text-teal-dark text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide transition"
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
                    Create a free account →
                  </Link>
                </p>
              )}
            </div>

            {/* Right: photo card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lift ring-1 ring-white/60">
                <img
                  src={heroImg}
                  alt="Modern apartment block with colourful balconies"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/60"
                />

                {/* Card content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-marigold font-semibold">
                      Now serving
                    </p>
                    <p className="mt-4 font-display text-2xl leading-snug drop-shadow">
                      7 cities across India — and growing every month.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {CITIES.map((c, i) => (
                      <span
                        key={c}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          CITY_CHIP_STYLES[i % CITY_CHIP_STYLES.length]
                        }`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom rule / meta */}
          <div className="mt-16 md:mt-24 border-t border-brand/15 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
            <span className="tracking-wide">Bengaluru · India · 2026</span>
            <span className="tracking-wide">homigo · find your home</span>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER — 3 columns editorial */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <Eyebrow>What HOMIGO offers</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight tracking-tight text-ink">
              A calmer way to find where you'll{' '}
              <span className="italic text-brand">actually live.</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-3">
            <FeatureBlock
              n="01"
              title="Discover properties"
              body="Search flats, private rooms and PGs across your city — filtered by rent, type and amenities. Owner-verified listings only."
              image={propertyImg}
              alt="Sunlit apartment building with balconies against a teal sky"
              position="50% 40%"
              accent="brand"
            />
            <FeatureBlock
              n="02"
              title="Meet compatible roommates"
              body="Post a small profile and see who shares your budget, schedule and lifestyle. We rank matches — we never hide people."
              image={roommatesImg}
              alt="Two smiling roommates taking a selfie among moving boxes"
              position="50% 55%"
              accent="teal"
            />
            <FeatureBlock
              n="03"
              title="Talk directly"
              body="Reach out over email once you've found the right fit. No middlemen, no bidding, no drama."
              image={handshakeImg}
              alt="Two people shaking hands"
              position="62% 50%"
              accent="marigold"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-sand-soft via-ivory to-teal-soft/60">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-marigold/25 blur-3xl"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="text-center max-w-xl mx-auto">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight text-ink">
              Move in in{' '}
              <span className="italic text-brand">three steps.</span>
            </h2>
          </div>

          <div className="relative mt-16 grid gap-12 sm:grid-cols-3">
            {/* connector between the step circles */}
            <div
              aria-hidden
              className="hidden sm:block absolute top-7 left-[17%] right-[17%] border-t-2 border-dashed border-brand/30"
            />
            {STEPS.map((s) => (
              <div key={s.step} className="relative text-center">
                <div
                  className={`inline-flex w-14 h-14 items-center justify-center rounded-full text-white font-display text-lg ${s.circle}`}
                >
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
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div
            className="relative overflow-hidden rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center text-white shadow-lift"
            style={{
              background:
                'linear-gradient(120deg, #A53A0E 0%, #CC4A14 55%, #E2622A 100%)',
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-marigold/50 blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/20 blur-2xl"
            />

            <div className="relative">
              <Eyebrow className="text-sand">Ready when you are</Eyebrow>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl leading-tight tracking-tight">
                {user
                  ? `Welcome back, ${user.name.split(' ')[0]}.`
                  : 'Ready to find your home?'}
              </h2>
              <p className="mt-6 text-white/85 max-w-xl mx-auto leading-relaxed">
                {user
                  ? 'Your dashboard is where your saved properties, listings and roommate profile live.'
                  : 'Join HOMIGO to start browsing properties and roommates in your city.'}
              </p>
              <div className="mt-10">
                <Link
                  to={user ? '/dashboard' : '/register'}
                  className="inline-block bg-white text-brand hover:bg-sand-soft px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide transition shadow-lift"
                >
                  {user ? 'Go to Dashboard' : "Get started — it's free"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureBlock({
  n,
  title,
  body,
  image,
  alt,
  position = 'center',
  accent = 'brand',
}) {
  const a = ACCENTS[accent];
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          style={{ objectPosition: position }}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${a.tint} via-transparent to-transparent`}
        />
      </div>
      <p className={`mt-8 font-display text-xl ${a.num}`}>{n}</p>
      <div className={`mt-4 h-1 w-10 rounded-full ${a.line}`} />
      <h3 className="mt-6 font-display text-2xl text-ink leading-snug">
        {title}
      </h3>
      <p className="mt-4 text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
