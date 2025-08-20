import { test, describe } from 'node:test'
import assert from 'assert'
import blogs from './blogs.js'
import list_helper from '../utils/list_helper.js'

const { mostLikes } = list_helper

describe('author with most likes', () => {
  test('of empty list is null', () => {
    assert.equal(mostLikes([]), null)
  })
  test('of a bigger list return a obj with the form: {author:<author with most blogs>, blogs:<nr of blogs>}', () => {
    assert.deepStrictEqual(mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
