import React, { useEffect, useState } from 'react'
import styled from './Contract.module.scss';
import axios from "axios";

import classNames from "classnames/bind";
import Table from '../../components/DataTable/Table';
import Add from '../../components/Add/Add';

function Contract() {
    const cx = classNames.bind(styled);
    const [contractData, setContractData] = useState([]);
    const [open, setOpen] = useState(false)

    var fetchData = async () => {
        const contract = await axios.get('/contract');
        setContractData(contract.data);
    };
    useEffect(() => {

        fetchData();

    }, [open, contractData]);
    // console.log(contractData)

    var sortedItems = [...contractData].reverse();
    const columns = [
        { field: 'ID', headerName: 'ID', width: 90 },
        {
            field: 'Full_Contract_Code',
            headerName: 'Full Contract Code',
            width: 110,
            type: "String"

        },
        {
            field: 'Customer_Name',
            headerName: 'Customer Name',
            width: 150,
            type: "String"
        },

        {
            field: 'SSN',
            headerName: 'SSN',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            type: "number"
        },
        {
            field: 'Property_ID',
            headerName: 'Property ID',
            width: 100,
            type: "number"
        },
        {
            field: 'Date_Of_Contract',
            headerName: 'Date Of Contract ',
            width: 150,
            type: "Date"
        },
    ];

    const columnsF = [
        { field: 'ID', headerName: 'ID', width: 90 },
        {
            field: 'Customer_Name',
            headerName: 'Customer Name',
            width: 150,
            type: "String",
            limit: '50'
        },
        {
            field: 'Customer_Address',
            headerName: 'Customer Address',
            width: 150,
            type: "String",
            limit: '100'
        },

        {
            field: 'Mobile',
            headerName: 'Mobile',
            width: 150,
            type: "number",
            limit: '15'
        },
        {
            field: 'Price',
            headerName: 'Price',
            width: 150,
            type: "number",
            limit: ' 18'
        },
        {
            field: 'Deposit',
            headerName: 'Deposit',
            width: 150,
            type: "number",
            limit: '18'
        },
        {
            field: 'Remain',
            headerName: 'Remain',
            width: 150,
            type: "number",
            limit: ' 18'
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            type: "number",
            limit: '1'
        },
        {
            field: 'SSN',
            headerName: 'SSN',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            type: "number",
            limit: '15'
        },
        {
            field: 'Year_Of_Birth',
            headerName: 'Year Of Birth',
            width: 150,
            type: "Date",
        },
        {
            field: 'Property_ID',
            headerName: 'Property ID',
            width: 100,
            type: "number",
        },
        {
            field: 'Date_Of_Contract',
            headerName: 'Date Of Contract ',
            width: 150,
            type: "Date",
            limit: '1'
        },
    ];


    return (
        <div className={cx('Contract')}>
            <h2 className={cx('Title')}>CONTRACTS</h2>
            <button className={cx('Add-Btn')} onClick={() => setOpen(true)}>Add Contract</button>
            <Table columns={columns} rows={sortedItems} fetchData={fetchData} />
            {open && <Add setOpen={setOpen} columns={columnsF} slug={'New Contract'} fetchData={fetchData} url={''} />}
        </div>
    )
}

export default Contract