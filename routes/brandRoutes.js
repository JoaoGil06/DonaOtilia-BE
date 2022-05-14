const express = require('express');
const {
  getAllBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('./../controllers/brandController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo('admin'), getAllBrands)
  .post(protect, restrictTo('admin'), createBrand);

router
  .route('/:id')
  .get(getBrand)
  .patch(protect, restrictTo('admin'), updateBrand)
  .delete(protect, restrictTo('admin'), deleteBrand);

module.exports = router;
