import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './Blog.module.scss'
import classNames from "classnames/bind";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Modal from '@mui/material/Modal';
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';



const MyBlog = () => {
    const cx = classNames.bind(styles)
    const [value, setValue] = useState('');
    const [openBlog, setOpenBlog] = useState(false)
    const [valueTitle, setValueTitle] = useState("")
    const [valueShortIntro, setValueShortIntro] = useState("")
    const [blogImageSrc, setBlogImageSrc] = useState('');
    const [loading, setLoading] = useState(false)
    const { customer, token, SetnotifySuccess, SetnotifyWarning } = useContext(MyContext)

    const [blogs, setBlog] = useState([])
    const handelSubmitBlog = () => {
        const customerFilter = {
            image: customer.image, username: customer.username, _id: customer._id, email: customer.email
        }
        setLoading(true)
        if (loading === false) {
            const formData = new FormData();
            formData.append('file', blogImageSrc);
            formData.append('value', value);
            formData.append('valueTitle', valueTitle);
            formData.append('valueShortIntro', valueShortIntro);
            formData.append('customer', JSON.stringify(customerFilter));

            const config = { headers: { 'x-access-token': token } };
            axios.post('/api/customer/blog', formData, config).then((res) => {
                const result = res.data;

                if (result.success === true) {
                    setLoading(false)
                    SetnotifySuccess(result.message)
                    setOpenBlog(false)
                    setValue('')
                    setValueTitle('')
                    setValueShortIntro('')
                    setBlogImageSrc('')
                    setBlogImageSrc('')
                } else {
                    console.log(result)
                }


            })
        }


    }

    const fetchBlogs = () => {
        const config = { headers: { 'x-access-token': token } };
        if (customer) {
            axios.get('/api/customer/blog/' + customer._id, config).then((res) => {
                const result = res.data;
                setBlog(result)
            })
        }

    }


    // console.log(blogs)

    const columnList = [
        { field: '_id', headerName: 'id', width: 120 },
        {
            field: 'valueTitle',
            headerName: 'Tiêu đề',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 150,
        },
        {
            field: 'image',
            headerName: 'Hình ảnh tiêu đề',
            width: 120,
            renderCell: (params) => {
                // console.log('params', params.value.path)
                const image = params.value.path
                return <img src={image} alt="" />

                // const image = params.value; // Lấy giá trị của trường "total" từ params

            },
        },
        {
            field: 'crdate',
            headerName: 'Ngày đăng',
            width: 150,
            renderCell: (params) => {
                // console.log('params', params.value.path)
                const date = new Date(params.value);
                // console.log(date)
                return <span>{date.toString()}</span>;

                // const image = params.value; // Lấy giá trị của trường "total" từ params

            },
        },

        {
            field: 'customer',
            headerName: 'Người đăng',
            width: 190,
            renderCell: (params) => {
                const name = params.value.username;
                return <span>{name}</span>;
            },
        },


    ];
    const actionColumn = {
        field: 'action',
        headerName: 'Action',
        width: 180,

        renderCell: (params) => {
            // console.log(params.row)
            return (
                <div className='action'>
                    <div className='item' >
                        <MoreVertOutlinedIcon className='Detail' />
                    </div>
                </div>
            )
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        // height: 500,
        backgroundColor: 'white',
        // border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxWidth: 900,
        maxHeight: 700,
        height: '90%',
        width: '90%',
        overflow: 'hidden',
        overflowY: 'scroll'

    };
    const handleOpenBlog = () => {
        setOpenBlog(!openBlog)
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setBlogImageSrc(file);
    }


    useEffect(() => {
        fetchBlogs();
    }, [])

    return (
        <div className={cx('MyBlog')} >
            <div className={cx('MyBlog-title')}>
                <h4>Các Blog của bạn</h4>
                <button onClick={handleOpenBlog}>Thêm Blog</button>
            </div>
            <div className={cx('MyBlog-content')}>
                <DataGrid
                    style={{ height: '500px', width: '100%', padding: '10px', minHeight: "500px", gap: '10px', color: "black" }}
                    className={cx('List-Order-table')}
                    columns={[...columnList, actionColumn]}
                    getRowId={(row) => row._id}
                    rows={blogs}
                    autoHeight

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 4,
                            },
                        },
                    }}
                    pageSizeOptions={[2]}
                    rowHeight={90}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 }
                        }
                    }}
                />
            </div>
            <Modal
                open={openBlog}
                onClose={handleOpenBlog}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <div className='Modal-blog' style={{}}>
                        <LinearProgress style={{ display: loading ? 'block' : 'none' }} />
                        <div className='item-title'>
                            <h4>Thêm Blog mới</h4>
                            <button onClick={handelSubmitBlog}>Đăng</button>
                        </div>
                        <div className='flex'>
                            <div className='flex1'>
                                <div className='item-2'>
                                    <h5>Tiêu đề của Blog</h5>
                                    <input type="text" value={valueTitle} onChange={(e) => setValueTitle(e.target.value)} />
                                </div>
                                <div className='item-2'>
                                    <h5>Ảnh tiêu đề của Blog</h5>
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                </div>
                            </div>
                            <div className='flex2'>
                                <div className='item-2'>
                                    <h5>Giới thiệu ngắn về Blog</h5>
                                    <textarea type="text" value={valueShortIntro} onChange={(e) => setValueShortIntro(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        <div className='item-2'>
                            <h5>Nội dung Blog</h5>
                            <ReactQuill style={{ height: '300px' }} theme="snow" value={value} onChange={setValue} />
                        </div>

                    </div>
                </div>
            </Modal>
        </div >
    )

};

export default MyBlog;