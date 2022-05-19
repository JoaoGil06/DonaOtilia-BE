const express = require('express');
const {
  getAllAwardsPages,
  getAwardsPage,
  createAwardsPage,
  updateAwardsPage,
  deleteAwardsPage,
} = require('./../../controllers/pages/awardsPageController');

const { protect, restrictTo } = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllAwardsPages)
  .post(protect, restrictTo('admin'), createAwardsPage);

router
  .route('/:id')
  .get(getAwardsPage)
  .patch(protect, restrictTo('admin'), updateAwardsPage)
  .delete(protect, restrictTo('admin'), deleteAwardsPage);

module.exports = router;
