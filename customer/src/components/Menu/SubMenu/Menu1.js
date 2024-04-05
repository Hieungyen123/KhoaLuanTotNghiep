import React, { useState } from 'react'
import { forwardRef } from 'react';

import styles from './Menu1.module.scss'
import classNames from "classnames/bind";


import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

// import logo from '../../../../IMG/logo.svg'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Menu1 = forwardRef((props, ref) => {
    const cx = classNames.bind(styles)
    // console.log(props)
    const categories = props.category;
    const subCategories = props.subCategories;

    const [hover, setHover] = useState(0);

    // console.log(categories)
    const onMouseEnter = (index) => {
        setHover(index)
    }
    return (
        <div ref={ref} className={cx('Menu1')} onMouseOut={() => setHover(0)}>

            <div className={cx('Right')}>
                {/* <div className={cx('Menu1-ul')}> */}
                <ul>
                    {categories.map((category, index) => {
                        return (
                            <li key={index} style={{
                                backgroundColor: hover === category.stt ? '#e5e7eb' : '',
                                borderRadius: hover === category.stt ? '8px 0px 0px 8px' : '',
                                opacity: hover === category.stt ? 1 : 0.8,
                            }} onMouseEnter={() => onMouseEnter(category.stt)}>{category.name}</li>
                        )
                    })}

                </ul>
                {/* </div> */}
            </div>

            <div className={cx('Left')} >


                <div className={cx('Left-SubCategory')}>
                    <ul>
                        {/* <li >1</li> */}
                        {categories.map((category) => {
                            const filteredSubCategories = subCategories.filter(subcate => category._id === subcate.idcategory && subcate.hasOwnProperty("image"));
                            return filteredSubCategories.map((subcate, index) => {
                                if (filteredSubCategories.length > 6) {
                                    if (index < 6) {
                                        return (
                                            <div key={index} className={cx('SubCategory')} style={{
                                                opacity: hover !== category.stt ? 0 : '100%',
                                                transform: hover === category.stt ? 'translateX(0)' : 'translateX(-30px)',
                                                display: hover === category.stt ? '' : 'none'
                                            }}>
                                                <img src={subcate.image.path} alt="" />
                                                <li

                                                    key={subcate._id}
                                                >
                                                    {subcate.name}
                                                </li>
                                            </div>
                                        )
                                    }
                                } else {
                                    return (
                                        <div key={index} className={cx('SubCategory')} style={{
                                            opacity: hover !== category.stt ? 0 : '100%',
                                            transform: hover === category.stt ? 'translateX(0)' : 'translateX(-30px)',
                                            display: hover === category.stt ? '' : 'none'
                                        }}>
                                            <img src={subcate.image.path} alt="" />
                                            <li

                                                key={subcate._id}
                                            >
                                                {subcate.name}
                                            </li>
                                        </div>
                                    )
                                }
                            }


                            )
                        })}
                    </ul>
                </div>


                <div className={cx('Left-Hot-Item')}>
                    <div className={cx('Left-Hot-Item-More')}>
                        <h4>Bán chạy nhất</h4>
                        <div className={cx('Left-Hot-Item-Wall')}></div>
                        <a href="#">Xem thêm <KeyboardArrowRightIcon /></a>
                    </div>
                    <div className={cx('Left-Hot-Item-Product')}>

                    </div>

                </div>
            </div>

        </div>
    )
})

export default Menu1
