const express = require('express');
const {
  getAllWines,
  getWine,
  createWine,
  updateWine,
  deleteWine,
  getAllWinesByCategory,
  uploadHarmonySuggestionImage,
} = require('./../controllers/wineController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllWines)
  .post(protect, restrictTo('admin'), uploadHarmonySuggestionImage, createWine);

router
  .route('/:id')
  .get(getWine)
  .patch(protect, restrictTo('admin'), uploadHarmonySuggestionImage, updateWine)
  .delete(protect, restrictTo('admin'), deleteWine);

router.route('/category/:categoryId').get(getAllWinesByCategory);

module.exports = router;
