import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './api_helper.js'
import app from '../app.js'

const USERS_URL = '/api/users'
const api = supertest(app)

beforeEach(async () => {
  await helper.resetDb()
  await helper.makeMockUser()
})

// Ex: 4.16
describe('posting users', () => {
  test('succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post(USERS_URL)
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const { username } = usersAtStart[0]

    const newUser = {
      username,
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post(USERS_URL)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with proper statuscode and message if username or password are too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const shortUsername = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const shortPassword = {
      username: 'robert',
      name: 'Superuser',
      password: 'sa',
    }

    const shortBoth = {
      username: 'ro',
      name: 'Superuser',
      password: 'sa',
    }

    const shortUsernameResult = await api
      .post(USERS_URL)
      .send(shortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const shortPasswordResult = await api
      .post(USERS_URL)
      .send(shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    await api
      .post(USERS_URL)
      .send(shortBoth)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(shortUsernameResult.body.error.includes('username is too short'))

    assert(shortPasswordResult.body.error.includes('password is too short'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
