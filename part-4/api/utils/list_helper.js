const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((tot, cur) => tot + cur.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  let bestBlog = {}

  for (let blog of blogs)
    if (!bestBlog.likes || bestBlog.likes < blog.likes) bestBlog = blog

  return { ...bestBlog }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorMap = new Map()

  for (let blog of blogs) {
    const prevBlogs = authorMap.get(blog.author) ?? 0
    authorMap.set(blog.author, prevBlogs + 1)
  }

  const max = [...authorMap.entries()].reduce((accumulator, element) => {
    return element[1] > accumulator[1] ? element : accumulator
  })

  return { author: max[0], blogs: max[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorMap = new Map()

  for (let blog of blogs) {
    const prevLikes = authorMap.get(blog.author) ?? 0
    authorMap.set(blog.author, prevLikes + blog.likes)
  }

  const max = [...authorMap.entries()].reduce((accumulator, element) => {
    return element[1] > accumulator[1] ? element : accumulator
  })

  return { author: max[0], likes: max[1] }
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
