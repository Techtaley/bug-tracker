import { useState, useEffect } from 'react'
//import { useState } from 'react'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addBug } from './../store/bugSlice'  //import getBugsAsync instead of addBug
//import { getBugsAsync } from '../store/bugSlice'
//import { getBugsAsync, sendBugsAsync } from '../store/bugSlice'
//import { v4 as uuidv4 } from 'uuid'
//import { useGetAllBugsQuery } from '../store/bugsApi'

import Login from './Login'
//import Search from './Search'  //pages
import BugCard from './../components/BugCard'  //component
//import { getBugsAsync, sendBugsAsync } from '../store/bug-actions'
import { sendBugsAsync } from '../store/bugSlice'
//import { sendBugsAsync } from '../store/bugSlice'
//import { getBugsAsync } from '../store/bugSlice'
//import axios from 'axios'


//'Home' is the UI for adding new bugs, completing, and deleting
export default function Home() {  //need to define action HERE not in handle before using it
  //this gets data from BE along with status
  
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')          //use in both input and submit
  //const [bug, setBug] = useState([])
  
  //we do not need to use extraReducers for get()
                                      //state.reducername.propertyname - prop name from state
  const isLoggedIn = useSelector(state => state.users.isLoggedIn)  //looks for user in the store
  
  const bugs = useSelector(state => state.bugs)  //for sendBugsAsync

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

//if we do not want bugs to load initially we can set this up:
// let initial = true
// useEffect(() => {
//   if(isInitial) {
//     isInitial = false;
//     return;
//   }
// }, [bugs, dispatch])  

  //1) Title to state
  const handleChange = e => {    
    setTitle(e.target.value) //from FE payload - values from id and completed initial set in state      
  }

  //2) sends new bug to STORE (temporary storage)
  const handleSubmit = e => {  
    e.preventDefault()

    dispatch(addBug({title})) //addBug(payload)*
    if(!title) return  //if no title returns to current state
    //*payload is mapped to the action.payload in addBug reducer  
    //action.payload.title is pushed into items to create a new bug
    setTitle('')    
  }
  
//3) sends new 'bugs' to BE (permanent storage)
useEffect(() => {
  dispatch(sendBugsAsync(bugs))  
},[bugs, dispatch])//dependency


// useEffect(() => {
//   const fetchData = async() => {
//     //const response = await axios.get('https://bugs-api-default-rtdb.firebaseio.com/bugs.json') //works!  //REST API - external - firebase database
//     const response = await axios.get('http://localhost:4000/bugs') //works!  //REST API - external - firebase database
//     //return response?.data
//     const data = response.json()
//     setBug(data.items)  
//     console.log(data.items)

//   }

//   fetchData()
// }, [])

// // //1. displays bugs on FE from store - no this does not do that - addBugs() does it.
//  useEffect(() => {  
//   dispatch(getBugsAsync(bugs))  //can move to slice and create a getdata() function and dispatch()
// }, [bugs, dispatch]) //re-renders if dispatch updates

  return (
    <div className="mainpage">

      { !isLoggedIn && //if isLoggedIn prop is false they need to log in 
        <Login /> 
      } 

      { isLoggedIn && //if isLoggedIn is true they should be able to add a bug
        <form onSubmit={handleSubmit} className="marginbottom">

          <h2>Add New Bug</h2>

          <input
            type="text"
            name="title"
            placeholder="Enter New Task"
            maxLength="15"
            onChange={handleChange}
            value={title}  //in order to reset title to "" we need to set the value
          />
          <button type="submit">
            Add
          </button>
          <span><b>Total Bugs:</b> {bugs.totalBugs}</span>
        </form>  
      }

      <div className='buglist'>
        <h2>List of Bugs</h2> 

        {/* 4) map to store to display - need map to BE */}
        {bugs.items.map(item => (  
          <BugCard
            key={item.id}  //helps React locate item
            item={item}
          />          
        ))}
      </div>
      {/* 
        <button>
          <Link to='/search' className="removeunderline">Search</Link>
        </button>       
      */}
    </div>
  )
}
