const express = require('express');
const {
  getAllWinesCategoryPages,
  getWinesCategoryPage,
  createWinesCategoryPage,
  updateWinesCategoryPage,
  deleteWinesCategoryPage,
  uploadWinesCategoryPageImage,
  resizeWinesCategoryPageImage,
} = require('./../../controllers/pages/winesCategoryPageController');

const { protect, restrictTo } = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllWinesCategoryPages)
  .post(
    protect,
    restrictTo('admin'),
    uploadWinesCategoryPageImage,
    resizeWinesCategoryPageImage,
    createWinesCategoryPage
  );

router
  .route('/:id')
  .get(getWinesCategoryPage)
  .patch(
    uploadWinesCategoryPageImage,
    resizeWinesCategoryPageImage,
    updateWinesCategoryPage
  )
  .delete(protect, restrictTo('admin'), deleteWinesCategoryPage);

module.exports = router;
