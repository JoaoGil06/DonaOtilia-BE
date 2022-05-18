const GalleryImage = require('./../models/galleryImageModel');
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

exports.uploadGalleryImageImage = upload.single('image');

exports.resizeGalleryImage = catchAsync(async (req, res, next) => {
  // 1) Image
  if (req.file) {
    const galleryImage = `gallery-image-${req.body.title.en
      .split(' ')
      .join('')}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/gallery/${galleryImage}`);

    req.body.image = galleryImage;
  }

  next();
});

exports.getAllGalleryImages = factory.getAll(GalleryImage);

exports.getGalleryImage = factory.getOne(GalleryImage);

exports.createGalleryImage = factory.createOne(GalleryImage);

exports.updateGalleryImage = factory.updateOne(GalleryImage);

exports.deleteGalleryImage = factory.deleteOne(GalleryImage);