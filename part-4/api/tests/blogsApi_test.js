import { test, after, beforeEach, describe } from 'node:test'
import assert from 'node:assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import initialBlogs from './initialBlogs.js'
import helper from './api_helper.js'

const BLOGS_URL = '/api/blogs'
const api = supertest(app)
let bearerToken
const username = 'root'
const password = 'sekret'

beforeEach(async () => {
  await helper.resetDb()
  const { userId, token } = await helper.makeMockUser(username, password)
  bearerToken = token
  await helper.initDb(userId)
})

describe('getting blogs', () => {
  // Ex: 4.8
  test('blogs are returned as json', async () => {
    await api
      .get(BLOGS_URL)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get(BLOGS_URL)
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  // Ex: 4.9
  test('the unique identifier is named id', async () => {
    const response = await api.get(BLOGS_URL)
    const isId = response.body.every((blog) => typeof blog.id === 'string')
    assert(isId)
  })
})

describe('posting blogs', () => {
  // Ex: 4.10
  test('a valid blog can be added ', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Hello from test',
      author: 'Alessandro',
      url: 'http://example.com/hello-from-test',
      likes: 5,
    }

    const response = await api
      .post(BLOGS_URL)
      .set('Authorization', bearerToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
    const isAdded = blogsAtEnd.some((blog) => blog.id === response.body.id)
    assert(isAdded)
  })

  test('a blog without token return status code 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Hello from test',
      author: 'Alessandro',
      url: 'http://example.com/hello-from-test',
      likes: 5,
    }

    await api
      .post(BLOGS_URL)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
  // Ex: 4.11

  test('if the prop likes is missing the default is 0 ', async () => {
    const newBlog = {
      title: 'Hello from test',
      author: 'Alessandro',
      url: 'http://example.com/hello-from-test',
    }

    const response = await api
      .post(BLOGS_URL)
      .set('Authorization', bearerToken)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  // Ex: 4.12
  test('blogs without title or url return 400 Bad Request', async () => {
    const emptyTitle = {
      author: 'Alessandro',
      url: 'http://example.com/hello-from-test',
      likes: 5,
    }

    const emptyUrl = {
      author: 'Alessandro',
      title: 'Hello from test',
      likes: 5,
    }
    const emptyEvery = {
      author: 'Alessandro',
      likes: 5,
    }

    await api
      .post(BLOGS_URL)
      .set('Authorization', bearerToken)
      .send(emptyTitle)
      .expect(400)
    await api
      .post(BLOGS_URL)
      .set('Authorization', bearerToken)
      .send(emptyUrl)
      .expect(400)
    await api
      .post(BLOGS_URL)
      .set('Authorization', bearerToken)
      .send(emptyEvery)
      .expect(400)
  })
})

//Ex: 4.13

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToDelete = blogsAtStart[0].id

    await api
      .delete(`${BLOGS_URL}/${idToDelete}`)
      .set('Authorization', bearerToken)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const isDeleted = !blogsAtEnd.some((blog) => blog.id === idToDelete)
    assert(isDeleted)

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
  test('status code 404 if id does not exist', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const nonExistingId = new mongoose.Types.ObjectId().toString()

    await api
      .delete(`${BLOGS_URL}/${nonExistingId}`)
      .set('Authorization', bearerToken)
      .expect(404)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

//Ex: 4.14

describe('updating a blog', () => {
  test('succeeds with status code 200 if updated correctly', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToUpdate = blogsAtStart[0].id
    const newLikes = 5
    const response = await api
      .put(`${BLOGS_URL}/${idToUpdate}`)
      .set('Authorization', bearerToken)
      .send({ likes: newLikes })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(newLikes, response.body.likes)
  })
  test('status code 404 if id does not exist', async () => {
    const nonExistingId = new mongoose.Types.ObjectId().toString()
    const newLikes = 5
    await api
      .put(`${BLOGS_URL}/${nonExistingId}`)
      .set('Authorization', bearerToken)
      .send({ likes: newLikes })
      .expect(404)
  })
  test('status code 400 if the body is empty', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const idToUpdate = blogsAtStart[0].id
    await api
      .put(`${BLOGS_URL}/${idToUpdate}`)
      .set('Authorization', bearerToken)
      .send({})
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
