const multer = require('multer');
const sharp = require('sharp');
const Wine = require('./../models/wineModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('../utils/AppError');

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

exports.uploadWineImages = upload.fields([
  { name: 'bottle_image', maxCount: 1 },
  { name: 'product_img', maxCount: 1 },
  { name: 'product_img_hover', maxCount: 1 },
  { name: 'harmony_suggestion_image', maxCount: 1 },
]);

exports.resizeWineImages = catchAsync(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  console.log('req', req);
  // 1) Bottle Image
  if (req.files.bottle_image) {
    const bottleImageFilename = `wine-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}-bottle.png`;

    await sharp(req.files.bottle_image[0].buffer)
      .resize({ width: 714, height: 2798 })
      .toFormat('png')
      .png({ quality: 90 })
      .toFile(`public/img/wines/${bottleImageFilename}`);

    req.body.bottle_image = `${url}/public/img/wines/${bottleImageFilename}`;
  }

  // 2) Product Image
  if (req.files.product_img) {
    const productImageFilename = `wine-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}-front.jpeg`;

    await sharp(req.files.product_img[0].buffer)
      .resize({ width: 350, height: 700 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wines/${productImageFilename}`);

    req.body.product_img = `${url}/public/img/wines/${productImageFilename}`;
  }

  // 3) Product Image Hover
  if (req.files.product_img_hover) {
    const productImageHoverFilename = `wine-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}-back.jpeg`;

    await sharp(req.files.product_img_hover[0].buffer)
      .resize({ width: 350, height: 700 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wines/${productImageHoverFilename}`);

    req.body.product_img_hover = `${url}/public/img/wines/${productImageHoverFilename}`;
  }

  // 4) Harmony Suggestion Image
  if (req.files.harmony_suggestion_image) {
    const harmonySuggestionFilename = `wine-${req.body.title.en
      .split(' ')
      .join('')}-harmony_suggestion.jpeg`;

    await sharp(req.files.harmony_suggestion_image[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/wines/${harmonySuggestionFilename}`);

    req.body.harmony_suggestion_image = `${url}/public/img/wines/${harmonySuggestionFilename}`;
  }

  next();
});

exports.getAllWines = factory.getAll(Wine);

exports.getAllWinesByCategory = factory.getAll(Wine);

exports.getWine = factory.getOne(Wine);

exports.createWine = factory.createOne(Wine);

exports.updateWine = factory.updateOne(Wine);

exports.deleteWine = factory.deleteOne(Wine);
