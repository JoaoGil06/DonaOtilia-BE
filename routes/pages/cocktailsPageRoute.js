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

router.route('/').get(getAllCocktailsPages).post(createCocktailsPage);

router
  .route('/:id')
  .get(getCocktailsPage)
  .patch(updateCocktailsPage)
  .delete(deleteCocktailsPage);

module.exports = router;
