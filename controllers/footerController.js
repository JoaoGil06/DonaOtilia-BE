const Footer = require('../models/footerModel');
const factory = require('./handlerFactory');

exports.getAllFooters = factory.getAll(Footer);

exports.getFooter = factory.getOne(Footer);

exports.createFooter = factory.createOne(Footer);

exports.updateFooter = factory.updateOne(Footer);

exports.deleteFooter = factory.deleteOne(Footer);
