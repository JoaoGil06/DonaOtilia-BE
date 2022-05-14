const WinesCategory = require('../models/winesCategoryModel');
const catchAsync = require('./../utils/catchAsync.js');
const factory = require('./handlerFactory');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/wines');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `wineCategory-${req.body.title.en}-${Date.now()}.${ext}`);
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

exports.createWinesCategory = catchAsync(async (req, res, next) => {
  let filteredBody = req.body;

  if (req.file) {
    filteredBody.image = req.file.filename;
  }

  // next();
  const newWineCategory = await WinesCategory.create(filteredBody);

  res.status(201).json({
    status: 'success',
    data: {
      wineCategory: newWineCategory,
    },
  });
});

exports.uploadCategoryImage = upload.single('image');

exports.getAllWinesCategories = factory.getAll(WinesCategory);

exports.getWinesCategory = factory.getOne(WinesCategory);

exports.updateWinesCategory = factory.updateOne(WinesCategory);

exports.deleteWinesCategory = factory.deleteOne(WinesCategory);
