const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}


const counterReducer = (state = initialState, action) => {
  const {type} = action
  const stateKey = type.toLowerCase()
  switch (type) {
    case 'GOOD':
    case 'OK':
    case 'BAD':
      return {...state, [stateKey] : state[stateKey] + 1}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer
