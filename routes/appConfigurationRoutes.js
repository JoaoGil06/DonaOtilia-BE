const express = require('express');
const {
  getAllAppConfigurations,
  getAppConfiguration,
  createAppConfiguration,
  updateAppConfiguration,
  deleteAppConfiguration,
} = require('../controllers/appConfigurationController');

const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllAppConfigurations)
  .post(protect, restrictTo('admin'), createAppConfiguration);

router
  .route('/:id')
  .get(getAppConfiguration)
  .patch(protect, restrictTo('admin'), updateAppConfiguration)
  .delete(protect, restrictTo('admin'), deleteAppConfiguration);

module.exports = router;
