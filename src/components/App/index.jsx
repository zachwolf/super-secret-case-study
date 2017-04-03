// dependencies
import React, { PropTypes, Component } from 'react'
import { get } from 'lodash'


// styles
import Radium, { StyleRoot, Style } from 'radium'
import commonStyles, { GLOBAL_STYLES, SCREEN_SM, COLOR } from '../common/styles.js'
import styles from './styles.js'

// components
import SlideShow from '../SlideShow'
import Price from '../Price'
import PurchaseItemForm from '../forms/PurchaseItemForm'
import Reviews from '../Reviews'



/*

<div itemscope itemtype="http://schema.org/Product">
  <span itemprop="name">Kenmore White 17" Microwave</span>
  <img itemprop="image" src="kenmore-microwave-17in.jpg" alt='Kenmore 17" Microwave' />
  <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
    <!--price is 1000, a number, with locale-specific thousands separator
    and decimal mark, and the $ character is marked up with the
    machine-readable code "USD" -->
    <span itemprop="priceCurrency" content="USD">$</span><span
          itemprop="price" content="1000.00">1,000.00</span>
    <link itemprop="availability" href="http://schema.org/InStock" />In stock
  </div>
  Product description:
  <span itemprop="description">0.7 cubic feet countertop microwave.
  Has six preset cooking categories and convenience features like
  Add-A-Minute and Child Lock.</span>
  Customer reviews:
  
  <div itemprop="review" itemscope itemtype="http://schema.org/Review">
    <span itemprop="name">Value purchase</span> -
    by <span itemprop="author">Lucas</span>,
    <meta itemprop="datePublished" content="2011-03-25">March 25, 2011
    <div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
      <meta itemprop="worstRating" content = "1"/>
      <span itemprop="ratingValue">4</span>/
      <span itemprop="bestRating">5</span>stars
    </div>
    <span itemprop="description">Great microwave for the price. It is small and
    fits in my apartment.</span>
  </div>
</div>


 */



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

class App extends Component {
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
      <StyleRoot className="app" style={ {
        [SCREEN_SM]: {
          padding: '0 20px',
          margin: '60px auto',
          maxWidth: '480px'
        }
      } }>
        { this.renderGlobalStyles() }
        <div className="app__chunk">
          <h1 style={ styles.pageTitle }>{ product.title }</h1>
          <SlideShow
            AlternateImages={ get(product, 'Images[0].AlternateImages', []) }
            PrimaryImage={ get(product, 'Images[0].PrimaryImage', []) }
            imageCount={ parseInt(get(product, 'Images[0].imageCount', NaN), 10) }
            onClickZoom={ this.showModal }
          />
        </div>
        <div className="app__chunk app__chunk--pull-right">
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
        </div>
        <div className="app__chunk">
          <Reviews CustomerReview={ get(product, 'CustomerReview[0]', {}) } />
        </div>
      </StyleRoot>
    )
  }

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
