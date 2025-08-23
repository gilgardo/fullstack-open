const handleChangeForm = (setFormData) => {
  return ({ target }) =>
    setFormData((prevData) => ({ ...prevData, [target.name]: target.value }))
}
export default handleChangeForm
