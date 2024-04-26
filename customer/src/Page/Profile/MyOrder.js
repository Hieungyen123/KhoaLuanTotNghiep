import React, { useState, useContext, useEffect, } from 'react'
import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const MyOrder = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();
    return (
        <div className={cx('MyOrder')}>
            MyOrder
        </div>
    )
}

export default MyOrder
