import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import {
  min as _min,
  max as _max, 
  includes
} from 'lodash'

// images
import minusImg from '../../../assets/minus.png'
import plusImg from '../../../assets/plus.png'

// styles
import commonStyles, { COLOR } from '../../common/styles.js'
const styles = {
  quantity: {
    wrapper: {
      border: `1px solid ${COLOR.WHY_ANOTHER_GREY}`,
      display: 'flex',
      borderRadius: 2,
      width: 240
    },
    label: {
      textTransform: 'lowercase',
      order: 1,
      fontSize: 14,
      padding: '12px 69px 12px 10px'
    },
    input: {
      order: 3,
      border: 'transparent',
      fontSize: 18,
      textAlign: 'center',
      width: 22
    },
    button: {
      common: {
        marginTop: 2
      },
      increase: {
        order: 4,
        marginLeft: 7
      },
      decrease: {
        order: 2,
        paddingRight: 5
      },
    }
  },
  fulfillment: {
    wrapper: {
      display: 'flex',
      justifyContent: 'flex-start'
    }
  }
}

class PurchaseItemForm extends Component {
  static propTypes = {
    purchasingChannelCode: PropTypes.oneOf(['0', '1', '2', null]).isRequired,
    min: PropTypes.number,
    max: PropTypes.number
  }

  static defaultProps = {
    min: 1,
    max: 5
  }

  state = {
    quantity: 1
  }

  render () {
    const { min, max, purchasingChannelCode } = this.props

    return (
      <div className="purchase-item">
        <form onSubmit={ () => console.log('todo: form submit') }>
          <fieldset>
            <div style={ [styles.quantity.wrapper, commonStyles.shelf.sm] }>
              <legend style={ styles.quantity.label }>
                Quantity:
              </legend>
              <label style={ commonStyles.visuallyhidden } htmlFor="product-quantity">
                Selected quantity
              </label>
              <input
                ref={ input => { this.input = input } }
                type="number"
                id="product-quantity"
                name="product-quantity"
                aria-type="number"
                max={ max }
                min={ min }
                value={ this.state.quantity }
                style={ styles.quantity.input }
                onFocus={ this.onQuantityFocus }
              />
              <a
                href="javascript://"
                style={ [styles.quantity.button.common, styles.quantity.button.decrease] }
                onClick={ this.shiftQuantity(-1) }
              >
                <img src={ minusImg } aria-hidden="true" />
                <span style={ commonStyles.visuallyhidden }>
                  Decrease quantity
                </span>
              </a>
              <a
                href="javascript://"
                style={ [styles.quantity.button.common, styles.quantity.button.increase] }
                onClick={ this.shiftQuantity(1) }
              >
                <img src={ plusImg } aria-hidden="true" />
                <span style={ commonStyles.visuallyhidden }>
                  Increase quantity
                </span>
              </a>
            </div>
          </fieldset>
          <fieldset>
            <legend style={ commonStyles.visuallyhidden }>
              Fulfillment Options
            </legend>
            <div style={ [styles.fulfillment.wrapper, commonStyles.shelf.sm] }>
              { includes(['0', '1'], purchasingChannelCode) && (
                <div>
                  <button
                    key="ispuBtn"
                    style={ [commonStyles.button.common, commonStyles.button.secondary] }
                  >
                    Pick up in store
                  </button>
                  {/*
                  TODO: desktop only
                  <button>
                    Find in a store
                  </button>*/
                  }
                </div>
              ) }
              { includes(['0', '2'], purchasingChannelCode) && (
                <button
                  key="cartBtn"
                  style={ [commonStyles.button.common, commonStyles.button.action, { marginLeft: 10 }] }
                >
                  Add to cart
                </button>
              ) }
            </div>
          </fieldset>
        </form>
      </div>
    )
  }

  shiftQuantity = amount => e => {
    const currentQuantity = this.state.quantity + amount
    const { min, max } = this.props

    this.setState({
      quantity: _min([_max([currentQuantity, min]), max])
    })
  }

  onQuantityFocus = () => {
    // todo
    // console.log(this.input);
  }
}

export default Radium(PurchaseItemForm)
