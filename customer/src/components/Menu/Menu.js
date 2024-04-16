import React from 'react'
import { useState, useRef, useEffect } from 'react';

import styles from './Menu.module.scss'
import classNames from "classnames/bind";

import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
const Menu = () => {

    const cx = classNames.bind(styles)
    const [categories, SetCategories] = useState([])
    const [subCategories, SetSubCategories] = useState([])
    const [hovering, setHovering] = useState(false);

    const fetchCategory = () => {
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;

            SetCategories(result)
        })
    }
    const fetchSubCateogry = () => {
        axios.get('/api/customer/subcategories').then((res) => {
            const result = res.data;

            SetSubCategories(result)
        })
    }

    useEffect(() => {
        fetchCategory()
        fetchSubCateogry()
    }, [])

    // console.log(subCategories)

    const refs = useRef([]);
    const [hover, setHover] = useState(0);

    // console.log(categories)
    const onMouseEnter = (index) => {
        setHover(index)
        setHovering(true)
    }
    const filteredSubCategories = subCategories.filter(subcate => subcate.idcategory === hover && subcate.hasOwnProperty("image"));

    return (
        <div className={cx("Menu")}>
            <div className='container'>
                <div className={cx("Content")}>
                    <div className={cx("List-category")} >
                        {categories.length > 0
                            ? categories.map((item) => {
                                return (
                                    <Link key={item._id} to={'/product-category/' + item._id} onMouseEnter={() => onMouseEnter(item._id)} className={cx("Item-Category")} >
                                        <p>{item.name}</p>
                                        <KeyboardArrowDownIcon className={cx("icon")} style={{ transform: hovering && item._id === hover ? 'rotate(180deg)' : 'rotate(0)' }} />
                                    </Link>
                                )
                            })
                            : null
                        }
                    </div>
                    {hovering === true &&
                        <div className={cx("List-subcategory")} >
                            <div className={cx("List-subcategory-item")} onMouseLeave={() => setHovering(false)} >
                                <div className={cx("List-subcategory-item-list")}>
                                    {
                                        filteredSubCategories.map((item, index) => {
                                            if (index < 6) {
                                                return (
                                                    <Link key={item._id} to={'#'} className={cx("item")} style={{

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
