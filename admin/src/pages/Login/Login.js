import React, { useState, useContext } from 'react'
import styled from './Login.module.scss';
import classNames from "classnames/bind";
import axios from 'axios'
import MyContext from '../../contexts/MyContext';
import logo from '../../images/logo.svg'
const Login = () => {


    const cx = classNames.bind(styled);
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')


    const Context = useContext(MyContext);
    // console.log(Context)

    const btnLoginClick = (e) => {
        e.preventDefault();
        const username = name;
        const password = pass;
        if (username && password) {
            const account = { username: username, password: password };
            apiLogin(account);
        } else {
            alert('Please input username and password');
        }
    }
    // apis
    const apiLogin = (account) => {
        axios.post('/api/admin/login', account).then((res) => {
            const result = res.data;
            if (result.success === true) {
                Context.setToken(result.token);
                Context.setUserName(account.username);
                // Context.setTest(result)
                // window.location.href = "admin/home"
            } else {
                alert(result.message);
            }
        });
    }
    if (Context.token === '') {
        return (
            <div className={cx('Login')}>
                <div className={cx('Model')}>
                    <div className={cx('Logo')}>
                        <img src={logo} alt="" />
                        <p>Manager website</p>
                    </div>
                    <h2 className={cx('Title')}>Welcome Back Admin!</h2>
                    <div className={cx('Login-content')}>
                        <div className={cx('Login-input')}>
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>

                        <div className={cx('Login-input')}>
                            <label>Password</label>
                            <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} />
                        </div>

                        <button className={cx('Login-submit')} onClick={(e) => btnLoginClick(e)} >Login</button>
                    </div>
                </div>





            </div>
        )
    }
    return ('');
}



export default Login
