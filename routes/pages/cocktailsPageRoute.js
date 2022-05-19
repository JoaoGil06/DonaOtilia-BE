const express = require('express');
const {
  getAllCocktailsPages,
  getCocktailsPage,
  createCocktailsPage,
  updateCocktailsPage,
  deleteCocktailsPage,
} = require('./../../controllers/pages/cocktailsPageController');

const { protect, restrictTo } = require('./../../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllCocktailsPages)
  .post(protect, restrictTo('admin'), createCocktailsPage);

router
  .route('/:id')
  .get(getCocktailsPage)
  .patch(protect, restrictTo('admin'), updateCocktailsPage)
  .delete(protect, restrictTo('admin'), deleteCocktailsPage);

module.exports = router;
