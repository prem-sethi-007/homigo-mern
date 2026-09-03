// Roommate compatibility scoring.
//
// Total possible score is 100 when both profiles carry full data.
// Missing fields fall back to a small neutral value so incomplete
// profiles are not unfairly ranked to zero.
//
// This function is PURE (no I/O, no globals). Update weights or add
// factors here in one place; the controller doesn't need to change.
//
// Weights:
//   city              30
//   budget overlap    25
//   preferred areas   15
//   lifestyle         10
//   smoking           10
//   pets               5
//   age                3
//   occupation         2
//   -----------------
//   total            100

const SMOKING_MATRIX = {
  'no-no': 10,
  'yes-yes': 10,
  'occasionally-occasionally': 10,
  'no-occasionally': 5,
  'occasionally-no': 5,
  'occasionally-yes': 5,
  'yes-occasionally': 5,
  'no-yes': 0,
  'yes-no': 0,
};

const PETS_MATRIX = {
  'yes-yes': 5,
  'no-no': 5,
  'okay-okay': 5,
  'yes-okay': 4,
  'okay-yes': 4,
  'no-okay': 3,
  'okay-no': 3,
  'yes-no': 0,
  'no-yes': 0,
};

function sameLoose(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

function scoreBudget(mine, other) {
  const aLo = typeof mine.budgetMin === 'number' ? mine.budgetMin : null;
  const aHi = typeof mine.budgetMax === 'number' ? mine.budgetMax : null;
  const bLo = typeof other.budgetMin === 'number' ? other.budgetMin : null;
  const bHi = typeof other.budgetMax === 'number' ? other.budgetMax : null;

  const aHasAny = aLo !== null || aHi !== null;
  const bHasAny = bLo !== null || bHi !== null;
  if (!aHasAny || !bHasAny) {
    return { points: 5, reason: null, note: null };
  }

  const aMin = aLo ?? 0;
  const aMax = aHi ?? Number.POSITIVE_INFINITY;
  const bMin = bLo ?? 0;
  const bMax = bHi ?? Number.POSITIVE_INFINITY;

  const overlapMin = Math.max(aMin, bMin);
  const overlapMax = Math.min(aMax, bMax);
  if (overlapMax < overlapMin) {
    return { points: 0, reason: null, note: 'Budgets do not overlap' };
  }

  // If either side is open-ended, treat as full overlap on our side
  if (aMax === Number.POSITIVE_INFINITY || aMin === aMax) {
    return { points: 25, reason: 'Budget ranges overlap', note: null };
  }
  const overlap = overlapMax - overlapMin;
  const myRange = aMax - aMin;
  const ratio = myRange > 0 ? Math.min(1, overlap / myRange) : 1;
  const pts = Math.round(ratio * 25);
  return {
    points: pts,
    reason: pts >= 15 ? 'Budget ranges overlap' : null,
    note: pts > 0 && pts < 15 ? 'Small budget overlap' : null,
  };
}

function scoreAreas(mine, other) {
  const myAreasArr = Array.isArray(mine.preferredAreas)
    ? mine.preferredAreas
    : [];
  const theirAreasArr = Array.isArray(other.preferredAreas)
    ? other.preferredAreas
    : [];
  if (myAreasArr.length === 0 || theirAreasArr.length === 0) {
    return { points: 0, reason: null, note: null };
  }
  const my = new Set(myAreasArr.map((a) => a.toLowerCase()));
  const theirNormalized = theirAreasArr.map((a) => a.toLowerCase());
  const overlap = theirNormalized.filter((a) => my.has(a)).length;
  if (overlap === 0) {
    return { points: 0, reason: null, note: 'No preferred-area overlap' };
  }
  const ratio = overlap / my.size;
  const pts = Math.round(Math.min(1, ratio) * 15);
  return {
    points: pts,
    reason: `Preferred areas overlap`,
    note: null,
  };
}

function computeCompatibility(mine, other) {
  const reasons = [];
  const notes = [];
  let score = 0;

  // City (30)
  if (mine.city && other.city) {
    if (sameLoose(mine.city, other.city)) {
      score += 30;
      reasons.push('Same city');
    } else {
      score += 5;
      notes.push('Different city');
    }
  } else {
    score += 10;
  }

  // Budget (25)
  const b = scoreBudget(mine, other);
  score += b.points;
  if (b.reason) reasons.push(b.reason);
  if (b.note) notes.push(b.note);

  // Preferred areas (15)
  const a = scoreAreas(mine, other);
  score += a.points;
  if (a.reason) reasons.push(a.reason);
  if (a.note) notes.push(a.note);

  // Lifestyle (10)
  if (mine.lifestyle && other.lifestyle) {
    if (mine.lifestyle === other.lifestyle) {
      score += 10;
      reasons.push('Lifestyle preference matches');
    } else {
      notes.push('Different lifestyle preference');
    }
  } else {
    score += 3;
  }

  // Smoking (10)
  if (mine.smoking && other.smoking) {
    const key = `${mine.smoking}-${other.smoking}`;
    const pts = SMOKING_MATRIX[key] ?? 0;
    score += pts;
    if (pts === 10) reasons.push('Smoking preferences align');
    else if (pts === 0) notes.push('Smoking preferences differ');
  } else {
    score += 3;
  }

  // Pets (5)
  if (mine.pets && other.pets) {
    const key = `${mine.pets}-${other.pets}`;
    const pts = PETS_MATRIX[key] ?? 0;
    score += pts;
    if (pts === 5) reasons.push('Pet preferences match');
    else if (pts === 0) notes.push('Different pet preferences');
  } else {
    score += 2;
  }

  // Age (3)
  if (typeof mine.age === 'number' && typeof other.age === 'number') {
    const diff = Math.abs(mine.age - other.age);
    if (diff <= 3) {
      score += 3;
      reasons.push('Similar age');
    } else if (diff <= 7) {
      score += 2;
    } else if (diff <= 12) {
      score += 1;
    }
  }

  // Occupation (2)
  if (
    mine.occupation &&
    other.occupation &&
    sameLoose(mine.occupation, other.occupation)
  ) {
    score += 2;
    reasons.push('Same occupation');
  }

  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    reasons,
    notes,
  };
}

module.exports = { computeCompatibility };
