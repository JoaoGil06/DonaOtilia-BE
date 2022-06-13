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

// upload.single('image');

exports.uploadCategoryImage = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
]);

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  // 1) Image

  if (req.files.image) {
    const categoryImage = `wineCategory-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}.jpeg`;

    await sharp(req.files.image[0].buffer)
      .resize({ height: 2048 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wines/${categoryImage}`);

    req.body.image = `${url}/public/img/wines/${categoryImage}`;
  }

  if (req.files.banner) {
    const categoryBanner = `wineCategory-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}-banner.jpeg`;

    await sharp(req.files.banner[0].buffer)
      .resize()
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wines/${categoryBanner}`);

    req.body.banner = `${url}/public/img/wines/${categoryBanner}`;
  }

  next();
});

exports.getAllWinesCategories = factory.getAll(WinesCategory);

exports.getWinesCategory = factory.getOne(WinesCategory);

exports.createWinesCategory = factory.createOne(WinesCategory);

exports.updateWinesCategory = factory.updateOne(WinesCategory);

exports.deleteWinesCategory = factory.deleteOne(WinesCategory);
