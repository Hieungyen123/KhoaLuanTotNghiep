import React, { useContext, useEffect, useState } from 'react'
import styled from './Brand.module.scss';
import classNames from "classnames/bind";
import Table from '../../components/DataTable/Table';
import MyContext from '../../contexts/MyContext';
import Add from '../../components/Add/Add';
import axios from "axios";
import { Skeleton } from '@mui/material';
const Brand = () => {

    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);

    const [open, setOpen] = useState(false)
    const [brand, setBrand] = useState([])
    const [categories, setCategories] = useState([]);

    const fetchDataBrand = () => {
        try {
            const config = { headers: { 'x-access-token': Context.token } };
            axios.get('/api/admin/brand', config).then(async (res) => {
                const result = res.data;
                setBrand(result)
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }

    var fetchDataCategory = () => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.get('/api/admin/categories', config).then(async (res) => {
            const result = res.data;
            setCategories(result)
        })
    }
    useEffect(() => {
        fetchDataBrand()
        fetchDataCategory()
    }, []);
    // console.log(brand)
    const BrandCheckData = brand.filter(item => {
        return (
            item.hasOwnProperty("_id") &&
            item.hasOwnProperty("name") &&
            item.hasOwnProperty("description") &&
            item.hasOwnProperty("image")
        );
    });
    const filteredArray = brand.filter(item => !item._id || !item.name || !item.description || !item.image);
    if (filteredArray.length > 0) {
        filteredArray.map((item) => {
            if (item.image) {
                const updatedImageState = { image: item.image };
                const config = { headers: { 'x-access-token': Context.token } };
                axios.delete('/api/admin/brand/' + item._id, { ...config, data: updatedImageState }).then(async (res) => {
                    const result = res.data;
                    console.log(result)
                    if (result) {
                        Context.SetnotifySuccess(result.message)
                    } else {
                        Context.SetnotifyWarning('Some thing wrong')
                    }
                })
            } else {
                const config = { headers: { 'x-access-token': Context.token } };
                axios.delete('/api/admin/brand/' + item._id, { ...config }).then(async (res) => {
                    const result = res.data;
                    if (result) {
                        Context.SetnotifySuccess(result.message)
                    } else {
                        Context.SetnotifyWarning('Some thing wrong')
                    }
                })
            }
        })
    }




    // console.log(BrandCheckData)
    const columnList = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Brand name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'BrandOrigin',
            headerName: 'Brand Origin',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'image',
            headerName: 'image',
            width: 200,
            type: 'image',
            renderCell: (params) => <img src={params ? params.value.path : null} style={{ width: '50px', objectFit: 'cover' }} />
        },
    ];
    const columnsNew = [
        {
            field: 'name',
            headerName: 'name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            type: 'text'
        },
        {
            field: 'description',
            headerName: 'description',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            type: 'text'
        },


    ];

    return (
        <div className={cx('Brand')}>
            <div className={cx('info')} >
                {isLoading ? <Skeleton variant="rectangular" width={40} height={30} /> : <button onClick={() => setOpen(true)} ><p>New Brand</p></button>}
            </div>
            {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={550} />
                : (<Table Updatebrand={'true'} columns={columnList} rows={BrandCheckData} update={true} urlDelete={'/api/admin/brand/'} fetchData={fetchDataBrand} fortable={'Brand'} />)}
            {open && <Add setOpen={setOpen} columns={columnsNew} BrandOrigin={true} img={true} slug={' Brand'} fetchData={fetchDataBrand} url={'/api/admin/brand'} />
            }
        </div>
    )
}

export default Brand
