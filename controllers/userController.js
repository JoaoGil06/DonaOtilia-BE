const AppError = require('./../utils/AppError');
const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync.js');
const factory = require('./handlerFactory');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(new AppError('Nenhum utilizador encontrado com esse ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = factory.deleteOne(User);
