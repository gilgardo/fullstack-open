import { createContext, useReducer, useRef } from 'react'

//Ex 6.23

const messageReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET':
      return payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const MessageContext = createContext()

export const MessageContextProvider = ({ children }) => {
  const [message, dispatch] = useReducer(messageReducer, '')
  const timeoutRef = useRef(null)
  const setNotification = (payload, seconds) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    dispatch({ type: 'SET', payload })
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, seconds * 1000)
  }

  return (
    <MessageContext.Provider value={[message, setNotification]}>
      {children}
    </MessageContext.Provider>
  )
}

export default MessageContext
