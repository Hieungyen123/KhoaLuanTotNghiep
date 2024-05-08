import React, { useState } from 'react'
import styles from './Register.module.scss'
import classNames from "classnames/bind"
// import { motion, transform } from "framer-motion"
import { Link } from 'react-router-dom';
// import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FormInput from '../../components/FormInput/FormInput';
import axios from 'axios';

import logo from '../../IMG/logo.svg'
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';


const Register = () => {
    const cx = classNames.bind(styles)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [FormData, setValuesFormData] = useState({
        // username: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [active, setActive] = useState({
        token: "",
        id: ""
    });

    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "username",
            label: "User name",
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            required: true,
        },

        {
            id: 3,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            errorMessage: "Passwords don't match!",
            label: "Confirm Password",
            pattern: FormData.password,
            required: true,
        },
    ];
    const inputsActive = [
        {
            id: 1,
            name: "token",
            type: "token",
            placeholder: "Token",
            label: "Token...",
        },
        {
            id: 2,
            name: "id",
            type: "id",
            placeholder: "Id",
            label: "Id....",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(FormData)
        axios.post('/api/customer/signup', FormData).then((res) => {
            const result = res.data;
            console.log(result)
            console.log('chạy')
            if (result.success === false) {
                alert(result.message)
            } else {
                alert(result.message)
            }

        });
    };

    const handleSubmitActive = (e) => {
        e.preventDefault();
        // console.log(active)
        const id = active.id;
        const token = active.token;
        const body = { id: id, token: token };
        axios.post('/api/customer/active', body).then((res) => {
            const result = res.data;
            console.log(result)
            alert(result.message)
        });
    };

    const onChange2 = (e) => {
        setActive({ ...active, [e.target.name]: e.target.value });
    };
    const onChange = (e) => {
        setValuesFormData({ ...FormData, [e.target.name]: e.target.value });
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 400,
        backgroundColor: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '10px',
        flexDirection: 'column',
        gap: '20px'

    };
    return (
        <div className={cx("Register")}>
            <div className={cx("Model")}>
                <Link to={'/home'}><HomeOutlinedIcon className={cx("Icon-Home")} /></Link>
                <img src={logo} alt="" className={cx("Logo")} />

                <div className={cx("Register-Content")} style={{

                }}>
                    <h1>Đăng Kí</h1>
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
                    <button onClick={handleSubmit} type='submit'>Lưu</button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px' }} >Bạn đã có tài khoản? <Link style={{ color: '#5680e9', margin: 0, fontSize: '15px' }} to="/login">Đăng nhập</Link> or <p style={{ fontWeight: 500, color: '#5680e9' }} onClick={handleOpen}>Kích hoạt tài khoản</p></div>
                </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <div style={style} >
                        <form className={cx("Active-Content")} >
                            {inputsActive.map((input) => (
                                <FormInput
                                    key={input.id}
                                    {...input}
                                    value={active[input.name]}
                                    onChange={onChange2}
                                />
                            ))}

                        </form>
                        <button style={{ padding: '10px 15px', cursor: 'pointer', }} onClick={(e) => handleSubmitActive(e)} type='submit'>Submit</button>
                    </div>

                </Modal>

            </div>






        </div >
    )
}

export default Register
