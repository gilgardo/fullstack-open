import { test, describe } from 'node:test'
import assert from 'assert'
import blogs from './blogs.js'
import list_helper from '../utils/list_helper.js'

const { favoriteBlog } = list_helper
//Ex: 4.5
describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.equal(favoriteBlog([]), null)
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

  test('when list has only one blog, equals the only blog in the list', () => {
    const result = favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list is calculated right', () => {
    assert.deepStrictEqual(favoriteBlog(blogs), {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    })
  })
})
