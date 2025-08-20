const Form = ({ newName, newNumber, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td> name:</td>
            <td>
              <input
                required
                name="name"
                type="text"
                value={newName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>number:</td>
            <td>
              <input
                required
                name="number"
                type="tel"
                value={newNumber}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default Form
