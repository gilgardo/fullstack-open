import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogsReducer'
import { createComment, fetchAllComments } from '../reducers/commentsReducer'
import { useEffect, useState } from 'react'

const BlogDettail = () => {
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const comments = useSelector((state) => state.comments[id]) ?? []
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(fetchAllComments(id))
  }, [id])

  const handleLike = () => dispatch(updateBlog(blog))
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createComment({ id, content }))
    setContent('')
  }

  return (
    <div>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {' '}
            {blog.likes} likes <button onClick={handleLike}>like</button>
          </div>
          <div>Added by {blog.user.name}</div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button type="submit">add comment</button>
            </div>
          </form>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>{comment.content}</li>
            ))}
          </ul>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  )
}

export default BlogDettail
