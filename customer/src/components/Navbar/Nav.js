import React, { useCallback, useContext, useEffect, useState } from 'react'
import styles from './Nav.module.scss'
import classNames from "classnames/bind";
import Menu from '../Menu/Menu';
import logo from '../../IMG/logo.svg'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import MyContext from '../../contexts/MyContext';

import Cart from '../Cart/Cart';

import empty from '../../IMG/emty-search.png'

// icon 
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
const Nav = () => {


    const [open, setOpen] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const Context = useContext(MyContext);
    const cx = classNames.bind(styles)

    const [openSearch, setOpenSearch] = useState(false)
    const [valueSeacrch, setValueSeacrch] = useState('')
    const [resultSearch, setResultSearch] = useState([])

    const HandleCart = () => {
        setOpen(!open)
    }
    console.log('resultSearch', resultSearch)
    const GetProductSearch = useCallback(
        () => {

            if (valueSeacrch !== "") {

                try {
                    axios.get('/api/customer/products/searchTop3/' + valueSeacrch).then((res) => {
                        // console.log("Calling API with input value:", valueSeacrch);
                        const result = res.data;
                        setResultSearch(result)

                    })

                } catch (error) {
                    // Xử lý lỗi nếu có
                    console.error(error);
                }
            }

        },
        [valueSeacrch]
    );

    useEffect(() => {
        setOpenSearch(true)
        const timerId = setTimeout(() => {
            GetProductSearch();
        }, 2000);

        return () => {
            clearTimeout(timerId);
        };
    }, [GetProductSearch, valueSeacrch]);



    return (
        <div className={cx("Nav")}>
            <div className='container'>
                <div className={cx("Content")}>
                    <div className={cx("Top")} style={{
                        // left: props.hovering !== null ? 80 : 'none',
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                    }}>
                        <div className={cx("Left")}>
                            <Link to='/home'><img src={logo} alt="" /></Link>


                            {/* <Link to="/search">search</Link> */}
                        </div>

                        <div className={cx("Right")}>

                            <div className={cx("Info")}>
                                {Context.customer === undefined || Context.customer === null
                                    ? (<>
                                        <Link to='/login'>Đăng nhập</Link>
                                        <div className={cx("center")}></div>
                                        <Link to='/register'>Đăng kí</Link></>)
                                    : (
                                        <div onClick={() => { setOpen(false) }} className={cx('user-bar')}>
                                            <Link to={'/myprofile/profile/' + Context.customer._id}><AccountCircleOutlinedIcon className={cx('user-icon')} /></Link>
                                            <p>{Context.customer.username}</p>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className={cx("Bottom")}>
                        <div></div>

                        <div className={cx("Input")} >
                            <input type="text" value={valueSeacrch} onChange={(e) => setValueSeacrch(e.target.value)} />

                            <SearchOutlinedIcon className={cx("icon-search")}></SearchOutlinedIcon>


                            {openSearch && valueSeacrch !== "" ?
                                <div className={cx("Input-search-result")}>
                                    <div className={cx("Input-search-result-title")}>
                                        <p>Tìm kiếm theo {valueSeacrch} </p>
                                        <ClearIcon onClick={() => setValueSeacrch("")} className={cx("icon-clear")}></ClearIcon>
                                    </div>
                                    <div className={cx("Input-search-result-List")}>
                                        {resultSearch.length > 0 ? resultSearch?.map(item => {
                                            return (
                                                <div key={item._id} className={cx("item")}>
                                                    <img src={item.image.path} alt="" />
                                                    <div className={cx("item-inf")}>
                                                        <p>{item.name}</p>
                                                        <p><strong>{item.price}.000đ</strong></p>
                                                    </div>
                                                </div>)
                                        }) : <div className={cx("Input-search-result-empty")}> không tìm thấy sản phẩm nào hết <img src={empty} alt="" /></div>}

                                    </div>

                                    <Link className={cx("Input-search-result-More")}>
                                        Xem thêm <KeyboardArrowRightIcon className={cx("icon")} />
                                    </Link>
                                </div>

                                : null}
                        </div>
                        <div className={cx("Shopping-cart")} onMouseEnter={() => setOpenCart(true)}
                            onMouseLeave={() => setOpenCart(false)} >
                            <Link to='/cartdetail'  ><ShoppingCartIcon style={{ color: 'white' }} className={cx("icon")}></ShoppingCartIcon></Link>
                            <p style={{ display: openCart ? 'none' : 'flex' }} className={cx("lengthCart")}>{Context.mycart.length}</p>
                            <Cart openCart={openCart} setOpenCart={setOpenCart} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Nav
