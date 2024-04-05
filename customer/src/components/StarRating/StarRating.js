import React, { useState } from 'react'
import styles from './StarRating.module.scss'
import classNames from "classnames/bind";
import StarIcon from '@mui/icons-material/Star';
const StarRating = () => {
    const cx = classNames.bind(styles)
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    console.log(rating)
    return (
        <div className={cx("StarRating")}>

            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1
                return (
                    <label key={ratingValue}>
                        <input
                            type="radio"
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}


                        />
                        <StarIcon className={cx("IconStar")} style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)} />
                    </label>
                )
            })}
            <span>Your rating is : {rating}</span>
        </div>
    )
}

export default StarRating
