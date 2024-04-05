import React, { useState, useContext, useEffect, } from 'react'
import styles from './ProductDetail.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const ProductDetail = () => {
    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);

    const [open, setOpen] = useState(true)
    const [product, setProduct] = useState({})


    const { id } = useParams();

    const UseFetchProduct = () => {
        axios.get('/api/customer/product/' + id).then((res) => {
            const result = res.data;
            // console.log(result)
            // console.log(result)
            setProduct(result)
        })
    }

    useEffect(() => {
        try {
            UseFetchProduct()
            if (product) {
                setOpen(false)
            }
        } catch {
        }
    }, [])

    console.log(product)

    return (
        <div className={cx("ProductDetail")}>
            <Modal
                open={open}
                // onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-content-loading'>
                    < CircularProgress />
                </div>
            </Modal>
            detial nè
        </div>
    )
}

export default ProductDetail
