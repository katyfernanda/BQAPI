const supertest = require('supertest')
const mongoose = require('mongoose')
const { app, server } = require('../index')

const api = supertest(app)
let token = '';

beforeAll(async () => {
  const response = await supertest(app).get('/authentication/test');
  console.log("------------->",response.body)
  token = response.body.token;
});

test('users are returned text/html when they don`t send a Headers Authorization', async () => {
    await api
        .get('/users')
        .expect(401)
        .expect('Content-Type', "text/html; charset=utf-8")
})
afterAll(() => {
    mongoose.connection.close()
    server.close()
})

