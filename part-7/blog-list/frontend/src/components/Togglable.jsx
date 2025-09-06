import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <>
      {isVisible ? (
        <>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </>
      ) : (
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      )}
    </>
  )
})
Togglable.displayName = 'Togglable'
export default Togglable
