import React, { useState, useContext, useEffect } from 'react'
import styles from './Login.module.scss'
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind"
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import axios from 'axios';

import FormInput from '../../components/FormInput/FormInput';
import MyContext from '../../contexts/MyContext';

import logo from '../../IMG/logo.svg'

import LoginGoogle from '../../components/LoginGoogle/LoginGoogle';
import LogoutGoogle from '../../components/LoginGoogle/LogoutGoogle';
import { gapi } from 'gapi-script'
const Login = () => {
    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);
    const navigate = useNavigate();
    const ClientId = "699156329111-0iusrci8mnnaerihlmh83o2l7701dvn6.apps.googleusercontent.com"

    const [FormData, setValuesFormData] = useState({
        // username: "",
        email: "",
        password: "",
    });
    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            placeholder: "Password",
            // errorMessage:
            // "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(FormData)
        if (FormData.email !== "" & FormData.password !== "") {
            axios.post('/api/customer/login', FormData).then((res) => {
                const result = res.data;
                // console.log(result)
                if (result.success === true) {
                    // console.log(result)
                    Context.setToken(result.token);
                    Context.setCustomer(result.customer);
                    localStorage.setItem('accessToken', result.token);
                    localStorage.setItem('loginType ', 'normal');
                    localStorage.setItem('refreshToken', result.refreshtoken);
                    navigate('/home');
                } else {
                    Context.SetnotifyWarning('Tài khoản,mật khẩu không đúng hoặc bạn chưa active account')
                }
                // alert(result.message)
            });
        } else {
            Context.SetnotifyWarning('Tài khoản hoặc mật khẩu chưa được nhập')
        }

    };

    const onChange = (e) => {
        setValuesFormData({ ...FormData, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: ClientId,
                scope: ""
            })
        }
        gapi.load('client:auth2', start)
    })

    return (
        <div className={cx("Login")}>
            <div className={cx("Model")}>
                <Link to={'/home'}><HomeOutlinedIcon className={cx("Icon-Home")} /></Link>
                <img src={logo} alt="" className={cx("Logo")} />
                <div className={cx("Login-Content")}>

                    <h1>Login</h1>

                    <form >

                        {inputs.map((input) => (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={FormData[input.name]}
                                onChange={onChange}
                            />
                        ))}

                    </form>
                    <button type='submit' onClick={handleSubmit}>Submit</button>
                    <LoginGoogle />
                    <LogoutGoogle />
                    <Link to="#">Forget Your Password?</Link>

                    <p>Dont't have an account? <Link to="/Register">SignIn</Link></p>


                </div>

            </div>
        </div>
    )
}

export default Login
