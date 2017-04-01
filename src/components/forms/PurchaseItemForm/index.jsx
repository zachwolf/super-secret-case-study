import React, { PropTypes, Component } from 'react'
// import { get } from 'lodash'

class PurchaseItemForm extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  state = {
    quantity: 1
  }

  render () {
    return (
      <div className="purchase-item">
        <form onSubmit={ () => console.log('todo: form submit') }>
          <fieldset>
            <legend>
              Quantity
            </legend>
            <label>
              Selected quantity
            </label>
            <input type="number"/>
            <button>
              Increase quantity
            </button>
            <button>
              Decrease quantity
            </button>
          </fieldset>
          <fieldset>
            <legend>
              Fulfillment Options
            </legend>
            <div>
              <button> // purchasingChannelCode === 0 || 1 => add to cart
                Pick up in store
              </button>
              <button>
                Find in a store
              </button>
            </div>
            <button>// purchasingChannelCode === 0 || 2 => in store pickup
              Add to cart
            </button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default PurchaseItemForm
