const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  title: {
    pt: {
      type: String,
      required: [true, 'Uma imagem deve sempre ter um titulo em português'],
      trim: true,
    },
    en: {
      type: String,
      required: [true, 'Uma imagem deve sempre ter um titulo em inglês'],
      trim: true,
    },
  },
  subtitle: {
    pt: {
      type: String,
      trim: true,
    },
    en: {
      type: String,
      trim: true,
    },
  },
  image: String,
});

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

module.exports = GalleryImage;
