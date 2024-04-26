import React, { useState, useContext, useEffect } from 'react'
import styles from './DoneChecKout.module.scss'
import classNames from "classnames/bind";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../../contexts/MyContext';

const DoneChecKout = () => {
    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const partnerCode = searchParams.get('partnerCode');
    const orderId = searchParams.get('orderId');
    const requestId = searchParams.get('requestId');
    const amount = searchParams.get('amount');
    const message = searchParams.get('message');
    const orderType = searchParams.get('orderType');
    const extraData = searchParams.get('extraData');
    useEffect(() => {



        console.log('extraData:', extraData);
        console.log('orderType:', orderType);
        console.log('partnerCode:', partnerCode);
        console.log('message:', message);
        console.log('orderId:', orderId);
        console.log('requestId:', requestId);
        console.log('amount:', amount);
    }, [location.search]);
    return (
        <div className={cx("DoneChecKout")}>
            Đặt hàng thành công cảm ơn bạn đã tin tưởng
            <ul>
                <li>searchParams {searchParams}</li>
                <li>partnerCode {partnerCode}</li>
                <li>orderId {orderId}</li>
                <li>requestId {requestId}</li>
                <li>amount {amount}</li>
                <li>message {message}</li>
                <li>orderType {orderType}</li>
                <li>extraData {extraData}</li>
            </ul>
        </div>
    )
}

export default DoneChecKout
