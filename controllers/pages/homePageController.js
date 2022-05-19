const multer = require('multer');
const sharp = require('sharp');
const HomePage = require('./../../models/pages/homePageModel');
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

exports.uploadHomePageImages = upload.fields([
  { name: 'hero_background', maxCount: 1 },
  { name: 'aboutUs_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]);

exports.resizeHomePageImages = catchAsync(async (req, res, next) => {
  // 1) Background Hero
  if (req.files.hero_background) {
    const backgroundImageFilename = `home-background.jpeg`;

    await sharp(req.files.hero_background[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/home/${backgroundImageFilename}`);

    req.body.hero_background = backgroundImageFilename;
  }

  // 2) About Us Image
  if (req.files.aboutUs_image) {
    const aboutUsImageFilename = `home-${req.body.aboutUs.en
      .split(' ')
      .join('')}-aboutUs.jpeg`;

    await sharp(req.files.aboutUs_image[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/home/${aboutUsImageFilename}`);

    req.body.aboutUs_image = aboutUsImageFilename;
  }

  // 3) Banner Image
  if (req.files.banner_image) {
    const bannerImageFilename = `home-${req.body.banner.en
      .split(' ')
      .join('')}-banner.jpeg`;

    await sharp(req.files.banner_image[0].buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/home/${bannerImageFilename}`);

    req.body.banner_image = bannerImageFilename;
  }

  next();
});

exports.getAllHomePages = factory.getAll(HomePage);

exports.getHomePage = factory.getOne(HomePage);

exports.createHomePage = factory.createOne(HomePage);

exports.updateHomePage = factory.updateOne(HomePage);

exports.deleteHomePage = factory.deleteOne(HomePage);
