const GalleryPage = require('./../../models/pages/galleryPageModel');
const factory = require('./../handlerFactory');

exports.getAllGalleryPages = factory.getAll(GalleryPage);

exports.getGalleryPage = factory.getOne(GalleryPage);

exports.createGalleryPage = factory.createOne(GalleryPage);

exports.updateGalleryPage = factory.updateOne(GalleryPage);

exports.deleteGalleryPage = factory.deleteOne(GalleryPage);
