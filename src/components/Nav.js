import React from 'react'
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import { BrowserRouter as Router } from 'react-router-dom' 

// import Home from  './../pages/Home'  //page
// import About from  './../pages/About'  //page
// import Contact from  './../pages/Contact'  //page

//import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
//import { NavLink } from 'react-router-dom'
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
      <Router> 
        <nav className='navbar'>
          <HashLink activeClassName={classes.active} to='/' >home</HashLink>
          <HashLink  activeClassName={classes.active} to='/about' >about</HashLink>
          <HashLink  activeClassName={classes.active} to='/contact' >contact</HashLink> 
            {isAuth && //if isLogged is true then show button to logout 
              <button className="logout_button" type="button" onClick={handleLogout}>logout</button>
            }  
        </nav>        
  
          {/* <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          </Routes> */}
        </Router> 

     
  )
}
