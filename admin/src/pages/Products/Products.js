import React, { useContext, useEffect, useState } from 'react'
import styled from './Products.module.scss';
import classNames from "classnames/bind";
import Table from '../../components/DataTable/Table';
import MyContext from '../../contexts/MyContext';
import Add from '../../components/Add/Add';
import axios from "axios";
import { Skeleton } from '@mui/material';
import Modal from '@mui/material/Modal';

import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Products = () => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)
    const [openPromotion, setOpenPromotion] = useState(false)
    const [subCategory, setSubCategory] = useState([])
    const [brand, setBrand] = useState([]);
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [endDate, setEndDate] = useState(dayjs(new Date()));
    const [inputpersentage, setInputpersentage] = useState();



    // var formattedStartDate = startDate.format('YYYY-MM-DD');
    // var formattedEndDate = endDate.format('YYYY-MM-DD');

    const handelUpdatePromotion = () => {
        if (Context.rowSelectionModel.length > 0 && inputpersentage > 0) {
            var promotion = {
                startDate: startDate,
                endDate: endDate,
                discountPercent: inputpersentage,
                product: Context.rowSelectionModel
            }
            console.log(promotion)
            const config = { headers: { 'x-access-token': Context.token } };

            axios.put('/api/admin/products/promotion', promotion, config).then((res) => {
                const result = res.data;
                // setProducts(result.products);
                Context.SetnotifySuccess(result.message)
                handleOpenPromotion();
                setInputpersentage()
            });
        } else {
            Context.SetnotifyWarning('Chưa chọn sản phẩm để thêm a')
        }

    }
    var fetchDataproduct = async () => {
        try {
            const config = { headers: { 'x-access-token': Context.token } };
            axios.get('/api/admin/products', config).then((res) => {
                const result = res.data;
                setProducts(result.products);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            });
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }

    };
    var fetchDataSubcate = () => {
        try {
            const config = { headers: { 'x-access-token': Context.token } };
            axios.get('/api/admin/subcategories', config).then(async (res) => {
                const result = res.data;
                setSubCategory(result)

            })
        } catch (error) {
            console.error(error);

        }
    }
    var fetchDataBrand = () => {
        try {
            const config = { headers: { 'x-access-token': Context.token } };
            axios.get('/api/admin/brand', config).then(async (res) => {
                const result = res.data;
                setBrand(result)

            })
        } catch (error) {
            console.error(error);

        }
    }
    const handleOpenAdd = () => {
        setTimeout(() => {
            setOpen(true)
        }, 1000)
    }
    useEffect(() => {
        fetchDataproduct();
        if (open) {
            fetchDataSubcate();
            fetchDataBrand();
        }

    }, [setProducts, open]);
    const columnList = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Product name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },

        {
            field: 'price',
            headerName: 'Product Price',
            width: 100,
        },
        {
            field: 'image',
            headerName: 'image',
            width: 200,
            type: 'image',
            renderCell: (params) => <img src={params?.value?.path} style={{ width: '100px', objectFit: 'cover' }} />
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 100,
        },
        {
            field: 'Brand',
            headerName: 'Brand',
            width: 200,
            renderCell: (params) => <div title={params?.value?.name} > {params?.value?.name}</div>
        },
        {
            field: 'SubCategory',
            headerName: 'Category',
            width: 200,
            renderCell: (params) => <div title={params?.value?.name}> {params?.value?.name}</div>
        },
    ];
    const columnsNew = [
        {
            field: 'Product name',
            headerName: 'name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            type: 'text'
        },

        {
            field: 'Product price',
            headerName: 'price',
            width: 50,
            type: 'number'
        },
        {
            field: 'Quantity',
            headerName: 'quantity',
            width: 50,
            type: 'number'
        },

        {
            field: 'Description',
            headerName: 'description',
            width: 100,

        },
        {
            field: 'Description Long',
            headerName: 'descriptionLong',
            width: 100,

        },
        {
            field: 'How to use',
            headerName: 'howUse',
            width: 100,

        },
        {
            field: 'Use For',
            headerName: 'usesFor',
            width: 100,

        },
        {
            field: 'side Effects',
            headerName: 'sideEffects',
            width: 100,
        },


    ];
    const handleOpenPromotion = () => {
        setOpenPromotion(!openPromotion)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 500,
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div className={cx('Products')}>
            <div className={cx('info')} >
                {isLoading ? <Skeleton variant="rectangular" width={40} height={30} /> : <button onClick={handleOpenAdd} ><p>New Product</p></button>}
                {isLoading ? <Skeleton variant="rectangular" width={40} height={30} /> : <button onClick={handleOpenPromotion} ><p>Add promotion</p></button>}
            </div>
            {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={550} />
                : (<Table promotion={true} updateProduct={true} columns={columnList} rows={products} update={true} urlDelete={'/api/admin/products/'} fetchData={fetchDataproduct} fortable={'product'} />)}
            {open && <Add setOpen={setOpen} columns={columnsNew} SubCategory={subCategory} Brand={brand} img={true} slug={' Product'} fetchData={fetchDataproduct} url={'/api/admin/products'} />
            }


            <Modal
                open={openPromotion}
                onClose={handleOpenPromotion}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <div className='Modal'>
                        <div className='item'>
                            <label htmlFor="">Ngày bắt đầu</label>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Controlled picker"
                                        // defaultValue={startDate}
                                        value={startDate}
                                        onChange={(newValue) => setStartDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='item'>
                            <label htmlFor="">Ngày kết thúc</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Controlled picker"
                                        // defaultValue={startDate}
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='item'>
                            <label htmlFor="">Phần trăm giảm giá</label>
                            <input className='inputpersentage' value={inputpersentage} onChange={(e) => setInputpersentage(e.target.value)} type="number" />
                        </div>
                        <div className='item'>
                            <button onClick={handelUpdatePromotion}>Lưu</button>
                        </div>
                    </div>
                </div>
            </Modal>


        </div>

    )
}

export default Products