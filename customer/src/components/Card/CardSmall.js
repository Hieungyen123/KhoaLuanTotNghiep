import React, { useState, useContext } from 'react'
import styles from './CardSmall.module.scss'
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import MyContext from "../../contexts/MyContext";

const CardSmall = ({ product, button }) => {
    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);

    const btnAdd2CartClick = (e, item) => {
        e.preventDefault();
        const quantity = 1
        if (quantity) {
            const mycart = Context.mycart;
            const index = mycart.findIndex(x => x.product._id === item._id); // check if the _id exists in mycart
            if (index === -1) { // not found, push newItem
                const newItem = { product: item, quantity: quantity };
                mycart.push(newItem);
            } else { // increasing the quantity
                mycart[index].quantity += quantity;
            }
            Context.setMycart(mycart);
            Context.SetnotifySuccess('sản phẩm đã thêm vào giỏ hàng của bạn')
        } else {
            Context.notifyWarning('mong bạn kiểm tra lại giúp mình số lượng')
        }
    }
    return (
        <div>
            <div className={cx('Card')}>
                <Link to={"/product/" + product._id}><img src={product.image.path} alt="Anh san pham" /></Link>
                <div className={cx('Content')}>
                    <div className={cx('Title')}>
                        <p className={cx('Name')}>{product.name}</p>
                        <p className={cx('Cost')}>{product.price}.000đ</p>
                    </div>
                    {button && <div className={cx('Cart')} onClick={(e) => btnAdd2CartClick(e, product)}>
                        <button>Thêm vào giỏ hàng</button>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default CardSmall
