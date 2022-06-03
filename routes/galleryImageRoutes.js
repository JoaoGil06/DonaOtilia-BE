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
  .post(uploadGalleryImageImage, resizeGalleryImage, createGalleryImage);

router
  .route('/:id')
  .get(getGalleryImage)
  .patch(uploadGalleryImageImage, resizeGalleryImage, updateGalleryImage)
  .delete(deleteGalleryImage);

module.exports = router;
