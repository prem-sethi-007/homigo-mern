const mongoose = require('mongoose');
const Property = require('../models/Property');

const UPDATABLE_FIELDS = [
  'title',
  'description',
  'type',
  'city',
  'address',
  'rent',
  'bedrooms',
  'furnishing',
  'amenities',
  'images',
  'available',
];

function pickAllowed(body) {
  const data = {};
  UPDATABLE_FIELDS.forEach((k) => {
    if (k in body) data[k] = body[k];
  });
  return data;
}

async function createProperty(req, res) {
  try {
    const data = pickAllowed(req.body);
    data.owner = req.user._id;
    const property = await Property.create(data);
    res.status(201).json({ property });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error('createProperty error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getProperties(req, res) {
  try {
    const properties = await Property.find()
      .populate('owner', 'name email city')
      .sort({ createdAt: -1 });
    res.json({ properties });
  } catch (err) {
    console.error('getProperties error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getPropertyById(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const property = await Property.findById(req.params.id).populate(
      'owner',
      'name email city phone'
    );
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ property });
  } catch (err) {
    console.error('getPropertyById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateProperty(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to modify this property' });
    }

    const updates = pickAllowed(req.body);
    Object.assign(property, updates);
    await property.save();
    res.json({ property });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    console.error('updateProperty error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteProperty(req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    if (property.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this property' });
    }
    await property.deleteOne();
    res.json({ message: 'Property deleted' });
  } catch (err) {
    console.error('deleteProperty error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getMyProperties(req, res) {
  try {
    const properties = await Property.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ properties });
  } catch (err) {
    console.error('getMyProperties error:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
};
