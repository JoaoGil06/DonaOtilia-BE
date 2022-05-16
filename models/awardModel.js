const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
  title: {
    pt: {
      type: String,
      required: [true, 'Um premio deve sempre ter um titulo em português'],
      trim: true,
    },
    en: {
      type: String,
      required: [true, 'Um premio deve sempre ter um titulo em inglês'],
      trim: true,
    },
  },
  entity: String,
  year: Number,
  image: String,
});

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;
