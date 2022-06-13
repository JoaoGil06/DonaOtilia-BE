const mongoose = require('mongoose');
const WinesCategory = require('./../winesCategoryModel');
const Award = require('./../awardModel');
const Footer = require('./../footerModel');

const homeSchema = new mongoose.Schema({
  hero_background: String,
  hero_background_type: String,
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
  footer: [{ type: mongoose.Schema.ObjectId, ref: 'Footer' }],
});

homeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'ourWines',
  });

  next();
});

homeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'awards',
  });

  next();
});

homeSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'footer',
  });

  next();
});

homeSchema.pre('save', async function (next) {
  const winesPromises = await WinesCategory.find();
  this.ourWines = await Promise.all(winesPromises);

  const awardsPromises = await Award.find();
  this.awards = await Promise.all(awardsPromises);

  const footerPromises = await Footer.find();
  this.footer = await Promise.all(footerPromises);

  next();
});

homeSchema.pre(/^findBy/, async function (next) {
  const winesPromises = await WinesCategory.find();
  this.ourWines = await Promise.all(winesPromises);

  const awardsPromises = await Award.find();
  this.awards = await Promise.all(awardsPromises);

  const footerPromises = await Footer.find();
  this.footer = await Promise.all(footerPromises);

  next();
});

const HomePage = mongoose.model('HomePage', homeSchema);

module.exports = HomePage;
