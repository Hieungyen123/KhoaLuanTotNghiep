import React, { useState, useContext, useEffect } from 'react'
import styles from './Home.module.scss'
import classNames from "classnames/bind";
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

// import Card from '../../components/Card/Card';
// import StarRating from '../../components/StarRating/StarRating';
import SimpleSlider from '../../components/Slider/Slider'
import Card from '../../components/Card/Card';


import CircularProgress from '@mui/material/CircularProgress';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ThermostatOutlinedIcon from '@mui/icons-material/ThermostatOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { Modal } from '@mui/material';

import imgUser from '../../IMG/User-img.svg'
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
import img7 from '../../Slide/Image7.webp'
const Home = () => {

    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);

    const [brand, setBrand] = useState([])
    const [products, setProducts] = useState([])
    const [hotProducts, setHotProducts] = useState([])
    const [open, setOpen] = useState(true)
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [blogs, setBlogs] = useState([])


    // console.log('hotProducts', hotProducts)

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
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const settingsBlogs = {
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
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
        // lazyLoad: true,
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
            setBrand(result)
        })
    }
    const FetchProductsHot = () => {
        axios.get('/api/customer/products/hot10').then((res) => {
            const result = res.data;
            // console.log(result)
            // console.log('result', result)
            setOpen(false)
            setHotProducts(result)
        })
    }
    const FetchBlogs = () => {
        axios.get('/api/customer/blog').then((res) => {
            const result = res.data;
            // console.log(result)
            // console.log(result)
            setOpen(false)
            setBlogs(result)
        })
    }
    const FetchProducts = () => {
        axios.get('/api/customer/products').then((res) => {
            const result = res.data;
            // console.log(result)
            // console.log(result)
            setOpen(false)
            setProducts(result)
        })
    }
    useEffect(() => {
        try {
            FetchProducts()
            UseFetchBrand();
            FetchProductsHot();
            FetchBlogs();
        } catch (err) {
            console.log(err)
        }
    }, [])
    // console.log(products)

    // console.log(Context.customer)
    console.log('home render')
    return (
        <div className={cx("Home")}>
            {/* <section className={cx("Main-Menu")}>
                <Menu />
            </section> */}
            <Modal
                open={open}
                // onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-content-loading'>
                    < CircularProgress />
                </div>
            </Modal>
            <section className={cx("Main-Banner")}>
                <div className={cx("Slide")}>
                    <Slider {...settings} style={{ borderRadius: '5px' }}>
                        <div>
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
                        <img src={img7} alt="err" />
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
                    <div className={cx("Title-Product")}>
                        <Inventory2OutlinedIcon className={cx("icon")} />
                        <h3>Gợi ý hôm nay</h3>

                    </div>
                    <div className={cx("List-Product")}>
                        <div className={cx("List-Product-center")}>
                            {products.map(product => {
                                return <Card product={product} key={product._id} />
                            })}
                        </div>
                    </div>
                </div>
                <div className={cx("Hot-Product")}>
                    <div className={cx("Title-Product")}>
                        <ThermostatOutlinedIcon className={cx("icon")} />
                        <h3>Các sản phẩm nổi bật</h3>
                    </div>
                    <div className={cx("List-Product")}>
                        <div className={cx("List-Product-center")}>

                            {hotProducts && hotProducts.map(product => {
                                return <Card product={product} key={product._id} />
                            })}
                        </div>
                    </div>
                </div>
            </section >

            <section className={cx("Blogs")} >
                <div className={cx("Title-Blogs")}>
                    <BookOutlinedIcon className={cx("icon")} />
                    <h3>Blog nổi bật</h3>
                </div>
                <div className={cx("List-Blog")}>
                    <Slider {...settingsBlogs} style={{ borderRadius: '5px' }}>
                        {blogs.length >= 5 &&
                            blogs.map(item => {
                                const dateObj = new Date(item.crdate);
                                const formattedDate = `${dateObj.toDateString()}`;
                                return (
                                    <Link to={'/blog/' + item._id} key={item._id} className={cx("Blog")}>
                                        <div className={cx("Blog-User")}>
                                            <img src={item.customer.image.path || imgUser} alt="" />
                                            <div className={cx("UserName")}>
                                                <p><strong>{item.customer.username}</strong></p>
                                                <p>{formattedDate}</p>
                                            </div>
                                        </div>
                                        <div className={cx("Blog-Content")}>
                                            <img src={item.image.path} alt="" />
                                            <h3>{item.valueTitle}</h3>
                                            <p>{item.valueShortIntro}</p>
                                        </div>
                                        <div className={cx("Blog-More")}>
                                            <Link>Xem thêm</Link>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </Slider>
                </div>

            </section>

            <section className={cx("SomeThing")}>

                <div className={cx("List-product")}>




                </div>

            </section>


        </div >
    )
}

export default Home
