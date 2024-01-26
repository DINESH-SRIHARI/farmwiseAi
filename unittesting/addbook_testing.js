const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = express();
const Books = require('../model/booksschema');

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  app.post('/addbook', async (req, res) => {
    try {
      const newBook = new Books({
        Title: req.body.title,
        Author: req.body.Author,
        ISBN: req.body.ISBN,
        price: req.body.price,
        quantity: req.body.quantity,
      });

      await newBook.save();
      res.status(201).json({ success: true, message: 'New Book Added successfully', book: newBook });
    } catch (error) {
      console.error('Error saving book:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('Books API Endpoints', () => {
  let authToken;
  let testBookId;

  it('should add a new book', async () => {
    const response = await request(app)
      .post('/addbook')
      .send({
        title: 'Test Book',
        Author: 'Test Author',
        ISBN: '1234567890',
        price: 20.99,
        quantity: 5,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'New Book Added successfully');
    expect(response.body).toHaveProperty('book');
    testBookId = response.body.book._id; 
  });

  
});
