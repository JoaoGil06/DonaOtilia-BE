const AppError = require('./../utils/AppError');
const WinesCategory = require('../models/winesCategoryModel');
const catchAsync = require('./../utils/catchAsync.js');
const factory = require('./handlerFactory');

exports.getAllWinesCategories = catchAsync(async (req, res) => {
  const winesCategories = await WinesCategory.find();

  res.status(200).json({
    status: 'success',
    results: winesCategories.length,
    data: {
      winesCategories,
    },
  });
});

exports.getWinesCategory = catchAsync(async (req, res) => {
  const wineCategory = await WinesCategory.findById(req.params.id);

  if (!wineCategory) {
    next(
      new AppError('Nenhuma categoria de vinho encontrada com esse ID', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      wineCategory,
    },
  });
});

exports.createWinesCategory = catchAsync(async (req, res) => {
  const newWineCategory = await WinesCategory.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      wineCategory: newWineCategory,
    },
  });
});

exports.updateWinesCategory = catchAsync(async (req, res) => {
  const wineCategory = await WinesCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!wineCategory) {
    next(
      new AppError('Nenhuma categoria de vinho encontrada com esse ID', 404)
    );
  }

  res.status(200).json({
    status: 'success',
    data: {
      wineCategory,
    },
  });
});

exports.deleteWinesCategory = factory.deleteOne(WinesCategory);
