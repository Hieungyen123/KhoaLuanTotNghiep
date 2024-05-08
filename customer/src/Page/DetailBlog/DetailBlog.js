import React, { useEffect, useState, useContext } from 'react'
import classNames from "classnames/bind";
import styles from './DetailBlog.module.scss'
// import MyContext from "../../contexts/MyContext";
import { useParams } from "react-router-dom";
import axios from 'axios';

import CircularProgress from '@mui/material/CircularProgress';
import { Modal } from '@mui/material';

import CodeIcon from '@mui/icons-material/Code';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

import HistoryProduct from '../../components/HistoryViewingProduct/HistoryProduct';
const DetailBlog = () => {
    const cx = classNames.bind(styles)
    const [blog, setBlog] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    console.log(id)


    const getBlog = () => {
        axios.get('/api/customer/blogdetail/' + id).then((res) => {
            const result = res.data;
            setLoading(false)
            setBlog(result)
        })
    }
    // console.log(blog)
    useEffect(() => {
        getBlog();
    }, [])

    const dateObj = new Date(blog?.crdate);
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;

    return (

        <div className={cx('detail-blog')}>
            <Modal
                open={loading}
                // onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-content-loading'>
                    < CircularProgress />
                </div>
            </Modal>
            <div className={cx('detail-blog-title')}>
                <p>Trang Chủ / Blog / {blog?.valueTitle}</p>
            </div>
            <div className={cx('Blog')}>
                <div className={cx('Blog-title')}>
                    <h2>{blog?.valueTitle}</h2>
                </div>
                <div className={cx('Blog-ShortIntro')}>
                    <div className={cx('Blog-ShortIntro-createDay')}>
                        <CalendarMonthOutlinedIcon className={cx('icon')} />
                        <p>Đăng vào {formattedDate}</p>
                    </div>
                    <div className={cx('Blog-ShortIntro-content')}>
                        <CodeIcon className={cx('icon')} />
                        <div className={cx('Content')}>
                            <p>{blog?.valueShortIntro}</p>
                        </div>
                    </div>
                </div>
                <div className={cx('Blog-Image')}>
                    <img src={blog?.image?.path} alt="" />
                </div>
                <div className={cx('Blog-Content')}>
                    <div dangerouslySetInnerHTML={{ __html: blog?.valueContent }} />
                </div>
            </div>
            <HistoryProduct />
        </div>
    )
}
export default DetailBlog
