import React, { useState, useContext, useEffect, } from 'react'
import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import imgUser from '../../IMG/User-img.svg'
import capitalizeFirstCharacter from '../../ultils/StringUtil';

const MyProfile = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();
    const { customer, token } = useContext(MyContext)
    const [changeInfo, setChangeInfo] = useState(true)
    const [name, setName] = useState(customer?.username || '')
    const [mobile, setMobile] = useState(customer?.phone || '')
    const [oldImage, setOldImage] = useState(customer?.image.filename || "")
    const [gender, setGender] = useState('Nam')
    const [selectedImage, setSelectedImage] = useState(null);

    // console.log(customer)
    // console.log(gender)


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file)
    };




    const fetchUpdate = () => {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('gender', gender);
        formData.append('username', name);
        formData.append('oldImage', oldImage);
        const config = { headers: { 'x-access-token': token } };
        axios.put('/api/customer/customers/' + customer._id, formData, config).then((res) => {
            const result = res.data;
            console.log(result)
            setChangeInfo(true)
        })
    }

    useEffect(() => {
        if (customer) {
            setMobile(customer?.phone)
            setName(capitalizeFirstCharacter(customer?.username))
        }
    }, [customer, changeInfo])

    return (
        <div className={cx('MyProfile')}>
            <div className={cx('MyProfile-title')}>
                <h4>Thông tin cá nhân</h4>
            </div>
            <div className={cx('MyProfile-content')}>
                <div className={cx('MyProfile-image')}>
                    <img src={customer?.image ? customer?.image.path : imgUser} alt="" />
                    <input style={{ display: changeInfo ? 'none' : 'block' }} type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div className={cx('MyProfile-List-Info')}>
                    <div style={{ display: changeInfo ? 'block' : 'none' }} className={cx('MyProfile-List-Info-Nochange')}>
                        <div className={cx('Item')}>
                            <span>Họ và tên</span>
                            <span>{name}</span>
                        </div>
                        <div className={cx('Item')}>
                            <span>Số điện thoại</span>
                            <span>{mobile}</span>
                        </div>
                        <div className={cx('Item')}>
                            <span>Giới tính</span>
                            <span>{customer?.Gender || 'Chưa có thông tin'}</span>
                        </div>
                    </div>
                    <div style={{ display: changeInfo ? 'none' : 'flex' }} className={cx('MyProfile-List-Info-change')}>
                        <div className={cx('Item')}>
                            <label for="name" >Họ và tên</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" id="name" />
                        </div>
                        <div className={cx('Item')}>
                            <label for='phone'>Số điện thoại</label>
                            <input disabled type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} name="phone" id="phone" />
                        </div>
                        <div className={cx('Item-checkbox')}>
                            <label>
                                <input defaultChecked type="checkbox" name="gender" value="nam" checked={gender === 'Nam'}
                                    onChange={() => setGender('Nam')} /> Nam
                            </label>

                            <label>
                                <input type="checkbox" name="gender" value="nu" checked={gender === 'Nu'} onChange={() => setGender('Nu')} /> Nữ
                            </label>
                        </div>
                    </div>
                </div>
                <div className={cx('Button-Change')}>
                    <button style={{ display: changeInfo ? 'block' : 'none' }} onClick={() => setChangeInfo(false)} >Chỉnh sửa thông tin</button>
                    <button style={{ display: changeInfo ? 'none' : 'block' }} onClick={fetchUpdate} >Lưu</button>
                    <button style={{ display: changeInfo ? 'none' : 'block' }} onClick={() => setChangeInfo(true)} >Hủy</button>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
