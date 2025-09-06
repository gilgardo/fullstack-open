import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { setError } from './messageReducer'

export const fetchAllComments = createAsyncThunk(
  'comments/fetchAll',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await commentService.getAll(id)
      return { id, comments: response }
    } catch (error) {
      dispatch(setError(error, 'Failed to load comments'))
      return rejectWithValue(error)
    }
  }
)

export const createComment = createAsyncThunk(
  'comments/create',
  async ({ id, content }, { dispatch, rejectWithValue }) => {
    try {
      const response = await commentService.create(id, { content })
      return { id, comment: response }
    } catch (error) {
      dispatch(setError(error, 'Failed to create the comment'))
      return rejectWithValue(error)
    }
  }
)

const initialState = {}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      const { id, comments } = action.payload
      state[id] = comments
    })
    builder.addCase(createComment.fulfilled, (state, action) => {
      const { id, comment } = action.payload
      state[id] = state[id] || []
      state[id].push(comment)
    })
  },
})

export default commentSlice.reducer
