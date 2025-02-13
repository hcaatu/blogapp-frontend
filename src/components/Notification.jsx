import PropTypes from 'prop-types'

const Notification = ({ content }) => {
  if (content === null) {
    return null
  }
  return (
    <div className="notification">
      {content}
    </div>
  )
}

Notification.propTypes = {
  content: PropTypes.string.isRequired
}

export default Notification