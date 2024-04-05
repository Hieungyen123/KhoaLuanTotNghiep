import React from 'react'
import Nav from '../../components/Navbar/Nav'
import Footer from '../../components/Footer/Footer'
const MainLayout = ({ children }) => {
    return (
        <>
            <Nav />
            <div className='container'>{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout
