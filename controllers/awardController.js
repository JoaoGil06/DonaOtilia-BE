const Award = require('./../models/awardModel');
const factory = require('./handlerFactory');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('../utils/AppError');
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

exports.uploadAwardImage = upload.single('image');

exports.resizeAwardImage = catchAsync(async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');

  // 1) Image
  if (req.file) {
    const awardImage = `award-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/awards/${awardImage}`);

    req.body.image = `${url}/public/img/home/${awardImage}`;
  }

  next();
});

exports.getAllAwards = factory.getAll(Award);

exports.getAward = factory.getOne(Award);

exports.createAward = factory.createOne(Award);

exports.updateAward = factory.updateOne(Award);

exports.deleteAward = factory.deleteOne(Award);
