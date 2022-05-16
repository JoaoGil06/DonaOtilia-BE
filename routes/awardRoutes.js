const express = require('express');
const {
  getAllAwards,
  getAward,
  createAward,
  updateAward,
  deleteAward,
  uploadAwardImage,
} = require('./../controllers/awardController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllAwards)
  .post(protect, restrictTo('admin'), uploadAwardImage, createAward);

router
  .route('/:id')
  .get(getAward)
  .patch(protect, restrictTo('admin'), uploadAwardImage, updateAward)
  .delete(protect, restrictTo('admin'), deleteAward);

module.exports = router;
