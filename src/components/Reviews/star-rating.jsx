import React from 'react'
import Radium from 'radium'
import commonStyles from '../common/styles.js'

import starGrey from '../../assets/star-grey.png'
import starRed from '../../assets/star-red.png'

/*
<div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating">
      <meta itemprop="worstRating" content = "1">
      <span itemprop="ratingValue">1</span>/
      <span itemprop="bestRating">5</span>stars
    </div>

 */

const styles = {
  star: {
    small: {
      width: 14
    }
  }
}

const INDEXES = [1, 2, 3, 4, 5]

export default Radium(function StarComponent (props) {
  const parsedRated = parseInt(props.rated, 10)
  const starClasses = props.small ? [ styles.star.small] : []

  return (
    <div itemProp="reviewRating" itemScope itemType="http://schema.org/Rating">
      <div aria-hidden="true">
        { INDEXES.map(index => {
          console.log(parsedRated);
          const selectedImg = index <= parsedRated ? starRed : starGrey
          return (
            <img key={ index } src={ selectedImg } alt="" style={ starClasses } />
          )
        }) }
      </div>
      <div style={ commonStyles.visuallyhidden }>
        <meta itemProp="worstRating" content="1" />
        <span itemProp="ratingValue">1</span>/
        <span itemProp="bestRating">5</span>stars
      </div>
    </div>
  )
})
    {/*<fieldset>*/}
      {/*<legend>Please rate:</legend>*/}
      {/*<input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="Rocks!">5 stars</label>
            <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="Pretty good">4 stars</label>
            <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="Meh">3 stars</label>
            <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="Kinda bad">2 stars</label>
            <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="Sucks big time">1 star</label>*/}
    {/*</fieldset>*/}
