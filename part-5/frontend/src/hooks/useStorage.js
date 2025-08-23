import { useState, useEffect } from 'react'

const useStorage = (key, initialValue = null) => {
  const [state, setState] = useState(() => {
    const jsonData = localStorage.getItem(key)
    return jsonData ? JSON.parse(jsonData) : initialValue
  })

  useEffect(() => {
    if (!state) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export default useStorage
