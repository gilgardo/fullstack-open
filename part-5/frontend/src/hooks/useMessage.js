import { useEffect, useState } from 'react'

const useMessage = () => {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!message) return
    const timeoutId = setTimeout(() => setMessage(null), 5000)
    return () => clearTimeout(timeoutId)
  }, [message])

  return [message, setMessage]
}

export default useMessage
