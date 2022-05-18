const express = require('express');
const {
  getAllCocktails,
  getCocktail,
  createCocktail,
  updateCocktail,
  deleteCocktail,
  uploadCocktailImage,
  resizeCocktailImage,
} = require('./../controllers/cocktailController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllCocktails)
  .post(
    protect,
    restrictTo('admin'),
    uploadCocktailImage,
    resizeCocktailImage,
    createCocktail
  );

router
  .route('/:id')
  .get(getCocktail)
  .patch(
    protect,
    restrictTo('admin'),
    uploadCocktailImage,
    resizeCocktailImage,
    updateCocktail
  )
  .delete(protect, restrictTo('admin'), deleteCocktail);

module.exports = router;
