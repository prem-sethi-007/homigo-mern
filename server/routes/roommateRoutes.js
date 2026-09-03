const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getMyProfile,
  createMyProfile,
  updateMyProfile,
  listProfiles,
  getProfileById,
} = require('../controllers/roommateController');

const router = express.Router();

router.get('/', protect, listProfiles);

router.get('/me', protect, getMyProfile);
router.post('/me', protect, createMyProfile);
router.put('/me', protect, updateMyProfile);

router.get('/:id', protect, getProfileById);

module.exports = router;
