import React, { useContext, useEffect } from 'react'
import styles from './DoneChecKout.module.scss'
import classNames from "classnames/bind";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../../contexts/MyContext';
import DoneIcon from '@mui/icons-material/Done';
const DoneChecKout = () => {
    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const partnerCode = searchParams.get('partnerCode');
    const orderId = searchParams.get('orderId');
    // const requestId = searchParams.get('requestId');
    // const amount = searchParams.get('amount');
    const message = searchParams.get('message');
    const orderType = searchParams.get('orderType');
    // const extraData = searchParams.get('extraData');


    const order = JSON.parse(localStorage.getItem('order'))
    console.log(order)
    useEffect(() => {

        if (message === 'Successful.') {
            const config = { headers: { 'x-access-token': Context.token } }
            const body = {
                total: order.total,
                UserID: order.customer._id,
                orderType: orderType,
                items: order.items,
                orderId: orderId,
                Address: order.address,
                note: order.note
            }
            axios.post('/api/customer/checkout', body, config).then((res) => {
                const result = res.data;
                console.log(result.message)
            })
        }

    }, []);
    return (


        <div className={cx("DoneChecKout")}>
            <div className={cx("Content-Success")}>
                <DoneIcon className={cx("Content-Success-icon")} />
                <div className={cx("Content-Success-title")} >
                    <h3>Đặt hàng thành công</h3>
                    <p>Mã đơn hàng {orderId}</p>
                </div>
                <div className={cx("Content-Success-info")} >
                    <h4><strong>Thông tin giao hàng</strong></h4>
                    <p>{order.customer.username}</p>
                    <p>{order.customer.phone}</p>
                    <p>125/105 Lê văn duyệt....</p>
                </div>
                <div className={cx("Content-Success-payment")} >
                    <h4><strong>Phương thức thanh toán</strong></h4>
                    <p>Thanh toán {orderType}</p>
                </div>
            </div>
            <div className={cx("Back-Button")}><Link style={{ color: 'white' }}> Mua hàng tiếp </Link></div>
        </div>
    )
}

export default DoneChecKout
