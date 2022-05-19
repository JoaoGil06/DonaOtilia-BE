const mongoose = require('mongoose');
const Cocktail = require('../cocktailModel');

const cocktailsPagePageSchema = new mongoose.Schema({
  header: {
    pt: String,
    en: String,
  },
  sub_header: {
    pt: String,
    en: String,
  },
  cocktails: [{ type: mongoose.Schema.ObjectId, ref: 'Cocktail' }],
});

cocktailsPagePageSchema.pre('save', async function (next) {
  const cocktailsPromises = await Cocktail.find();
  this.cocktails = await Promise.all(cocktailsPromises);

  next();
});

cocktailsPagePageSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'cocktails',
  });

  next();
});

const CocktailsPage = mongoose.model('CocktailsPage', cocktailsPagePageSchema);

module.exports = CocktailsPage;
