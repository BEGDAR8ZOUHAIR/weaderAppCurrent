const server = require('./server.js');
const asyncHandler = require("express-async-handler");
const request = require('supertest');
const express = require('express');
const app = express();

app.get('/client', (req, res) =>
{
    res.send({ message: 'Hello World' });
});

describe('Test the root path', () =>
{
    test('It should response the GET method', async () =>
    {
        const response = await request(app).get('/client');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Hello World' });
    });
});

    
    
    

