import balconiesCard from '../assets/properties/balconies-card.jpg';
import balconiesHero from '../assets/properties/balconies-hero.jpg';
import brickCard from '../assets/properties/brick-card.jpg';
import brickHero from '../assets/properties/brick-hero.jpg';
import glassCard from '../assets/properties/glass-card.jpg';
import glassHero from '../assets/properties/glass-hero.jpg';
import peachCard from '../assets/properties/peach-card.jpg';
import peachHero from '../assets/properties/peach-hero.jpg';
import towerCard from '../assets/properties/tower-card.jpg';
import towerHero from '../assets/properties/tower-hero.jpg';
import brownstoneCard from '../assets/properties/brownstone-card.jpg';
import brownstoneHero from '../assets/properties/brownstone-hero.jpg';

// Stock photos used when a listing has no image of its own. A listing is
// always mapped to the same photo (derived from its id), and photos repeat
// across listings so every card is filled.
const FALLBACKS = [
  { card: balconiesCard, hero: balconiesHero },
  { card: brickCard, hero: brickHero },
  { card: glassCard, hero: glassHero },
  { card: peachCard, hero: peachHero },
  { card: towerCard, hero: towerHero },
  { card: brownstoneCard, hero: brownstoneHero },
];

function hashId(id) {
  const s = String(id || '');
  // Mongo ObjectIds end in an incrementing counter, so consecutive listings
  // cycle through the photos instead of clustering.
  const n = parseInt(s.slice(-6), 16);
  if (Number.isFinite(n)) return n;
  let sum = 0;
  for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
  return sum;
}

export function getFallbackImage(property) {
  return FALLBACKS[hashId(property && property._id) % FALLBACKS.length];
}
