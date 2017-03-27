import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
// import { get } from 'lodash'
// import './slideshow.css'

class Slide extends Component {
  static propTypes = {
    img: PropTypes.object.isRequired,
    prev: PropTypes.bool,
    active: PropTypes.bool,
    next: PropTypes.bool
  }

  render () {
    const {
      img,
      prev,
      active,
      next
    } = this.props

    const slideClassName = classnames('slide', {
      'slide--prev': prev,
      'slide--active': active,
      'slide--next': next
    })

    return (
      <div className={ slideClassName }>
        <img src={ img.image } alt="" className="slide__img" />
      </div>
    )
  }
}

export default Slide
