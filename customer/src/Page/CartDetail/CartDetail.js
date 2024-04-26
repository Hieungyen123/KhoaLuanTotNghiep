import React, { useEffect } from 'react'
import { useContext } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from './CartDetail.module.scss'
import { Link } from "react-router-dom";
import MyContext from "../../contexts/MyContext";
import { useNavigate } from "react-router-dom";


import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import emptyCart from '../../IMG/empty-cart.png'

import SVG from '../../SVG';
import axios from 'axios';

import CartUtil from '../../ultils/CartUtil';
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
const CartDetail = () => {
    const cx = classNames.bind(styles)
    const navigate = useNavigate();

    const Context = useContext(MyContext);
    const { mycart, customer, SetnotifyWarning } = Context

    const [total, setTotal] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [finalTotal, setFinalTotal] = useState(0);
    const [selectedProductCheckout, setSelectedProductCheckout] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const [addressSelected, setAddressSelected] = useState(customer !== null && customer?.Address.length > 0 ? customer.Address[0] : [])

    // console.log('customer', customer)
    // console.log('addressSelected', addressSelected)

    const handleCheckboxChange = (event, value) => {
        if (event.target.checked) {
            setSelectedProductCheckout([...selectedProductCheckout, value]);
        } else {
            setSelectedProductCheckout(selectedProductCheckout.filter(item => item !== value));
        }
    };
    const handleQuantityPlus = (id, quantity) => {
        // console.log(id)
        mycart.map(item => {
            if (item.product._id === id) {
                // console.log(item.product._id)
                item.quantity += 1
            }
        })
    }
    const handleQuantityMinus = (id, quantity) => {
        // console.log(id)
        mycart.map(item => {
            if (item.product._id === id) {
                // console.log(item.product._id)
                if (quantity > 1) {
                    item.quantity -= 1
                }
            }
        })
    }

    const handeltotalAfterDiscount = CartUtil.getTotalWithDiscount(selectedProductCheckout)
    const totalProduct = CartUtil.getTotal(selectedProductCheckout)

    useEffect(() => {
        setTotalDiscount(handeltotalAfterDiscount)
        setTotal(totalProduct)
        setFinalTotal(total - (total - totalDiscount))
    }, [selectedProductCheckout, quantity, total])


    const checkMoMo = () => {
        const config = {
            headers: { 'x-access-token': Context.token }
        }
        axios.post('/api/customer/payment', config).then((res) => {
            const result = res.data;
            console.log(res)
            window.location.assign(res.data.payUrl);
        })
    }
    const checkout = () => {
        if (selectedProductCheckout.length > 0) {
            if (customer !== null) {
                const body = { total: finalTotal, items: selectedProductCheckout, customer: customer, address: {} };
                const config = { headers: { 'x-access-token': Context.token } };
                axios.post('/api/customer/checkout', body, config).then((res) => {
                    const result = res.data;
                    if (result) {
                        Context.SetnotifySuccess('Bạn đã đặt hàng thành công.')
                        Context.setMycart([]);
                        navigate('/home')
                    } else {
                        Context.SetnotifyWarning('Đã có lỗi gì đó với giỏ hàng của bạn.')
                    }
                });
            } else {
                SetnotifyWarning('Mời bạn đăng nhập trước khi thanh toán')
            }

        } else {

            SetnotifyWarning('Bạn chưa chọn sản phẩm để thanh toán')
        }

    }


    if (mycart.length > 0) {
        return (
            <div className={cx('detail-cart')} >
                <div className={cx('detail-cart-content')} >
                    <div className={cx('detail-cart-content-items')}>
                        <div className={cx('detail-cart-content-item-title')}>
                            <div >
                                <input
                                    style={{ marginRight: '5px' }}
                                    type="checkbox"
                                // checked={selectAllChecked}
                                // onChange={handleSelectAllCheckboxChange}
                                />
                                <label htmlFor="">Chọn tất cả</label>
                            </div>
                            <div></div>
                            <div style={{ width: '200px' }}>name</div>
                            <div style={{ marginLeft: '20px' }}>Price and quantity</div>
                            <div ></div>
                        </div>

                        {mycart.map((item, index) => {
                            if (Object.keys(item.product.promotion).length !== 0) {
                                var discountPrice = Math.ceil(item.product.price - (item.product.price * (item.product.promotion.discountPercent / 100)))
                            }
                            return (
                                <div className={cx('detail-cart-content-item')}>
                                    <input
                                        type="checkbox"
                                        value={item}
                                        checked={selectedProductCheckout.includes(item)}
                                        onChange={(event) => handleCheckboxChange(event, item)}
                                    />
                                    <div className={cx('detail-cart-content-IMG')}>
                                        <img src={item.product.image.path} alt="" />
                                    </div>
                                    <div className={cx('detail-cart-content-name')}>
                                        <p>{item.product.name}</p>
                                    </div>
                                    <div className={cx('checkPriceAndquantity')}>
                                        <div className={cx('price')}>

                                            {
                                                Object.keys(item.product.promotion).length !== 0 && <p style={{ color: '#1250dc' }} className={cx('Cost')}>
                                                    {discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 VNĐ
                                                </p>
                                            }
                                            <p style={{ color: discountPrice ? '#657384' : '#1250dc', fontSize: discountPrice ? '14px' : '16px', fontWeight: discountPrice ? 400 : 500, textDecorationLine: discountPrice ? 'line-through' : 'none' }} className={cx('Cost')}>{(item.product.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 VNĐ</p>
                                        </div>
                                        <div className={cx('quantity')}>
                                            <span style={{ opacity: quantity > 1 ? '1' : '0.5' }} onClick={(e) => {
                                                handleQuantityMinus(item.product._id, item.quantity)
                                                setQuantity(item.quantity)
                                            }} className={cx("ProductDetail-content-Remove")}><RemoveIcon /></span>
                                            <input type="numer" inputMode="numeric" min={1} max={999} value={item.quantity} onChange={(e) => setQuantity(e.target.value)} />
                                            <span onClick={(e) => {
                                                handleQuantityPlus(item.product._id, item.quantity)
                                                setQuantity(item.quantity)
                                            }} className={cx("ProductDetail-content-Add")}><AddIcon /></span>
                                        </div>
                                    </div>
                                    <div className={cx("detail-cart-content-remove")}>
                                        <DeleteOutlineOutlinedIcon className={cx("detail-cart-content-remove-icon")} />
                                    </div>

                                </div>

                            )
                        })
                        }
                    </div>
                    {customer?.Address.length > 0 && <div className={cx('Customer-Address')} >
                        <div className={cx('Address')}>
                            <div className={cx('title')}>
                                <div className={cx('title-icon')}>
                                    <PersonPinCircleOutlinedIcon className={cx('icon')} />
                                    <h3>Địa chỉ giao hàng</h3>
                                </div>
                                <div className={cx('Choose-Address')}>
                                    <p>Thay đổi</p>
                                </div>
                            </div>
                            <div className={cx('Show-Address')}>
                                <h3>{addressSelected.street}</h3>
                                <p> {addressSelected.wards.full_name} , huyện {addressSelected.districts.full_name} , {addressSelected.city.full_name} </p>
                            </div>
                        </div>
                        <div className={cx('Customer')}>
                            <div className={cx('title')}>
                                <PermIdentityOutlinedIcon className={cx('icon')} />
                                <p>{addressSelected.name}</p> |
                                <span>{addressSelected.phone}</span>
                            </div>
                            <div className={cx('Show-Address')}>
                                <p>Ghi chú: Không bắt buộc</p>
                                <textarea style={{ width: '100%', height: '50px' }} type='text' placeholder='Ví dụ: Hãy ấy ấy cho tôi trước khi giao 15p' />
                            </div>
                        </div>
                    </div>}

                </div>
                <div className={cx('detail-cart-checkkout')}>
                    <div className={cx('detail-cart-checkkout-content')}>
                        <div className={cx('detail-cart-checkkout-content-item')}>
                            <div className={cx('item')}>
                                <p>Tổng tiền:</p>
                                <p>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 VNĐ</p>
                            </div>
                        </div>
                        <div className={cx('detail-cart-checkkout-content-item')}>
                            <div className={cx('item')}>
                                <p>Giảm giá trực tiếp:</p>
                                <p>{(total - totalDiscount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 VNĐ</p>
                            </div>
                        </div>
                        <div className={cx('detail-cart-checkkout-content-item')}>
                            <div className={cx('item')}>
                                <p>Tiết kiệm được:</p>
                                <p>{(total - totalDiscount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 VNĐ</p>
                            </div>
                        </div>
                        <div className={cx('detail-cart-checkkout-content-item-checkout')}>
                            <div className={cx('total')}>
                                <p>Tạm tính:</p>
                                <p>{finalTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}.000 VNĐ</p>
                            </div>

                            <div className={cx('btn-checkout')}>
                                <button onClick={() => checkout()} >Tính tiền</button>
                                <p>Bằng việc tiến hành đặt mua hàng, bạn đồng ý với
                                    Điều khoản dịch vụ, Chính sách thu thập và xử lý dữ liệu cá nhân</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detail-cart-checkkout-SVG')}>{SVG.checkkout}</div>
                </div>
            </div >
        )
    } else {
        return (
            <div className={cx('empty-Cart')}>
                <img src={emptyCart} alt="" />
                <p>Bạn chưa có gì trong giỏ hàng</p>
            </div>
        )
    }


}

export default CartDetail
