import React, { PropTypes, Component } from 'react'
import { get } from 'lodash'

class Price extends Component {
  static propTypes = {
    Offers: PropTypes.array.isRequired
  }

  static defaultProps = {}

  render () {
    const { Offers } = this.props
    const firstPriceBlock = get(Offers, '[0].OfferPrice[0]', {})

    return (
      <div className="price">
        { get(firstPriceBlock, 'formattedPriceValue', null) }
        <span className="qualifier">
          { get(firstPriceBlock, 'priceQualifier', null) }
        </span>
      </div>
    )
  }
}

export default Price
