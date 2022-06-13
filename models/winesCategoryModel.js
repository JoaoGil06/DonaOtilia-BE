const mongoose = require('mongoose');
const slugify = require('slugify');

const winesCategorySchema = new mongoose.Schema({
  title: {
    pt: {
      type: String,
      required: [
        true,
        'Uma categoria de vinho deve sempre ter um titulo em português',
      ],
      trim: true,
    },
    en: {
      type: String,
      required: [
        true,
        'Uma categoria de vinho deve sempre ter um titulo em inglês',
      ],
      trim: true,
    },
  },
  type: { type: String },
  image: String,
  banner: String,
});

winesCategorySchema.pre('save', function (next) {
  this.type = slugify(this.title.en, { lower: true });

  next();
});

const WinesCategory = mongoose.model('WinesCategory', winesCategorySchema);

module.exports = WinesCategory;
