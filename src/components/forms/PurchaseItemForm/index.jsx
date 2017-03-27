import React, { PropTypes, Component } from 'react'
// import { get } from 'lodash'
// import './index.css'

class PurchaseItemForm extends Component {
  static propTypes = {
    // AlternateImages: PropTypes.array.isRequired,
    // PrimaryImage: PropTypes.array.isRequired,
    // imageCount: PropTypes.string.isRequired
  }

  static defaultProps = {
    // AlternateImages: [],
    // PrimaryImage: [],
    // imageCount: 0
  }

  state = {
    quantity: 1
  }

  render () {
    return (
      <div className="purchase-item">
        quantity <br />
        pick up in store <br />
        add to cart <br />
      </div>
    )
  }
}

export default PurchaseItemForm
