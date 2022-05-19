const mongoose = require('mongoose');
const WinesCategory = require('./../winesCategoryModel');
const Award = require('./../awardModel');

const homeSchema = new mongoose.Schema({
  hero_background: String,
  header: {
    pt: String,
    en: String,
    isActive: Boolean,
  },
  aboutUs: {
    pt: String,
    en: String,
  },
  aboutUs_image: String,
  banner: {
    pt: String,
    en: String,
  },
  banner_image: String,
  ourWines_title: {
    pt: String,
    en: String,
  },
  ourWines_text: {
    pt: String,
    en: String,
  },
  ourWines: [{ type: mongoose.Schema.ObjectId, ref: 'WinesCategory' }],
  newsletter_title: {
    pt: String,
    en: String,
  },
  newsletter_subtitle: {
    pt: String,
    en: String,
  },
  awards_title: {
    pt: String,
    en: String,
  },
  awards_text: {
    pt: String,
    en: String,
  },
  awards: [{ type: mongoose.Schema.ObjectId, ref: 'Award' }],
});

homeSchema.pre('save', async function (next) {
  const winesPromises = await WinesCategory.find();
  this.ourWines = await Promise.all(winesPromises);

  const awardsPromises = await Award.find();
  this.awards = await Promise.all(awardsPromises);

  next();
});

homeSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'ourWines',
  }).populate({
    path: 'awards',
  });

  next();
});

const HomePage = mongoose.model('HomePage', homeSchema);

module.exports = HomePage;
