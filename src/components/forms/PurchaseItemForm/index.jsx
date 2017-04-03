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
import Responsive from '../../responsive'
import commonStyles, { COLOR, SCREEN_LG } from '../../common/styles.js'
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
  },
  findInStore: {
    wrapper: {
      position: 'relative'
    },
    button: {
      color: COLOR.TEXT_DARKEST,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 2,
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: 12,
      fontWeight: 'bold',
      ':hover': {
        textDecoration: 'underline'
      }
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
      <div>
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
                <div style={{ width: '49%'}}>
                  <button
                    key="ispuBtn"
                    style={ [commonStyles.button.common, commonStyles.button.secondary, { width: '100%'}] }
                  >
                    Pick up in store
                  </button>
                  <div style={ styles.findInStore.wrapper }>
                    <Responsive>
                      <this.FindInStoreBtn />
                    </Responsive>
                  </div>
                </div>
              ) }
              { includes(['0', '2'], purchasingChannelCode) && (
                <button
                  key="cartBtn"
                  style={ [commonStyles.button.common, commonStyles.button.action, { width: '49%', marginLeft: '2%' }] }
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

  FindInStoreBtn = Radium(props => {
    return props[SCREEN_LG] ? (
      <a href="javascript://" key="find-in-a-store" style={ styles.findInStore.button }>
        find in a store
      </a>
    ) : null
  })

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
