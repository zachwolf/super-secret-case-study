import React, { Children, Component } from 'react'

import { SCREEN_SM, SCREEN_LG } from '../common/styles.js'

class Responsive extends Component {
  componentDidMount () {
    window.addEventListener('resize', this.setWindowWidth)
    this.setWindowWidth()
  }

  componentWillUnmount () {
    window.addEventListener('resize', this.setWindowWidth)
  }

  setWindowWidth = e => {
    this.setState({
      windowWidth: window.innerWidth,
      [SCREEN_SM]: window.matchMedia(SCREEN_SM).matches,
      [SCREEN_LG]: window.matchMedia(SCREEN_LG).matches
    })
  }

  render () {
    return (
      <div>
        {
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              ...this.state
            })
          })
        }
      </div>
    )
  }
}

export default Responsive
