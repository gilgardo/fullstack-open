import { useState } from 'react'
import { Form, Button, Card, Collapse, Stack } from 'react-bootstrap'
import handleChangeForm from '../utils/handleChangeForm'

const BlogForm = ({ handlePostNewBlog }) => {
  const [blogData, setBlogData] = useState({ title: '', author: '', url: '' })
  const handleChange = handleChangeForm(setBlogData)
  const [isOpen, setIsOpen] = useState(false)
  const { title, author, url } = blogData

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handlePostNewBlog(blogData)
      setBlogData({ title: '', author: '', url: '' })
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setBlogData({ title: '', author: '', url: '' })
    setIsOpen(false)
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleOpen}
          type="button"
          variant="success"
          size="lg"
          className="d-block mx-auto mb-3"
        >
          New Blog
        </Button>
      )}

      <Collapse in={isOpen}>
        <div>
          <Card className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Create New Blog</Card.Title>
              <Form data-testid="new_blog_form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="blogTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="blogAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="blogUrl">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    required
                  />
                </Form.Group>

                <Stack direction="horizontal" gap={2}>
                  <Button type="submit" variant="success">
                    Create
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Collapse>
    </>
  )
}

export default BlogForm
