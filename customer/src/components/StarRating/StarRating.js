import React, { useEffect, useState } from 'react'
import styles from './StarRating.module.scss'
import classNames from "classnames/bind";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import axios from 'axios';

const StarRating = ({ UseFetchRating, customerID, productID, toggleModal }) => {
    const cx = classNames.bind(styles)
    const [rating, setRating] = useState(5)
    const [hover, setHover] = useState(null)
    const [text, setText] = useState('null')

    // console.log(rating)
    // console.log(customerID, productID)

    const sendRating = () => {
        axios.post('/api/customer/rating', { customerID: customerID, productID: productID, ratingValue: rating }).then((res) => {
            const result = res.data;
            toggleModal();
            UseFetchRating();
        })
    }

    useEffect(() => {

        switch (rating) {
            case 1:
                setText('Thất vọng')
                break;
            case 2:
                setText('Không hài lòng')
                break;
            case 3:
                setText('Bình thường')
                break;
            case 4:
                setText('Hài lòng')
                break;
            case 5:
                setText('Tuyệt vời')
                break;
            default:
                setText('Tuyệt vời')
                break;
        }



    }, [rating])
    return (
        <div className={cx("StarRating")}>
            <div>
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
                            <StarRateRoundedIcon className={cx("IconStar")} style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)} />
                        </label>
                    )
                })}
            </div>
            <span>{text}</span>
            <div className={cx('button-send')} onClick={sendRating} >
                <button>Gửi</button>
            </div>
        </div>
    )
}

export default StarRating
