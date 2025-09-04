import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import anecdotesService from './services/anecdotes'
import { useMessageDispatch } from './MessageHoks'

const App = () => {
  const queryClient = useQueryClient()

  const { mutate: vote } = useMutation({
    mutationFn: (anecdote) =>
      anecdotesService.update({ ...anecdote, votes: anecdote.votes + 1 }),
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === newAnecdote.id ? newAnecdote : anecdote
        )
      )
    },
  })

  const { data: anecdotes } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 1,
  })

  const dispatchNotification = useMessageDispatch()

  const handleVote = (anecdote) => {
    vote(anecdote)
    dispatchNotification(`you voted ${anecdote.content}`, 5)
  }

  if (!anecdotes) return <div>...</div>

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
