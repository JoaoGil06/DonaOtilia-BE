const express = require('express');
const {
  getAllGalleryPages,
  getGalleryPage,
  createGalleryPage,
  updateGalleryPage,
  deleteGalleryPage,
} = require('./../../controllers/pages/galleryPageController');

const { protect, restrictTo } = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllGalleryPages)
  .post(protect, restrictTo('admin'), createGalleryPage);

router
  .route('/:id')
  .get(getGalleryPage)
  .patch(protect, restrictTo('admin'), updateGalleryPage)
  .delete(protect, restrictTo('admin'), deleteGalleryPage);

module.exports = router;
