import React from 'react'
import ReviewPrivew from './ReviewPreview'

export default function ReviewList(props) {
  return (<React.Fragment>
    <div className="reviews-container container wrap flex space-around">
   
      {props.item.reviews.map(review =>
        <ReviewPrivew key={review.txt} review={review}></ReviewPrivew>
      )}

  </div>
  </React.Fragment>)
}
