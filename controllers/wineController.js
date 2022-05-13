const AppError = require('./../utils/AppError');
const Wine = require('./../models/wineModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync.js');
const factory = require('./handlerFactory');

exports.getAllWines = catchAsync(async (req, res) => {
  // Query Executing
  const features = new APIFeatures(Wine.find(), req.query)
    .filter()
    .limitFields()
    .paginate();
  const wines = await features.query;

  res.status(200).json({
    status: 'success',
    results: wines.length,
    data: {
      wines,
    },
  });
});

exports.getWine = catchAsync(async (req, res) => {
  const wine = await Wine.findById(req.params.id);

  if (!wine) {
    next(new AppError('Nenhum vinho encontrado com esse ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      wine,
    },
  });
});

exports.getAllWinesByCategory = catchAsync(async (req, res) => {
  const features = new APIFeatures(
    Wine.find({ category: { _id: req.params.categoryId } }),
    req.query
  )
    .filter()
    .limitFields()
    .paginate();

  const wines = await features.query;

  res.status(200).json({
    status: 'success',
    results: wines.length,
    data: {
      wines,
    },
  });
});

exports.createWine = catchAsync(async (req, res) => {
  const newWine = await Wine.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      wine: newWine,
    },
  });
});

exports.updateWine = factory.updateOne(Wine);

exports.deleteWine = factory.deleteOne(Wine);
