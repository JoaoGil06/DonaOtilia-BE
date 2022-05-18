const Cocktail = require('./../models/cocktailModel');
const factory = require('./handlerFactory');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('../utils/AppError');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    // Fazer aqui uma verificação para video;
    // Primeiro fazer console.log do file.mimetype
    cb(new AppError('Not and image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCocktailImage = upload.single('image');

exports.resizeCocktailImage = catchAsync(async (req, res, next) => {
  // 1) Image
  if (req.file) {
    const cocktailImage = `cocktail-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/cocktails/${cocktailImage}`);

    req.body.image = cocktailImage;
  }

  next();
});

exports.getAllCocktails = factory.getAll(Cocktail);

exports.getCocktail = factory.getOne(Cocktail);

exports.createCocktail = factory.createOne(Cocktail);

exports.updateCocktail = factory.updateOne(Cocktail);

exports.deleteCocktail = factory.deleteOne(Cocktail);
