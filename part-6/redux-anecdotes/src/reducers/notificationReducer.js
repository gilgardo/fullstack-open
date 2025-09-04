import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }
//Ex 6.12 - 6.13
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      state.value = `you voted for ${action.payload}`
    },
    remove(state) {
      state.value = ''
    },
  },
})

export const { set, remove } = notificationSlice.actions

// Ex 6.19
export const setNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch(set(content))
    setTimeout(() => {
      dispatch(remove())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
