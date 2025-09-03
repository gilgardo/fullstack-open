import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: '' }

// Ex: 6.9

// export const filterChange = (value) => ({ type: 'CHANGE', payload: { value } })

// const reducer = (state = initialState, action) => {
//   const { type, payload } = action

//   switch (type) {
//     case 'CHANGE':
//       return {
//         ...payload,
//       }
//     default:
//       return state
//   }
// }

// export default reducer

// Ex 6.10

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filterChange(state, action) {
      state.value = action.payload
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
