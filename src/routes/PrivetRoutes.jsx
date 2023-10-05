import React, { useContext } from 'react'
import { authContext } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom';

const PrivetRoutes = ({ children }) => {
    const { user, loading } = useContext(authContext);
    if (loading) {
        return <h1>Loading ...</h1>
    }
    if (!user) {
        return <Navigate to="/" />
    }
    return children
}

export default PrivetRoutes