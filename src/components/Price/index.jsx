import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
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
      <p>
        <span style={ {
          fontWeight: 'bold',
          fontSize: 28
        } }>
          { get(firstPriceBlock, 'formattedPriceValue', null) }
        </span>
        <span style={ {
          textTransform: 'lowercase',
          fontSize: 12,
          marginLeft: 4
        } }>
          { get(firstPriceBlock, 'priceQualifier', null) }
        </span>
      </p>
    )
  }
}

export default Radium(Price)
