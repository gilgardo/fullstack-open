import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)
const initialState = []

//EX 6.3 - 6.4
// const add = (anecdote) => ({ type: 'ADD', payload: asObject(anecdote) })
// const vote = (id) => ({ type: 'VOTE', payload: { id } })

// const reducer = (state = initialState, action) => {
//   const { type, payload } = action

//   switch (type) {
//     case 'ADD':
//       return state.concat(payload)
//     case 'VOTE':
//       return state.map((el) =>
//         payload.id === el.id ? { ...el, votes: el.votes + 1 } : el
//       )
//     default:
//       return state
//   }
// }

//Ex 6.16
export const fetchAll = createAsyncThunk('andecdotes/fetchAll', async () => {
  const response = await anecdotes.getAll()
  return response
})
//Ex 6.17
export const postAnecdote = createAsyncThunk(
  'andecdotes/postAnecdote',
  async (anecdote) => {
    const response = await anecdotes.createNew(anecdote)
    return response
  }
)
//Ex 6.18
export const putVote = createAsyncThunk(
  'andecdotes/putVote',
  async (anecdoteObj) => {
    const response = await anecdotes.update({
      ...anecdoteObj,
      votes: anecdoteObj.votes + 1,
    })
    return response
  }
)

// Ex 6.11
const anecdoteSlice = createSlice({
  name: 'andecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const { payload } = action
      return state.map((el) => {
        if (el.id !== payload) return el
        return { ...el, votes: el.votes + 1 }
      })
    },
    add(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_, action) {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAll.fulfilled, (_, action) => {
      return action.payload
    })
    builder.addCase(postAnecdote.fulfilled, (state, action) => {
      state.push(action.payload)
    })
    builder.addCase(putVote.fulfilled, (state, action) => {
      const { payload } = action
      return state.map((el) => {
        if (el.id !== payload.id) return el
        return payload
      })
    })
  },
})

export const { vote, add, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
