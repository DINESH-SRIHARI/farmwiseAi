const request = require('supertest');
const app = require('../Routes/allbooks'); 

describe('Books API Endpoints', () => {
  it('should get all books', async () => {
    const response = await request(app)
      .post('/allbooks')
      .expect('Content-Type')
      .expect(201);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'All books fetched successfully');
    expect(response.body).toHaveProperty('books');
    expect(response.body.books).toBeInstanceOf(Array);
  });

  it('should handle internal server error', async () => {
    jest.spyOn(Books, 'find').mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const response = await request(app)
      .post('/allbooks')
      .expect('Content-Type')
      .expect(500);

    expect(response.body).toHaveProperty('message', 'Internal Server Error');
    Books.find.mockRestore();
  });
});
