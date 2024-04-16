import React, { useState, useContext, useEffect, } from 'react'
import styles from './ProductCategory.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import CardSmall from '../../components/Card/CardSmall'
const ProductCategory = () => {

    const cx = classNames.bind(styles)
    const Context = useContext(MyContext);
    const { customer } = Context;

    const [products, setProducts] = useState([])
    const [subcategories, setSubcategories] = useState([]);
    const [category, SetCategory] = useState([])
    const [noPages, setNoPages] = useState(0);
    const [curPage, setCurPage] = useState(1);


    const { id } = useParams();

    // Sử dụng ID ở đây để thực hiện các xử lý tương ứng
    console.log('ID:', id);
    const fetchDataProduct = async (page) => {

        try {
            const response = await axios.get(`/api/customer/products/category/${id}?page=` + page);
            console.log(response.data)
            const { products, noPages, curPage, subcategories, category } = response.data;
            setProducts(products);
            setNoPages(noPages);
            setCurPage(curPage);
            setSubcategories(subcategories)
            SetCategory(category)

        } catch (error) {
            console.error(error);
        }
    };
    // const fectchDataSubcategory


    // console.log(products, noPages, curPage, subcategories)
    const handlePageClick = async (e, p) => {
        setCurPage(p)
    }

    useEffect(() => {
        fetchDataProduct(curPage);
    }, [curPage]);

    return (
        <div className={cx("Product-with-category")}>
            <div className={cx("title")}>
                <p style={{ color: '#1250dc' }}>Trang chủ</p> /
                <p style={{ color: '#1250dc' }}>Thiết bị y tế</p> /
                <p>{category.name}</p>
            </div>
            <div className={cx("List-Subcategory")}>
                <div className={cx("title-subcategory")}>
                    <h3>{category.name}</h3>
                    <div className={cx("list-subcategory")}>
                        {
                            subcategories.length > 0
                                ? subcategories.map((item) => {
                                    return (
                                        <div className={cx("item")}>
                                            <img src={item.image.path} alt="" />
                                            <p>{item.name}</p>
                                        </div>
                                    )
                                })
                                : ''
                        }
                    </div>
                </div>
            </div>

            <div className={cx("List-Products")}>
                <div className={cx("List-filter")}>

                </div>
                <div className={cx("List")}>
                    <div className={cx("title-list-product")}>
                        <h3>Danh sách sản phẩm</h3>
                    </div>
                    <div className={cx("List-Product")}>
                        {products.length > 0
                            ? products.map((item) => {
                                return (<CardSmall product={item} />)
                            })
                            : null
                        }
                    </div>
                    <div className={cx("papination")}>
                        <Stack spacing={2}>
                            <Pagination color="primary" count={noPages} page={curPage} defaultPage={1} boundaryCount={2} onChange={handlePageClick} />
                        </Stack>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default ProductCategory
