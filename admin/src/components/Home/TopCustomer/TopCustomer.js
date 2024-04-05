import React from 'react'
import { users } from '../../../Api'
import styled from './TopCustomer.module.scss';
import classNames from "classnames/bind";
import { topDealUsers } from '../../../Api';
const TopCustomer = (users) => {
    const cx = classNames.bind(styled);

    return (
        <div className={cx("topBox")}>
            <h2>Top Deals</h2>
            <div className={cx("list")}>
                {topDealUsers.map(user => (
                    <div className={cx("listItem")} key={user.id}>
                        <div className={cx("user")}>
                            <img src={user.img} alt="" />
                            <div className={cx("userTexts")}>
                                <span className={cx("username")}>{user.username}</span>
                                <span className={cx("email")}>{user.email}</span>
                            </div>
                        </div>
                        <span className={cx("amount")}>${user.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopCustomer
