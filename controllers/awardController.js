const Award = require('./../models/awardModel');
const factory = require('./handlerFactory');
const multer = require('multer');
const catchAsync = require('./../utils/catchAsync.js');
const AppError = require('../utils/AppError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/awards');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `award-${req.body.title.en}-${Date.now()}.${ext}`);
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

exports.uploadAwardImage = upload.single('image');

exports.getAllAwards = factory.getAll(Award);

exports.getAward = factory.getOne(Award);

exports.createAward = catchAsync(async (req, res, next) => {
  let filteredBody = req.body;

  if (req.file) {
    filteredBody.image = req.file.filename;
  }

  // next();
  const newAward = await Award.create(filteredBody);

  res.status(201).json({
    status: 'success',
    data: newAward,
  });
});

exports.updateAward = catchAsync(async (req, res, next) => {
  let filteredBody = req.body;

  if (req.file) {
    filteredBody.image = req.file.filename;
  }

  const { id } = req.params;

  const doc = await Award.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('Nenhum documento encontrado com esse ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.deleteAward = factory.deleteOne(Award);
