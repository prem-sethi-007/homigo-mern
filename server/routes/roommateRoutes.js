const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getMyProfile,
  createMyProfile,
  updateMyProfile,
} = require('../controllers/roommateController');

const router = express.Router();

router.get('/me', protect, getMyProfile);
router.post('/me', protect, createMyProfile);
router.put('/me', protect, updateMyProfile);

module.exports = router;
