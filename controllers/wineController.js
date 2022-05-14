const Wine = require('./../models/wineModel');
const factory = require('./handlerFactory');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('../utils/AppError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/wines');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `wine-${req.body.title.en}-${Date.now()}.${ext}`);
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

exports.uploadHarmonySuggestionImage = upload.single(
  'harmony_suggestion[image]'
);

exports.getAllWines = factory.getAll(Wine);

exports.getAllWinesByCategory = factory.getAll(Wine);

exports.getWine = factory.getOne(Wine);

exports.createWine = catchAsync(async (req, res, next) => {
  let filteredBody = req.body;

  if (req.file) {
    // Aqui é para substituir originalName por filename
    filteredBody.harmony_suggestion.image = req.file.filename;
  }

  // next();
  const newWine = await Wine.create(filteredBody);

  res.status(201).json({
    status: 'success',
    data: {
      wine: newWine,
    },
  });
});

exports.updateWine = factory.updateOne(Wine);

exports.deleteWine = factory.deleteOne(Wine);
