// Local demo seeder.
//
// Every seeded record is owned by a user whose email ends in @homigo.demo.
// The reset step only deletes users that match that regex, and cascades to
// their properties and roommate profile. Any user you registered with a real
// email is invisible to this script and is never touched.
//
// Usage:
//   npm run seed         -> clears prior demo data, seeds fresh
//   npm run seed:reset   -> clears demo data only, does not seed

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property');
const RoommateProfile = require('../models/RoommateProfile');

const DEMO_DOMAIN = 'homigo.demo';
const DEMO_EMAIL_REGEX = /@homigo\.demo$/i;
const DEMO_PASSWORD = 'Homigo@123';

async function clearDemoData() {
  const demoUsers = await User.find({ email: { $regex: DEMO_EMAIL_REGEX } })
    .select('_id')
    .lean();
  const ids = demoUsers.map((u) => u._id);
  const props = await Property.deleteMany({ owner: { $in: ids } });
  const profiles = await RoommateProfile.deleteMany({ user: { $in: ids } });
  const users = await User.deleteMany({ _id: { $in: ids } });
  return {
    users: users.deletedCount,
    properties: props.deletedCount,
    profiles: profiles.deletedCount,
  };
}

const OWNERS = [
  { name: 'Aarav Sharma', email: `owner1@${DEMO_DOMAIN}`, city: 'Bengaluru', phone: '9000000001' },
  { name: 'Priya Patel',  email: `owner2@${DEMO_DOMAIN}`, city: 'Mumbai',    phone: '9000000002' },
  { name: 'Rohan Iyer',   email: `owner3@${DEMO_DOMAIN}`, city: 'Pune',      phone: '9000000003' },
  { name: 'Ananya Verma', email: `owner4@${DEMO_DOMAIN}`, city: 'Delhi',     phone: '9000000004' },
  { name: 'Kabir Menon',  email: `owner5@${DEMO_DOMAIN}`, city: 'Hyderabad', phone: '9000000005' },
];

const TENANTS = [
  { name: 'Ishaan Rao',      email: `tenant1@${DEMO_DOMAIN}`,  city: 'Bengaluru', phone: '9100000001' },
  { name: 'Meera Kapoor',    email: `tenant2@${DEMO_DOMAIN}`,  city: 'Bengaluru', phone: '9100000002' },
  { name: 'Aditya Nair',     email: `tenant3@${DEMO_DOMAIN}`,  city: 'Bengaluru', phone: '9100000003' },
  { name: 'Neha Gupta',      email: `tenant4@${DEMO_DOMAIN}`,  city: 'Mumbai',    phone: '9100000004' },
  { name: 'Vikram Singh',    email: `tenant5@${DEMO_DOMAIN}`,  city: 'Mumbai',    phone: '9100000005' },
  { name: 'Divya Reddy',     email: `tenant6@${DEMO_DOMAIN}`,  city: 'Pune',      phone: '9100000006' },
  { name: 'Karan Malhotra',  email: `tenant7@${DEMO_DOMAIN}`,  city: 'Pune',      phone: '9100000007' },
  { name: 'Sanya Bhatt',     email: `tenant8@${DEMO_DOMAIN}`,  city: 'Delhi',     phone: '9100000008' },
  { name: 'Arjun Deshmukh',  email: `tenant9@${DEMO_DOMAIN}`,  city: 'Hyderabad', phone: '9100000009' },
  { name: 'Pooja Choudhary', email: `tenant10@${DEMO_DOMAIN}`, city: 'Jaipur',    phone: '9100000010' },
];

const PROPERTIES = [
  // Bengaluru (5)
  { title: '2BHK in Koramangala', type: 'flat', city: 'Bengaluru', address: '5th Block',
    rent: 32000, bedrooms: 2, furnishing: 'semi',
    amenities: ['wifi', 'parking', 'power backup'], available: true,
    description: 'Corner unit with cross ventilation. Walking distance to metro and cafes.' },
  { title: 'Cozy Private Room in HSR Layout', type: 'room', city: 'Bengaluru', address: 'Sector 3',
    rent: 14000, bedrooms: 1, furnishing: 'furnished',
    amenities: ['wifi', 'ac', 'housekeeping'], available: true,
    description: 'Fully furnished room in a shared 3BHK with two working professionals.' },
  { title: 'PG for Working Women near Indiranagar', type: 'pg', city: 'Bengaluru', address: '100 Feet Road',
    rent: 11000, furnishing: 'furnished',
    amenities: ['wifi', 'meals', 'laundry', 'security'], available: true,
    description: 'Safe PG for working women. Includes breakfast and dinner on weekdays.' },
  { title: '3BHK Duplex in Whitefield', type: 'flat', city: 'Bengaluru', address: 'Prestige Shantiniketan',
    rent: 55000, bedrooms: 3, furnishing: 'unfurnished',
    amenities: ['parking', 'gym', 'swimming pool', 'clubhouse'], available: true,
    description: 'Spacious duplex apartment in a premium gated community.' },
  { title: 'Compact 1BHK in Marathahalli', type: 'flat', city: 'Bengaluru', address: 'Outer Ring Road',
    rent: 18000, bedrooms: 1, furnishing: 'semi',
    amenities: ['wifi', 'parking'], available: false,
    description: 'Well-lit 1BHK ideal for a couple or single working professional.' },

  // Mumbai (4)
  { title: '1BHK in Bandra West', type: 'flat', city: 'Mumbai', address: 'Linking Road',
    rent: 42000, bedrooms: 1, furnishing: 'furnished',
    amenities: ['wifi', 'ac', 'lift', 'security'], available: true,
    description: 'Modern 1BHK a short walk from the station and shopping.' },
  { title: 'Shared Room in Andheri East', type: 'room', city: 'Mumbai', address: 'Chakala',
    rent: 15000, bedrooms: 1, furnishing: 'furnished',
    amenities: ['wifi', 'ac', 'housekeeping'], available: true,
    description: 'Twin-share room in a 2BHK. Suits IT professionals commuting to SEEPZ.' },
  { title: 'Boys PG in Powai', type: 'pg', city: 'Mumbai', address: 'Hiranandani',
    rent: 12500, furnishing: 'furnished',
    amenities: ['wifi', 'meals', 'laundry'], available: true,
    description: 'Well-maintained boys PG close to IIT Bombay and offices.' },
  { title: '2BHK in Malad West', type: 'flat', city: 'Mumbai', address: 'Malad West',
    rent: 34000, bedrooms: 2, furnishing: 'semi',
    amenities: ['wifi', 'parking', 'lift'], available: true,
    description: 'Family-friendly 2BHK on the 5th floor with balcony.' },

  // Pune (3)
  { title: '1BHK in Kothrud', type: 'flat', city: 'Pune', address: 'Karve Road',
    rent: 18000, bedrooms: 1, furnishing: 'semi',
    amenities: ['wifi', 'parking'], available: true,
    description: 'Sunny 1BHK in a quiet residential lane.' },
  { title: 'Private Room in Kalyani Nagar', type: 'room', city: 'Pune', address: 'Near World Trade Center',
    rent: 12000, bedrooms: 1, furnishing: 'furnished',
    amenities: ['wifi', 'ac'], available: true,
    description: 'Nice room in a shared apartment. Two professional roommates.' },
  { title: 'PG in Wakad', type: 'pg', city: 'Pune', address: 'Bhumkar Chowk',
    rent: 8500, furnishing: 'furnished',
    amenities: ['wifi', 'meals', 'laundry'], available: true,
    description: 'Comfortable PG near Hinjewadi IT park. Meals included.' },

  // Delhi (3)
  { title: '2BHK in Saket', type: 'flat', city: 'Delhi', address: 'Malviya Nagar',
    rent: 28000, bedrooms: 2, furnishing: 'semi',
    amenities: ['wifi', 'parking', 'power backup'], available: true,
    description: 'Second-floor 2BHK, close to Saket metro and Select Citywalk.' },
  { title: 'Room in Lajpat Nagar', type: 'room', city: 'Delhi', address: 'Central Market',
    rent: 11000, bedrooms: 1, furnishing: 'furnished',
    amenities: ['wifi', 'ac'], available: true,
    description: 'Compact but tidy private room in a shared 2BHK.' },
  { title: 'Ladies PG in Rajouri Garden', type: 'pg', city: 'Delhi', address: 'Rajouri Garden',
    rent: 9500, furnishing: 'furnished',
    amenities: ['wifi', 'meals', 'laundry', 'security'], available: true,
    description: 'Safe PG for women. Home-cooked meals and 24x7 security.' },

  // Hyderabad (2)
  { title: '2BHK in Gachibowli', type: 'flat', city: 'Hyderabad', address: 'Financial District',
    rent: 25000, bedrooms: 2, furnishing: 'semi',
    amenities: ['wifi', 'parking', 'gym'], available: true,
    description: 'Family 2BHK 10 minutes from major IT parks.' },
  { title: 'PG in Madhapur', type: 'pg', city: 'Hyderabad', address: 'HITEC City',
    rent: 8000, furnishing: 'furnished',
    amenities: ['wifi', 'meals', 'laundry'], available: true,
    description: 'Coliving PG walking distance to HITEC City offices.' },

  // Chandigarh (2)
  { title: '1BHK in Sector 22', type: 'flat', city: 'Chandigarh', address: 'Sector 22',
    rent: 15000, bedrooms: 1, furnishing: 'semi',
    amenities: ['wifi', 'parking'], available: true,
    description: 'Ground-floor 1BHK. Close to bus stand and markets.' },
  { title: 'Shared Room in Sector 44', type: 'room', city: 'Chandigarh', address: 'Sector 44',
    rent: 7000, bedrooms: 1, furnishing: 'furnished',
    amenities: ['wifi'], available: true,
    description: 'Twin-share room in a 3BHK, mostly students.' },

  // Jaipur (1)
  { title: '2BHK in Vaishali Nagar', type: 'flat', city: 'Jaipur', address: 'Amrapali Circle',
    rent: 14000, bedrooms: 2, furnishing: 'semi',
    amenities: ['wifi', 'parking', 'power backup'], available: true,
    description: 'Peaceful 2BHK ideal for a small family.' },
];

// tenantIdx refers to the index into TENANTS above
const ROOMMATE_PROFILES = [
  { tenantIdx: 0, age: 24, gender: 'male', occupation: 'Software engineer', city: 'Bengaluru',
    budgetMin: 12000, budgetMax: 22000,
    preferredAreas: ['Koramangala', 'HSR', 'Indiranagar'],
    lifestyle: 'balanced', smoking: 'no', pets: 'okay',
    bio: 'Working in a startup. Enjoy weekend hikes and quiet weekday evenings.' },
  { tenantIdx: 1, age: 26, gender: 'female', occupation: 'Product manager', city: 'Bengaluru',
    budgetMin: 15000, budgetMax: 25000,
    preferredAreas: ['Koramangala', 'HSR'],
    lifestyle: 'social', smoking: 'no', pets: 'yes',
    bio: 'Have a small dog, love hosting brunches. Open to co-living with women or non-binary folks.' },
  { tenantIdx: 2, age: 30, gender: 'male', occupation: 'Data analyst', city: 'Bengaluru',
    budgetMin: 8000, budgetMax: 15000,
    preferredAreas: ['Marathahalli', 'Whitefield'],
    lifestyle: 'quiet', smoking: 'occasionally', pets: 'no',
    bio: 'Reader, gym-goer, mostly indoors. Looking for a low-drama flatmate.' },
  { tenantIdx: 3, age: 27, gender: 'female', occupation: 'Journalist', city: 'Mumbai',
    budgetMin: 20000, budgetMax: 32000,
    preferredAreas: ['Bandra', 'Andheri West'],
    lifestyle: 'social', smoking: 'no', pets: 'okay',
    bio: 'Podcast enthusiast, work-from-home most days. Prefer a well-lit place.' },
  { tenantIdx: 4, age: 23, gender: 'male', occupation: 'Consultant', city: 'Mumbai',
    budgetMin: 15000, budgetMax: 22000,
    preferredAreas: ['Andheri East', 'Powai'],
    lifestyle: 'balanced', smoking: 'no', pets: 'no',
    bio: 'Just moved to Mumbai. Prefer someone punctual and clean.' },
  { tenantIdx: 5, age: 22, gender: 'female', occupation: 'Student', city: 'Pune',
    budgetMin: 7000, budgetMax: 12000,
    preferredAreas: ['Kothrud', 'Karve Nagar'],
    lifestyle: 'quiet', smoking: 'no', pets: 'no',
    bio: 'Final year student. Introvert, love painting and Netflix.' },
  { tenantIdx: 6, age: 29, gender: 'male', occupation: 'DevOps engineer', city: 'Pune',
    budgetMin: 10000, budgetMax: 18000,
    preferredAreas: ['Kalyani Nagar', 'Viman Nagar', 'Wakad'],
    lifestyle: 'balanced', smoking: 'occasionally', pets: 'okay',
    bio: 'Cyclist, sometimes travel for work. Looking for a chill flatmate.' },
  { tenantIdx: 7, age: 25, gender: 'female', occupation: 'Designer', city: 'Delhi',
    budgetMin: 12000, budgetMax: 20000,
    preferredAreas: ['Saket', 'Malviya Nagar', 'Hauz Khas'],
    lifestyle: 'social', smoking: 'no', pets: 'okay',
    bio: 'Freelance illustrator. Love cafes and street food adventures.' },
  { tenantIdx: 8, age: 28, gender: 'male', occupation: 'Software engineer', city: 'Hyderabad',
    budgetMin: 10000, budgetMax: 18000,
    preferredAreas: ['Gachibowli', 'Madhapur'],
    lifestyle: 'quiet', smoking: 'no', pets: 'no',
    bio: 'Gaming, coding, occasional cricket. Prefer non-smoker roommates.' },
  { tenantIdx: 9, age: 24, gender: 'female', occupation: 'Marketing associate', city: 'Jaipur',
    budgetMin: 5000, budgetMax: 10000,
    preferredAreas: ['Vaishali Nagar', 'Malviya Nagar'],
    lifestyle: 'balanced', smoking: 'no', pets: 'yes',
    bio: 'Have a cat. Love pottery and evening walks.' },
];

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MONGO_URI is not defined in .env');
    process.exit(1);
  }
  const resetOnly = process.argv.includes('--reset');

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');

    console.log(`Clearing previous demo data (users with email @${DEMO_DOMAIN})...`);
    const cleared = await clearDemoData();
    console.log(
      `  removed  users: ${cleared.users},  properties: ${cleared.properties},  roommate profiles: ${cleared.profiles}`
    );

    if (resetOnly) {
      console.log('\nReset complete. Not seeding new data.');
      return;
    }

    // 1) Owners
    const owners = [];
    for (const o of OWNERS) {
      const doc = await User.create({
        ...o,
        password: DEMO_PASSWORD,
        role: 'owner',
      });
      owners.push(doc);
    }

    // 2) Tenants
    const tenants = [];
    for (const t of TENANTS) {
      const doc = await User.create({
        ...t,
        password: DEMO_PASSWORD,
        role: 'tenant',
      });
      tenants.push(doc);
    }

    // 3) Properties — distribute across the 5 owners round-robin
    let propCount = 0;
    for (let i = 0; i < PROPERTIES.length; i++) {
      const p = PROPERTIES[i];
      const owner = owners[i % owners.length];
      await Property.create({ ...p, owner: owner._id });
      propCount++;
    }

    // 4) Roommate profiles — one per referenced tenant
    let profileCount = 0;
    for (const rp of ROOMMATE_PROFILES) {
      const { tenantIdx, ...rest } = rp;
      const tenant = tenants[tenantIdx];
      if (!tenant) continue;
      await RoommateProfile.create({ ...rest, user: tenant._id });
      profileCount++;
    }

    console.log(`
Demo data seeded successfully.

Owners: ${owners.length}
Tenants: ${tenants.length}
Properties: ${propCount}
Roommate profiles: ${profileCount}

Demo credentials:
  owner1@${DEMO_DOMAIN}  /  ${DEMO_PASSWORD}
  tenant1@${DEMO_DOMAIN} /  ${DEMO_PASSWORD}
(all owner1..owner5 and tenant1..tenant10 use the same password)
`);
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

run();
