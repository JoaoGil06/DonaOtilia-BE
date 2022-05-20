const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
  address: String,
  social_media: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
});

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
