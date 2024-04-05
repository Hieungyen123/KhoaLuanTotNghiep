import React from 'react'
import { useState, useRef, useEffect } from 'react';

import styles from './Menu.module.scss'
import classNames from "classnames/bind";

import Menu1 from './SubMenu/Menu1';
import Menu2 from './SubMenu/Menu2';
import { SlideWrapper } from './SlideWrapper';
import axios from 'axios';
const Menu = () => {

    const cx = classNames.bind(styles)
    const [categories, SetCategories] = useState([])
    const [subCategories, SetSubCategories] = useState([])
    const [hovering, setHovering] = useState(null);
    const [popoverLeft, setPopoverLeft] = useState(null);
    const [popoverHeight, setPopoverHeight] = useState(null);

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

    const onMouseEnter = (index, el) => {
        setHovering(index);
        setPopoverLeft(el.offsetLeft);
        const menuElement = refs.current[index];
        if (menuElement) {
            setPopoverHeight(menuElement.offsetHeight);
        }
    };
    return (
        <div className={cx("Menu")}>
            <nav className={cx('navMenu')} onMouseLeave={() => {
                setHovering(null)
            }} >
                <a
                    onMouseEnter={(event) => onMouseEnter(0, event.currentTarget)}
                    href="/"
                    className={cx("A")}
                >
                    Danh Mục
                </a>
                <div className={cx("popover")} style={{
                    left: popoverLeft - 80 || 0,
                    height: popoverHeight || 0,
                    pointerEvents: hovering === null && 'none',
                    opacity: hovering !== null ? '100%' : 0,
                    transform: hovering === null ? 'translateX(-30px)' : 'translateX(0)',
                }}>
                    <SlideWrapper index={0} hovering={hovering} >
                        <Menu1
                            ref={element => (refs.current[0] = element)}
                            hovering={hovering}
                            category={categories}
                            subCategories={subCategories}
                        />
                    </SlideWrapper>
                </div>
            </nav >
        </div>
    )
}

export default Menu
