import React, { PropTypes, Component } from 'react'
// import { get } from 'lodash'
// import './index.css'

class SlideShow extends Component {
  static propTypes = {
    AlternateImages: PropTypes.array.isRequired,
    PrimaryImage: PropTypes.array.isRequired,
    imageCount: PropTypes.string.isRequired
  }

  static defaultProps = {
    AlternateImages: [],
    PrimaryImage: [],
    imageCount: 0
  }

  state = {
    activeSlide: 0
  }

  render () {
    return (
      <div className="slideshow">
        slideshow!
      </div>
    )
  }
}

export default SlideShow
