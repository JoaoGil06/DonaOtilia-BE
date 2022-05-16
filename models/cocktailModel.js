const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
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
  summary: {
    pt: String,
    en: String,
  },
  preparation_steps: {
    pt: {
      type: [String],
      required: [
        true,
        'Deve existir pelo menos um passo de preparo em português',
      ],
    },
    en: {
      type: [String],
      required: [true, 'Deve existir pelo menos um passo de preparo em inglês'],
    },
  },
  ingredients: {
    pt: {
      type: [String],
      required: [true, 'Deve existir pelo menos um ingrediente em português'],
    },
    en: {
      type: [String],
      required: [true, 'Deve existir pelo menos um ingrediente em inglês'],
    },
  },
  image: String,
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;
