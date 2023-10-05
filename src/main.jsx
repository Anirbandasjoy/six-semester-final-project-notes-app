import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import AuthProvider from './context/AuthProvider'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#283046",
            color: 'white'
          }
        }}
      />
    </AuthProvider>
  </React.StrictMode>,
)
