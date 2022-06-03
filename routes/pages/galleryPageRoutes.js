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

router.route('/').get(getAllGalleryPages).post(createGalleryPage);

router
  .route('/:id')
  .get(getGalleryPage)
  .patch(updateGalleryPage)
  .delete(deleteGalleryPage);

module.exports = router;
