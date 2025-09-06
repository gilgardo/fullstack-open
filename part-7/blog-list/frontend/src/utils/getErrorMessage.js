const getErrorMessage = (error, fallback) => {
  return error?.response?.data.error ?? fallback
}
export default getErrorMessage
