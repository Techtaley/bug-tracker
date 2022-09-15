import { useState, useEffect } from 'react'
//import { useState } from 'react'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addBug } from './../store/bugSlice'  //import getBugsAsync instead of addBug
import { getBugsAsync } from '../store/bugSlice'
//import { v4 as uuidv4 } from 'uuid'

import Login from './Login'
//import Search from './Search'  //pages
import BugCard from './../components/BugCard'  //component
//import axios from 'axios'

//'Home' is the UI for adding new bugs, completing, and deleting
export default function Home() {  //need to define action HERE not in handle before using it
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")          //use in both input and submit
  //const [error, setError] = useState(null)
  
                                      //state.reducername.propertyname - prop name from state
  const isAuth = useSelector(state => state.users.isLoggedIn)  //looks for user in the store
  const { items } = useSelector(state => state.bugs)  //from reducer's store global state in index.js

  //console.log(bugs)

//FE needs to add bugs and also get bugs
//   useEffect(() => {
//     let getData = async () => {
//         try {
//           //const res = await fetch(`http://localhost:4000/results`)  //BE 
//           const res = await fetch("https://jsonplaceholder.typicode.com/todos.json")  //BE
//           //const res = await fetch(`/results`)  //BE
//           const data = await res.json()
//           console.log(data)
          
//           if(!res.ok){
//             throw new Error('Please type a bug title.')
//           }

//           //dispatch(addBug())
//           dispatch(getBugsAsync())   
//         } catch(err){
//           dispatch(err.message)
//         }    
//       }
      
//     getData()

// }, [dispatch])

// const getData = async() => {
//     try {
//         const res = await axios.get("https://jsonplaceholder.typicode.com/todos")          
//         //const res = await axios.get(`/results`)          
//         const data = await res.json()
//         console.log(data)

//         if(res.ok){
//             throw new Error("Please type a bug title")
//         }

//         dispatch(getBugsAsync())
//     } catch(err){
//         dispatch(err.message)
//     }
// }


useEffect(() => {  
  dispatch(getBugsAsync())  //can move to slice and create a getdata() function and dispatch()
}, [dispatch]) //re-renders if dispatch updates

  //1. title set by handleChange
  const handleChange = e => {
    setTitle(e.target.value) //from FE payload - values from id and completed initial set in state      
  }

  //2. title submitted to bugSlice as action.payload - stored with newBug{}
  const handleSubmit = e => {  
    e.preventDefault()

    // const postBug = {   //pushing title from FE payload - from useState()
    //   title
    // }

    //***this value is mapped to the action.payload in addBug reducer in bugSlice - 
    //it's the action.payload.title of the newBug{} that's pushed into items. 
    //action.payload.title is from the FE payload -  what users typed into the description field - stored in setTitle
    //missing step:  we need a place to store bugs
    dispatch(addBug({title}))  
    if(!title) return  //if no typed nothing happens

    //this is what is happening in server.js
    //try {   
      //await fetch(`/upload`, postData) 
      //await fetch("https://jsonplaceholder.typicode.com/todos.json", postBug)
      //await axios.post("/upload", postData)
      //window.location.replace()
      
      //dispatch(addBug(postBug))

      // dispatch(addBug(items))  //add items 
      // if(!title) return

    // dispatch(addBug({  //addBug() only include what's needed for action.payload
    //   title
    // }))
      
    // } catch(error) {
    //   setError(error.message)
    // }

    setTitle("")
    
  }



  return (
    <div className="mainpage">

      { !isAuth && //if isLoggedIn prop is false they need to log in 
        <Login /> 
      } 

      { isAuth && //if isLoggedIn is true they should be able to add a bug
        <form onSubmit={handleSubmit} className="marginbottom">

          <h2>Add New Bug</h2>

          <input
            type="text"
            name="title"
            placeholder="Describe new bug"
            onChange={handleChange}
          />

          <button type="submit">
            Add
          </button>

        </form>    
      }

    { isAuth && //if isLoggedIn is true they should be able to add a bug
      <div>
        <h2>List of Bugs</h2> 

        {items.map(item => //only if there are several bugs - mapping not needed for just 1 item.  ?? Need a => ( here?
          <BugCard
            key={item.id}  //only use the key here to helps React locate the correct item
            item={item}
            // title={bug.title}
            // completed={bug.completed}
          />
        )}
      </div>
      }
      {/* 
        <button>
          <Link to='/search' className="removeunderline">Search</Link>
        </button>       
      */}
    </div>
  )
}
