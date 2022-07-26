import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'

function Navbar() {
    const currentUser = useRecoilValue(currentUserState)

    return (
        <div>
            <header className="header-img">
            </header>
            <nav className="Navbar">
                <NavLink to= '/' className='nav-links'>Home</NavLink>
                <NavLink to="/all-items" className="nav-links">All Products</NavLink>
                <NavLink to="/events" className="nav-links">Events</NavLink>
                <NavLink to="/users" className="nav-links">Users</NavLink>
                {currentUser ? <NavLink to="/trades" className="nav-links">All Trades</NavLink>
                :
                null}
                { currentUser ? <NavLink to="/add-item" className="nav-links">Add Items</NavLink>
                :
                null}
                { currentUser ? <NavLink to="/my-profile" className="nav-links">My Profile</NavLink>
                :
                <NavLink to="/signup" className="nav-links">Register</NavLink>
                }
                { currentUser ?
                <NavLink to="/logout" className="nav-links">Logout</NavLink>
                : 
                <NavLink to="/login" className="nav-links">Login</NavLink>
                }
            </nav>
        </div>
    )
}

export default Navbar