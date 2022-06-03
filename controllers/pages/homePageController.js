const multer = require('multer');
const HomePage = require('./../../models/pages/homePageModel');
const factory = require('./../handlerFactory');
const catchAsync = require('./../../utils/catchAsync.js');
const AppError = require('./../../utils/AppError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/home');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `home-${file.fieldname}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else if (file.mimetype.startsWith('video')) {
    cb(null, true);
  } else {
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

exports.saveHomePageFilesInDB = catchAsync(async (req, res, next) => {
  // 1) Background Hero
  console.log('BODY', req.body);
  console.log('FILES', req.files);
  const url = req.protocol + '://' + req.get('host');
  if (req.files.hero_background) {
    // console.log(req.files.hero_background);

    if (req.files.hero_background[0].mimetype.startsWith('video')) {
      const file = req.files.hero_background[0];
      const ext = file.mimetype.split('/')[1];

      const backgroundVideoFilename = `home-${file.fieldname}.${ext}`;

      req.body.hero_background = `${url}/public/img/home/${backgroundVideoFilename}`;
    } else {
      const file = req.files.hero_background[0];
      const ext = file.mimetype.split('/')[1];

      const backgroundImageFilename = `home-${file.fieldname}.${ext}`;

      req.body.hero_background = `${url}/public/img/home/${backgroundImageFilename}`;
    }
  }

  // 2) About Us Image
  if (req.files.aboutUs_image) {
    const file = req.files.aboutUs_image[0];
    const ext = file.mimetype.split('/')[1];

    const aboutUsImageFilename = `home-${file.fieldname}.${ext}`;

    req.body.aboutUs_image = `${url}/public/img/home/${aboutUsImageFilename}`;
  }

  // 3) Banner Image
  if (req.files.banner_image) {
    const file = req.files.banner_image[0];
    const ext = file.mimetype.split('/')[1];

    const bannerImageFilename = `home-${file.fieldname}.${ext}`;

    req.body.banner_image = `${url}/public/img/home/${bannerImageFilename}`;
  }

  next();
});

exports.getAllHomePages = factory.getAll(HomePage);

exports.getHomePage = factory.getOne(HomePage);

exports.createHomePage = factory.createOne(HomePage);

exports.updateHomePage = factory.updateOne(HomePage);

exports.deleteHomePage = factory.deleteOne(HomePage);
