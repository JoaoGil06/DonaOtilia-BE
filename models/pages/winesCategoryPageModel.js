const mongoose = require('mongoose');
const WinesCategory = require('../winesCategoryModel');

const winesCategoryPageSchema = new mongoose.Schema({
  hero_background: String,
  header: {
    pt: String,
    en: String,
    isActive: Boolean,
  },
  wines: [{ type: mongoose.Schema.ObjectId, ref: 'WinesCategory' }],
});

winesCategoryPageSchema.pre('save', async function (next) {
  const winesPromises = await WinesCategory.find();
  this.wines = await Promise.all(winesPromises);

  next();
});

winesCategoryPageSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'wines',
  });

  next();
});

const WinesCategoryPage = mongoose.model(
  'WinesCategoryPage',
  winesCategoryPageSchema
);

module.exports = WinesCategoryPage;
