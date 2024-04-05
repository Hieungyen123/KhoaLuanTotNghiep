import React, { useState, useContext, useEffect } from 'react'
import styled from './Update.module.scss';
import axios from "axios";
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import { debounce } from 'lodash';


const UpdateProduct = ({ slug, columns, value, setOpenUpdate, fetchData, subCategory, brand }) => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);


    console.log(value)
    const [inputName, setInputName] = useState(value.name)
    const [inputPrice, setInputPrice] = useState(value.price)
    const [inputQuantity, setInpuQuantity] = useState(value.quantity)
    const [inputUseFor, setInputUseFor] = useState(value.usesFor)
    const [inputDescription, setInputDescription] = useState(value.description)
    const [inputsideEffects, setInputsideEffects] = useState(value.sideEffects)
    const [inputBrand, setInputBrand] = useState(JSON.stringify(value.Brand))
    const [inputSubCategory, setInputSubCategory] = useState(JSON.stringify(value.SubCategory))
    const [inputImage, setInputImage] = useState(null)
    const [oldImage, setOldImage] = useState(value.image.filename)

    const handleChange = debounce((event) => {
        const { name, value, files } = event.target;
        if (name === 'file' && files && files.length > 0) {
            const selectedFiles = files[0];
            setInputImage(selectedFiles);
        }
    }, 500);

    // console.log(subCategory, brand);

    // const updatedImageState = { file: inputImage };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', inputImage);
        formData.append('price', inputPrice);
        formData.append('name', inputName);
        formData.append('quantity', inputQuantity);
        formData.append('usesFor', inputUseFor);
        formData.append('description', inputDescription);
        formData.append('sideEffects', inputsideEffects);
        formData.append('Brand', inputBrand);
        formData.append('SubCategory', inputSubCategory);
        formData.append('oldImage', oldImage);

        const config = {
            headers: {
                'x-access-token': Context.token,
                'Content-Type': 'multipart/form-data',
            }
        };


        axios.put('/api/admin/products/' + value._id, formData, config).then((res) => {
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
                    <div className={cx("item")} >
                        <label> Product Price</label>
                        <input value={inputPrice} onChange={(e) => { handleChange(e); setInputPrice(e.target.value) }} type='number' name='price' />
                    </div>
                    <div className={cx("item")} >
                        <label>Quanlity</label>
                        <input value={inputQuantity} onChange={(e) => { handleChange(e); setInpuQuantity(e.target.value) }} type='number' name='quantity' />
                    </div>
                    <div className={cx("item")} >
                        <label>side Effects</label>
                        <input value={inputsideEffects} onChange={(e) => { handleChange(e); setInputsideEffects(e.target.value) }} type='text' name='sideEffects' />
                    </div>
                    <div className={cx("item")} >
                        <label>uses For</label>
                        <input value={inputUseFor} onChange={(e) => { handleChange(e); setInputUseFor(e.target.value) }} type='text' name='usesFor' />
                    </div>
                    <div className={cx("item")} >
                        <label>description</label>
                        <input value={inputDescription} onChange={(e) => { handleChange(e); setInputDescription(e.target.value) }} type='text' name='description' />
                    </div>
                    <div className={cx("item-IMG")}>
                        <label>Image Product</label>
                        <input type="file" name="file" accept="image/jpeg, image/png" onChange={handleChange} />
                    </div>
                    <div className={cx("cusomselect")}>
                        {subCategory ?
                            (
                                <>
                                    <label>SubCategory</label>
                                    <select required onChange={(e) => { setInputSubCategory(e.target.value) }} name='SubCategory' defaultValue={inputSubCategory} className={cx("Select")}>

                                        {subCategory.map((option, index) => {

                                            return <option option className={cx("option")} key={option._id} value={JSON.stringify(option)} > {option.name}</option>
                                        })}
                                    </select>
                                </>

                            ) : null}
                    </div>
                    <div className={cx("cusomselect")}>
                        {brand ?
                            (
                                <>
                                    <label>Brand</label>
                                    <select required onChange={(e) => { setInputBrand(e.target.value) }} name='Brand' defaultValue={inputBrand} className={cx("Select")}>

                                        {brand.map((option, index) => {

                                            return <option className={cx("option")} key={option._id} value={JSON.stringify(option)}>{option.name}</option>
                                        })}
                                    </select>
                                </>
                            ) : ''}
                    </div>


                    <button type='submit' onClick={() => setTimeout(() => setOpenUpdate(false), 1000)}>Send</button>
                </form>
            </div >
        </div >
    )
}

export default UpdateProduct

