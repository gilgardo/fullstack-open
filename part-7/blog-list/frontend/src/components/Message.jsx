import { useSelector } from 'react-redux'

const Message = () => {
  const { message, className } = useSelector((state) => state.message)
  if (message === '') return null
  return <div className={className}>{message}</div>
}

export default Message
