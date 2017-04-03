import React from 'react'
import Radium from 'radium'
import commonStyles from '../common/styles.js'

import starGrey from '../../assets/star-grey.png'
import starRed from '../../assets/star-red.png'

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
