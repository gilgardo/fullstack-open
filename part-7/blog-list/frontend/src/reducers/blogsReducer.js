import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setError, setSuccess } from './messageReducer'

// Thunks

export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await blogService.getAll()
      return response
    } catch (error) {
      dispatch(setError(error, 'Failed to load blogs'))
      return rejectWithValue(error)
    }
  }
)

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blog, { dispatch, rejectWithValue }) => {
    try {
      const response = await blogService.create(blog)
      dispatch(setSuccess(`A new blog "${blog.title}" by ${blog.author} added`))
      return response
    } catch (error) {
      dispatch(setError(error, 'Failed to create the blog'))
      return rejectWithValue(error)
    }
  }
)

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async (blogObj, { dispatch, rejectWithValue }) => {
    try {
      const response = await blogService.update(blogObj.id, {
        ...blogObj,
        likes: blogObj.likes + 1,
      })
      dispatch(setSuccess(`You liked "${blogObj.title}" by ${blogObj.author}"`))
      return response
    } catch (error) {
      dispatch(setError(error, 'Failed to like the blog'))
      return rejectWithValue(error)
    }
  }
)

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await blogService.remove(id)
      dispatch(setSuccess('Blog deleted successfully'))
      return id
    } catch (error) {
      dispatch(setError(error, 'Failed to delete the blog'))
      return rejectWithValue(error)
    }
  }
)

const initialState = []

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllBlogs.fulfilled, (_, action) =>
      sortBlogs(action.payload)
    )
    builder.addCase(createBlog.fulfilled, (state, action) =>
      sortBlogs([...state, action.payload])
    )
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      const { payload } = action
      return sortBlogs(state.map((el) => (el.id !== payload.id ? el : payload)))
    })
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    })
  },
})

export default blogSlice.reducer
