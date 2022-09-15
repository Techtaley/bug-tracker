//import { useState, useEffect } from 'react'
import { useState } from 'react'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addBug } from './../store/bugSlice'  //import getBugsAsync instead of addBug
//import { getBugsAsync } from '../store/bugSlice'
//import { getBugsAsync, sendBugsAsync } from '../store/bugSlice'
//import { v4 as uuidv4 } from 'uuid'
import { useGetAllBugsQuery } from '../store/bugsApi'
import Register from './Register'
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


  //const { data } = useGetAllBugsQuery()
  const { data, error, isLoading } = useGetAllBugsQuery()

  const dispatch = useDispatch()
  const [title, setTitle] = useState('')          //use in both input and submit
  
  //we do not need to use extraReducers for get()
                                      //state.reducername.propertyname - prop name from state
  const { isLoggedIn, isRegistered }  = useSelector(state => state.users)  //looks for user in the store
  
  const bugs = useSelector(state => state.bugs)  //for sendBugsAsync
  dispatch(sendBugsAsync(bugs))  

  //1) Title to state
  const handleChange = e => {    
    setTitle(e.target.value) //from FE payload - values from id and completed initial set in state      
  }

  //2) sends new bug to STORE (temporary storage)
  const handleSubmit = () => {  
    //e.preventDefault()
  
    dispatch(addBug({title})) //addBug(payload)*
    if(!title) return  //if no title returns to current state
    //*payload is mapped to the action.payload in addBug reducer  
    //action.payload.title is pushed into items to create a new bug
    setTitle('')  

    //display loading message until bug displays
    //dispatch(sendBugsAsync(bugs))  

    //display a status message for 3 seconds
  }
  
  // //3) sends new 'bugs' to BE (permanent storage)
  //useState(() => {
    dispatch(sendBugsAsync(bugs))  
  //}, [bugs, dispatch])

  
  return (
    <div className="mainpage">
      {/* //if isRegistered(false)  !isRegistered(true) */}
      {/* {users.values.map(user => {
        <div>
          <p>Registered: {user.isRegistered}</p>
          <p>Logged In: {user.isLoggedIn}</p>
        </div>

      })} */}

        <div>
          <p>Registered: <b>{isRegistered ? "true" : "false"}</b></p>
          <p>Logged In: <b>{isLoggedIn ? "true" : "false"}</b></p>
        </div>

        {!isRegistered &&          
          <Register />
        }

        {!isLoggedIn && isRegistered &&
          <Login /> 
        }

      {/* place a <Loader /> here */
      //if isRegistered(false)  !isRegistered(true)
      }

      {isLoggedIn && isRegistered &&
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
        </form>  
      }

      {/* 
        { isLoading ? (
            <p>"Loading..."</p> 
          )  : error ? (
            <p>"Error..."</p>
          ) : ( 
          <div className='buglist'>
            ...
          </div>
        )}

       
        <button>
          <Link to='/search' className="removeunderline">Search</Link>
        </button>       
      
      */}
        <div className='buglist'>
          <h2>List of Bugs</h2>         
            <span><b>Total Bugs:</b> {data.totalBugs} {data.status}</span>  

            {/* 4) map to store to display - need map to BE */}
            {data?.items.map(item => (  
              <BugCard
                key={item.id}  //helps React locate item
                item={item}
              />          
            ))}
        </div>
    </div>
  )
}
