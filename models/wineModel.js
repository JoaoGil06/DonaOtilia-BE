const mongoose = require('mongoose');
const slugify = require('slugify');
const WinesCategory = require('./winesCategoryModel');

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
    type: String,
    required: [true, 'Um vinho deve sempre ter uma marca'],
  },
  images: {
    product_img: String,
    product_img_hover: String,
    bottle_img: String,
  },
  year: Number,
  castes: {
    pt: {
      type: [String],
      required: [true, 'Um vinho deve sempre ter castas em português'],
    },
    pt: {
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
    gpt: String,
    gen: String,
  },
  harmony_suggestion: {
    pt: String,
    en: String,
    image: String,
  },
  category: { type: mongoose.Schema.ObjectId, ref: 'WinesCategory' },
});

wineSchema.pre('save', function (next) {
  this.slug = slugify(this.title.en, { lower: true });

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

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
