const AppConfiguration = require('./../models/appConfigurationModel');
const factory = require('./handlerFactory');

exports.getAllAppConfigurations = factory.getAll(AppConfiguration);

exports.getAppConfiguration = factory.getOne(AppConfiguration);

exports.createAppConfiguration = factory.createOne(AppConfiguration);

exports.updateAppConfiguration = factory.updateOne(AppConfiguration);

exports.deleteAppConfiguration = factory.deleteOne(AppConfiguration);
