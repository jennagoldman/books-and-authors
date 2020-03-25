const Author = require('./lib/models/Author');
const Book = require('./lib/models/Book');
const chance = require('chance').Chance();

module.exports = async({ authorsToCreate = 10, booksToCreate = 100 } = {}) => {
  const authors = await Author.create([...Array(authorsToCreate)].map(() => ({
    name: chance.name()
  })));

  await Book.create([...Array(booksToCreate)].map(() => ({
    authorId: chance.pickone(authors)._id,
    title: chance.sentence({ words: 5 }),
    pages: chance.integer({ min: 101, max: 700 })
  })));
};
