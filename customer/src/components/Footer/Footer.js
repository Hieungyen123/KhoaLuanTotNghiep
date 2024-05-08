import React from 'react'
import styles from './Footer.module.scss'
import classNames from "classnames/bind";


const Footer = () => {

    const cx = classNames.bind(styles)


    return (
        <div className={cx("Footer")}>
            <p>© 2024 Công ty Cổ Phần Thiết Bị Y Tế Số ĐKKD .......... cấp ngày ../../.... tại ..............</p>
            <div className={cx("content")}>
                <ul>
                    <li><p>Địa chỉ:................ TP. HCM</p></li>
                    <li>
                        Số điện thoại: ...........&nbsp;
                    </li>
                    <li>
                        Email: ....................
                    </li>
                    <li>Người quản lý nội dung: Nguyễn Công Hiệu</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
