const { getAuthor, getAuthors, getBooks } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');
const Book = require('../lib/models/Book');

describe('author routes', () => {
  it('creates an author', () => {
    return request(app)
      .post('/api/v1/authors')
      .send({
        name: 'Jenna Goldman'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Jenna Goldman',
          __v: 0
        });
      });
  });

  it('gets all authors', async() => {
    const authors = await getAuthors();

    return request(app)
      .get('/api/v1/authors')
      .then(res => {
        expect(res.body).toEqual(authors);
      });
  });

  it('gets an author by id', async() => {
    const author = await getAuthor();
    const books = await getBooks({ authorId: author._id });

    return request(app)
      .get(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...author,
          books
        });
      });
  });

  it('gets an author by id', async() => {
    const author = await getAuthor();
    const books = await getBooks({ authorId: author._id });
    
    return request(app)
      .get(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...author,
          books
        });
      });
  });

  it('updates an author by id', async() => {
    const author = await getAuthor();

    return request(app)
      .patch(`/api/v1/authors/${author._id}`)
      .send({ name: 'Janelle Mellor' })
      .then(res => {
        expect(res.body).toEqual({
          ...author,
          name: 'Janelle Mellor'
        });
      });
  });

  it('deletes a tweet by id', async() => {
    const author = await getAuthor();
    
    return request(app)
      .delete(`/api/v1/authors/${author._id}`)
      .then(res => {
        expect(res.body).toEqual(author);
      });
  });
});
