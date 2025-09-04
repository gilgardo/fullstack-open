import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdotes from './services/anecdotes'
import { setAnecdotes, fetchAll } from './reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // const fetchAnecdotes = async () => {
    //   try {
    //     const data = await anecdotes.getAll()
    //     console.log(data)
    //     dispatch(setAnecdotes(data))
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // fetchAnecdotes()
    dispatch(fetchAll())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
