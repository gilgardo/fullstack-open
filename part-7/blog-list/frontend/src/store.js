import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogsReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentsReducer from './reducers/commentsReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    message: messageReducer,
    user: userReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
})

export default store
