import React, { PropTypes, Component } from 'react'
// import { get } from 'lodash'
// import './index.css'

class Price extends Component {
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

  render () {
    return (
      <div className="price">
        Price!
      </div>
    )
  }
}

export default Price
