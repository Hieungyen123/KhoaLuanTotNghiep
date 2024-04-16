import React from 'react'
import Nav from '../../components/Navbar/Nav'
import Footer from '../../components/Footer/Footer'
import Menu from '../../components/Menu/Menu'
const MainLayout = ({ children }) => {
    return (
        <>
            <Nav />
            <Menu />
            <div className='container'>{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout
