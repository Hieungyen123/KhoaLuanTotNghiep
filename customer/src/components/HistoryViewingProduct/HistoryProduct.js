import React from 'react'
import MyContext from '../../contexts/MyContext';
import styles from './HistoryProduct.module.scss'
import classNames from "classnames/bind";
import CardSmall from '../Card/CardSmall';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Slider from "react-slick";

const HistoryProduct = () => {


    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const cx = classNames.bind(styles)
    var savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];

    return (
        <div className={cx("History-Product")} >
            <h3 className={cx("History-Product-title")}><ImageSearchIcon />Lịch sử xem sản phẩm của bạn</h3>
            <div className={cx("History-Product-List")} >
                <Slider {...settings} style={{ borderRadius: '5px' }}>
                    {savedProducts.length > 0 && savedProducts.map(product => {
                        return (<CardSmall key={product._id} button={true} product={product} />)
                    })}
                </Slider>

            </div>

        </div>
    )
}

export default HistoryProduct
