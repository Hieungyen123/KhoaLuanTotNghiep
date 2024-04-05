import React from 'react'
import styles from './Footer.module.scss'
import classNames from "classnames/bind";


const Footer = () => {

    const cx = classNames.bind(styles)


    return (
        <div className={cx("Footer")}>
            Footer
        </div>
    )
}

export default Footer
