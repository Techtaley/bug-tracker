import {useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Register from '../components/Register'
import Login from '../components/Login'
import BugCard from './../components/BugCard'  
import { addBug } from './../store/bugSlice'  
import { sendBugsAsync } from '../store/bugSlice'
import { getBugsAsync } from '../store/bugSlice'
import Header from '../components/Header'

export default function Home() {  

  const dispatch = useDispatch()
  const [title, setTitle] = useState('') 
  const { isLoggedIn, isRegistered }  = useSelector(state => state.users)  
  const users = useSelector(state => state.users)  
  const bugs = useSelector(state => state.bugs)  
  

  useEffect(() => {
    dispatch(getBugsAsync())
  }, [dispatch])

  const handleChange = e => {    
    setTitle(e.target.value) 
  }

  const handleSubmit = e => {  
    e.preventDefault()

    dispatch(addBug({title})) 
    if(!title) return  
    setTitle('') 
    
    dispatch(sendBugsAsync(bugs)) 
    
  }
    
  return (
    <div className="mainpage">

      <Header />     
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
            value={title}  
          />
          <button type="submit">
            Add
          </button>
          <span><b>Total:</b> {bugs.totalBugs} {bugs.status}</span>  

        </form>  
      }

      <div className='buglist'>
        <h2>List of Bugs</h2>         

          {bugs?.items.map(item => (
            <BugCard
              item={item}
            />          
          ))}
      </div>

    </div>
  )
}