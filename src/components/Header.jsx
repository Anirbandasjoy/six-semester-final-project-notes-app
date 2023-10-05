import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthProvider'
import Swal from 'sweetalert2'

const Header = () => {
    const navigate = useNavigate()
    const { user, loading, logOut } = useContext(authContext);
    if (loading) {
        return <h1>Loading ...</h1>
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire(
                    '✅☑️✅',
                    'Log out successfully!',
                    'success'
                )
                navigate("/login")
            })
            .catch((err) => {
                Swal.fire(
                    '😒😒😒',
                    '!Opps something Rong!',
                    'error'
                )
            })
    }
    const navitems = <>
        <li><Link to="/">Home</Link></li>

        {
            user?.emailVerified && <>
                <li>
                    <Link to="/profile" className="justify-between">
                        Profile
                        <span className="badge">New</span>
                    </Link>
                </li>
                <li><Link to="/settings">Settings</Link></li>

            </>
        }

        {
            user?.emailVerified ? <li><button onClick={handleLogOut} className='text-red-400' >Log out</button></li> : <li><Link className='text-red-400' to="/login">Log in</Link></li>
        }
    </>
    return (
        <div className="navbar fixed left-0 right-0 top-0 z-10 bg-base-300  mt-0">
            <div className="flex-1">
                <Link to="/" className=" ml-3   normal-case text-xl">Notes-App</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 text-sm md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border border-rose-400">
                            <h1 className='my-auto font-bold mt-3 text-white'>
                                {
                                    user?.emailVerified && user?.email.slice(0, 1)
                                }
                            </h1>
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        {navitems}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header