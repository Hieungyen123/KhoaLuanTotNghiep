import React from 'react'
import classNames from "classnames/bind";
import styles from './Search.module.scss'
import { motion } from "framer-motion"

const Search = () => {
    const cx = classNames.bind(styles)

    return (
        <motion.div
            className={cx("Search")}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth }}
        >
            Search
            <a href="/home">go back</a>
        </motion.div>
    )
}

export default Search
