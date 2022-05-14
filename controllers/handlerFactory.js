const APIFeatures = require('./../utils/apiFeatures.js');
const AppError = require('./../utils/AppError.js');
const catchAsync = require('./../utils/catchAsync.js');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET Wines by CategoryID
    let filter = {};
    if (req.params.categoryId)
      filter = { category: { _id: req.params.categoryId } };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .paginate();

    // const doc = await features.query.explain();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: doc.length,
      data: { data: doc },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    let query = Model.findById(id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError('Nenhum documento encontrado com esse ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!Model) {
      return next(new AppError('Nenhum documento encontrado com esse ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { data: doc },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const doc = await Model.findByIdAndDelete(id);

    if (!doc) {
      return next(new AppError('Nenhum documento encontrado com esse ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
