import React from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends React.Component {
  handleClick = () => (event) => {
    event.preventDefault()
    this.props.logout()
  }

  render(){
    const navBar = {
      border: "solid 2px",
      padding: 5,
      marginBottom: 10,
      borderColor: "pink",
      display: "inline-block"
    }
    if (this.props.user === undefined || this.props.user === null){
      return null
    }
    return(
      <div style={navBar}>
        <NavLink to='/'>Blogs</NavLink>&nbsp;
        <NavLink to='/users'>Users</NavLink>&nbsp;
        <i>{this.props.user.name} logged in</i>
        <input type="button" value="logout" style={{margin: 5}} onClick={this.handleClick()}/>
      </div>
    )
  }
}

export default Navigation