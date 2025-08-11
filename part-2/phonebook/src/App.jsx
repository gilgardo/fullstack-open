import { useState } from "react";

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      filter shown with :{" "}
      <input name="filter" value={filter} onChange={handleChange} />
    </div>
  );
};

const Form = ({ newName, newNumber, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td> name:</td>
            <td>
              <input name="name" value={newName} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td>
              <input name="number" value={newNumber} onChange={handleChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filteredPersons = persons.filter((person) => {
    const regEx = new RegExp(`^${filter.trim()}`, "i");
    const nameParts = person.name.split(" ");
    return nameParts.some((part) => regEx.test(part));
  });

  const handleChange = (e) => {
    const name = e.target.name;
    switch (name) {
      case "name":
        setNewName(e.target.value);
        break;
      case "number":
        setNewNumber(e.target.value);
        break;
      case "filter":
        setFilter(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isOnThePhonebook = persons.some((person) => person.name === newName);
    if (isOnThePhonebook) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons((prev) => [
      ...prev,
      { name: newName, number: newNumber, id: prev.length + 1 },
    ]);
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
