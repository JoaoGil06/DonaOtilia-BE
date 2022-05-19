const express = require('express');
const {
  getAllHomePages,
  getHomePage,
  createHomePage,
  updateHomePage,
  deleteHomePage,
  uploadHomePageImages,
  resizeHomePageImages,
} = require('./../../controllers/pages/homePageController');

const { protect, restrictTo } = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllHomePages)
  .post(
    protect,
    restrictTo('admin'),
    uploadHomePageImages,
    resizeHomePageImages,
    createHomePage
  );

router
  .route('/:id')
  .get(getHomePage)
  .patch(
    protect,
    restrictTo('admin'),
    uploadHomePageImages,
    resizeHomePageImages,
    updateHomePage
  )
  .delete(protect, restrictTo('admin'), deleteHomePage);

module.exports = router;
