import React, { useContext, useState } from 'react'
import styles from './Nav.module.scss'
import classNames from "classnames/bind";
import Menu from '../Menu/Menu';
import logo from '../../IMG/logo.svg'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import MyContext from '../../contexts/MyContext';

import Cart from '../Cart/Cart';

// icon 
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
const Nav = () => {


    const [open, setOpen] = useState(false)
    const [openCart, setOpenCart] = useState(false)
    const Context = useContext(MyContext);
    const cx = classNames.bind(styles)


    const HandleCart = () => {
        setOpen(!open)

    }

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
                                        <Link to='/login'>Login</Link>
                                        <div className={cx("center")}></div>
                                        <Link to='/register'>Register</Link></>)
                                    : (
                                        <div onClick={() => { setOpen(false) }} className={cx('user-bar')}>
                                            <Link to={'/myprofile/profile/' + Context.customer._id}><AccountCircleOutlinedIcon className={cx('user-icon')} /></Link>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                    <div className={cx("Bottom")}>
                        <div></div>

                        <div className={cx("Input")} >
                            <input type="text" />
                            <SearchOutlinedIcon className={cx("icon-search")}></SearchOutlinedIcon>
                        </div>
                        <div className={cx("Shopping-cart")} onMouseEnter={() => setOpenCart(true)}
                            onMouseLeave={() => setOpenCart(false)} >
                            <ShoppingCartIcon className={cx("icon")}></ShoppingCartIcon>
                            <Cart openCart={openCart} setOpenCart={setOpenCart} />

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Nav
