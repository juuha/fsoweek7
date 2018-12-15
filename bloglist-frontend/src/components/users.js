import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class Users extends React.Component {
  render(){
    if (!this.props.users) {
      return null
    }
    return (
      <div>
        <h2>Users</h2>
        <Table striped collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Blogs</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.users.map(user =>
              <Table.Row key={user.id}>
                <Table.Cell> <Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
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