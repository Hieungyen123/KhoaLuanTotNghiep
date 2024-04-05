import React, { useState } from 'react'
import styles from './Card.module.scss'
import classNames from "classnames/bind";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
    const cx = classNames.bind(styles)
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    console.log(product)
    return (
        <Link to={"/product/" + product._id}>
            <div className={cx('Card')}>
                <img src={product.image.path} alt="Anh san pham" />
                <addr title="quick view" onClick={toggleModal} ><VisibilityOutlinedIcon className={cx('QuickView-Icon')} /></addr>

                <div className={cx('Content')}>
                    <div className={cx('Title')}>
                        <p className={cx('Name')}>{product.name}</p>
                    </div>
                    <div className={cx('Cart')}>
                        <p className={cx('Cost')}>{product.price}.000đ</p>
                        <AddShoppingCartOutlinedIcon className={cx('Icon')} />
                    </div>
                </div>

            </div>
            {modal && (
                <div className={cx('modal')}>
                    <div onClick={toggleModal} className={cx('overlay')}></div>
                    <div className={cx('modal-content')}>
                        <div className={cx('modal-content-image')}>
                            <img src={product.image.path} alt="" />
                        </div>
                        <div className={cx('modal-content-title')}>
                            <h2>{product.name}</h2>
                            <p><strong>Giá:</strong> {product.price}</p>
                            <p><strong>Số lượng:</strong> {product.quantity}</p>
                            <p><strong>Thương Hiệu:</strong> {product.Brand.name}</p>
                            <p><strong>Loại Hàng:</strong> {product.SubCategory.name}</p>
                            <p className={cx('modal-content-decs')}>
                                <strong> Mô tả:</strong> {product.description}
                            </p>
                        </div>
                        <div className={cx('close-modal')} >
                            <AddShoppingCartOutlinedIcon className={cx('icon')} />
                            <CancelOutlinedIcon onClick={toggleModal} className={cx('icon-close')} />
                        </div>
                    </div>
                </div>
            )}
        </Link>
    )
}

export default Card
