import React, { useState, useContext, useEffect } from 'react'
import styled from './Update.module.scss';
import axios from "axios";
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import { debounce } from 'lodash';


const UpdateSubcate = ({ slug, columns, value, setOpenUpdate, fetchData, categories }) => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);



    const [inputName, setInputName] = useState(value.name)
    const [inputCategory, setInputCategory] = useState(value.Namecategory)
    const [inputCategoryID, setInputCategoryID] = useState('')
    const [inputImage, setInputImage] = useState(null)
    const [oldImage, setOldImage] = useState(value.image.filename)
    // console.log('inputCategory', inputCategory)
    const handleChange = debounce((event) => {
        const { name, value, files } = event.target;
        if (name === 'file' && files && files.length > 0) {
            const selectedFiles = files[0];
            setInputImage(selectedFiles);
        }
    }, 500);

    console.log('inputName', inputName);

    // const updatedImageState = { file: inputImage };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', inputImage);
        formData.append('name', inputName);
        formData.append('oldImage', oldImage);
        formData.append('Namecategory', inputCategory);
        formData.append('idcategory', inputCategoryID);
        console.log(formData.get('name'));


        const config = {
            headers: {
                'x-access-token': Context.token,
                'Content-Type': 'multipart/form-data',
            }
        };


        axios.put('/api/admin/subcategories/' + value._id, formData, config).then((res) => {
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
                        <input type="file" name="file" accept="image/jpeg, image/png" onChange={handleChange} />
                    </div>
                    <div className={cx("cusomselect")}>
                        {categories.length > 0 ?
                            (
                                <>
                                    <label>Category</label>
                                    <select required onChange={(e) => { setInputCategory(e.target.value.name); setInputCategoryID(e.target.value.name._id) }} name='Category' defaultValue={inputCategory} className={cx("Select")}>

                                        {categories.map((option, index) => {

                                            return <option option className={cx("option")} key={option._id} value={option.name} > {option.name}</option>
                                        })}
                                    </select>
                                </>

                            ) : null}
                    </div>



                    <button type='submit' onClick={() => setTimeout(() => setOpenUpdate(false), 1000)}>Send</button>
                </form>
            </div >
        </div >
    )
}

export default UpdateSubcate

