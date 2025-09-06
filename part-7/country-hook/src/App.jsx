import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
//Ex: 7.7
const useCountry = (name) => {
  const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/name'
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === '') return
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${name}`)
        setCountry({ ...res.data, isFound: true })
      } catch (error) {
        console.log(error)
        setCountry({ isFound: false })
      }
    }
    fetchCountries()
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  if (!country.isFound) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img
        src={country.flags.png}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
