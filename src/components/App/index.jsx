// dependencies
import React, { PropTypes, Component } from 'react'
import { get } from 'lodash'

// styles
import Radium, { Style } from 'radium'
import commonStyles, { GLOBAL_STYLES, SCREEN_SM, SCREEN_LG } from '../common/styles.js'
import styles from './styles.js'
import Responsive from '../responsive'

// components
import SlideShow from '../SlideShow'
import Price from '../Price'
import PurchaseItemForm from '../forms/PurchaseItemForm'
import Reviews from '../Reviews'

// private methods
function fetchProduct(id, cb) {
  return fetch(`api/product/${id}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(response => response.json())
    .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(error) // eslint-disable-line no-console
  throw error
}

export class App extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static defaultProps = {
    id: null
  }

  state = {
    isLoading: true
  }

  componentDidMount() {
    fetchProduct(this.props.id, product => {
      this.setState({
        isLoading: false,
        product
      })
    })
  } 

  render () {
    const {
      isLoading,
      product
    } = this.state

    return isLoading ? null : (
      <Responsive>
        <this.Wrapper>
          { this.renderGlobalStyles() }
          <Responsive>
            <this.Chunk>
              <h1 style={ styles.pageTitle }>{ product.title }</h1>
              <SlideShow
                AlternateImages={ get(product, 'Images[0].AlternateImages', []) }
                PrimaryImage={ get(product, 'Images[0].PrimaryImage', []) }
                imageCount={ parseInt(get(product, 'Images[0].imageCount', NaN), 10) }
                onClickZoom={ this.showModal }
              />
            </this.Chunk>
          </Responsive>
          <Responsive>
            <this.Chunk pullRight>
              <Price Offers={ get(product, 'Offers', {}) } />
              { this.renderPromotions() }
              <PurchaseItemForm purchasingChannelCode={ get(product, 'purchasingChannelCode', null) }/>
              <div style={ [styles.returns.wrapper, commonStyles.shelf.sm] }>
                <h3 style={ styles.returns.title }>
                  Returns
                </h3>
                <p style={ styles.returns.body }>
                  This item must be returned within 30 days of the ship date. See <a key="return-policy" style={ styles.returns.link } href="#return-policy">return policy</a> for details. Prices, promotions, styles and availability may vary by store and online.
                </p>
              </div>
              <div style={ [styles.buttonList.wrapper, commonStyles.shelf.tight] }>
                <button
                  key="add-to-registry"
                  style={ styles.buttonList.button.common }
                  onClick={ e => console.log('todo') }
                >
                  Add to registry
                </button>
                <button
                  key="add-to-list"
                  style={ styles.buttonList.button.common }
                  onClick={ e => console.log('todo') }
                >
                  Add to list
                </button>
                <button
                  key="share"
                  style={ [styles.buttonList.button.common, styles.buttonList.button.last] }
                  onClick={ e => console.log('todo') }
                >
                  Share
                </button>
              </div>
              { this.renderHighlights() }
            </this.Chunk>
          </Responsive>
          <Responsive>
            <this.Chunk>
              <Reviews CustomerReview={ get(product, 'CustomerReview[0]', {}) } />
            </this.Chunk>
          </Responsive>
        </this.Wrapper>
      </Responsive>
    )
  }

  Wrapper = Radium(props => {
    const wrapperStyles = []

    if (props[SCREEN_SM]) {
      wrapperStyles.push(styles.layout.wrapper[SCREEN_SM])
    }

    if (props[SCREEN_LG]) {
      wrapperStyles.push(styles.layout.wrapper[SCREEN_LG])
    }

    return (
      <div style={ wrapperStyles }>
        { props.children }
      </div>
    )
  })

  Chunk = Radium(props => {
    const wrapperStyles = []

    if (props[SCREEN_SM]) {
      wrapperStyles.push(commonStyles.shelf.tight)
    }

    if (props[SCREEN_LG]) {
      wrapperStyles.push(styles.layout.chunk[SCREEN_LG])
    }

    if (props.pullRight && props[SCREEN_LG]) {
      wrapperStyles.push(styles.layout.chunkRight[SCREEN_LG])
    }

    return (
      <div style={ wrapperStyles }>
        { props.children }
      </div>
    )
  })

  renderGlobalStyles = () => {
    return (
      <div>
        { GLOBAL_STYLES.map(style => {
          return (
            <Style
              key={ style.selector }
              scopeSelector={ style.selector }
              rules={ style.rules }
            />
          )
        }) }
      </div>
    )
  }

  renderPromotions = () => {
    const { product } = this.state

    return (
      <ul style={ styles.promo.wrapper }>
        { get(product, 'Promotions', []).map((promo, key, arr) => {
          const localStyles = [styles.promo.item.common]

          if (key === arr.length - 1) {
            localStyles.push(styles.promo.item.last)
          }

          return (
            <li key={ promo.promotionIdentifier } style={ localStyles }>
              <span style={ styles.promo.icon } aria-hidden="true"></span>
              { get(promo, 'Description[0].shortDescription', null) }
            </li>
          )
        }) }
      </ul>
    )
  }

  renderHighlights = () => {
    const { product } = this.state

    const highlights = get(product, 'ItemDescription[0].features', [])

    return !highlights.length ? null : (
      <div style={ commonStyles.shelf.md }>
        <h3 style={ [styles.highlights.title, commonStyles.shelf.sm] }>
          Product highlights
        </h3>
        <ul style={ styles.highlights.list }>
          { highlights.map((highlight, key) => {
            return (
              <li
                key={ key }
                dangerouslySetInnerHTML={ { __html: highlight } }
                style={ styles.highlights.item }
              ></li>
            )
          }) }
        </ul>
      </div>
    )
  }

  showModal = url => e => {
    console.log('show modal with image', url);
  }
}

export default Radium(App)
