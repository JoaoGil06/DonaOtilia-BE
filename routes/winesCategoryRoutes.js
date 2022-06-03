const express = require('express');
const {
  getAllWinesCategories,
  getWinesCategory,
  createWinesCategory,
  updateWinesCategory,
  deleteWinesCategory,
  uploadCategoryImage,
  resizeCategoryImage,
} = require('./../controllers/winesCategoryController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllWinesCategories)
  .post(uploadCategoryImage, resizeCategoryImage, createWinesCategory);

router
  .route('/:id')
  .get(getWinesCategory)
  .patch(uploadCategoryImage, resizeCategoryImage, updateWinesCategory)
  .delete(deleteWinesCategory);

module.exports = router;
