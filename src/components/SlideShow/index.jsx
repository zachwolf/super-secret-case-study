import React, { PropTypes, Component } from 'react'
import Radium, { StyleRoot } from 'radium'
import { get, includes } from 'lodash'

// styles
import sharedStyles, { SCREEN_SM, COLOR } from '../common/styles.js'

// images
import zoomIcon from '../../assets/zoom.png'
import prevIcon from '../../assets/arrow-prev.png'
import nextIcon from '../../assets/arrow-next.png'

const styles = {
  activeSlide: {
    display: 'flex',
    justifyContent: 'center'
  },
  thumbnail: {
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '110px auto 20px',
      alignItems: 'center',
      width: 286
    },
    list: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'space-between',
      padding: '0 30px'
    },
    image: {
      base: {
        maxHeight: 60,
        width: 60,
      },
      active: {
        border: `1px solid ${COLOR.CHARCOAL}`,
        borderRadius: 2,
        overflow: 'hidden'
      }
    },
    nav: {
      flexGrow: 0
    }
  },
  zoom: {
    wrapper: {
      display: 'block',
      [SCREEN_SM]: {
        display: 'none'
      }
    }
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
      <div>
        <div style={ styles.activeSlide }>
          <img src={ activeSlideSrc } alt="" onClick={ onClickZoom(activeSlideSrc) } />
        </div>
        <StyleRoot style={ styles.zoom.wrapper }>
          <a href="javascript://" onClick={ onClickZoom(activeSlideSrc) }>
            <img src={ zoomIcon } aria-hidden="true"/> view larger
          </a>
        </StyleRoot>
        <div style={ styles.thumbnail.wrapper }>
          <div style={ styles.thumbnail.nav } >
            <a href="javascript://" onClick={ this.shiftActiveThumbnails(-1) }>
              <img src={ prevIcon } aria-hidden="true" />
              <span style={ sharedStyles.visuallyhidden }>View previous thumbnail</span>
            </a>
          </div>
          <ul style={ styles.thumbnail.list }>
            { activeThumbnailImgs.map(([index, thumbnail]) => {
              const localStyles = [styles.thumbnail.image.base]

              if (thumbnail === activeSlideSrc) {
                localStyles.push(styles.thumbnail.image.active)
              }

              return (
                <li key={ thumbnail }>
                  <a href="javascript://" onClick={ this.setActiveSlide(index) }>
                    <img src={ thumbnail } alt="" style={ localStyles } />
                  </a>
                </li>
              )
            })}
          </ul>
          <div style={ styles.thumbnail.nav } >
            <a href="javascript://" onClick={ this.shiftActiveThumbnails(1) }>
              <img src={ nextIcon } aria-hidden="true" />
              <span style={ sharedStyles.visuallyhidden }>View next thumbnail</span>
            </a>
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
