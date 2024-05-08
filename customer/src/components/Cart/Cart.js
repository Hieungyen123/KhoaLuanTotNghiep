import React from "react";
import { useContext } from "react";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Cart.module.scss'

import MyContext from "../../contexts/MyContext";

import { Link } from "react-router-dom";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CartUtil from "../../ultils/CartUtil"
import 'react-toastify/dist/ReactToastify.css';

import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import hasPromotion from "../../ultils/checkDiscount";
function Cart(prop) {
    const Context = useContext(MyContext);
    const Cart = Context.mycart

    // console.log('cart', Cart)

    const cx = classNames.bind(styles)
    const [quantity, setQuantity] = useState(null)
    // const [isPromotion, setIsPromotion] = useState(false);

    const handleCartChild = () => {
        prop.setOpenCart();
    };
    const lnkRemoveClick = (id) => {
        const mycart = Context.mycart;
        const index = mycart.findIndex(x => x.product._id === id);
        if (index !== -1) { // found, remove item
            mycart.splice(index, 1);
            Context.SetnotifySuccess('xóa sản phẩm thành công')
            Context.setMycart(mycart);
        }
    };
    const lnkRemoveAll = () => {
        Context.setMycart([]);
        Context.SetnotifySuccess('xóa tất cả sản phẩm thành công')
    };

    const handleQuantityPlus = (id, quantity) => {
        // console.log(id)
        Cart.map(item => {
            if (item.product._id === id) {
                // console.log(item.product._id)
                item.quantity += 1
            }
        })
    }
    const handleQuantityMinus = (id, quantity) => {
        // console.log(id)
        Cart.map(item => {
            if (item.product._id === id) {
                // console.log(item.product._id)
                if (quantity > 1) {
                    item.quantity -= 1
                }
            }
        })
    }



    return (
        <div
            style={{ opacity: prop.openCart ? '100%' : '0', visibility: prop.openCart ? 'visible' : 'hidden', transform: prop.openCart ? 'translateY(0)' : 'translateY(-10px)' }}
            className={cx('cart')}>
            {!Cart.length
                ? <div className={cx('null')} >
                    <div>Giỏ hàng của bạn trống</div>
                </div>
                : (
                    <>
                        <div className={cx('title')}>
                            <h3>Giỏ hàng của bạn</h3>
                            <span onClick={() => lnkRemoveAll()} >< DeleteSweepOutlinedIcon className={cx('reset')} /></span>
                        </div>
                        <div className={cx('listproduct')}>
                            {Cart.map(item => {
                                if (hasPromotion(item.product)) {
                                    var discountPrice = Math.ceil(item.product.price - (item.product.price * (item.product.promotion.discountPercent / 100)))
                                    return (
                                        <div className={cx('item')} key={item.product._id}>
                                            <div className={cx('content-img')}>
                                                <img src={item.product.image.path} key={item.product._id} alt="" />
                                            </div>
                                            <div className={cx('item-content')}>
                                                <div className={cx('details')}>
                                                    <p className={cx('name')}>{item.product.name}</p>
                                                    {/* <p>{item.product.category.name}</p> */}
                                                    <p className={cx('price')}>{discountPrice}.000VNĐ / 1 sản phẩm</p>
                                                </div>
                                                <div className={cx('quantity')}>
                                                    <button className={cx(item.quantity <= 1 ? 'none' : '')} onClick={(e) => {
                                                        handleQuantityMinus(item.product._id, item.quantity)
                                                        setQuantity(item.quantity)
                                                    }}>-</button>
                                                    <div className={cx('price')}>{item.quantity} </div>
                                                    <button onClick={(e) => {
                                                        handleQuantityPlus(item.product._id, item.quantity)
                                                        setQuantity(item.quantity)
                                                    }}>+</button>
                                                </div>
                                            </div>
                                            <div className={cx('delete-button')}>
                                                <ClearOutlinedIcon className={cx('delete')} onClick={() => lnkRemoveClick(item.product._id)} />
                                            </div>

                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className={cx('item')} key={item.product._id}>
                                            <div className={cx('content-img')}>
                                                <img src={item.product.image.path} key={item.product._id} alt="" />
                                            </div>
                                            <div className={cx('item-content')}>
                                                <div className={cx('details')}>
                                                    <p className={cx('name')}>{item.product.name}</p>
                                                    {/* <p>{item.product.category.name}</p> */}
                                                    <p className={cx('price')}>{item.product.price}.000VNĐ / 1 sản phẩm</p>
                                                </div>
                                                <div className={cx('quantity')}>
                                                    <button className={cx(item.quantity <= 1 ? 'none' : '')} onClick={(e) => {
                                                        handleQuantityMinus(item.product._id, item.quantity)
                                                        setQuantity(item.quantity)
                                                    }}>-</button>
                                                    <div className={cx('price')}>{item.quantity} </div>
                                                    <button onClick={(e) => {
                                                        handleQuantityPlus(item.product._id, item.quantity)
                                                        setQuantity(item.quantity)
                                                    }}>+</button>
                                                </div>
                                            </div>
                                            <div className={cx('delete-button')}>
                                                <ClearOutlinedIcon className={cx('delete')} onClick={() => lnkRemoveClick(item.product._id)} />
                                            </div>

                                        </div>
                                    )
                                }

                            })}
                        </div>
                        <div className={cx('footerCart')}>
                            <div className={cx('totalss')}>
                                <span>Tổng giá tiền :</span>
                                <span> {CartUtil.getTotalWithDiscount(Context.mycart)}.000VND </span>
                            </div>
                            <button><Link to='/cartdetail' onClick={() => handleCartChild()} >Xem Chi tiết</Link></button>
                        </div>

                    </>)}

        </div>
    );

}

export default Cart;
