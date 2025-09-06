import { test, expect, beforeEach, describe } from '@playwright/test'
import { loginWith, createBlog, getNthBlog } from './helper.js'
import {
  loggedUser,
  otherUser,
  userBlogs,
  otherBlogs,
  newBlog,
} from './data.js'

describe('Blog app', () => {
  // Ex: 5.17
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/testing/init', {
      data: { user: loggedUser, blogs: userBlogs },
    })
    await request.post('http://localhost:3001/api/testing/init', {
      data: { user: otherUser, blogs: otherBlogs },
    })
    await page.goto('/')
    await expect(page).toHaveURL('/')
  })

  test('Login form is shown', async ({ page }) => {
    const form = page.getByTestId('login_form')
    await expect(form).toBeVisible()
  })

  // Ex: 5.18
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, loggedUser)
      await expect(page.getByText(`${loggedUser.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, { username: 'test', password: 'wrong pass' })
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, loggedUser)
    })

    // Ex: 5.19
    test('the new blog form is visible after clicking the new blog button', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await expect(page.getByTestId('new_blog_form')).toBeVisible()
    })

    test('the new blog form is not visible by default', async ({ page }) => {
      await expect(page.getByTestId('new_blog_form')).toBeHidden()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, newBlog)
      await expect(
        page.getByText(`${newBlog.title} ${newBlog.author}`)
      ).toBeVisible()
    })

    describe('liking a blog tests', () => {
      test('the like button is not visible by default', async ({ page }) => {
        const blog = getNthBlog(0, page, userBlogs)
        await expect(blog.getByRole('button', { name: 'like' })).toBeHidden()
      })

      test('after clicking the view button the like button becomes visible', async ({
        page,
      }) => {
        const blog = getNthBlog(0, page, userBlogs)
        await blog.getByRole('button', { name: 'View' }).click()
        await expect(blog.getByRole('button', { name: 'like' })).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = getNthBlog(0, page, userBlogs)
        await blog.getByRole('button', { name: 'View' }).click()

        const text = await blog.getByText(/likes \d+/).textContent()
        if (!text) throw new Error('No likes text found')
        const prevLikes = Number(text.match(/\d+/)?.[0] ?? 0)

        await blog.getByRole('button', { name: 'like' }).click()
        await expect(blog.getByText(`likes ${prevLikes + 1}`)).toBeVisible()
      })
    })

    describe('deleting a blog', () => {
      // Ex: 5.21
      test('the user who added the blog can delete it', async ({ page }) => {
        const blog = getNthBlog(1, page, userBlogs)
        await blog.getByRole('button', { name: 'View' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await blog.getByRole('button', { name: 'remove' }).click()
        await expect(blog).toBeHidden()
      })
      // Ex: 5.22
      test("users can't remove blogs posted by others", async ({ page }) => {
        const blog = getNthBlog(0, page, otherBlogs)
        await blog.getByRole('button', { name: 'View' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeHidden()
      })
    })
  })
})

// Ex: 5.23
test.describe.serial('serial test', () => {
  test('the blogs are in the right order', async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/testing/init', {
      data: { user: loggedUser, blogs: userBlogs },
    })
    await request.post('http://localhost:3001/api/testing/init', {
      data: { user: otherUser, blogs: otherBlogs },
    })

    await page.goto('/')
    await loginWith(page, loggedUser)
    await expect(page.getByText(`${loggedUser.name} logged in`)).toBeVisible()

    const allBlogs = userBlogs.concat(otherBlogs)
    const likesToSet = [5, 3, 7, 2]

    for (let i = 0; i < allBlogs.length; i++) {
      const blog = getNthBlog(i, page, allBlogs)
      const viewButton = blog.getByRole('button', { name: 'View' })
      if (await viewButton.isVisible()) await viewButton.click()

      const likeButton = blog.getByRole('button', { name: 'like' })
      let likesText = await blog.locator('text=/likes \\d+/').textContent()
      let currentLikes = Number(likesText?.match(/\d+/)?.[0] ?? 0)

      while (currentLikes < likesToSet[i]) {
        await likeButton.click()
        await expect(
          blog.locator(`text=likes ${currentLikes + 1}`)
        ).toBeVisible()
        currentLikes++
      }
    }

    const blogs = await page.locator('.blog').all()
    const likesValues = []

    for (const blog of blogs) {
      const viewButton = blog.getByRole('button', { name: 'View' })
      if (await viewButton.isVisible()) await viewButton.click()

      const likesText = await blog.locator('text=/likes \\d+/').textContent()
      const likes = Number(likesText?.match(/\d+/)?.[0] ?? 0)
      likesValues.push(likes)
    }

    const isSorted = likesValues.every(
      (like, ind, arr) => ind === 0 || like <= arr[ind - 1]
    )
    expect(isSorted).toBe(true)
  })
})
