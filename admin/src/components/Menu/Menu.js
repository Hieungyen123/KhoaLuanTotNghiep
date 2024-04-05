import React, { memo } from 'react'
import styled from './Menu.module.scss';
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";

import { NavLink } from 'react-router-dom'


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const Menu = memo(({ styleOpen, width, setOpen, open }) => {
    const cx = classNames.bind(styled);
    // console.log('render Menu')

    return (

        <div className={cx('Menu')} style={width >= 700 ? {} : styleOpen}>
            <div className={cx('Menu-item')}>
                <p className={cx('item-title')}>MAIN</p>
                <NavLink to="/admin/home" exact="true" onClick={() => setOpen(false)} className={cx('item')}>
                    <HomeOutlinedIcon className={cx('icon')} />
                    <span >HomePage</span>
                </NavLink>
            </div>
            <div className={cx('Menu-item')}>
                <p className={cx('item-title')}>LISTS</p>

                <NavLink to="/admin/customer" onClick={() => setOpen(false)} exact className={cx('item')}>
                    <PeopleAltOutlinedIcon className={cx('icon')} />
                    <span >Customer</span>
                </NavLink>
                <NavLink to="/admin/products" className={cx('item')} onClick={() => setOpen(false)}>
                    <FeedOutlinedIcon className={cx('icon')} />
                    <span >Products</span>
                </NavLink>
                <NavLink to="/admin/Subcategories" className={cx('item')} onClick={() => setOpen(false)}>
                    <HomeWorkOutlinedIcon className={cx('icon')} />
                    <span >Subcategories</span>
                </NavLink>
            </div>
            <div className={cx('Menu-item')}>
                <p className={cx('item-title')}>GENERAL</p>
                <NavLink to="/admin/brand" className={cx('item')} onClick={() => setOpen(false)}>
                    <HomeWorkOutlinedIcon className={cx('icon')} />
                    <span >Brand</span>
                </NavLink>
                <div className={cx('item')}>
                    <NoteAltOutlinedIcon className={cx('icon')} />
                    <span >Notes</span>
                </div>
                <div className={cx('item')}>
                    <CalendarMonthOutlinedIcon className={cx('icon')} />
                    <span >Calendar</span>
                </div>
                <div className={cx('item')}>
                    <ClearAllOutlinedIcon className={cx('icon')} />
                    <span >Forms</span>
                </div>
            </div>
            <div className={cx('Menu-item')}>
                <p className={cx('item-title')}>MORE</p>
                <div className={cx('item')}>
                    <LocalPrintshopOutlinedIcon className={cx('icon')} />
                    <span >Print</span>
                </div>
                <div className={cx('item')}>
                    <FileUploadOutlinedIcon className={cx('icon')} />
                    <span >Backups</span>
                </div>
            </div>
        </div>
    )
})

export default Menu
