import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const MainLayout = () => {
    return (
        <div>
            <div >
                <Header />
            </div>
            <Outlet />
        </div>
    )
}

export default MainLayout