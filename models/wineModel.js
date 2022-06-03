const mongoose = require('mongoose');
const slugify = require('slugify');

const wineSchema = new mongoose.Schema({
  title: {
    pt: {
      type: String,
      trim: true,
    },
    en: {
      type: String,
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
    pt: [String],
    en: [String],
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
  taste_proof: {
    pt: String,
    en: String,
  },
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
