import React, { useContext, useEffect, useState } from 'react'
import styled from './Categories.module.scss';
import classNames from "classnames/bind";
import Table from '../../components/DataTable/Table';
import MyContext from '../../contexts/MyContext';
import Add from '../../components/Add/Add';
import axios from "axios";
import { Skeleton } from '@mui/material';
const Categories = () => {

    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(true);

    const [open, setOpen] = useState(false)
    const [subCategory, setSubCategory] = useState([])
    const [categories, setCategories] = useState([]);

    var fetchDataCategory = () => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.get('/api/admin/categories', config).then(async (res) => {
            const result = res.data;
            setCategories(result)
        })
    }
    const fetchDataSubcate = () => {
        try {
            const config = { headers: { 'x-access-token': Context.token } };
            axios.get('/api/admin/subcategories', config).then(async (res) => {
                const result = res.data;
                setSubCategory(result)
                setIsLoading(false);

            })
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }
    useEffect(() => {

        fetchDataSubcate()
        fetchDataCategory()
    }, []);


    // console.log(categories)
    const columnList = [
        { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Subategory name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },

        {
            field: 'Namecategory',
            headerName: 'Category',
            width: 150,
            // renderCell: (params) => <div title={params.value.Namecategory}> {params.value.Namecategory}</div>

        },
        {
            field: 'image',
            headerName: 'image',
            width: 200,
            type: 'image',
            renderCell: (params) => <img src={params.value.path} style={{ width: '50px', objectFit: 'cover' }} />
        },

    ];
    const columnsNew = [
        {
            field: 'Subategory name',
            headerName: 'name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            type: 'text'
        },
    ];

    return (
        <div className={cx('Subcategory')}>
            <div className={cx('info')} >
                {isLoading ? <Skeleton variant="rectangular" width={40} height={30} /> : <button onClick={() => setOpen(true)} ><p>New Subcategory</p></button>}
            </div>
            {isLoading ? <Skeleton variant="rectangular" width={'100%'} height={550} />
                : (<Table updateSubcate={true} columns={columnList} rows={subCategory} update={true} urlDelete={'/api/admin/subcategory/'} fetchData={fetchDataSubcate} fortable={'subcate'} />)}
            {open && <Add setOpen={setOpen} columns={columnsNew} SubCategory={subCategory} img={true} slug={' categories'} fetchData={fetchDataCategory} url={'/api/admin/categories'} />
            }
        </div>
    )
}

export default Categories
