const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.Objectid,
    ref: 'Author',
    required: true
  }
});

module.exports = mongoose.model('Author', schema);
