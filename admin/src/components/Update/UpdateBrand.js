import React, { useState, useContext, useEffect } from 'react'
import styled from './Update.module.scss';
import axios from "axios";
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import { debounce } from 'lodash';


const UpdateBrand = ({ slug, columns, value, setOpenUpdate, fetchData, categories }) => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);

    // console.log(value)
    // console.log(categories)
    const [inputName, setInputName] = useState(value.name)
    const [inputImage, setInputImage] = useState(null)
    const [oldImage, setOldImage] = useState(value.image ? value.image?.filename : "")

    const [Origin, setInputOrigin] = useState(value.BrandOrigin)
    const [description, setInputdescription] = useState(value.description)


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
        formData.append('name', inputName);
        formData.append('oldImage', oldImage);
        formData.append('BrandOrigin', Origin);
        formData.append('description', description);
        console.log(formData.get('oldImage'));
        console.log(formData.get('BrandOrigin'));

        const config = {
            headers: {
                'x-access-token': Context.token,
                'Content-Type': 'multipart/form-data',
            }
        };


        axios.put('/api/admin/brand/' + value._id, formData, config).then((res) => {
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
                        <label>Name Product</label>
                        <input value={inputName} onChange={(e) => { handleChange(e); setInputName(e.target.value) }} type='text' name='name' />
                    </div>

                    <div className={cx("item-IMG")}>
                        <label>Image Product</label>
                        <input type="file" name="file" accept="image/jpeg, image/png, image/webp" onChange={handleChange} />
                    </div>
                    <div className={cx("item")}>
                        <label>Description</label>
                        <textarea type="text" value={description} name="description" onChange={(e) => { handleChange(e); setInputdescription(e.target.value) }} />
                    </div>




                    <div className={cx("cusomselect")}>

                        <>
                            <label>Brand Origin</label>
                            <select required value={Origin} onChange={(e) => { handleChange(e); setInputOrigin(e.target.value) }} name='BrandOrigin' className={cx("Select")}>
                                <option value="">-- Select --</option>
                                <option className={cx("option")} value='VietNam'>Việt Nam</option>
                                <option className={cx("option")} value='My'>Mỹ</option>
                                <option className={cx("option")} value='TrungQuoc'>Trung Quốc</option>
                                <option className={cx("option")} value='HoaKy'>Hoa kỳ</option>
                                <option className={cx("option")} value='NhatBan'>Nhật Bản</option>
                                <option className={cx("option")} value='Duc'>Đức</option>
                            </select>
                        </>


                    </div>




                    <button type='submit' onClick={() => setTimeout(() => setOpenUpdate(false), 1000)}>Send</button>
                </form>
            </div >
        </div >
    )
}

export default UpdateBrand

