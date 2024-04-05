import React, { useContext, useEffect, useState } from 'react'
import styled from './Products.module.scss';
import classNames from "classnames/bind";
import Table from '../../components/DataTable/Table';
import MyContext from '../../contexts/MyContext';
import Add from '../../components/Add/Add';
import axios from "axios";
import { Skeleton } from '@mui/material';
const Products = () => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);

    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false)
    const [subCategory, setSubCategory] = useState([])
    const [brand, setBrand] = useState([]);

    // console.log(Context.token)
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
            renderCell: (params) => <img src={params.value.path} style={{ width: '100px', objectFit: 'cover' }} />
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
            renderCell: (params) => <div title={params.value.name} > {params.value.name}</div>
        },
        {
            field: 'SubCategory',
            headerName: 'Category',
            width: 200,
            renderCell: (params) => <div title={params.value.name}> {params.value.name}</div>
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


    console.log(products)


    return (
        <div className={cx('Products')}>
            <div className={cx('info')} >
                {isLoading ? <Skeleton variant="rectangular" width={40} height={30} /> : <button onClick={handleOpenAdd} ><p>New Product</p></button>}
            </div>
            {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={550} />
                : (<Table updateProduct={true} columns={columnList} rows={products} update={true} urlDelete={'/api/admin/products/'} fetchData={fetchDataproduct} fortable={'product'} />)}
            {open && <Add setOpen={setOpen} columns={columnsNew} SubCategory={subCategory} Brand={brand} img={true} slug={' Product'} fetchData={fetchDataproduct} url={'/api/admin/products'} />
            }
        </div>
    )
}

export default Products