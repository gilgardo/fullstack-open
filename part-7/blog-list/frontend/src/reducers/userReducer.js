import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setError } from './messageReducer'

export const getFromStorage = createAsyncThunk(
  'user/getFromStorage',
  async (_, { rejectWithValue, getState }) => {
    const { localStorageUserKey } = getState().user
    const user = localStorage.getItem(localStorageUserKey)
    if (!user) return rejectWithValue(null)
    return JSON.parse(user)
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (loginData, { dispatch, rejectWithValue, getState }) => {
    try {
      const { localStorageUserKey } = getState().user
      const response = await loginService.login(loginData)
      localStorage.setItem(localStorageUserKey, JSON.stringify(response))
      console.log(response)
      return response
    } catch (error) {
      dispatch(setError(error, 'Failed to login'))
      return rejectWithValue(error)
    }
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { getState }) => {
    const { localStorageUserKey } = getState().user
    localStorage.removeItem(localStorageUserKey)
    return null
  }
)

const initialState = { localStorageUserKey: 'user_data', user: null }

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getFromStorage.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload
    })
  },
})

export default userSlice.reducer
