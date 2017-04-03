import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { get } from 'lodash'
import StarRating from './star-rating.jsx'
import { COLOR } from '../common/styles.js'

const MONTH_LIST = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const styles = {
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
    marginBottom: 5
  },
  review: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 10
  },
  meta: {
    fontSize: 12
  },
  name: {
    textDecoration: 'none',
    color: COLOR.LINK_BLUE,
    ':hover': {
      textDecoration: 'underline'
    }
  }
}

class FeaturedReview extends Component {
  static propTypes = {
    datePosted: PropTypes.string,
    overallRating: PropTypes.string,
    review: PropTypes.string,
    screenName: PropTypes.string,
    title: PropTypes.string
  }

  render () {
    const {
      overallRating,
      title,
      review,
      screenName,
      datePosted,
      style
    } = this.props

    const asDate = new Date(datePosted)
    const YYYY_MM_DD = `${asDate.getFullYear()}-${asDate.getMonth()}-${asDate.getDate()}`
    const prettyDate = `${get(MONTH_LIST, asDate.getMonth(), '')} ${asDate.getDate()}, ${asDate.getFullYear()}`

    return (
      <div itemProp="review" itemScope itemType="http://schema.org/Review" style={ style }>
        <div>
          { this.props.children }
        </div>
        <div>
          <StarRating rated={ overallRating } small />
          <h5 itemProp="name" style={ styles.header }>{ title }</h5>
          <p itemProp="description" style={ styles.review }>
            { review }
          </p>
          <div style={ styles.meta }>
            <a key="name" style={ styles.name } itemProp="author">{ screenName }</a>{' '}
            <span itemProp="datePublished" content={ YYYY_MM_DD }>{ prettyDate }</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(FeaturedReview)
