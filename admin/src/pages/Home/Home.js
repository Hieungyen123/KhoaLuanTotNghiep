import React, { memo } from 'react'
import styled from './Home.module.scss';
import classNames from "classnames/bind";
import TopCustomer from '../../components/Home/TopCustomer/TopCustomer';
import ChartBox from '../../components/Home/Chart/ChartBox';
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";


import { chartBoxUser, chartBoxProduct, chartBoxRevenue } from '../../Api';
const Home = memo(() => {
    const cx = classNames.bind(styled);


    // console.log(users)
    console.log('render Home')

    return (
        <div className={cx('Home')}>

            <div className={cx('box1')}><TopCustomer /></div>
            <div className={cx('box2')}><ChartBox {...chartBoxUser} /></div>
            <div className={cx('box3')}><ChartBox {...chartBoxProduct} /></div>
            <div className={cx('box4')}>box4</div>
            <div className={cx('box5')}><ChartBox {...chartBoxRevenue} /></div>
            {/* <div className={cx('box6')}>box6</div> */}
            <div className={cx('box7')}>box7</div>
            <div className={cx('box8')}>box8</div>
            {/* <div className={cx('box9')}>box8</div> */}
        </div>
    )
})

export default Home
