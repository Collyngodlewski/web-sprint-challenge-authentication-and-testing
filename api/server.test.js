const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('./server');

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('responds with error when no username', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: '', 
      password: 'adadada',
    })
    expect(res.body).toBe("username and password required");
  })

  test('responds with error when no password', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'colly', 
      password: '',
    })
    expect(res.body).toBe("username and password required");
})
})

describe('[POST] /login', () => {
  test('responds with error when no username', async () => {
    const res = await request(server).post('/login').send({
      username: '', 
      password: 'adadadad'
    })
    expect(res.status).toBe(404)
  })
  test('responds with error when no password', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'colly', 
      password: '',
    })
    expect(res.body).toBe("username and password required");
  })
}) 