import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Users extends React.Component {
  render(){
    if (!this.props.users) {
      return null
    }
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user =>
              <tr key={user.id}>
                <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  null
)(Users)