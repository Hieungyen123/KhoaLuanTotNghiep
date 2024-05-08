import React, { Component } from "react";
import Slider from "react-slick";
import Card from '../Card/Card'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';



function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", fontSize: '20px' }}
            onClick={onClick}>
            <NavigateNextOutlinedIcon />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", fontSize: '20px', rotate: '180deg' }}
            onClick={onClick}>
            <NavigateNextOutlinedIcon />
        </div>
    );
}
// , top: '40%', right: '-30px' 


export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
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
        return (
            <div className="slider-Card">
                <Slider {...settings}>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </Slider>
            </div>
        );
    }
}