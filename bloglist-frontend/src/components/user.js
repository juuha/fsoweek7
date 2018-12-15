import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class User extends React.Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  }
  render() {

    const { user } = this.props
    if (user === null || user === undefined) return null
    if (user.blogs.length === 0) {
      return (
        <div>
          <h2>{user.username}</h2>
          <h3>No added blogs</h3>
        </div>
      )
    }
    return (
      <div>
        <h2>{user.username}</h2>

        <h3>Added Blogs</h3>
        <ul>
          {}
          {user.blogs.map(blog =>
            <li key={blog._id}>
              {blog.title}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, { userId }) => {
  if (state.users === null) {
    return { user: null }
  }
  return { user: state.users.find(user => user.id === userId) }
}



export default connect(
  mapStateToProps,
  null
)(User)