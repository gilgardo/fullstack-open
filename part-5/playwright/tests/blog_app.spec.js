import { test, expect, beforeEach, describe } from '@playwright/test'
import { loginWith, createBlog } from './helper.js'

const user = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen',
}

describe('Blog app', () => {
  //Ex: 5.17
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: user,
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const form = page.getByTestId('login_form')
    await expect(form).toBeVisible()
  })
  //Ex: 5.18
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, user)
      await expect(page.getByText(`${user.name} logged in`)).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, { username: 'test', password: 'wrong pass' })
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, user)
    })

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
      const newBlog = {
        title: 'test',
        author: 'Tester',
        url: 'http//example.com',
      }
      await createBlog(page, newBlog)
      await expect(
        page.getByText(`${newBlog.title} ${newBlog.author}`)
      ).toBeVisible()
    })
  })
})
