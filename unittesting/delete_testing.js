const request = require('supertest');
const app = require('../Routes/delete'); 

jest.mock('../model/booksschema'); 

describe('Books API Endpoints', () => {
  it('should delete a book by ID', async () => {
    const validBookId = '65b37b6aba0f1c12a5f109d2';

    const response = await request(app)
      .delete(`/delete/${validBookId}`)
      .expect('Content-Type')
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Document deleted successfully');
    expect(response.body).toHaveProperty('data');
    
  });

  it('should handle not finding a book by ID', async () => {
    // Assuming you have an invalid book ID for testing
    const invalidBookId = 'invalid-book-id';

    const response = await request(app)
      .delete(`/delete/${invalidBookId}`)
      .expect('Content-Type')
      .expect(404);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Document not found');
  });

  it('should handle internal server error', async () => {
    // Mocking the findByIdAndDelete function to simulate an error
    Books.findByIdAndDelete.mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const response = await request(app)
      .delete('/delete/65b37919f81eefd1b39ef7b7') // Assuming a valid book ID
      .expect('Content-Type')
      .expect(500);

    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Internal server error');
    Books.findByIdAndDelete.mockRestore();
  });
});
