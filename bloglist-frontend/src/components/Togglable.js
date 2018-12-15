import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  static propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }


  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button inverted color='green' onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible} className='buttons' >
          <div>
            {this.props.children}
          </div>
          <div>
            <Button inverted color='orange' onClick={this.toggleVisibility}>cancel</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Togglable