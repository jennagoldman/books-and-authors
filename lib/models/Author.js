const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});

schema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authorId'
});

schema.statics.topAuthors = function() {
  return this
    .aggregate([
      {
        '$lookup': {
          'from': 'books', 
          'localField': '_id', 
          'foreignField': 'authorId', 
          'as': 'books'
        }
      }, {
        '$project': {
          '_id': true, 
          'name': true, 
          'title': true, 
          'totalBooks': {
            '$size': '$books'
          }
        }
      }, {
        '$sort': {
          'totalBooks': -1
        }
      }
    ]);
};

module.exports = mongoose.model('Author', schema);
