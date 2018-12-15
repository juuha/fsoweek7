import React from 'react'
import { connect } from 'react-redux'

class Notification extends React.Component {
  render() {
    const message = this.props.notification.message
    const error = this.props.notification.error
    const className = message ? (error ? 'error' : 'message') : 'none'
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}


export default connect(
  mapStateToProps,
  null
)(Notification)