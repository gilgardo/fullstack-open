import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

const mockFormData = {
  title: 'Test Blog',
  author: 'Tester',
  url: 'http://test.com',
}
//Ex: 5.16
describe('<Blog /> ', () => {
  test('updates parent state and calls onSubmit', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handlePostNewBlog={createBlog} />)

    const title = screen.getByLabelText('title')
    const author = screen.getByLabelText('author')
    const url = screen.getByLabelText('url')

    const sendButton = screen.getByText('create')

    await user.type(title, mockFormData.title)
    await user.type(author, mockFormData.author)
    await user.type(url, mockFormData.url)

    await user.click(sendButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog.mock.calls[0][0]).toEqual(mockFormData)
  })
  test('after submitting the imputs should be cleaned', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm handlePostNewBlog={createBlog} />)

    const title = screen.getByLabelText('title')
    const author = screen.getByLabelText('author')
    const url = screen.getByLabelText('url')

    const sendButton = screen.getByText('create')

    await user.type(title, mockFormData.title)
    await user.type(author, mockFormData.author)
    await user.type(url, mockFormData.url)

    await user.click(sendButton)

    expect(title.value).toBe('')
    expect(author.value).toBe('')
    expect(url.value).toBe('')
  })
})
