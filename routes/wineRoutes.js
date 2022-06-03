const express = require('express');
const {
  getAllWines,
  getWine,
  createWine,
  updateWine,
  deleteWine,
  getAllWinesByCategory,
  uploadWineImages,
  resizeWineImages,
} = require('./../controllers/wineController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllWines)
  .post(uploadWineImages, resizeWineImages, createWine);

router
  .route('/:id')
  .get(getWine)
  .patch(uploadWineImages, resizeWineImages, updateWine)
  .delete(deleteWine);

router.route('/category/:categoryId').get(getAllWinesByCategory);

module.exports = router;
