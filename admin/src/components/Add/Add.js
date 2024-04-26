import React, { useState, useContext, useEffect } from 'react'
import styled from './Add.module.scss';
import axios from "axios";
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import { debounce } from 'lodash';
import CircularProgress from '@mui/material/CircularProgress';

import LinearProgress from '@mui/material/LinearProgress';
const Add = ({ columns, setOpen, slug, fetchData, url, img, categories, SubCategory, Brand, BrandOrigin, role }) => {
    const cx = classNames.bind(styled);

    const Context = useContext(MyContext);


    const [limit, setLimit] = useState("")
    const [loading, setLoading] = useState(false)
    const [fields, setField] = useState("")
    var formData = new FormData();

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'file' && files && files.length > 0) {
            const selectedFiles = files[0];
            formData.append('file', selectedFiles);
        }
        else if (name === 'Category') {
            formData.delete('Namecategory');
            formData.delete('idcategory');
            const valueCate = JSON.parse(value)
            console.log('value', valueCate)
            formData.append('Namecategory', valueCate.name);
            formData.append('idcategory', valueCate._id);
        } else {
            formData.delete(name);
            formData.append(name, value);
        }

    }

    const handleSubmit = (e) => {
        setLoading(true)

        e.preventDefault();
        if (limit === "limit") {
            return false
        } else {
            const config = {
                headers: { 'x-access-token': Context.token }
            }
            axios.post(url, formData, config).then((res) => {
                const result = res.data;
                console.log(result)
                if (result.success === true) {
                    Context.SetnotifySuccess(result.message)
                    setOpen(false)
                    setLoading(false)
                } else {
                    Context.SetnotifyWarning(result.message)

                    setOpen(false)
                    setLoading(false)
                }
                for (let key of formData.keys()) {
                    formData.delete(key);

                }
            });
            fetchData()
        }
    };
    useEffect(() => { }
        , [loading])
    const checkLenght = (value, limit, field) => {
        if (value.length > limit) {
            setLimit("limit")
            setField(field)
        } else {
            setLimit("")
            setField('')
        }
    }

    // console.log(categories)
    return (
        <div className={cx("add")}>

            <div className={cx("modal")}>
                <span className={cx("close")} onClick={() => setOpen(false)}>
                    X
                </span>
                <h1>Add new{slug}</h1>
                {loading && <LinearProgress style={{ marginBottom: '10px' }} />}
                <form onSubmit={handleSubmit} enctype="multipart/form-data" >
                    {columns
                        .map((column) => {
                            if (column.headerName === 'description' || column.headerName === 'howUse' || column.headerName === 'usesFor' || column.headerName === 'descriptionLong') {
                                return (
                                    <div key={column.field} className={cx("item")} >
                                        <label>{column.field}</label>
                                        <textarea
                                            style={{ maxWidth: "500px", maxHeight: "200px" }}
                                            type={column.type}
                                            onChange={handleChange}
                                            required
                                            placeholder={column.field}
                                            name={column.headerName}
                                            onKeyUp={(e) => checkLenght(e.target.value, column.limit, column.field)} />
                                        {
                                            column.limit && (<p className={fields === column.field ? cx(limit) : ''}  >* Character smaller than {column.limit} </p>)
                                        }
                                    </div>
                                )
                            } else {
                                return (<div key={column.field} className={cx("item")} >
                                    <label>{column.field}</label>
                                    <input
                                        type={column.type}
                                        onChange={handleChange}
                                        required
                                        placeholder={column.field}
                                        name={column.headerName}
                                        onKeyUp={(e) => checkLenght(e.target.value, column.limit, column.field)} />
                                    {
                                        column.limit && (<p className={fields === column.field ? cx(limit) : ''}  >* Character smaller than {column.limit} </p>)
                                    }
                                </div>
                                )
                            }
                        })}
                    {SubCategory &&
                        (
                            <div className={cx("cusomselect")}>
                                <>
                                    <label>SubCategory</label>
                                    <select required onChange={handleChange} name='SubCategory' className={cx("Select")}>
                                        <option value="">-- Select --</option>
                                        {SubCategory.map((option, index) => {

                                            return <option className={cx("option")} key={option._id} value={JSON.stringify(option)}>{option.name}</option>
                                        })}
                                    </select>
                                </>


                            </div>
                        )}
                    {Brand &&
                        (
                            <div className={cx("cusomselect")}>

                                <>
                                    <label>Brand</label>
                                    <select required onChange={handleChange} name='Brand' className={cx("Select")}>
                                        <option value="">-- Select --</option>
                                        {Brand.map((option, index) => {

                                            return <option className={cx("option")} key={option._id} value={JSON.stringify(option)}>{option.name}</option>
                                        })}
                                    </select>
                                </>



                            </div>
                        )}
                    {categories &&
                        (
                            <div className={cx("cusomselect")}>

                                <>
                                    <label>categories</label>
                                    <select required onChange={handleChange} name='Category' className={cx("Select")}>
                                        <option value="">-- Select --</option>
                                        {categories.map((option, index) => {
                                            // console.log(option)
                                            return <option className={cx("option")} key={option._id} value={JSON.stringify(option)}>{option.name}</option>
                                        })}
                                    </select>
                                </>


                            </div>
                        )}
                    {BrandOrigin &&
                        (
                            <div className={cx("cusomselect")}>
                                <>
                                    <label>Brand Origin</label>
                                    <select required onChange={handleChange} name='BrandOrigin' className={cx("Select")}>
                                        <option value="">-- Select --</option>
                                        <option className={cx("option")} value='Việt Nam'>Việt Nam</option>
                                        <option className={cx("option")} value='Mỹ'>Mỹ</option>
                                        <option className={cx("option")} value='Trung Quốc'>Trung Quốc</option>
                                        <option className={cx("option")} value='Hoa Kỳ'>Hoa kỳ</option>
                                        <option className={cx("option")} value='Nhật Bản'>Nhật Bản</option>
                                        <option className={cx("option")} value='Đức'>Đức</option>
                                        <option className={cx("option")} value='Pháp'>Pháp</option>
                                        <option className={cx("option")} value='Hàn Quốc'>Hàn Quốc</option>
                                        <option className={cx("option")} value='Thụy Sĩ'>Thụy Sĩ</option>
                                        <option className={cx("option")} value='Ý'>Ý</option>
                                    </select>
                                </>


                            </div>
                        )}
                    {role &&
                        (
                            <div className={cx("cusomselect")}>
                                <>
                                    <label>Role User</label>
                                    <select required onChange={handleChange} name='role' className={cx("Select")}>
                                        <option value="">-- Select --</option>
                                        <option className={cx("option")} value='0'>Người dùng</option>
                                        <option className={cx("option")} value='1'>Admin</option>

                                    </select>
                                </>


                            </div>
                        )}
                    {img === true && (
                        <div className={cx("item-IMG")}>
                            <label>Image</label>
                            <input required type="file" name="file" accept="image/jpeg, image/png, image/webp" onChange={handleChange} />
                        </div>
                    )}
                    <button type='submit' >Send</button>
                </form>
            </div >
        </div >
    )
}

export default Add
