const Cocktail = require('./../models/cocktailModel');
const factory = require('./handlerFactory');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('../utils/AppError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/cocktails');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `cocktail-${req.body.title.en}-${Date.now()}.${ext}`);
  },
});

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

exports.getAllCocktails = factory.getAll(Cocktail);

exports.getCocktail = factory.getOne(Cocktail);

exports.createCocktail = catchAsync(async (req, res, next) => {
  let filteredBody = req.body;

  if (req.file) {
    filteredBody.image = req.file.filename;
  }

  // next();
  const newCocktail = await Cocktail.create(filteredBody);

  res.status(201).json({
    status: 'success',
    data: newCocktail,
  });
});

exports.updateCocktail = catchAsync(async (req, res, next) => {
  let filteredBody = req.body;

  if (req.file) {
    filteredBody.image = req.file.filename;
  }

  const { id } = req.params;

  const doc = await Cocktail.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('Nenhum documento encontrado com esse ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.deleteCocktail = factory.deleteOne(Cocktail);
