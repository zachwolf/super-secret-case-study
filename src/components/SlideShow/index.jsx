import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import { get } from 'lodash'
import Responsive from '../responsive'

// styles
import sharedStyles, { SCREEN_LG, COLOR } from '../common/styles.js'

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
      margin: '0 auto 20px',
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
    display: 'flex',
    color: COLOR.DEVIL_GREY,
    textDecoration: 'none',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ':hover': {
      textDecoration: 'underline'
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
        <div style={ [styles.activeSlide, sharedStyles.shelf.YUGGGE] }>
          <img src={ activeSlideSrc } alt="" onClick={ onClickZoom(activeSlideSrc) } />
        </div>
        <Responsive>
          <this.ZoomLink onClick={ onClickZoom(activeSlideSrc) }/>
        </Responsive>
        <div style={ styles.thumbnail.wrapper }>
          <div style={ styles.thumbnail.nav } >
            <a href="javascript://" onClick={ this.shiftActiveThumbnails(-1) }>
              <img src={ prevIcon } alt="" aria-hidden="true" />
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
              <img src={ nextIcon } alt="" aria-hidden="true" />
              <span style={ sharedStyles.visuallyhidden }>View next thumbnail</span>
            </a>
          </div>
        </div>
      </div>
    )
  }

  ZoomLink = Radium(props => {
    return props[SCREEN_LG] ? (
      <a href="javascript://" onClick={ props.onClick } style={ [styles.zoom, sharedStyles.shelf.sm] } key="zoom-icon">
        <img src={ zoomIcon } aria-hidden="true" alt=""/> <span>view larger</span>
      </a>
    ) : null
  })

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
