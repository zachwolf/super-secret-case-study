// dependencies
import React, { PropTypes, Component } from 'react'
import { get } from 'lodash'

// styles
import './index.css'

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

    console.log(this.state);

    return isLoading ? null : (
      <div className="app">
        <div className="app__chunk">
          <h1>{ product.title }</h1>
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
          <PurchaseItemForm />
          <div className="returns">
            returns <br />
            This item must be returned within 30 days of the ship date. See return policy for details. Prices, promotions, styles and availability may vary by store and online.
          </div>
          <button>add to registry</button>
          <button>add to list</button>
          <button>share</button><br />
          { this.renderHighlights() }
        </div>
        <div className="app__chunk">
          <Reviews />
        </div>
      </div>
    )
  }

  renderPromotions = () => {
    const { product } = this.state

    return (
      <ul>
        { get(product, 'Promotions', []).map(promo => {
          return (
            <li key={ promo.promotionIdentifier }>
              { get(promo, 'Description[0].shortDescription', null) }
            </li>
          )
        }) }
      </ul>
    )
  }

  renderHighlights = () => {
    return (
      <div>
        highlights
      </div>
    )
  }

  showModal = url => e => {
    console.log('show modal with image', url);
  }
}

export default App
