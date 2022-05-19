const AwardsPage = require('./../../models/pages/awardsPageModel');
const factory = require('./../handlerFactory');

exports.getAllAwardsPages = factory.getAll(AwardsPage);

exports.getAwardsPage = factory.getOne(AwardsPage);

exports.createAwardsPage = factory.createOne(AwardsPage);

exports.updateAwardsPage = factory.updateOne(AwardsPage);

exports.deleteAwardsPage = factory.deleteOne(AwardsPage);
