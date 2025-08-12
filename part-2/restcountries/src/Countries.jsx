const Countries = ({ countries, handleShow }) => {
  return (
    <table>
      <tbody>
        {countries.map((country) => (
          <tr key={country.name.common}>
            <td>{country.name.common}</td>
            <td>
              <button onClick={() => handleShow(country.name.common)}>
                show
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Countries;
