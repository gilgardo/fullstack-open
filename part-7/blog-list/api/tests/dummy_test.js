import { test } from 'node:test'
import assert from 'assert'
import listHelper from '../utils/list_helper.js'

//Ex: 4.3

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})
