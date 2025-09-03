import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

//Ex: 6.1
describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = initialState
    const action = {
      type: 'DO_NOTHING'
    }
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(initialState)
  })

  test('GOOD increments good by 1', () => {
  const state = initialState
  deepFreeze(state)

  const newState = counterReducer(state, { type: 'GOOD' })
  expect(newState).toEqual({
    good: 1,
    ok: 0,
    bad: 0
  })
})

test('OK increments ok by 1', () => {
  const state = { good: 1, ok: 0, bad: 0 }
  deepFreeze(state)

  const newState = counterReducer(state, { type: 'OK' })
  expect(newState).toEqual({
    good: 1,
    ok: 1,
    bad: 0
  })
})

test('BAD increments bad by 1', () => {
  const state = { good: 1, ok: 1, bad: 0 }
  deepFreeze(state)

  const newState = counterReducer(state, { type: 'BAD' })
  expect(newState).toEqual({
    good: 1,
    ok: 1,
    bad: 1
  })
})

test('ZERO resets to initial state', () => {
  const state = { good: 1, ok: 1, bad: 1 }
  deepFreeze(state)

  const newState = counterReducer(state, { type: 'ZERO' })
  expect(newState).toEqual(initialState)
})
})