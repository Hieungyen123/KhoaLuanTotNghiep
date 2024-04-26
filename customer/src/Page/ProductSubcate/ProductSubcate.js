import React, { useState, useContext, useEffect, } from 'react'
import styles from './ProductSubcate.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import CardSmall from '../../components/Card/CardSmall'

import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import HistoryProduct from '../../components/HistoryViewingProduct/HistoryProduct';
const ProductSubcate = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();
    const [products, setProducts] = useState([])
    const [subcategories, setSubcategories] = useState([]);
    const [noPages, setNoPages] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const [loading, setLoading] = useState(true)

    // bộ lọc
    const [openPrice, setOpenPrice] = useState(true)
    const [openBrand, setOpenBrand] = useState(true)
    const [openOriBrand, setOpenOriBrand] = useState(true)
    const [brand, setBrand] = useState([])
    const [numBrand, setNumBrand] = useState(3)
    const [numOriBrand, setNumOriBrand] = useState(3)
    const [priceRange, setPriceRange] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const [filters, setFilters] = useState({
        Brand: [],
        BrandOrigin: []
    });



    const fetchDataProduct = async (page) => {
        try {
            const response = await axios.get(`/api/customer/products/subcategory/${id}?page=` + page);
            console.log(response.data)
            const { products, noPages, curPage, subcategory } = response.data;
            setProducts(products);
            setNoPages(noPages);
            setCurPage(curPage);
            setSubcategories(subcategory)

        } catch (error) {
            console.error(error);
        }
    };
    const fetchBrand = async () => {
        try {
            axios.get('/api/customer/brandAll').then((res) => {
                const result = res.data;
                setBrand(result)
            })
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };
    const handlePageClick = async (e, p) => {
        setCurPage(p)
    }
    useEffect(() => {
        fetchDataProduct(curPage);
        fetchBrand()
    }, [curPage]);


    const handleCheckboxChangeBrand = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setFilters((prevState) => ({
                ...prevState,
                Brand: [...prevState.Brand, value]
            }));
        } else {
            setFilters((prevState) => ({
                ...prevState,
                Brand: prevState.Brand.filter((brand) => brand !== value)
            }));
        }
    };
    const handleCheckboxChangeBrandOri = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setFilters((prevState) => ({
                ...prevState,
                BrandOrigin: [...prevState.BrandOrigin, value]
            }));
        } else {
            setFilters((prevState) => ({
                ...prevState,
                BrandOrigin: prevState.BrandOrigin.filter((brand) => brand !== value)
            }));
        }
    };
    const handlePriceChange = (price) => {
        setPriceRange(price);
    };
    useEffect(() => {
        const filtered = products.filter((product) => {
            const brandCondition = !filters.Brand.length || filters.Brand.includes(product.Brand.name);
            const brandOriginCondition = !filters.BrandOrigin.length || filters.BrandOrigin.includes(product.Brand.BrandOrigin);
            if (priceRange.length > 0) {
                var priceCondition = product.price >= priceRange[0] && product.price <= priceRange[1];
            }
            return brandCondition && brandOriginCondition && priceCondition;
        });

        if (filters.Brand.length > 0 || filters.BrandOrigin.length > 0 || priceRange.length > 0) {
            setFilteredProducts(filtered);
            setLoading(false)
        } else {
            setFilteredProducts(products)
            setLoading(false)
        }

    }, [filters, priceRange, products])

    return (
        <div className={cx("Product-with-subcategory")}>
            <Modal
                open={loading}
                // onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-content-loading'>
                    < CircularProgress />
                </div>
            </Modal>
            <div className={cx("title")}>
                <p style={{ color: '#1250dc' }}>Trang chủ</p> /
                <p style={{ color: '#1250dc' }}>Thiết bị y tế</p> /
                <p>{subcategories.length > 0 && subcategories[0].Namecategory}</p> /
                <p>{subcategories.length > 0 && subcategories[0].name}</p>
            </div>
            <div className={cx("List-Products")}>
                <div className={cx("filter")}>
                    <div className={cx("List-filter-title")}>
                        <div> <FilterListIcon /><p> Bộ lọc nâng cao</p></div>
                    </div>
                    <div className={cx("List-filter")}>
                        <div className={cx("List-filter-price")}>
                            <div className={cx("List-filter-price-title")} onClick={() => setOpenPrice(!openPrice)}>
                                <p>Giá bán</p>
                                <ExpandMoreIcon className={cx("List-filter-price-title-icon")} style={{ transform: openPrice ? 'rotate(180deg)' : 'rotate(0)' }} />
                            </div>
                            <div style={{ height: openPrice ? '200px' : 0 }} className={cx("List-filter-price-list")}>
                                <div
                                    className={cx(priceRange[1] === 100 ? 'active' : 'item')}
                                    onClick={() => handlePriceChange([0, 100])}
                                >
                                    Dưới 100.000đ
                                </div>
                                <div
                                    className={cx(priceRange[1] === 200 ? 'active' : 'item')}
                                    onClick={() => handlePriceChange([100, 200])}
                                >
                                    100.000 - 200.000đ
                                </div>
                                <div
                                    className={cx(priceRange[0] === 300 ? 'active' : 'item')}
                                    onClick={() => handlePriceChange([300, 400])}
                                >
                                    300.000 - 400.000đ
                                </div>
                                <div
                                    className={cx(priceRange[0] === 500 ? 'active' : 'item')}
                                    onClick={() => handlePriceChange([500, 100000])}
                                >
                                    Trên 500.000đ
                                </div>
                            </div>

                        </div>
                        <div className={cx("List-filter-brand")}>
                            <div className={cx("List-filter-brand-title")} onClick={() => setOpenBrand(!openBrand)}>
                                <p>Thương hiệu</p>
                                <ExpandMoreIcon className={cx("List-filter-price-title-icon")} style={{ transform: openBrand ? 'rotate(180deg)' : 'rotate(0)' }} />
                            </div>
                            <div style={{ height: openBrand ? 'auto' : 0 }} className={cx("List-filter-brand-list")}>
                                <ul>


                                    {brand.length > 0 && brand !== undefined
                                        ? brand.slice(0, numBrand).map((item) => {
                                            return (
                                                <li className={cx('item')} key={item._id} >
                                                    <input type="checkbox" id={item.name} value={item.name} onChange={handleCheckboxChangeBrand} />
                                                    <label htmlFor={item.name}>{item.name}</label>

                                                </li>
                                            )
                                        })
                                        : null
                                    }
                                    <li style={{ display: numBrand >= brand.length ? 'none' : 'block' }} ><p onClick={() => setNumBrand(numBrand + 3)} className={cx("List-filter-price-more")} >Xem thêm</p></li>
                                </ul>

                            </div>
                        </div>
                        <div className={cx("List-filter-BrandOrigin")}>
                            <div className={cx("List-filter-BrandOrigin-title")} onClick={() => setOpenOriBrand(!openOriBrand)}>
                                <p>Xuất xứ thương hiệu</p>
                                <ExpandMoreIcon className={cx("List-filter-price-title-icon")} style={{ transform: openOriBrand ? 'rotate(180deg)' : 'rotate(0)' }} />
                            </div>
                            <div style={{ height: openOriBrand ? 'auto' : 0 }} className={cx("List-filter-BrandOrigin-list")}>
                                <ul>

                                    {brand.length > 0 && brand !== undefined
                                        ? brand.slice(0, numOriBrand).map((item) => {
                                            return (
                                                <li className={cx('item')} key={item._id} onChange={handleCheckboxChangeBrandOri} >
                                                    <input type="checkbox" id={item.BrandOrigin} value={item.BrandOrigin} />
                                                    <label htmlFor={item.BrandOrigin}>{item.BrandOrigin}</label>

                                                </li>
                                            )
                                        })
                                        : null
                                    }
                                    <li style={{ display: numOriBrand >= brand.length ? 'none' : 'block' }} ><p onClick={() => setNumOriBrand(numOriBrand + 3)} className={cx("List-filter-price-more")} >Xem thêm</p></li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx("List")}>
                    <div className={cx("title-list-product")}>
                        <h3>Danh sách sản phẩm</h3>
                    </div>
                    <div className={cx("List-Product")}>
                        {filteredProducts.length > 0
                            ? filteredProducts.map((item) => {
                                return (<CardSmall key={item._id} product={item} />)
                            })
                            : 'Không có sản phẩm nào được tìm thấy'
                        }
                    </div>
                    {filteredProducts.length > 0
                        ? (<div className={cx("papination")}>
                            <Stack spacing={2}>
                                <Pagination color="primary" count={noPages} page={curPage} defaultPage={1} boundaryCount={2} onChange={handlePageClick} />
                            </Stack>
                        </div>)
                        : null
                    }
                </div>
            </div>
            <HistoryProduct />






        </div >
    )
}

export default ProductSubcate
