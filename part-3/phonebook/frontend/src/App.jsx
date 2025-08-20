import { useEffect, useState } from 'react'
import personsService from './services/personsService'
import Form from './Form'
import Filter from './Filter'
import Persons from './Persons'
import Message from './Message'

const setMessage = (setter, message, clearOtherSetter) => {
  setter(message)
  if (clearOtherSetter) clearOtherSetter(null)
  setTimeout(() => setter(null), 5000)
}

const getErrorMessage = (error, fallback) => {
  return error?.response?.data.message ?? fallback
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(setPersons)
      .catch((err) => {
        console.error(err)
        setMessage(
          setErrorMessage,
          'Failed to load the contacts',
          setSuccessMessage
        )
        setPersons([])
      })
  }, [])

  const filteredPersons = persons.filter((person) => {
    const regEx = new RegExp(`^${filter.trim()}`, 'i')
    return person.name.split(' ').some((part) => regEx.test(part))
  })

  const handleChange = (e) => {
    const handlers = {
      name: setNewName,
      number: setNewNumber,
      filter: setFilter,
    }

    handlers[e.target.name]?.(e.target.value)
  }

  const handleDelete = async (id, name) => {
    try {
      await personsService.deletePerson(id)
      setMessage(
        setSuccessMessage,
        `${name} deleted successfully`,
        setErrorMessage
      )
    } catch (err) {
      console.error(err)
      setMessage(
        setErrorMessage,
        `${name} was already deleted from the server`,
        setSuccessMessage
      )
    }
    setPersons((prev) => prev.filter((person) => person.id !== id))
  }

  const savePerson = async (person, isUpdate) => {
    const saved = isUpdate
      ? await personsService.update(person.id, { number: person.number })
      : await personsService.create(person)
    console.log(saved)
    setPersons((prev) =>
      isUpdate
        ? prev.map((person) => (person.id === saved.id ? saved : person))
        : [...prev, saved]
    )

    setMessage(
      setSuccessMessage,
      `${saved.name} ${isUpdate ? 'updated' : 'added'} successfully`,
      setErrorMessage
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const oldPerson = persons.find((p) => p.name === newName)

    try {
      if (oldPerson) {
        const confirmed = window.confirm(
          `${oldPerson.name} is already added to the phonebook, replace the old number?`
        )
        if (!confirmed) return
        await savePerson({ ...oldPerson, number: newNumber }, true)
      } else {
        await savePerson({ name: newName, number: newNumber }, false)
      }
      setNewName('')
      setNewNumber('')
    } catch (error) {
      console.error(error)
      setMessage(
        setErrorMessage,
        getErrorMessage(
          error,
          'Something went wrong while saving the contact.'
        ),
        setSuccessMessage
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={errorMessage} className="error" />
      <Message message={successMessage} className="success" />
      <Filter filter={filter} handleChange={handleChange} />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
