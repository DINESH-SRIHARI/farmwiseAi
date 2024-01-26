const request = require('supertest');
const app = require('../Routes/userroutes'); 
const { User } = require('../model/userschema'); 

jest.mock('../model/userschema');

describe('User API Endpoints', () => {
  it('should create a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/newuser')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body).toHaveProperty('user');
  });

  it('should handle validation errors', async () => {
    const invalidUserData = {
      name: 'Short', // Name length less than 5 characters
      email: 'invalid-email', // Invalid email format
      password: 'short', // Password length less than 5 characters
    };

    const response = await request(app)
      .post('/newuser')
      .send(invalidUserData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
   
  });

  it('should handle internal server error', async () => {
    User.prototype.save.mockImplementationOnce(() => {
      throw new Error('Mocked error');
    });

    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/newuser')
      .send(userData)
      .expect('Content-Type')
      .expect(500);

    expect(response.body).toHaveProperty('message', 'Internal Server Error');
    User.prototype.save.mockRestore();
  });
});
