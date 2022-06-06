const express = require('express');
const {
  getAllGalleryImages,
  getGalleryImage,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  uploadGalleryImageImage,
  resizeGalleryImage,
} = require('./../controllers/galleryImageController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllGalleryImages)
  .post(
    protect,
    restrictTo('admin'),
    uploadGalleryImageImage,
    resizeGalleryImage,
    createGalleryImage
  );

router
  .route('/:id')
  .get(getGalleryImage)
  .patch(
    protect,
    restrictTo('admin'),
    uploadGalleryImageImage,
    resizeGalleryImage,
    updateGalleryImage
  )
  .delete(protect, restrictTo('admin'), deleteGalleryImage);

module.exports = router;
