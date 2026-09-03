const mongoose = require('mongoose');

const roommateProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      unique: true,
    },
    age: {
      type: Number,
      min: [16, 'Age must be at least 16'],
      max: [100, 'Age must be at most 100'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    occupation: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    budgetMin: {
      type: Number,
      min: [0, 'Budget cannot be negative'],
    },
    budgetMax: {
      type: Number,
      min: [0, 'Budget cannot be negative'],
    },
    preferredAreas: {
      type: [String],
      default: [],
    },
    lifestyle: {
      type: String,
      enum: ['quiet', 'social', 'balanced'],
    },
    smoking: {
      type: String,
      enum: ['yes', 'no', 'occasionally'],
    },
    pets: {
      type: String,
      enum: ['yes', 'no', 'okay'],
    },
    bio: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('RoommateProfile', roommateProfileSchema);
