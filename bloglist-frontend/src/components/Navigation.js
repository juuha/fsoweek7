import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'

class Navigation extends React.Component{
  static propTypes = {
    logout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  handleLogoutClick = () => (event) => {
    event.preventDefault()
    this.props.logout()
  }

  render(){
    if (this.props.user === undefined || this.props.user === null){
      return null
    }
    return(
      <div>
        <Menu tabular>
          <Menu.Item
            name='Blogs'
            as={ NavLink }
            exact to='/'
          />
          <Menu.Item
            name='Users'
            as={ NavLink }
            exact to='/users'
          />
          <Menu.Item
            name={`${this.props.user.name} logged in`}
          />
          <Menu.Item>
            <Button inverted color='red' onClick={this.handleLogoutClick()}>Logout</Button>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Navigation