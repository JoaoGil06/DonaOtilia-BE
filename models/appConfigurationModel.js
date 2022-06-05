const mongoose = require('mongoose');

const appConfigurationSchema = new mongoose.Schema({
  isUnderMaintenance: Boolean,
});

const AppConfiguration = mongoose.model(
  'AppConfiguration',
  appConfigurationSchema
);

module.exports = AppConfiguration;
