import { useSelector, useDispatch } from 'react-redux'
import { vote, putVote } from '../reducers/anecdoteReducer'
import { set, remove, setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter.value)
    )
  )
  const dispatch = useDispatch()

  //Ex: 6.5
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  // Ex: 6.3
  const handleVote = async (anecdote) => {
    // dispatch(vote(anecdote.id))
    // dispatch(set(anecdote.content))
    // setTimeout(() => dispatch(remove()), 5000)
    dispatch(putVote(anecdote))
    dispatch(setNotification(anecdote.content, 5))
  }

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={handleVote}
        />
      ))}
    </>
  )
}

export default AnecdoteList
