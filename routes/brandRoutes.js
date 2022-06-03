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

router.route('/').get(getAllBrands).post(createBrand);

router.route('/:id').get(getBrand).patch(updateBrand).delete(deleteBrand);

module.exports = router;
