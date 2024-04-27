import React from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
// import Nav from '../Navbar/Nav'
// import Footer from '../Footer/Footer'
import { AnimatePresence } from "framer-motion"
import MainLayout from '../../Layout/MainLayout/MainLayout'
// import NavLayout from '../../Layout/NavLayout/NavLayout'
import EmptyLayout from '../../Layout/EmptyLayout/EmptyLayout'

import { MainRoute, NavRoute, EmptyRoute } from '../../Route'

// import Home from '../../Page/HomePage/Home'
// import Login from '../../Page/Login/Login'
// import Search from '../../Page/Search/Search'


import { useEffect, useContext } from 'react';
import axios from 'axios';
import MyContext from '../../contexts/MyContext';
import { useNavigate } from 'react-router-dom';
import Profile from '../../Page/Profile/Profile'
import ChangePass from '../../Page/Profile/ChangePass'
import MyProfile from '../../Page/Profile/MyProfile'
import MyOrder from '../../Page/Profile/MyOrder'
import MyAddress from '../../Page/Profile/MyAddress'
const Main = () => {

    const location = useLocation()
    const navigate = useNavigate();

    const Context = useContext(MyContext);
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem("refreshToken");

    useEffect(() => {
        if (token) {
            const checkTokenValidity = async () => {
                try {
                    await axios.get('/api/customer/token', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        }
                    }).then((res) => {
                        const result = res.data;
                        console.log(result)
                        Context.setToken(token);
                        Context.setCustomer(result);
                    })
                } catch (error) {
                    if (error.response.status === 403) {
                        if (refreshToken) {
                            try {
                                const config = { refreshToken: refreshToken }
                                axios.post('/api/customer/refreshtoken', config).then((res) => {
                                    const result = res.data;
                                    if (result === false) {
                                        if (!Context.isWarningDisplayed) {
                                            // Context.SetnotifyWarning('Phiên đăng nhập của bạn đã hết hạn');
                                            Context.setWarningDisplayed();
                                        }
                                    } else {
                                        localStorage.setItem('accessToken', result.accessToken);
                                        localStorage.setItem('refreshToken', result.newRefreshToken);
                                        Context.setToken(result.accessToken);
                                        Context.setCustomer(result.customer);
                                    }
                                })
                                // Token đã được làm mới, tiếp tục thực hiện các tác vụ khác
                            } catch (error) {
                                console.log(error)
                            }
                        } else {
                            // Không có refreshToken trong localStorage, xử lý tại đây
                            // navigate('/home')
                        }
                    } else {
                        // Lỗi xác thực token khác, xử lý tại đây
                    }
                }
            };
            checkTokenValidity();
        } else {
            console.log('Không có refreshToken trong localStorage');
            // navigate('/home');

        }
    }, [token, refreshToken]);

    return (
        <div className='Customer-client'>
            <AnimatePresence>
                <Routes location={location} key={location.pathname} >
                    <Route path='/' element={<Navigate replace to='/home' />} />

                    <Route path="myprofile" element={<MainLayout> <Profile /></MainLayout>} >
                        <Route path='' element={<MyProfile />} />
                        <Route path='myorders/:cid' element={<MyOrder />} />
                        <Route path="profile/:id" element={<MyProfile />} />
                        <Route path="changepass" element={<ChangePass />} />
                        <Route path="myaddress" element={<MyAddress />} />
                    </Route>

                    {MainRoute.map((route, index) => {
                        return (<Route key={index} path={route.path} element={<MainLayout>{route.element}</MainLayout>} />)
                    })}
                    {EmptyRoute.map((route, index) => {
                        return (<Route key={index} path={route.path} element={<EmptyLayout>{route.element}</EmptyLayout>} />)
                    })}

                </Routes>
            </AnimatePresence>
        </div >
    )
}

export default Main
