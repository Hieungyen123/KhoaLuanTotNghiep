import React, { useState, useContext, useEffect, } from 'react'
import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';

import { debounce, throttle } from 'lodash';

const MyAddress = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();
    const { customer, token, SetnotifyWarning, SetnotifySuccess, setCustomer } = useContext(MyContext)

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [city, setCity] = useState(null)
    const [districts, setDistricts] = useState(null)
    const [wards, setWards] = useState(null)
    const [street, setStreet] = useState('')
    const [idAddress, setIdAddress] = useState('')

    const [provinces, setProvinces] = useState([])
    const [districtsList, setDistrictsList] = useState([])
    const [wardsList, setWardsList] = useState([])
    const [openNewAddress, setOpenNewAddress] = useState(false)
    const [checkAction, setCheckAction] = useState(false)

    const fetchPostAddress = () => {
        console.log('thêm mới')
        setCheckAction(false)
        if (name && phone && city && districts && wards && street) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('city', JSON.stringify(city));
            formData.append('districts', JSON.stringify(districts));
            formData.append('wards', JSON.stringify(wards));
            formData.append('street', JSON.stringify(street));
            const config = { headers: { 'x-access-token': token } };
            axios.post('/api/customer/customers/address/' + customer._id, formData, config).then((res) => {
                const result = res.data;
                console.log(result)
                SetnotifySuccess(result.message.message)
                setOpenNewAddress(false)
                setStreet("")
                setWards(null)
                setDistricts(null)
                setCity(null)
                setPhone("")
                setName("")

            })
        } else {
            SetnotifyWarning("Bạn chưa nhập đủ thông tin")
        }

    }
    const fetchPutAddress = () => {
        setCheckAction(false)
        if (name && phone && city && districts && wards && street && idAddress) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('_id', idAddress);
            formData.append('phone', phone);
            formData.append('city', JSON.stringify(city));
            formData.append('districts', JSON.stringify(districts));
            formData.append('wards', JSON.stringify(wards));
            formData.append('street', JSON.stringify(street));
            const config = { headers: { 'x-access-token': token } };
            axios.put('/api/customer/customers/address/' + customer._id, formData, config).then((res) => {
                const result = res.data;
                console.log(result)
                SetnotifySuccess(result.message.message)
                setOpenNewAddress(false)
                setStreet("")
                setWards(null)
                setDistricts(null)
                setCity(null)
                setPhone("")
                setName("")
                setIdAddress("")
            })
        } else {
            SetnotifyWarning("Bạn chưa nhập đủ thông tin")
        }

    }







    const fetchApiProvinces = () => {
        axios.get('https://vnprovinces.pythonanywhere.com/api/provinces/?is_coastal=false&basic=false&limit=100').then((res) => {
            const result = res.data;
            setProvinces(result.results)

        })
    }
    const fetchApiDistricts = (id) => {
        axios.get('https://vnprovinces.pythonanywhere.com/api/provinces/' + id + '/').then((res) => {
            const result = res.data;
            setDistrictsList(result.districts)
        })
    }
    const fetchApiWards = (id) => {
        axios.get('https://vnprovinces.pythonanywhere.com/api/districts/' + id + '/').then((res) => {
            const result = res.data;
            // console.log('result', result)
            setWardsList(result.wards)
        })
    }
    const handleChangeOpenNewAddress = () => {
        setStreet("")
        setWards(null)
        setDistricts(null)
        setCity(null)
        setPhone("")
        setName("")
        setIdAddress("")
        setOpenNewAddress(!openNewAddress)
    }
    const handleUpdateAddress = (address) => {
        setCity(address.city)
        setDistricts(address.districts)
        setWards(address.wards)
        setStreet(address.street)
        setName(address.name)
        setPhone(address.phone)
        setIdAddress(address.idAddress)
        setTimeout(() => {
            setCheckAction(true)
            setOpenNewAddress(!openNewAddress)
        }, 500)

    }



    useEffect(() => {
        fetchApiProvinces()
        console.log('gọi api tỉnh/ thành phố')
    }, [])

    useEffect(() => {
        // setDistricts(null)

        if (city) {
            // console.log('gọi api lấy phường/huyện mới', city.id)
            fetchApiDistricts(city.id)
        } else {
            return
        }
    }, [city])

    useEffect(() => {

        // setWards(null)

        if (districts) {
            // console.log('gọi api lấy phường/xã')
            fetchApiWards(districts.id)
        } else {
            return
        }
    }, [districts])


    return (
        <div className={cx('MyAddress')}>
            {openNewAddress && <div onClick={handleChangeOpenNewAddress} className={cx('overlay')}></div>}
            <div>
                <div className={cx('MyAddress-title')}>
                    <div><h3>Quản lý địa chỉ</h3> <p>Lưu ý: Giới hạn là 4 địa chỉ</p></div>
                    {customer?.Address.length < 4 ? <button onClick={handleChangeOpenNewAddress} >Thêm địa chỉ mới</button> : null}
                </div>
                <div className={cx('MyAddress-content')}>
                    {customer !== null && customer.Address.length > 0
                        ? customer.Address.map((address) => {
                            return (<div key={address._idAddress} className={cx('MyAddress-List-Info')}>
                                <div>
                                    <div className={cx('Infos')}>
                                        <p><strong>{address.name}</strong> | {address.phone}</p>
                                    </div>
                                    <div className={cx('MyAddress')}>
                                        <p>{address.street}, {address.wards.full_name}, {address.districts.name}</p>
                                    </div>
                                </div>
                                <div className={cx('MyAddress-List-Info-action')}>
                                    <button onClick={() => handleUpdateAddress(address)}>sửa</button>
                                </div>

                            </div>)
                        })
                        : null
                    }


                </div>
            </div>
            <div className={cx('List-Address-New')} style={{ transform: openNewAddress && 'translateX(0px)', boxShadow: openNewAddress === false && 'none' }} >
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 1100 }}>
                    <div className={cx('List-Address-title')}>
                        <div>
                            <h3>Thêm địa chỉ mới</h3>
                            <ClearIcon className={cx('icon')} onClick={handleChangeOpenNewAddress} />
                        </div>
                    </div>
                    <div className={cx('List-Address-content')}>
                        <div className={cx('Info-Address')}>
                            <h4>Thông tin người nhận</h4>
                            <input type="text" required placeholder='Nhập tên của bạn...' value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" required placeholder='Nhập số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className={cx('List-Address-items-New')}>
                            <div className={cx('List-Address-item')}>
                                <h4>Địa chỉ nhận hàng</h4>
                            </div>
                            {/* city */}
                            <div className={cx('List-Address-item')}>
                                <select required value={city ? JSON.stringify(city) : ''} onChange={(e) => setCity(JSON.parse(e.target.value))} >
                                    <option value={null}>Chọn thành phố/tỉnh</option>
                                    {provinces.length > 0 && provinces.map(province => {
                                        return (<option key={province.id} value={JSON.stringify(province)}>{province.name}</option>)
                                    })}
                                </select>
                            </div>
                            {/* districts */}
                            <div className={cx('List-Address-item')}>
                                <select required value={districts ? JSON.stringify(districts) : ''} onChange={(e) => setDistricts(JSON.parse(e.target.value))}>
                                    <option value="">Chọn quận/huyện</option>
                                    {districtsList.length > 0 ? districtsList.map(district => {
                                        return (<option key={district.id} value={JSON.stringify(district)}>{district.name}</option>)
                                    }) : <option value="">Không có quận/huyện</option>}
                                </select>
                            </div>
                            {/* wards */}
                            <div className={cx('List-Address-item')}>
                                <select required value={wards ? JSON.stringify(wards) : ''} onChange={(e) => setWards(JSON.parse(e.target.value))} >
                                    <option value={null}>Chọn phường/xã</option>
                                    {wardsList.length > 0 ? wardsList.map(ward => {
                                        return (<option key={ward.id} value={JSON.stringify(ward)}>{ward.name}</option>)
                                    }) : <option value="">Không có phường/xã</option>}
                                </select>
                            </div>
                            <div className={cx('List-Address-item')}>
                                {street && wards && districts && city ? <p><strong>Địa chỉ đầy đủ</strong>: {street + ', ' + wards.name + ', ' + districts.name + ', ' + city.name}</p> : null}
                                <input required value={street} onChange={(e) => setStreet(e.target.value)} type="text" placeholder='Địa chỉ cụ thể vd: 125/105 Lê văn duyệt' />
                            </div>
                        </div>
                    </div>
                    <div className={cx('List-Address-Submit')}>
                        <button type='submit' onClick={checkAction ? fetchPutAddress : fetchPostAddress}>{checkAction ? "Thay đổi" : "Lưu"}</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyAddress

