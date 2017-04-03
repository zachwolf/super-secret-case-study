import React, { PropTypes, Component } from 'react'
import Radium from 'radium'
import { get } from 'lodash'
import StarRating from './star-rating.jsx'
import FeaturedReview from './featured-review.jsx'
import commonStyles, { COLOR } from '../common/styles.js'

const styles = {
  wrapper: {},
  header: {
    wrapper: {
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    overall: {
      display: 'flex'
    },
    overallText: {
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 8,
      marginTop: 10
    },
    viewAll: {
      color: COLOR.TEXT_DARKEST,
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 14,
      cursor: 'pointer',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline'
      }
    }
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
    CustomerReview: PropTypes.object.isRequired
  }

  render () {
    const { CustomerReview } = this.props

    return (
      <div style={ styles.wrapper }>
        <div style={ [styles.header.wrapper, commonStyles.shelf.tight] }>
          <div style={ styles.header.overall }>
            <StarRating rated={ CustomerReview.consolidatedOverallRating } />
            <span style={ styles.header.overallText }>overall</span>
          </div>
          <a href="javascript://" style={ styles.header.viewAll } key="view-all">
            view all { CustomerReview.totalReviews } reviews
          </a>
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
