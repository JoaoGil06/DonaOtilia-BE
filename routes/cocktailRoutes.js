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
  .post(uploadCocktailImage, resizeCocktailImage, createCocktail);

router
  .route('/:id')
  .get(getCocktail)
  .patch(uploadCocktailImage, resizeCocktailImage, updateCocktail)
  .delete(deleteCocktail);

module.exports = router;
