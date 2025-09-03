import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return notification.value !== '' ? (
    <div style={style}>{notification.value}</div>
  ) : null
}

export default Notification
