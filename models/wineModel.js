const mongoose = require('mongoose');
const slugify = require('slugify');

const wineSchema = new mongoose.Schema({
  title: {
    pt: {
      type: String,
      required: [true, 'Um vinho deve sempre ter um titulo em português'],
      trim: true,
    },
    en: {
      type: String,
      required: [true, 'Um vinho deve sempre ter um titulo em inglês'],
      trim: true,
    },
  },
  slug: String,
  summary: {
    pt: String,
    en: String,
  },
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: 'Brand',
  },
  bottle_image: String,
  product_img: String,
  product_img_hover: String,
  year: Number,
  castes: {
    pt: {
      type: [String],
      required: [true, 'Um vinho deve sempre ter castas em português'],
    },
    en: {
      type: [String],
      required: [true, 'Um vinho deve sempre ter castas em inglês'],
    },
  },
  alcohol: Number,
  temperature: [Number],
  ph: Number,
  vinification: {
    pt: String,
    en: String,
  },
  grade_results: {
    pt: String,
    en: String,
  },
  harmony_suggestion: {
    pt: String,
    en: String,
  },
  harmony_suggestion_image: String,
  category: { type: mongoose.Schema.ObjectId, ref: 'WinesCategory' },
});

wineSchema.pre('save', function (next) {
  this.slug = slugify(this.title.en, { lower: true });

  this.populate({
    path: 'brand',
  });

  next();
});

wineSchema.pre('save', function (next) {
  this.populate({
    path: 'category',
  });

  next();
});

wineSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
  });

  next();
});

wineSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'brand',
  });

  next();
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
