import { useContext } from 'react'
import MessageContext from './MessageContext'

export const useMessageValue = () => {
  const [message] = useContext(MessageContext)
  return message
}

export const useMessageDispatch = () => {
  const [_, dispatch] = useContext(MessageContext)
  return dispatch
}
