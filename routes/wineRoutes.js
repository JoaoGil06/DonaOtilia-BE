const express = require('express');
const {
  getAllWines,
  getWine,
  createWine,
  updateWine,
  deleteWine,
} = require('./../controllers/wineController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllWines)
  .post(protect, restrictTo('admin'), createWine);

router
  .route('/:id')
  .get(getWine)
  .patch(protect, restrictTo('admin'), updateWine)
  .delete(protect, restrictTo('admin'), deleteWine);

module.exports = router;
