import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/userSlice'

export default function Login() {   //login ACM has props isRegistered, isLoggedIn
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  
  const users = useSelector(state => state.users)  

  const dispatch = useDispatch()

  const usernameChange = e => {
    setUsername(e.target.value)
  }

  const passwordChange = e => {
    setPassword(e.target.value)    
  }  
  
  const handleSubmit = e => {
    e.preventDefault()

      dispatch(login({
        username,
        password,          
      }))

      if(!username || !password) return 
  }

  return (
    <div className="mainpage"> 

        <p>{users.status}</p>

        <form onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <input 
          name="username" 
          type="text" 
          value={username}
          placeholder="Type a username" 
          onChange={usernameChange} 
          required
        />

        <input 
          name="password" 
          type="password" 
          value={password}
          placeholder="Enter a password" 
          onChange={passwordChange} 
          required
        />

        <button 
          type="submit"
          //disabled={isDisabled} //dispatched = true
          //className={isDisabled ? "btn-inactive" : "btn-active"} 
        >
          Login
        </button>
      </form>             
    </div>
  )
}
