import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
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
  const { data, error, isLoading } = useGetAllBugsQuery()

  const dispatch = useDispatch()
  const [title, setTitle] = useState('') //use in both input and submit
  
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
  
    dispatch(addBug({title})) //addBug(payload)*
    if(!title) return  //if no title returns to current state
    setTitle('')  

    dispatch(sendBugsAsync(bugs))  
  }
    
  return (
    <>
    <Router>
        <div className="App">
        <Nav />

        <header >          
          Bug Tracker
        </header>
          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
          </Routes>
      </div>
   </Router>

{!isRegistered &&        
  <Register />
}

{isRegistered && !isLoggedIn &&
  <Login /> 
}      

{isRegistered && isLoggedIn &&
  <form onSubmit={handleSubmit} className="marginbottom">

    <h2>Add New Bug</h2>

    <input
      type="text"
      name="title"s
      placeholder="Enter New Task"
      maxLength="15"
      onChange={handleChange}
      value={title}  //we need to set the value
    />
    <button type="submit">
      Add
    </button>
  </form>  
}

{ isLoading ? (
    <p>"Loading..."</p> 
  )  : error ? (
    <p>"Error..."</p>
  ) : ( 
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
)}        
</div>    
    </>

  )
}
