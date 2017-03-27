import React, { PropTypes, Component } from 'react'
// import { get } from 'lodash'
import './slideshow.css'
import Slide from './slide'

class HeroSlider extends Component {
  static propTypes = {
    imageList: PropTypes.array.isRequired,
    activeSlide: PropTypes.number.isRequired,
    imageCount: PropTypes.number.isRequired
  }

  render () {
    const {
      imageList,
      activeSlide,
      imageCount
    } = this.props

    return (
      <div className="hero-slider">
        <Slide img={ imageList[this.shiftActiveSlide(-1)] } prev />
        <Slide img={ imageList[activeSlide] } active />
        <Slide img={ imageList[this.shiftActiveSlide(1)] } next />
      </div>
    )
  }

  shiftActiveSlide = amount => {
    const { imageCount, activeSlide } = this.props
    const nextVal = activeSlide + amount
    return nextVal > imageCount ? 0 : nextVal < 0 ? imageCount - 1 : nextVal
  }
}

export default HeroSlider
