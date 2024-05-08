import React, { useState, useContext, useEffect, } from 'react'
import styles from './Profile.module.scss'
import classNames from "classnames/bind";
import MyContext from '../../contexts/MyContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
const MyOrder = () => {
    const cx = classNames.bind(styles)
    const { id } = useParams();

    const Context = useContext(MyContext)
    const [orders, setOrders] = useState([])
    const [detialOrder, setDetailOrder] = useState()
    const [openDetail, setOpenDetail] = useState(false)

    if (detialOrder) {
        var Address = detialOrder.Address
        var Day = new Date(detialOrder.cdate).toLocaleString();
    }
    console.log(detialOrder)
    const getOrders = () => {
        const config = { headers: { 'x-access-token': Context.token } };

        axios.get('/api/customer/orders/customer/' + Context.customer._id, config).then(async (res) => {
            const result = res.data;
            console.log(result)
            if (result) {
                Context.SetnotifySuccess(result.message)
                setOrders(result)
            } else {
                Context.SetnotifyWarning('Some thing wrong')
            }
        })
    }
    const columnList = [
        { field: '_id', headerName: 'id', width: 120 },
        {
            field: 'orderId',
            headerName: 'ID đơn đặt',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'orderType',
            headerName: 'Loại thanh toán',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        // {
        //     field: 'UserID',
        //     headerName: 'UserID',
        //     description: 'This column has a value getter and is not sortable.',
        //     sortable: false,
        //     width: 160,
        // },

        {
            field: 'total',
            headerName: 'Tổng giá đơn hàng',
            width: 100,
            renderCell: (params) => {
                const total = params.value; // Lấy giá trị của trường "total" từ params
                const calculatedTotal = (total * 1000).toLocaleString();

                return <span>{calculatedTotal} đ</span>; // Trả về kết quả tính toán
            },
        },

        {
            field: 'Address',
            headerName: 'Tên người đặt',
            width: 190,
            renderCell: (params) => {
                // console.log(params)
                const name = params.value.name;

                return <span>{name}</span>;
            },
        },


    ];
    const actionColumn = {
        field: 'action',
        headerName: 'Action',
        width: 200,

        renderCell: (params) => {
            // console.log(params.row)
            return (
                <div className='action'>
                    <div className='item' >
                        <MoreVertOutlinedIcon className='Detail' onClick={() => {
                            setDetailOrder(params.row); setOpenDetail(true)
                        }} />
                    </div>
                </div>
            )
        }
    }

    const CancelOrder = (id) => {
        console.log(id)
        var DayOrder = new Date(detialOrder.cdate)
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - DayOrder.getTime();
        const twentyFourHoursInMilliseconds = 86400000; // 24 giờ trong miligiây
        if (timeDifference > twentyFourHoursInMilliseconds) {
            Context.SetnotifyWarning("Đơn hàng đã quá 24h để hủy")
        } else {
            const config = { headers: { 'x-access-token': Context.token } };
            axios.post('/api/customer/orders/customer/' + detialOrder._id, {}, config).then(async (res) => {
                const result = res.data;
                console.log(result)
                if (result) {
                    Context.SetnotifySuccess('Hủy đơn hàng thành công')
                    setOrders(result)
                    getOrders()
                } else {
                    Context.SetnotifyWarning('Some thing wrong')
                }
            })
        }



    }

    useEffect(() => {
        if (Context.customer) {
            getOrders()
        }
    }, [Context.customer])



    return (
        <div className={cx('MyOrder')}>

            <div style={{ display: openDetail ? 'none' : 'flex' }} className={cx('List-Order')}>
                <div className={cx('List-Order-title')}>
                    <h3>Danh sách đơn hàng</h3>
                </div>
                <DataGrid
                    style={{ height: '100%', width: '100%', padding: '10px' }}
                    className={cx('List-Order-table')}
                    columns={[...columnList, actionColumn]}
                    getRowId={(row) => row._id}
                    rows={orders}
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
            <div style={{ display: openDetail ? 'flex' : 'none' }} className={cx('Order-detail')}>
                <div className={cx('List-detail-title')}>
                    <div>
                        <h3>Thông tin đơn hàng</h3>
                        <p onClick={() => setOpenDetail(false)}><KeyboardArrowLeftIcon className={cx('icon')} />Quay lại</p>
                    </div>
                    <button onClick={() => CancelOrder(detialOrder._id)} className={cx('List-Order-cancel')}>Hủy đơn hàng</button>
                </div>
                <div className={cx('List-detail-Content')}>
                    <div className={cx('List-detail-listProduct')}>
                        <div className={cx('Product')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Ảnh</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detialOrder && detialOrder.items.map(item => {
                                        const product = item.product
                                        return (
                                            <tr>
                                                <td style={{ maxWidth: '100px' }} >{product.name}</td>
                                                <td style={{ Width: '100px' }}> <img src={product.image.path} alt="" /> </td>
                                                <td style={{ width: '150px' }}>100.000đ</td>
                                                <td style={{ width: '80px' }}>5</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {Address && <div className={cx('List-detail-Info')}>
                        <div className={cx('Address')}>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Mã đơn hàng:</p>
                                <p className={cx('item-content')}>{detialOrder.orderId}</p>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Ngày đặt hàng:</p>
                                <p className={cx('item-content')}>{Day}</p>
                            </div>

                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Tình trạng đơn hàng:</p>
                                <p className={cx('item-content')}>{detialOrder.status}</p>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Tổng đơn hàng:</p>
                                <p className={cx('item-content')}>{detialOrder.total}.000đ</p>
                            </div>
                        </div>
                        <div className={cx('Info')}>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Địa chỉ:</p>
                                <p className={cx('item-content')}>{Address.street} {Address.wards.full_name} {Address.districts.full_name} {Address.city.full_name}</p>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Người nhận hàng:</p>
                                <p className={cx('item-content')}>{Address.name}</p>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Số điện thoại:</p>
                                <p className={cx('item-content')}>{Address.phone}</p>
                            </div>
                            <div className={cx('item')}>
                                <p className={cx('item-title')}>Loại thanh toán:</p>
                                <p className={cx('item-content')}>{detialOrder.orderType}</p>
                            </div>
                            {Address.note !== "" && <div className={cx('item')}>
                                <p className={cx('item-title')}>Ghi chú:</p>
                                <p className={cx('item-content')}>{Address.note}</p>
                            </div>}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MyOrder
