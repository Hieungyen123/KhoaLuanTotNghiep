import axios from 'axios';
import './App.scss';
import React, { useEffect, useState, useRef, useContext } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom'
import { BrowserRouter, Navigate } from 'react-router-dom';

// import classNames from "classnames/bind";
import Navbar from './components/Navbar/Navbar';
import Menu from './components/Menu/Menu';
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer';
import SubCategory from './pages/SubCategory/SubCategory';
// import Contract from './pages/Contract/Contract';
import Products from './pages/Products/Products';
import Customer from './pages/Customer/Customer';
import useWindowDimensions from './Hook/useWindowDimensions '
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Brand from './pages/Brand/Brand';
import MyContext from './contexts/MyContext';
function App() {
  // const cx = classNames.bind(styled);
  const Context = useContext(MyContext);
  const { height, width } = useWindowDimensions();
  const [open, setOpen] = useState(false)

  const styleHide = {
    transform: 'translateX(-150px)',
  }
  // console.log('app.js render')
  const styleShow = {
    // boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
    transform: 'translateX(0)',
    opacity: '100'
  }

  if (open) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  // if (width > 700) {
  //   setOpen(false)
  // }
  useEffect(() => {
    if (width > 700) {
      setOpen(false)
    }
  })
  if (Context.token !== '') {
    return (
      <div className='App'>
        <div className='wrapper'>

          <Navbar />
          <div className='pages'>
            {width <= 700 ? open ?
              <ClearOutlinedIcon onClick={() => setOpen(false)} style={{ position: 'fixed', top: '10px' }} className='Menu-icon' />
              : <MenuOutlinedIcon onClick={() => setOpen(true)} style={{ position: 'fixed', top: '10px' }} className='Menu-icon' />
              : null}
            <BrowserRouter>

              <div className='Menu' style={{ width: width > 700 ? '130px' : open ? '100%' : '0' }}  >
                {open ? <div onClick={() => setOpen(false)} className="overlay"></div> : ""}
                <Menu styleOpen={open ? styleShow : styleHide} width={width} setOpen={() => setOpen()} open={open} />
              </div>
              <div className='content'>
                <Routes >
                  <Route path='/' element={<Navigate replace to='/admin/home' />} />
                  <Route path='/admin' element={<Navigate replace to='/admin/home' />} />
                  <Route index path='/admin/home' element={<Home />} />

                  {/* <Route path='/admin/home' element={<Home />} /> */}

                  <Route path='/admin/products' element={<Products />} />
                  <Route path='/admin/customer' element={<Customer />} />
                  <Route path='/admin/subcategories' element={<SubCategory />} />
                  <Route path='/admin/brand' element={<Brand />} />
                  {/* <Route path='/admin/category' element={<Category />} />
                    <Route path='/admin/product' element={<Product />} />
                    <Route path='/admin/order' element={<Order />} /> */}
                </Routes>
              </div>
            </BrowserRouter>
          </div>
          <Footer />

        </div>
      </div>
    );
  }
  return (<div />);
}

export default App;
