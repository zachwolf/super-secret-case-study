import React, { PropTypes, Component } from 'react'
// import { get } from 'lodash'
import './slideshow.css'
import HeroSlider from './heroSlider'

class SlideShow extends Component {
  static propTypes = {
    AlternateImages: PropTypes.array.isRequired,
    PrimaryImage: PropTypes.array.isRequired,
    imageCount: PropTypes.number.isRequired
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
    const {
      AlternateImages,
      PrimaryImage,
      imageCount
    } = this.props

    return (
      <div className="slideshow">
        <HeroSlider
          imageList={ PrimaryImage.concat(AlternateImages) }
          activeSlide={ this.state.activeSlide }
          imageCount={ imageCount }
        />
        <div className="">
          <span>icon</span> view larger
        </div>
        <div className="slideshow__alt-images">
          <div className="slideshow__nav slideshow__nav--prev">
            {"<"}
          </div>
          <ul className="slideshow__thumbnail-list">
            <li className="slideshow__thumbnail">
              img
            </li>
            <li className="slideshow__thumbnail">
              img
            </li>
          </ul>
          <div className="slideshow__nav slideshow__nav--next">
            {">"}
          </div>
        </div>
      </div>
    )
  }
}

export default SlideShow
