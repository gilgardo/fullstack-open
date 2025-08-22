import { test, describe } from 'node:test'
import assert from 'assert'
import blogs from './blogs.js'
import list_helper from '../utils/list_helper.js'

const { mostBlogs } = list_helper
//Ex: 4.6
describe('author with most blogs', () => {
  test('of empty list is null', () => {
    assert.equal(mostBlogs([]), null)
  })
  test('of a bigger list return a obj with the form: {author:<author with most blogs>, blogs:<nr of blogs>}', () => {
    assert.deepStrictEqual(mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})
