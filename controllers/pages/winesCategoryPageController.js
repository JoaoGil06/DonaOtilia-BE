const multer = require('multer');
const sharp = require('sharp');
const WinesCategoryPage = require('./../../models/pages/winesCategoryPageModel');
const factory = require('./../handlerFactory');
const catchAsync = require('./../../utils/catchAsync.js');
const AppError = require('./../../utils/AppError');

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

exports.uploadWinesCategoryPageImage = upload.single('hero_background');

exports.resizeWinesCategoryPageImage = catchAsync(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  // 1) hero background
  if (req.file) {
    console.log('file', req.file);

    const winesCategoryPageImage = `winesCategoryPage.jpeg`;

    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/winesCategoryPage/${winesCategoryPageImage}`);

    req.body.hero_background = `${url}/public/img/winesCategoryPage/${winesCategoryPageImage}`;
  }

  next();
});

exports.getAllWinesCategoryPages = factory.getAll(WinesCategoryPage);

exports.getWinesCategoryPage = factory.getOne(WinesCategoryPage);

exports.createWinesCategoryPage = factory.createOne(WinesCategoryPage);

exports.updateWinesCategoryPage = factory.updateOne(WinesCategoryPage);

exports.deleteWinesCategoryPage = factory.deleteOne(WinesCategoryPage);
