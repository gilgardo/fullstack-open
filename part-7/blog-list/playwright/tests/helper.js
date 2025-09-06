const loginWith = async (page, user) => {
  await page.getByLabel('username').fill(user.username)
  await page.getByLabel('password').fill(user.password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, content) => {
  await page.getByRole('button', { name: 'new blog' }).click()

  const entries = Object.entries(content)
  for (const [key, value] of entries) {
    await page.getByLabel(key).fill(value)
  }
  await page.getByRole('button', { name: 'create' }).click()
}

const getNthBlog = (nth, page, blogs) => {
  const blog = page
    .getByText(`${blogs[nth].title} ${blogs[nth].author}`)
    .locator('..')
  return blog
}

export { loginWith, createBlog, getNthBlog }
