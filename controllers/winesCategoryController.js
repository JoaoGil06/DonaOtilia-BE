const WinesCategory = require('../models/winesCategoryModel');
const catchAsync = require('./../utils/catchAsync.js');
const factory = require('./handlerFactory');
const multer = require('multer');
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

exports.uploadCategoryImage = upload.single('image');

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  // 1) Image
  if (req.file) {
    const categoryImage = `wineCategory-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wines/${categoryImage}`);

    req.body.image = categoryImage;
  }

  next();
});

exports.getAllWinesCategories = factory.getAll(WinesCategory);

exports.getWinesCategory = factory.getOne(WinesCategory);

exports.createWinesCategory = factory.createOne(WinesCategory);

exports.updateWinesCategory = factory.updateOne(WinesCategory);

exports.deleteWinesCategory = factory.deleteOne(WinesCategory);
