const mongoose = require('mongoose');
const User = require('../models/User');
const Property = require('../models/Property');

async function addFavorite(req, res) {
  try {
    const id = req.params.propertyId;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid property id' });
    }

    const exists = await Property.exists({ _id: id });
    if (!exists) {
      return res.status(404).json({ message: 'Property not found' });
    }

    await User.updateOne(
      { _id: req.user._id },
      { $addToSet: { favorites: id } }
    );

    res.json({ favorited: true, propertyId: id });
  } catch (err) {
    console.error('addFavorite error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function removeFavorite(req, res) {
  try {
    const id = req.params.propertyId;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid property id' });
    }

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { favorites: id } }
    );

    res.json({ favorited: false, propertyId: id });
  } catch (err) {
    console.error('removeFavorite error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getFavorites(req, res) {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'favorites',
      populate: { path: 'owner', select: 'name email city' },
    });
    const properties = (user.favorites || []).filter(Boolean);
    res.json({ properties });
  } catch (err) {
    console.error('getFavorites error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { addFavorite, removeFavorite, getFavorites };
