import { useRef, useState } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link style={padding} to="/">
        anecdotes
      </Link>
      <Link style={padding} to="/new">
        create new
      </Link>
      <Link style={padding} to="/about">
        about
      </Link>
    </div>
  )
}

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (message === '') return null
  return <div style={style}>{message}</div>
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
)

const View = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find((an) => an.id == id)

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <div>has {anecdote.votes} votes</div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    <hr />
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{' '}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = ({ addNew, setMessage }) => {
  const content = useField('content', 'text')
  const author = useField('author', 'text')
  const info = useField('info', 'text', 'url of the link')

  const fields = [content, author, info]
  const resetAll = () => fields.forEach((field) => field.reset())
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.inputProp.value,
      author: authorcontent.inputProp.value,
      info: infocontent.inputProp.value,
      votes: 0,
    })
    setMessage(`a new anecdote: ${content.inputProp.value}, created!`)
    resetAll()
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.inputProp.name}>
            {field.label}
            <input {...field.inputProp} />
          </div>
        ))}

        <button type="submit">create</button>
        <button onClick={resetAll} type="button">
          reset
        </button>
      </form>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ])
  const timeoutRef = useRef(null)
  const [message, setMessage] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const handleMessage = (message) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMessage(message)
    timeoutRef.current = setTimeout(() => setMessage(''), 5000)
  }
  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={message} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/new"
          element={<CreateNew addNew={addNew} setMessage={handleMessage} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<View anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
