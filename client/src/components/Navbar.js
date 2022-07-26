import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { currentUserState } from '../recoil/atoms'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

function Navbar() {
    const currentUser = useRecoilValue(currentUserState)

    return (
        <header>
        <nav className="Navbar">
            <NavLink to= '/' className='nav-links'>Home</NavLink>
            <NavLink to="/all-items" className="nav-links">All Crops</NavLink>
            <NavLink to="/events" className="nav-links">Events</NavLink>
            <NavLink to="/add-item" className="nav-links">Add Items</NavLink>
            <NavLink to="/users" className="nav-links">Users</NavLink>
            {/* { currentUser ?
		    <NavLink to="/account" className="nav-links">{<Avatar size='lg' name = {currentUser.username} src={currentUser.avatar_url}/>}</NavLink>
		    : 
		    <NavLink to="/login">{<Avatar bg='teal.500' />}</NavLink>
            } */}
            { currentUser ?
		    <div>
            <NavLink to="/my-profile" className="nav-links">My Profile</NavLink>
            <NavLink to="/logout" className="nav-links">Logout</NavLink>
            </div>
		    : 
		    <NavLink to="/login">Login</NavLink>
            
            }
        </nav>
        </header>

    )
}

export default Navbar