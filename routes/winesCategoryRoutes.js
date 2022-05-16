const express = require('express');
const {
  getAllWinesCategories,
  getWinesCategory,
  createWinesCategory,
  updateWinesCategory,
  deleteWinesCategory,
  uploadCategoryImage,
} = require('./../controllers/winesCategoryController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllWinesCategories)
  .post(protect, restrictTo('admin'), uploadCategoryImage, createWinesCategory);

router
  .route('/:id')
  .get(getWinesCategory)
  .patch(protect, restrictTo('admin'), uploadCategoryImage, updateWinesCategory)
  .delete(protect, restrictTo('admin'), deleteWinesCategory);

module.exports = router;
