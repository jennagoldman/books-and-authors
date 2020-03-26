require('dotenv').config();
require('./lib/utils/connect')();
const Author = require('./lib/models/Author');
const Book = require('./lib/models/Book');

Author
  .topAuthors()
  .then(topAuthors => console.log(topAuthors));

Book
  .topGenres()
  .then(topGenres => console.log(topGenres));
