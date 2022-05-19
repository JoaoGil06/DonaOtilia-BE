const mongoose = require('mongoose');
const GalleryImage = require('../galleryImageModel');

const galleryPagePageSchema = new mongoose.Schema({
  header: {
    pt: String,
    en: String,
  },
  gallery: [{ type: mongoose.Schema.ObjectId, ref: 'GalleryImage' }],
});

galleryPagePageSchema.pre('save', async function (next) {
  const galleryPromises = await GalleryImage.find();
  this.gallery = await Promise.all(galleryPromises);

  next();
});

galleryPagePageSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'gallery',
  });

  next();
});

const GalleryPage = mongoose.model('GalleryPage', galleryPagePageSchema);

module.exports = GalleryPage;
