const request = require('supertest');
const app = require('../Routes/update'); 
const { Books } = require('../model/booksschema'); 
jest.mock('../model/booksschema'); // Mock the mongoose model

describe('Books API Endpoints', () => {
  it('should update a book', async () => {
    Books.findOneAndUpdate.mockImplementationOnce((filter, update) => {
      const updatedBook = { ...filter, ...update.$set, _id: 'mocked-book-id' };
      return updatedBook;
    });

    const updatedBookData = {
      title: 'Updated Test Book',
      Author: 'Updated Test Author',
      ISBN: '0987654321',
      price: 25.99,
      quantity: 10,
    };

    const response = await request(app)
      .post(`/update/65b37926f81eefd1b39ef7b9`) 
      .send(updatedBookData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Book updated successfully');
    expect(response.body).toHaveProperty('book');
    expect(response.body.book.Title).toBe(updatedBookData.title);
    expect(response.body.book.Author).toBe(updatedBookData.Author);
    expect(response.body.book.ISBN).toBe(updatedBookData.ISBN);
    expect(response.body.book.price).toBe(updatedBookData.price);
    expect(response.body.book.quantity).toBe(updatedBookData.quantity);
    Books.findOneAndUpdate.mockRestore();
  });

  it('should handle book not found', async () => {
    
    Books.findOneAndUpdate.mockImplementationOnce(() => null);

    const updatedBookData = {
      title: 'Updated Test Book',
      Author: 'Updated Test Author',
      ISBN: '0987654321',
      price: 25.99,
      quantity: 10,
    };

    const response = await request(app)
      .post(`/update/65b37926feefd1b39ef7b9`) // Replace 'non-existent-book-id' with an invalid book ID
      .send(updatedBookData)
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Book not found');
    Books.findOneAndUpdate.mockRestore();
  });

});
