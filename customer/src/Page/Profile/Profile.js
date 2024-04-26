import React, { useState, useContext, useEffect, } from 'react'
import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, Navigate, Outlet, NavLink } from 'react-router-dom';


import CreateIcon from '@mui/icons-material/Create';

import { useNavigate } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import imgUser from '../../IMG/User-img.svg'

import capitalizeFirstCharacter from '../../ultils/StringUtil';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const Profile = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();
    const { customer, SetnotifyWarning, setToken, setCustomer } = useContext(MyContext)

    const navigate = useNavigate();

    console.log(customer)
    if (customer === null) {
        // SetnotifyWarning("Phiên đăng nhập của bạn đã hết hạn để truy cập")
        navigate('/home')
    }

    const handleLogOut = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setToken('')
        setCustomer(null)

    }

    return (
        <div className={cx('Profile')}>
            <div className={cx("ProfileCenter")}>
                <div className={cx("Profile-Menu")}>
                    <div className={cx("Profile-Menu-image")}>
                        <img src={customer?.image ? customer?.image.path : imgUser} alt="" />
                        <p>{customer ? capitalizeFirstCharacter(customer?.username) : '....'} </p>
                    </div>
                    <div className={cx("Profile-Menu-itemLink")}>
                        <NavLink to={'/myprofile/profile/1'}>
                            <div className={cx("Item")}>
                                <div className={cx("Menu-tag")}>
                                    <AccountCircleOutlinedIcon />
                                    <p>Hồ Sơ cá nhân</p>
                                </div>
                                <KeyboardArrowRightIcon className={cx("icon")} />
                            </div>
                        </NavLink>
                        <NavLink to={'/myprofile/changepass'} >
                            <div className={cx("Item")}>
                                <div className={cx("Menu-tag")}>
                                    <BuildCircleOutlinedIcon />
                                    <p>Đổi Mật Khẩu</p>
                                </div>
                                <KeyboardArrowRightIcon className={cx("icon")} />
                            </div>
                        </NavLink>

                        <NavLink to={'/myprofile/myorders/1'} >
                            <div className={cx("Item")}>
                                <div className={cx("Menu-tag")}>
                                    <Inventory2OutlinedIcon />
                                    <p>Đơn hàng của tôi</p>
                                </div>
                                <KeyboardArrowRightIcon className={cx("icon")} />
                            </div>
                        </NavLink>
                        <NavLink to={'/myprofile/myaddress'} >
                            <div className={cx("Item")}>
                                <div className={cx("Menu-tag")}>
                                    <PlaceOutlinedIcon />
                                    <p>Địa chỉ của tôi</p>
                                </div>
                                <KeyboardArrowRightIcon className={cx("icon")} />
                            </div>
                        </NavLink>
                        <div>
                            <div className={cx("Item")}>
                                <div className={cx("Menu-tag")} onClick={handleLogOut}>
                                    <CreateIcon />
                                    <p>Đăng xuất</p>
                                </div>
                                <KeyboardArrowRightIcon className={cx("icon")} />
                            </div>
                        </div>



                    </div>
                </div>
                <div className={cx("Profile-Content")}>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Profile
