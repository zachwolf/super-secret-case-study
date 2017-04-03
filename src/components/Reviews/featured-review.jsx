import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import { get } from 'lodash'
import StarRating from './star-rating.jsx'
import { COLOR } from '../common/styles.js'
/*
<div>
  <div>
    <span>Pro</span>
    <h4>Most helpful 4-5 star review</h4>
  </div>
  <div>
    <StarRating rated={ 5 } static />
    <h5>title</h5>
    <p>
      review snippet
    </p>
    <div>
      <a href="#">Name</a>
      <span>date</span>
    </div>
  </div>
</div>

<div itemprop="review" itemscope itemtype="http://schema.org/Review">
    <span itemprop="name">Not a happy camper</span> -
    by <span itemprop="author">Ellie</span>,
    <meta itemprop="datePublished" content="2011-04-01">April 1, 2011
    <div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
      <meta itemprop="worstRating" content = "1">
      <span itemprop="ratingValue">1</span>/
      <span itemprop="bestRating">5</span>stars
    </div>
    <span itemprop="description">The lamp burned out and now I have to replace
    it. </span>
  </div>

 */

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