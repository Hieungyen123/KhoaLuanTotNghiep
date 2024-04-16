import React, { useState, useContext, useEffect } from 'react'
import styled from './Update.module.scss';
import axios from "axios";
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import { debounce } from 'lodash';


const UpdateCustomer = ({ slug, columns, value, setOpenUpdate, fetchData, subCategory, brand }) => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);


    const [inputName, setInputName] = useState(value.username)
    const [inputEmail, setInputEmail] = useState(value.email)
    const [inputPassword, setInpuPassword] = useState(value.password)
    const [inputActive, setInputActive] = useState(value.active)
    const [inputPhone, setInputPhone] = useState(value.phone)
    const [inputRole, setInputRole] = useState(value.role)
    const [inputImage, setInputImage] = useState(null)

    const [oldImage, setOldImage] = useState(value.image ? value.image?.filename : "")
    const handleChange = debounce((event) => {
        const { name, value, files } = event.target;
        if (name === 'file' && files && files.length > 0) {
            const selectedFiles = files[0];
            setInputImage(selectedFiles);
        }
    }, 500);

    // const updatedImageState = { file: inputImage };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', inputImage);
        formData.append('email', inputEmail);
        formData.append('password', inputPassword);
        formData.append('active', inputActive);
        formData.append('name', inputName);
        formData.append('role', inputRole);

        formData.append('oldImage', oldImage);

        const config = {
            headers: {
                'x-access-token': Context.token,
                'Content-Type': 'multipart/form-data',
            }
        };


        axios.put('/api/admin/customers/' + value._id, formData, config).then((res) => {
            const result = res.data;
            console.log(result)
            if (result) {
                Context.SetnotifySuccess(result.message)

                // fetchData()

            } else {
                Context.SetnotifyWarning(result.message)

            }
        });
        fetchData()
        // setOpen(false)cd

    }






    return (
        <div className={cx("update")}>
            <div className={cx("modal")}>
                <span className={cx("close")} onClick={() => setOpenUpdate(false)}>
                    X
                </span>
                <h1>Update Product</h1>
                <form onSubmit={(e) => handleSubmit(e)} enctype="multipart/form-data">


                    <div className={cx("item")} >
                        <label>Name User</label>
                        <input value={inputName} onChange={(e) => { handleChange(e); setInputName(e.target.value) }} type='text' name='name' />
                    </div>
                    <div className={cx("item")} >
                        <label> Email User</label>
                        <input value={inputEmail} onChange={(e) => { handleChange(e); setInputEmail(e.target.value) }} type='email' name='email' />
                    </div>
                    <div className={cx("item")} >
                        <label>PassWord</label>
                        <input value={inputPassword} onChange={(e) => { handleChange(e); setInpuPassword(e.target.value) }} type='number' name='password' />
                    </div>
                    <div className={cx("item")} >
                        <label>Mobile</label>
                        <input value={inputPhone} onChange={(e) => { handleChange(e); setInputPhone(e.target.value) }} type='number' name='phone' />
                    </div>
                    <div className={cx("item")} >
                        <label>Active</label>
                        <input value={inputActive} onChange={(e) => { handleChange(e); setInputActive(e.target.value) }} type='text' name='ative' />
                    </div>
                    <div className={cx("cusomselect")}>

                        <label>Role</label>
                        <select required value={inputRole} onChange={(e) => { handleChange(e); setInputRole(e.target.value) }} name='role' className={cx("Select")}>
                            <option value="">-- Select --</option>
                            <option className={cx("option")} value='0'>Người dùng</option>
                            <option className={cx("option")} value='1'>Admin</option>

                        </select>

                    </div>

                    <div className={cx("item-IMG")}>
                        <label>Image</label>
                        <input required type="file" name="file" accept="image/jpeg, image/png, image/webp" onChange={handleChange} />
                    </div>
                    <button type='submit' onClick={() => setTimeout(() => setOpenUpdate(false), 1000)}>Send</button>
                </form>
            </div >
        </div >
    )
}

export default UpdateCustomer

