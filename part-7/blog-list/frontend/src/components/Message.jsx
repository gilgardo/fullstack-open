import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Message = () => {
  const { message, className } = useSelector((state) => state.message)

  if (!message) return null
  const variant = className === 'success' ? 'success' : 'danger'

  return (
    <Alert variant={variant} className="mt-3">
      {message}
    </Alert>
  )
}

export default Message
