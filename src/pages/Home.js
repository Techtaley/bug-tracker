import { useState } from 'react'
//import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addBug } from './../store/bugSlice'  //import getBugsAsync instead of addBug
import { useGetAllBugsQuery } from '../store/bugsApi'
import Nav from '../components/Nav'
import Register from './../components/Register'
import Login from './../components/Login'
import BugCard from './../components/BugCard'  //component
import { sendBugsAsync } from '../store/bugSlice'

//'Home' is the UI for adding new bugs, completing, and deleting
export default function Home() {  //need to define action HERE not in handle before using it
  const { error, isLoading } = useGetAllBugsQuery()

  const dispatch = useDispatch()
  const [title, setTitle] = useState('') //use in both input and submit
  
                                      //state.reducername.propertyname - prop name from state
  const { isLoggedIn, isRegistered }  = useSelector(state => state.users)  //looks for user in the store
  const users = useSelector(state => state.users)  

  const bugs = useSelector(state => state.bugs)  //for sendBugsAsync

  //1) Title to state
  const handleChange = e => {    
    setTitle(e.target.value) //from FE payload - values from id and completed initial set in state      
  }

  //2) sends new bug to STORE (temporary storage)
  const handleSubmit = e => {  
    e.preventDefault()

    dispatch(addBug({title})) //addBug(payload)*
    if(!title) return  //if no title returns to current state
    setTitle('')  

    dispatch(sendBugsAsync(bugs))  
  }
    
  return (
    <div className="mainpage">
      
      <Nav />  
       
        <header >          
          Bug Tracker
        </header>

      {!isRegistered &&        
        <Register />
      }

      {isRegistered && !isLoggedIn &&
        <Login /> 
      }      

      {isRegistered && isLoggedIn &&
      
        <form onSubmit={handleSubmit} className="marginbottom">

        <p>{users.status}</p>

          <h2>Add New Bug</h2>

          <input
            type="text"
            name="title"
            placeholder="Enter New Task"
            maxLength="15"
            onChange={handleChange}
            value={title}  //we need to set the value
          />
          <button type="submit">
            Add
          </button>
          <span><b>Total:</b> {bugs.totalBugs} {bugs.status}</span>  

        </form>  
      }
      
      { isLoading ? (
          <p>"Loading..."</p> 
        )  : error ? (
          <p>"Error..."</p>
        ) : ( 
      <div className='buglist'>
        <h2>List of Bugs</h2>         

          {/* 4) map to store to display - need map to BE */}
          {bugs?.items.map(item => (  
            <BugCard
              key={item.id}  //helps React locate item
              item={item}
            />          
          ))}
      </div>
      )}        
    </div>
  )
}
