import { useState } from 'react'

export const useField = (name, type, label = name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    inputProp: {
      name,
      type,
      value,
      onChange,
    },
    label,
    reset: () => setValue(''),
  }
}
