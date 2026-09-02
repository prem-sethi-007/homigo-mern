const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['flat', 'room', 'pg'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    rent: {
      type: Number,
      required: [true, 'Rent is required'],
      min: [0, 'Rent cannot be negative'],
    },
    bedrooms: {
      type: Number,
      min: [0, 'Bedrooms cannot be negative'],
    },
    furnishing: {
      type: String,
      enum: ['furnished', 'semi', 'unfurnished'],
    },
    amenities: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
