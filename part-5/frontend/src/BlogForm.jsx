import { useState } from 'react'
import handleChangeForm from './utils/handleChangeForm'

const BlogForm = ({ handlePostNewBlog }) => {
  const [blogData, setBlogData] = useState({ title: '', author: '', url: '' })
  const handleChange = handleChangeForm(setBlogData)
  const { title, author, url } = blogData

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handlePostNewBlog(blogData)
      setBlogData({ title: '', author: '', url: '' })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input type="text" name="url" value={url} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
