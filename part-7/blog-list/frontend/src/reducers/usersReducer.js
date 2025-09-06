import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from '../services/users'

export const getAllUsers = createAsyncThunk('users/getAll', async () => {
  const response = await usersService.getAll()
  return response
})

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (_, action) => {
      return action.payload
    })
  },
})

export default userSlice.reducer
