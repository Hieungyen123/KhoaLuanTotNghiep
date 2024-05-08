import React, { useContext, useEffect, useState } from 'react'
import styles from './Card.module.scss'
import classNames from "classnames/bind";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from 'react-router-dom';
import MyContext from "../../contexts/MyContext";
import hasPromotion from '../../ultils/checkDiscount';
const Card = ({ product }) => {
    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);

    const [modal, setModal] = useState(false);
    const [isPromotion, setIsPromotion] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };



    if (isPromotion) {
        var discountPrice = Math.ceil(product.price - (product.price * (product.promotion.discountPercent / 100)))

    }

    useEffect(() => {
        if (hasPromotion(product)) {
            setIsPromotion(true)
        } else {
            setIsPromotion(false)
        }
    }, [product])

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
                <div title="quick view" onClick={toggleModal} ><VisibilityOutlinedIcon className={cx('QuickView-Icon')} /></div>
                {isPromotion &&
                    <div className={cx('promotion')}>
                        <span>{product.promotion.discountPercent}%</span>
                    </div >
                }
                <div className={cx('Content')}>
                    <div className={cx('Title')}>
                        <p className={cx('Name')}>{product.name}</p>
                    </div>
                    <div className={cx('Cart')}>
                        <div className={cx('Price')}>
                            {isPromotion && <p style={{ color: '#1250dc' }} className={cx('Cost')}>{discountPrice}.000 VNĐ</p>}
                            <p style={{ color: discountPrice ? '#657384' : '#1250dc', fontSize: discountPrice ? '14px' : '16px', fontWeight: discountPrice ? 400 : 500, textDecorationLine: discountPrice ? 'line-through' : 'none' }} className={cx('Cost')}>{product.price}.000 VNĐ</p>
                        </div>
                        <AddShoppingCartOutlinedIcon className={cx('Icon')} onClick={(e) => btnAdd2CartClick(e, product)} />
                    </div>
                </div>
            </div>

            {
                modal && (
                    <div className={cx('modal')}>
                        <div onClick={toggleModal} className={cx('overlay')}></div>
                        <div className={cx('modal-content')}>
                            <div className={cx('modal-content-image')}>
                                <img src={product.image.path} alt="" />
                            </div>
                            <div className={cx('modal-content-title')}>
                                <h2>{product.name}</h2>
                                <p style={{ color: '#1250dc' }}><strong>Giá:</strong>  {product.price}.000 VNĐ</p>
                                <p><strong>Số lượng:</strong> {product.quantity}</p>
                                <p><strong>Thương Hiệu:</strong> {product.Brand.name}</p>
                                <p><strong>Loại Hàng:</strong> {product.SubCategory.name}</p>
                                <p className={cx('modal-content-decs')}>
                                    <strong> Mô tả:</strong> {product.description}
                                </p>
                            </div>
                            <div className={cx('close-modal')} >
                                <AddShoppingCartOutlinedIcon className={cx('icon')} onClick={(e) => btnAdd2CartClick(e, product)} />
                                <CancelOutlinedIcon onClick={toggleModal} className={cx('icon-close')} />
                            </div>
                        </div>
                    </div>

                )
            }
        </div >

    )
}

export default Card
