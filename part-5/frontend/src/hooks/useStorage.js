import { useState, useEffect } from 'react'

const useStorage = (key, initialValue = null) => {
  const [state, setState] = useState(() => {
    const jsonData = window.localStorage.getItem(key)
    return jsonData ? JSON.parse(jsonData) : initialValue
  })

  useEffect(() => {
    if (state !== null) {
      window.localStorage.setItem(key, JSON.stringify(state))
    }
  }, [key, state])

  return [state, setState]
}

export default useStorage
