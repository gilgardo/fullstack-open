const Persons = ({ persons, handleDelete }) => {
  const handleConfirm = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    handleDelete(id, name);
  };
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
              <button onClick={() => handleConfirm(person.id, person.name)}>
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Persons;
