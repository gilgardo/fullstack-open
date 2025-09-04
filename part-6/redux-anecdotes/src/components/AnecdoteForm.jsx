import { add, postAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdotes from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  // Ex: 6.4
  const handleSubmit = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    // const newAnecdote = await anecdotes.createNew(anecdote)
    // dispatch(add(newAnecdote))
    dispatch(postAnecdote(anecdote))
    e.target.anecdote.value = ''
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
