import React from 'react'
import classNames from "classnames/bind";
import styled from './ChartBox.module.scss';

import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
const ChartBox = (props) => {
    const cx = classNames.bind(styled);
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className={cx('ChartBox')}>

            <div className={cx("boxInfo")}>
                <div className={cx("title")}>
                    {/* <img src={props.icon} alt="" /> */}
                    <span>{props.title}</span>
                </div>
                <h1>{props.number}</h1>
                <Link to="/" style={{ color: props.color }}>
                    View all
                </Link>
            </div>
            <div className={cx("chartInfo")}>
                <div className={cx("chart")}>
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.chartData}>
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 10, y: -30 }}
                            />
                            <Line
                                type="monotone"
                                dataKey={props.dataKey}
                                stroke={props.color}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={cx("texts")}>
                    <span
                        className={cx("percentage")}
                        style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
                    >
                        {props.percentage}%
                    </span>
                    <span className={cx("duration")}>this month</span>
                </div>
            </div>

        </div>
    )
}

export default ChartBox
