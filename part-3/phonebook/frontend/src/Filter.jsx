const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      filter shown with :{' '}
      <input name="filter" type="text" value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter
