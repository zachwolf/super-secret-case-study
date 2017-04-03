import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import { get } from 'lodash'
import StarRating from './star-rating.jsx'
import FeaturedReview from './featured-review.jsx'
import commonStyles, { COLOR } from '../common/styles.js'
/*

<div itemprop="aggregateRating"
    itemscope itemtype="http://schema.org/AggregateRating">
   Rated <span itemprop="ratingValue">3.5</span>/5
   based on <span itemprop="reviewCount">11</span> customer reviews
  </div>
*/
/*todo: schema.org/Rating*/
        /*<div>
                  <div
                    itemprop="aggregateRating"
                    itemscope itemtype="http://schema.org/AggregateRating"
                  >
                    Rated <span itemprop="ratingValue">3.5</span>/5
                    based on <span itemprop="reviewCount">11</span> customer reviews
                  </div>
                  <StarRating rated={ 5 } />
                  <a href="javascript://" onClick={ e => console.log('todo: view all ratings') }>
                    view all 14 reviews
                  </a>
                </div>*/

const styles = {
  wrapper: {},
  header: {
    wrapper: {
      display: 'flex'
    },
    overall: {
      display: 'flex'
    },

  },
  featured: {
    wrapper: {
      background: COLOR.LIGHTER_UNSATURATED_SALMON,
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px 20px'
    },
    chunk: {
      width: 190
    },
    header: {
      borderBottom: `1px solid ${COLOR.ASH}`,
      paddingBottom: 15,
      marginBottom: 15
    },
    headerText: {
      textTransform: 'uppercase'
    },
    subheader: {
      fontSize: 12,
      marginTop: 5
    }
  }
}

class Reviews extends Component {
  static propTypes = {
    CustomerReview: PropTypes.object.isRequired,
  }

  render () {
    const { CustomerReview } = this.props

    const {
      totalReviews,
      Con,
      Pro,
      consolidatedOverallRating
    } = this.props.CustomerReview

    return (
      <div style={ styles.wrapper }>
        <div style={ [styles.header.wrapper, commonStyles.shelf.tight] }>
          <div style={ styles.header.overall }>
            <StarRating rated={ consolidatedOverallRating } />
            <span>overall</span>
          </div>
          <div>
            <a href="javascript://">
              view all { totalReviews } reviews
            </a>
          </div>
        </div>
        <div style={ styles.featured.wrapper }>
          <FeaturedReview
            style={ styles.featured.chunk }
            { ...get(CustomerReview, 'Pro[0]', {})}
          >
            <div style={ styles.featured.header }>
              <span style={ styles.featured.headerText }>Pro</span>
              <h4 style={ styles.featured.subheader }>most helpful 4-5 star review</h4>
            </div>
          </FeaturedReview>
          <FeaturedReview
            style={ styles.featured.chunk }
            { ...get(CustomerReview, 'Con[0]', {})}
          >
            <div style={ styles.featured.header }>
              <span style={ styles.featured.headerText }>Con</span>
              <h4 style={ styles.featured.subheader }>most helpful 1-2 star review</h4>
            </div>
          </FeaturedReview>
        </div>
      </div>
    )
  }
}

export default Radium(Reviews)
