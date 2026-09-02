const express = require('express');
const { protect, requireRole } = require('../middleware/authMiddleware');
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties,
} = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getProperties);

router.get('/mine/list', protect, requireRole('owner'), getMyProperties);

router.get('/:id', getPropertyById);

router.post('/', protect, requireRole('owner'), createProperty);

router.put('/:id', protect, requireRole('owner'), updateProperty);

router.delete('/:id', protect, requireRole('owner'), deleteProperty);

module.exports = router;
