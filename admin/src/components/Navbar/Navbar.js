import React from 'react'
import classNames from "classnames/bind";
import styled from './Navbar.module.scss';


import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import logo from '../../images/logo.svg';

const Navbar = () => {
    const cx = classNames.bind(styled);

    return (
        <div className={cx('navbar')} >
            {/* <h3>Là anh đây chứ ai</h3> */}
            <div><img src={logo} alt="" /></div>
            <div className={cx('content')}>
                {/* <SearchOutlinedIcon className={cx('icon')} /> */}
                {/* <AppRegistrationOutlinedIcon className={cx('icon')} /> */}
                <div className={cx('nofi')}>
                    <NotificationsOutlinedIcon className={cx('iconNo')} />
                    <span className={cx('bage')}>1</span>
                </div>
                <div className={cx('avatar')}>
                    <AccountCircleOutlinedIcon />
                    <p>Manager</p>
                </div>
                {/* <SettingsOutlinedIcon className={cx('icon')} /> */}
            </div>
        </div>
    )
}

export default Navbar
