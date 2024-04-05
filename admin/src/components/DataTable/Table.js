import React, { useEffect, useState } from 'react'
import './Table.scss'
import axios from "axios";
import MyContext from '../../contexts/MyContext';
import { useContext } from 'react'

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import BuildCircleOutlinedIcon from '@mui/icons-material/BuildCircleOutlined';

import UpdateProduct from '../Update/UpdateProduct';
import UpdateSubcate from '../Update/UpdateSubcate';
import UpdateBrand from '../Update/UpdateBrand'
import { Modal } from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';

const Table = ({ columns, rows, fetchData, update, urlDelete, fortable, updateProduct, updateSubcate, Updatebrand }) => {
    const Context = useContext(MyContext);
    const formData = new FormData();
    const [open, setOpen] = useState(false)
    const [openUpdate, setOpenUpdate] = useState(false)
    const [value, setValue] = useState({})
    const [subCategory, setSubCategory] = useState([])
    const [brand, setBrand] = useState([]);
    const [categories, setCategories] = useState([]);



    const handleOpen = () => {
        setOpen(!open)
    }
    const handleOpenUpdate = (e, value) => {
        // console.log(value)
        setOpenUpdate(!openUpdate)
        setValue({ ...value })
    }
    const handleDelete = (image, id) => {
        console.log(id)
        setOpen(true)
        if (image) {
            const updatedImageState = { image: image };
            const config = { headers: { 'x-access-token': Context.token } };
            axios.delete(urlDelete + id, { ...config, data: updatedImageState }).then(async (res) => {
                const result = res.data;
                console.log(result)
                if (result) {
                    Context.SetnotifySuccess(result.message)
                    fetchData()
                    setOpen(false)
                } else {
                    Context.SetnotifyWarning('Some thing wrong')
                    setOpen(false)
                }
            })

        } else {
            const config = { headers: { 'x-access-token': Context.token } };
            console.log(id)
            axios.delete(urlDelete + id, config).then(async (res) => {
                const result = res.data;
                console.log(result)
                if (result) {
                    Context.SetnotifySuccess(result.message)
                    fetchData()
                    handleOpen()
                    setOpen(false)
                } else {
                    Context.SetnotifyWarning(result.message)
                    handleOpen()
                    setOpen(false)
                }
            })
        }

    }

    var fetchDataSubcate = () => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.get('/api/admin/subcategories', config).then(async (res) => {
            const result = res.data;
            setSubCategory(result)
        })
    }
    var fetchDataBrand = () => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.get('/api/admin/brand', config).then(async (res) => {
            const result = res.data;
            setBrand(result)
        })
    }
    var fetchDataCategory = () => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.get('/api/admin/categories', config).then(async (res) => {
            const result = res.data;
            setCategories(result)
        })
    }

    useEffect(() => {
        if (openUpdate && fortable === 'product') {
            fetchDataSubcate();
            fetchDataBrand();
        } else if (openUpdate && fortable === 'subcate' && fortable === 'Brand') {
            fetchDataCategory();
        }
    }, [openUpdate, setOpen]);



    const actionColumn = {
        field: 'action',
        headerName: 'Action',
        width: 200,

        renderCell: (params) => {
            // console.log(params.row)
            return (
                <div className='action'>
                    <div className='item' >

                        {update === true ? <BuildCircleOutlinedIcon onClick={(e) => handleOpenUpdate(e, params.row)} className='icon' /> : ''}
                        <HighlightOffOutlinedIcon className='iconDelete' onClick={() => {
                            handleDelete(params.row.image, params.row._id)
                        }} />
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <div className='modal-content-delete'>
                                < CircularProgress />
                            </div>
                        </Modal>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='Table'>
            {openUpdate && updateProduct ? <UpdateProduct slug={'Update Product'} subCategory={subCategory} brand={brand} fetchData={fetchData} setOpenUpdate={setOpenUpdate} columns={columns} value={value} /> : null}
            {openUpdate && updateSubcate === 'true' ? <UpdateSubcate slug={'Update Product'} categories={categories} fetchData={fetchData} setOpenUpdate={setOpenUpdate} columns={columns} value={value} /> : null}
            {openUpdate && Updatebrand === 'true' ? <UpdateBrand slug={'Update Brand'} categories={categories} fetchData={fetchData} setOpenUpdate={setOpenUpdate} columns={columns} value={value} /> : null}
            <DataGrid
                style={{ height: '100%', width: '100%' }}
                className='dataTable'
                rows={rows}
                columns={[...columns, actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 4,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 }
                    }
                }}
                getRowId={(rows) => rows._id}
                pageSizeOptions={[6]}
                checkboxSelection
                disableRowSelectionOnClick
                rowHeight={90}
            />

        </div>
    )
}

export default Table
