import React, { PropTypes, Component } from 'react'
import StarRating from './star-rating.jsx'
// import { get } from 'lodash'
// import './index.css'

class Reviews extends Component {
  static propTypes = {
    CustomerReview: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  state = {
  }

  render () {
    return (
      <div className="reviews">
        {/*todo: schema.org/Rating*/}
        <div>
          <StarRating rated={ 5 } />
          <a href="javascript://" onClick={ e => console.log('todo: view all ratings') }>
            view all 14 reviews
          </a>
        </div>
        <div>
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
          <div>
            <div>
              <span>Con</span>
              <h4>Most helpful 1-2 star review</h4>
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
        </div>
      </div>
    )
  }
}

export default Reviews
