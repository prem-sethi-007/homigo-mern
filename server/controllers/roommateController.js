const mongoose = require('mongoose');
const RoommateProfile = require('../models/RoommateProfile');

const UPDATABLE_FIELDS = [
  'age',
  'gender',
  'occupation',
  'city',
  'budgetMin',
  'budgetMax',
  'preferredAreas',
  'lifestyle',
  'smoking',
  'pets',
  'bio',
];

function pickAllowed(body) {
  const data = {};
  UPDATABLE_FIELDS.forEach((k) => {
    if (k in body) data[k] = body[k];
  });
  return data;
}

async function getMyProfile(req, res) {
  try {
    const profile = await RoommateProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'No roommate profile yet' });
    }
    res.json({ profile });
  } catch (err) {
    console.error('getMyProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createMyProfile(req, res) {
  try {
    const existing = await RoommateProfile.findOne({ user: req.user._id });
    if (existing) {
      return res
        .status(409)
        .json({ message: 'Roommate profile already exists. Use update.' });
    }

    const data = pickAllowed(req.body);
    data.user = req.user._id;

    const profile = await RoommateProfile.create(data);
    res.status(201).json({ profile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: 'Roommate profile already exists.' });
    }
    console.error('createMyProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateMyProfile(req, res) {
  try {
    const profile = await RoommateProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'No roommate profile yet' });
    }

    const updates = pickAllowed(req.body);
    Object.assign(profile, updates);
    await profile.save();
    res.json({ profile });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error('updateMyProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function listProfiles(req, res) {
  try {
    const profiles = await RoommateProfile.find({
      user: { $ne: req.user._id },
    })
      .populate('user', 'name email city')
      .sort({ updatedAt: -1 });
    res.json({ profiles });
  } catch (err) {
    console.error('listProfiles error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getProfileById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Roommate profile not found' });
    }
    const profile = await RoommateProfile.findById(req.params.id).populate(
      'user',
      'name email city'
    );
    if (!profile) {
      return res.status(404).json({ message: 'Roommate profile not found' });
    }
    res.json({ profile });
  } catch (err) {
    console.error('getProfileById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getMyProfile,
  createMyProfile,
  updateMyProfile,
  listProfiles,
  getProfileById,
};
