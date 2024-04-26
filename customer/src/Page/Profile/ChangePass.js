import React, { useState, useContext, useEffect, } from 'react'
import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const ChangePass = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();

    const { customer, token, SetnotifySuccess, SetnotifyWarning } = useContext(MyContext)


    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [newPassTwo, setNewPassTwo] = useState('')

    const handelChangePass = () => {
        if (customer?.password !== oldPass) {
            SetnotifyWarning('Mật khẩu cũ không chính xác')
            setOldPass("")
        } else {
            if (newPass !== newPassTwo) {
                SetnotifyWarning('Mật khẩu mới không trùng với lần nhập thứ hai')
            } else {
                if (customer?.password === newPass) {
                    SetnotifyWarning('Mật khẩu mới không được giống với mật khẩu cũ')
                } else {
                    const config = { headers: { 'x-access-token': token } };
                    axios.put('/api/customer/customers/changepass/' + customer._id, { newpass: newPass }, config).then((res) => {
                        const result = res.data;
                        console.log(result)
                        SetnotifySuccess(result.message.message)
                        setOldPass("")
                        setNewPass("")
                        setNewPassTwo("")
                    })

                }
            }
        }
    }

    return (
        <div className={cx('ChangePass')}>
            <div className={cx('ChangePass-title')}>
                <h4>Thay đổi mật khẩu</h4>
            </div>
            <div className={cx('ChangePass-content')}>
                <div className={cx('ChangePass-content-item')}>
                    <label htmlFor="oldpass">Nhập mật khẩu cũ</label>
                    <input type="password" id='oldpass' value={oldPass} required onChange={(e) => setOldPass(e.target.value)} />
                </div>
                <div className={cx('ChangePass-content-item')}>
                    <label htmlFor="newPass">Nhập mật khẩu mới</label>
                    <input type="password" id='newPass' value={newPass} required onChange={(e) => setNewPass(e.target.value)} />
                </div>
                <div className={cx('ChangePass-content-item')}>
                    <label htmlFor="newPassTwo">Nhập lại mật khẩu mới</label>
                    <input type="password" id='newPassTwo' value={newPassTwo} required onChange={(e) => setNewPassTwo(e.target.value)} />
                </div>
                <div className={cx('ChangePass-content-item')}>
                    <button onClick={handelChangePass}>Lưu</button>
                    <div className={cx('ChangePass-content-Decs')}>
                        <p>! Mật khẩu mới không được trùng với mật khẩu cũ</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePass
