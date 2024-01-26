const request = require('supertest');
const app = require('../Routes/loginrouter'); 
const { user } = require('../model/userschema'); 

jest.mock('../model/userschema'); 

describe('Authentication API Endpoints', () => {
  it('should login a user', async () => {
    user.findOne.mockImplementationOnce((filter) => {
      const userData = {
        _id: 'mocked-user-id',
        name: 'Test User',
        email: filter.email,
        password: '$2a$10$.P7Am2r20LBt5AaxcK6Y1OgodUkTeMEeCvMWfZq5Gl3mYAk/F5opq', 
      };
      return userData;
    });

    const loginData = {
      email: 'testuser@ex.com',
      password: '$2a$10$.P7Am2r20LBt5AaxcK6Y1OgodUkTeMEeCvMWfZq5Gl3mYAk/F5opq',
    };

    const response = await request(app)
      .post('/loginuser')
      .send(loginData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('authtoken');
    user.findOne.mockRestore();
  });

  it('should handle invalid email', async () => {
    user.findOne.mockImplementationOnce(() => null);

    const loginData = {
      email: 'nonexistent@example.com',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/loginuser')
      .send(loginData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('Invalid Email Address');
    user.findOne.mockRestore();
  });

  it('should handle invalid password', async () => {
    user.findOne.mockImplementationOnce(() => ({
      _id: 'mocked-user-id',
      name: 'Test User',
      email: 'test@example.com',
      password: 'incorrect-hashed-password', 
    }));

    const loginData = {
      email: 'test@example.com',
      password: 'incorrectpassword',
    };

    const response = await request(app)
      .post('/loginuser')
      .send(loginData)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors[0].msg).toBe('Invalid Password');
    user.findOne.mockRestore();
  });
});
