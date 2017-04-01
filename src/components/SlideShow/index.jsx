import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import { get, includes } from 'lodash'

import zoomIcon from '../../assets/zoom.png'
import prevIcon from '../../assets/arrow-prev.png'
import nextIcon from '../../assets/arrow-next.png'

const styles = {
  thumbnails: {
    display: 'flex'
  },
  thumbnailsList: {
    display: 'flex'
  },
  thumbnail: {
    height: 40,
    width: 40
  }
}

class SlideShow extends Component {
  static propTypes = {
    AlternateImages: PropTypes.array.isRequired,
    PrimaryImage: PropTypes.array.isRequired,
    imageCount: PropTypes.number.isRequired,
    onClickZoom: PropTypes.func.isRequired
  }

  static defaultProps = {
    AlternateImages: [],
    PrimaryImage: [],
    imageCount: 0
  }

  state = {
    activeSlide: 0,
    activeThumbnails: [0, 1, 2]
  }

  render () {
    const {
      AlternateImages,
      PrimaryImage,
      onClickZoom
    } = this.props

    const {
      activeThumbnails
    } = this.state

    const allSlides = PrimaryImage.concat(AlternateImages)
    const activeSlideSrc = get(allSlides, [this.state.activeSlide, 'image'], '')

    const activeThumbnailImgs = activeThumbnails.map(index => [ index, get(allSlides, [index, 'image'], '') ])

    return (
      <div className="slideshow">
        <div>
          <img src={ activeSlideSrc } alt="" onClick={ onClickZoom(activeSlideSrc) } />
        </div>
        <div className="" onClick={ onClickZoom(activeSlideSrc) }>
          <span><img src={ zoomIcon } /></span> view larger
        </div>
        <div className="slideshow__alt-images" style={ [ styles.thumbnails ] }>
          <div className="slideshow__nav slideshow__nav--prev" onClick={ this.shiftActiveThumbnails(-1) }>
            <img src={ prevIcon } />
          </div>
          <ul className="slideshow__thumbnail-list" style={ [ styles.thumbnailsList ] }>
            { activeThumbnailImgs.map(([index, thumbnail]) => {
              return (
                <li key={ thumbnail }>
                  <a href="javascript://" onClick={ this.setActiveSlide(index) }>
                    <img src={ thumbnail } alt="" style={ [ styles.thumbnail ] } />
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="slideshow__nav slideshow__nav--next" onClick={ this.shiftActiveThumbnails(1) }>
            <img src={ nextIcon } />
          </div>
        </div>
      </div>
    )
  }

  shiftActiveThumbnails = shiftVal => e => {
    const { imageCount } = this.props

    const next = this.state.activeThumbnails.map(index => {
      const rawNextVal = index + shiftVal
      return rawNextVal > imageCount - 1 ? 0 : rawNextVal < 0 ? imageCount - 1 : rawNextVal
    })

    this.setState({
      activeThumbnails: next
    })
  }


  setActiveSlide = index => e => {
    this.setState({
      activeSlide: index
    })
  }
}

export default Radium(SlideShow)
