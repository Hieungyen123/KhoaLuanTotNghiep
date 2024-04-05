import React, { useState, useContext, useEffect } from 'react'
import styles from './Home.module.scss'
import classNames from "classnames/bind";
import 'react-multi-carousel/lib/styles.css';

import { PiStethoscope } from "react-icons/pi";
// import { PiCertificate } from "react-icons/pi";
import FramerY from '../../components/FramerMotion/FramerY';
import FramerScale from '../../components/FramerMotion/FramerScale';

import { motion } from "framer-motion"
// import Card from '../../components/Card/Card';
// import StarRating from '../../components/StarRating/StarRating';
import SimpleSlider from '../../components/Slider/Slider'
import Card from '../../components/Card/Card';
import UseFetch from '../../hook/useFetch';

import Menu from '../../components/Menu/Menu'

import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MyContext from '../../contexts/MyContext';
import axios from 'axios';

// import refreshAccessToken from '../../components/CheckToken/CheckToken';
import Slider from "react-slick";

import img1 from '../../Slide/Image1.webp'
import img2 from '../../Slide/Image2.webp'
import img3 from '../../Slide/Image3.webp'
import img4 from '../../Slide/Image4.webp'
import img5 from '../../Slide/Image5.webp'
import img6 from '../../Slide/Image6.webp'
const Home = () => {

    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);

    const [brand, setBrand] = useState([])
    const [products, setProducts] = useState([])


    const settingsBrand = {
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
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
    const settings = {
        lazyLoad: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };

    const UseFetchBrand = () => {
        axios.get('/api/customer/brand').then((res) => {
            const result = res.data;
            // console.log(result)
            // console.log(result)
            setBrand(result)
        })
    }
    const FetchProducts = () => {
        axios.get('/api/customer/products/new').then((res) => {
            const result = res.data;
            // console.log(result)
            // console.log(result)
            setProducts(result)
        })
    }
    useEffect(() => {
        FetchProducts()
        UseFetchBrand();
    }, [])

    // console.log(products)
    return (
        <div className={cx("Home")}>
            {/* <section className={cx("Main-Menu")}>
                <Menu />
            </section> */}

            <section className={cx("Main-Banner")}>
                <div className={cx("Slide")}>
                    <Slider {...settings} style={{ borderRadius: '5px' }}>
                        <div >
                            <img src={img1} alt="err" />
                        </div>
                        <div>
                            <img src={img2} alt="err" />
                        </div>
                        <div>
                            <img src={img3} alt="err" />
                        </div>
                        <div>
                            <img src={img4} alt="err" />
                        </div>
                    </Slider>
                </div>
                <div className={cx("Right")}>
                    <div className={cx("Right-image")}>
                        <img src={img5} alt="err" />
                    </div>
                    <div className={cx("Right-content")}>
                        <div className={cx("Right-content-item")}>
                            Cần mua thuốc
                        </div>
                        <div className={cx("Right-content-item")}>
                            Cần mua thuốc
                        </div>
                        <div className={cx("Right-content-item")}>
                            Cần mua thuốc
                        </div>
                    </div>
                </div >
            </section>

            <section className={cx("Brand-Slide")}>

                <div className={cx("Brand-Slide-title")}>
                    <AutoAwesomeOutlinedIcon className={cx("Brand-Slide-title-icon")} />
                    <h3>Thương Hiệu nổi bật</h3>
                </div>
                <div className={cx("Slide")}>
                    <Slider {...settingsBrand} style={{ borderRadius: '5px' }}>
                        {brand.map(item => {
                            return (
                                <div className={cx("Slide-item")} key={item._id} >
                                    <img src={item.image.path} alt="" />
                                    <p>{item.name}</p>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </section>




            <section className={cx("Product")} >
                <div className={cx("Suggest-Product")}>
                    <div className={cx("Title-Product")}>Gợi ý hôm nay</div>
                    <div className={cx("List-Product")}>
                        <div className={cx("List-Product-center")}>
                            {products.map(product => {
                                return <Card product={product} key={product._id} />
                            })}
                        </div>
                    </div>
                </div>
                <div className={cx("Hot-Product")}>
                    <div className={cx("Title-Product")}></div>
                    <div className={cx("List-Product")}></div>
                </div>
            </section>



            <section className={cx("SomeThing")}>

                <div className={cx("List-product")}>
                    {/* <SimpleSlider /> */}
                    {/* <Card />
                     */}


                </div>

            </section>


        </div>
    )
}

export default Home
