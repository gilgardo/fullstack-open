import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './api_helper.js'
import app from '../app.js'

const LOGIN_URL = '/api/login'
const username = 'root'
const password = 'sekret'
const api = supertest(app)

beforeEach(async () => {
  await helper.resetDb()
  await helper.makeMockUser(username, password)
})

// Ex: 4.16
describe('testing login', () => {
  test('succeeds with right username and password and a token is returned', async () => {
    const response = await api
      .post(LOGIN_URL)
      .send({ username, password })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert(typeof response.body.token === 'string')
  })

  test('fails with proper statuscode and message if credentials are invalid', async () => {
    await api
      .post(LOGIN_URL)
      .send({ username: 'albert', password })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    await api
      .post(LOGIN_URL)
      .send({ username, password: 'badpass' })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    await api
      .post(LOGIN_URL)
      .send({ username: 'albert', password: 'badpass' })
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => {
  await mongoose.connection.close()
})
