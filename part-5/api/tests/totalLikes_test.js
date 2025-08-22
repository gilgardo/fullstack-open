import { test, describe } from 'node:test'
import assert from 'assert'
import blogs from './blogs.js'
import list_helper from '../utils/list_helper.js'

const { totalLikes } = list_helper

// Ex: 4.4
describe('total likes', () => {
  test('of empty list is 0', () => {
    assert.strictEqual(totalLikes([]), 0)
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLikes(blogs), 36)
  })
})
