const mongoose = require('mongoose');
const Award = require('../awardModel');

const awardsPagePageSchema = new mongoose.Schema({
  header: {
    pt: String,
    en: String,
  },
  sub_header: {
    pt: String,
    en: String,
  },
  awards: [{ type: mongoose.Schema.ObjectId, ref: 'Award' }],
});

awardsPagePageSchema.pre('save', async function (next) {
  const awardsPromises = await Award.find();
  this.awards = await Promise.all(awardsPromises);

  next();
});

awardsPagePageSchema.pre(/^find/, async function (next) {
  this.populate({
    path: 'awards',
  });

  next();
});

const AwardsPage = mongoose.model('AwardsPage', awardsPagePageSchema);

module.exports = AwardsPage;
