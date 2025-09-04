import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes'
import { useMessageDispatch } from '../MessageHoks'

const AnecdoteForm = () => {
  const dispatchMessage = useMessageDispatch()

  //Ex 6.21
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (content) => anecdotesService.createNew(content),
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote])
    },
    //Ex 6.24
    onError: (error) => {
      dispatchMessage(error.response?.data?.error ?? error.message, 5)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
