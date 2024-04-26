import React from 'react'
import { useState, useRef, useEffect } from 'react';

import styles from './Menu.module.scss'
import classNames from "classnames/bind";

import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import CardSmall from '../../components/Card/CardSmall';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
const Menu = () => {

    const cx = classNames.bind(styles)
    const [categories, SetCategories] = useState([])
    const [subCategories, SetSubCategories] = useState([])
    const [hovering, setHovering] = useState(false);
    const [hotProduct, setHotProduct] = useState()
    const [loading, setLoading] = useState(true)
    const [hover, setHover] = useState(0);
    const [heightMobileMenu, setHeightMobileMenu] = useState(false)

    const fetchCategory = () => {
        axios.get('/api/customer/categories').then((res) => {

            const result = res.data;
            // console.log(result)
            SetCategories(result)
            // console.log('lấy api')
        })
    }
    const fetchSubCateogry = () => {
        axios.get('/api/customer/subcategories').then((res) => {
            const result = res.data;
            SetSubCategories(result)
        })
    }
    const fetchHotProduct = (id) => {
        setLoading(true)
        axios.get('/api/customer/products/hot/' + id).then((res) => {
            const result = res.data;
            setLoading(false)
            setHotProduct(result)
        })
    }

    useEffect(() => {
        fetchCategory()
        fetchSubCateogry()
    }, [])

    useEffect(() => {
        if (hover) {
            fetchHotProduct(hover)
        }

    }, [hover])
    const onMouseEnter = (index) => {
        setHover(index)
        setHovering(true)
    }
    var filteredSubCategories = subCategories.filter(subcate => subcate.idcategory === hover && subcate.hasOwnProperty("image"));



    return (
        <div className={cx("Menu")}>
            <div className='container'>
                <div className={cx("Content")}>
                    <div className={cx("DropDwonList")}>< MenuIcon className={cx("DropDwonList-icon")} onClick={() => { setHeightMobileMenu(!heightMobileMenu); setHovering(false) }} /></div>
                    <div className={cx("List-category")} style={{ height: heightMobileMenu ? '200px' : '0' }} >
                        {categories.length > 0
                            ? categories.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <div

                                            style={{ color: hovering && item._id === hover ? '#1250dc' : 'black', borderBottom: hovering && item._id === hover ? '2px solid #1250dc' : 'none' }}
                                            className={cx("Item-Category-pc")}
                                            onMouseLeave={() => setHovering(false)}
                                        >
                                            <Link
                                                key={item._id} to={'/product-category/' + item._id}
                                                onMouseEnter={() => onMouseEnter(item._id)} >{item.name}</Link>
                                            <KeyboardArrowDownIcon
                                                className={cx("icon")}
                                                style={{ transform: hovering && item._id === hover ? 'rotate(180deg)' : 'rotate(0)' }}
                                            />
                                        </div>
                                        <div
                                            style={{ color: hovering && item._id === hover ? '#1250dc' : 'black', backgroundColor: hovering && item._id === hover ? '#eaeffa' : 'white' }}
                                            className={cx("Item-Category-mobile")}
                                        // onMouseLeave={() => setHovering(false)}
                                        >
                                            <Link
                                                style={{ color: hovering && item._id === hover ? '#1250dc' : 'black' }}
                                                key={item._id} to={'/product-category/' + item._id}
                                            >
                                                {item.name}
                                            </Link>
                                            <KeyboardArrowDownIcon
                                                onClick={() => onMouseEnter(item._id)}
                                                className={cx("icon")}
                                                style={{ transform: 'rotate(-90deg)' }}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                            : null
                        }
                    </div>
                    {hovering &&
                        <div className={cx("List-subcategory")}>
                            <div className={cx("List-subcategory-item-pc")} onMouseEnter={() => onMouseEnter(hover)} onMouseLeave={() => setHovering(false)} >
                                <div className={cx("List-subcategory-item-list")}>
                                    {filteredSubCategories.length > 0
                                        &&
                                        filteredSubCategories.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <Link to={'/product-subcategory/' + item._id} key={item._id} className={cx("item")} style={{
                                                    }}
                                                    >
                                                        <img src={item.image.path} alt="" />
                                                        <p>{item.name}</p>
                                                    </Link>
                                                )
                                            }
                                        })
                                    }
                                </div>
                                <div className={cx("List-subcategory-item-product")}>
                                    <div className={cx("List-subcategory-item-product-hot")}>
                                        <h3>Các sản phẩm bán chạy </h3> |
                                        <Link> Xem thêm <KeyboardArrowRightIcon className={cx("hot-product-icon")} /> </Link>
                                    </div>
                                    <div className={cx("List-subcategory-item-product-List")}>
                                        {
                                            loading ? <CircularProgress /> :
                                                hotProduct.length > 0 ?
                                                    hotProduct.map((item) => {
                                                        return (<CardSmall key={item._id} product={item} />)
                                                    })
                                                    : 'Chưa có sản phẩm nào được bán trong danh sách này'

                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={cx("List-subcategory-item-mobile")}  >
                                <div className={cx("List-subcategory-item-list")}>
                                    {filteredSubCategories.length > 0
                                        &&
                                        filteredSubCategories.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <Link to={'/product-subcategory/' + item._id} key={item._id} className={cx("item")} style={{
                                                    }}
                                                    >
                                                        <img src={item.image.path} alt="" />
                                                        <p>{item.name}</p>
                                                    </Link>
                                                )
                                            }
                                        })
                                    }
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </div>

        </div >
    )
}

export default Menu
