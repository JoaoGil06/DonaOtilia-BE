const express = require('express');
const {
  getAllFooters,
  getFooter,
  createFooter,
  updateFooter,
  deleteFooter,
} = require('./../controllers/footerController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(protect, restrictTo('admin'), getAllFooters)
  .post(protect, restrictTo('admin'), createFooter);

router
  .route('/:id')
  .get(getFooter)
  .patch(protect, restrictTo('admin'), updateFooter)
  .delete(protect, restrictTo('admin'), deleteFooter);

module.exports = router;
