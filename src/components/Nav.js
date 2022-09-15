import React from 'react'
//import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './../store/userSlice'

import classes from './Nav.module.css'


export default function Nav({ isLoggedIn }) {  //passing props
    //state.reducername.propertyname - prop name from state
    const isAuth = useSelector(state => state.users.isLoggedIn)  //looks for user in the store
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(
          logout({
            isLoggedIn
          })
        )
      }
    
    return (
      <nav className='navbar'>
        <NavLink activeClassName={classes.active} to='/' active >home</NavLink>
        <NavLink  activeClassName={classes.active} to='/about' >about</NavLink>
        <NavLink  activeClassName={classes.active} to='/contact' >contact</NavLink> 

        {/* <Link to='/' active >home</Link>
        <Link to='/about' >about</Link>
        <Link to='/contact' >contact</Link>         */}
          {isAuth && //if isLogged is true then show button to logout 
            <button className="logout_button" type="button" onClick={handleLogout}>logout</button>
          }  
      </nav>
  )
}
