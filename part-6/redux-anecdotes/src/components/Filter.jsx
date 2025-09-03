import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
// Ex 6.9
const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(filterChange(e.target.value))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter
