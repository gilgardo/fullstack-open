import { createSlice } from '@reduxjs/toolkit'
import getErrorMessage from '../utils/getErrorMessage'

const initialState = { message: '', className: '' }
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    set(_, action) {
      return action.payload
    },
    remove() {
      return initialState
    },
  },
})

const { set, remove } = messageSlice.actions

export const setError = (error, fallBack) => {
  return (dispatch) => {
    const newError = getErrorMessage(error, fallBack)
    dispatch(set({ message: newError, className: 'error' }))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }
}

export const setSuccess = (message) => {
  return (dispatch) => {
    dispatch(set({ message, className: 'success' }))
    setTimeout(() => {
      dispatch(remove())
    }, 5000)
  }
}

export default messageSlice.reducer
