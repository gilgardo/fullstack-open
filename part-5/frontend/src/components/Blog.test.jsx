import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Test Blog',
  author: 'Tester',
  url: 'http://test.com',
  likes: 5,
  user: { username: 'Tester' },
}

const mockLikeHandle = vi.fn()

describe('<Blog /> ', () => {
  //Ex: 5.13
  it('renders title and author', () => {
    render(
      <Blog
        blog={blog}
        loggedUser="Tester"
        handleDelete={() => {}}
        handleLike={mockLikeHandle}
      />
    )

    const header = screen.getByText(`${blog.title} ${blog.author}`, {
      exact: false,
    })
    expect(header).toBeDefined()
  })

  it("doesn't render likes and url by default", () => {
    render(
      <Blog
        blog={blog}
        loggedUser="Tester"
        handleDelete={() => {}}
        handleLike={mockLikeHandle}
      />
    )

    expect(screen.queryByText(`${blog.likes}`, { exact: false })).toBeNull()
    expect(screen.queryByText(blog.url, { exact: false })).toBeNull()
  })
  //Ex: 5.14
  it('renders likes and url after View button is clicked', async () => {
    render(
      <Blog
        blog={blog}
        loggedUser="Tester"
        handleDelete={() => {}}
        handleLike={mockLikeHandle}
      />
    )
    const user = userEvent.setup()

    await user.click(screen.getByText('View'))

    expect(screen.getByText(`${blog.likes}`, { exact: false })).toBeVisible()
    expect(screen.getByText(blog.url, { exact: false })).toBeVisible()
  })
  //Ex: 5.15
  it('clicking twice the like button calls handleLike twice', async () => {
    render(
      <Blog
        blog={blog}
        loggedUser="Tester"
        handleDelete={() => {}}
        handleLike={mockLikeHandle}
      />
    )
    const user = userEvent.setup()

    await user.click(screen.getByText('View'))

    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(mockLikeHandle).toHaveBeenCalledTimes(2)
  })
})
