import React from 'react'

export default function ReviewRating({amount,rate}) {
   
    
    return (
            (rate) ?
                (<div className="average-rating flex inList">
                    <div className="item-star star-ratings-css">
            <div className="star-ratings-css-top" style={{ width: `${rate || ""}%` }}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                        <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>

                    </div>
                {/* {amount&& <span className="num-of-rates">({amount})</span>} */}
                </div>) : ''
     
    )
}
