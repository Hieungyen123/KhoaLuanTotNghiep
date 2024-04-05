import React, { useContext, useEffect, useState } from 'react'
import styled from './Customer.module.scss';
import classNames from "classnames/bind";
import Table from '../../components/DataTable/Table';
import MyContext from '../../contexts/MyContext';
import Add from '../../components/Add/Add';
import axios from "axios";
import { Skeleton } from '@mui/material';

const Customer = () => {
    const cx = classNames.bind(styled);
    const Context = useContext(MyContext);
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true);

    // const [contractData, setContractData] = useState([]);


    var fetchData = async () => {
        const config = { headers: { 'x-access-token': Context.token } };
        axios.get('/api/admin/customers', config).then((res) => {
            const result = res.data;
            setCustomers(result);
            setIsLoading(false);
        });
    };
    useEffect(() => {
        fetchData();
    }, [setCustomers]);

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'email',
            headerName: 'Email',
            width: 160,

        },
        {
            field: 'username',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'active',
            headerName: 'Active',
            width: 50,
        },
        {
            field: 'Mobile',
            headerName: 'Mobile',
            width: 150,
        },
    ];
    const columnsNew = [
        {
            field: 'Email',
            headerName: 'email',
            width: 160,

        },
        {
            field: 'Full name',
            headerName: 'username',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'PassWord',
            headerName: 'password',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
        },
        {
            field: 'Active',
            headerName: 'active',
            width: 50,
        },
        {
            field: 'Mobile',
            headerName: 'phone',
            width: 150,
        },
    ];

    return (
        <div className={cx('Customer')}>
            <div className={cx('info')} >
                {isLoading ? <Skeleton variant="rectangular" width={40} height={30} /> : <button onClick={() => setOpen(true)} ><p>New Customer</p></button>}
            </div>
            <Table columns={columns} rows={customers} update={true} urlDelete={"/api/admin/customers/"} fetchData={fetchData} />
            {open && <Add setOpen={setOpen} columns={columnsNew} img={false} slug={'Customer'} fetchData={fetchData} url="/api/admin/customers/singup" />
            }
        </div>
    )
}

export default Customer