const request = require('supertest');
const app = require('../Routes/getbook'); 
const { Books } = require('../model/booksschema'); 

jest.mock('../model/booksschema'); 

describe('Books API Endpoints', () => {
  it('should get a book by ISBN', async () => {
    Books.findOne.mockImplementationOnce((filter) => {
      const bookData = {
        _id: 'mocked-book-id',
        Title: 'Test Book',
        Author: 'Test Author',
        ISBN: filter.ISBN,
        price: 20.99,
        quantity: 5,
      };
      return bookData;
    });

    const getBookData = {
      ISBN: '1234567890',
    };

    const response = await request(app)
      .post('/getbook')
      .send(getBookData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'All books fetched successfully');
    expect(response.body).toHaveProperty('book');

    // Restore the original findOne function after the test
    Books.findOne.mockRestore();
  });

  it('should handle book not found', async () => {
    
    Books.findOne.mockImplementationOnce(() => null);

    const getBookData = {
      ISBN: 'nonexistent-ISBN',
    };

    const response = await request(app)
      .post('/getbook')
      .send(getBookData)
      .expect('Content-Type', /json/)
      .expect(201); // Assuming you return a 201 status even when a book is not found

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Book not found');
    Books.findOne.mockRestore();
  });
});
