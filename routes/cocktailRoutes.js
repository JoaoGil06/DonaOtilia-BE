const express = require('express');
const {
  getAllCocktails,
  getCocktail,
  createCocktail,
  updateCocktail,
  deleteCocktail,
  uploadCocktailImage,
} = require('./../controllers/cocktailController');

const { protect, restrictTo } = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(getAllCocktails)
  .post(protect, restrictTo('admin'), uploadCocktailImage, createCocktail);

router
  .route('/:id')
  .get(getCocktail)
  .patch(protect, restrictTo('admin'), uploadCocktailImage, updateCocktail)
  .delete(protect, restrictTo('admin'), deleteCocktail);

module.exports = router;
