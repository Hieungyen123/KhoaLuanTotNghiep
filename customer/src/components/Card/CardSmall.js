import React, { useState } from 'react'
import styles from './CardSmall.module.scss'
import classNames from "classnames/bind";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from 'react-router-dom';

const CardSmall = ({ product }) => {
    const cx = classNames.bind(styles)
    const [modal, setModal] = useState(false);

    // console.log(product)
    // console.log('render card 1')
    return (
        <Link to={"/product/" + product._id}>
            <div className={cx('Card')}>
                <img src={product.image.path} alt="Anh san pham" />
                <div className={cx('Content')}>
                    <div className={cx('Title')}>
                        <p className={cx('Name')}>{product.name}</p>
                        <p className={cx('Cost')}>{product.price}.000đ</p>
                    </div>
                    <div className={cx('Cart')}>
                        <button>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardSmall
