import React from 'react'
import Nav from '../../components/Navbar/Nav'

const NavLayout = ({ children }) => {
    return (
        <>
            <Nav />
            <div className='container'>{children}</div>
        </>
    )
}

export default NavLayout
