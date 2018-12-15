import React from 'react'

const Notification = ({ error, message }) => {
  if (message !== null) {
    return (
      <div className="message">
        {message}
      </div>
    )
  } else if (error !== null) {
    return (
      <div className="error">
        {error}
      </div>
    )
  }
  return null
}

export default Notification