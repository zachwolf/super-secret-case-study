import React, { Component, PropTypes } from 'react'
import Radium from 'radium'
import StarRating from './star-rating.jsx'

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

    return (
      <div itemprop="review" itemscope itemtype="http://schema.org/Review" style={ style }>
        <div>
          { this.props.children }
        </div>
        <div>
          <StarRating rated={ overallRating } static />
          <h5 itemprop="name">{ title }</h5>
          <p itemprop="description">
            { review }
          </p>
          <div>
            <span itemprop="author">{ screenName }</span>
            <span itemprop="datePublished" content="2011-04-01">{ datePosted }</span> {/*todo: date formatting*/}
          </div>
        </div>
      </div>
    )
  }
}

export default Radium(FeaturedReview)