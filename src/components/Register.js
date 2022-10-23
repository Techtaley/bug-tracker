import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'  //import acm

export default function Register() { //{user}
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  
  const users = useSelector(state => state.users)  

  const usernameChange = e => {
    setUsername(e.target.value)
  }

  const passwordChange = e => {
    setPassword(e.target.value)
  }

  const confirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()    

      dispatch(addUser({
        username, 
        password,
        confirmpassword,
      })) 

      if(!username || !password) return
      if(password !== confirmpassword) return


      setUsername("")
      setPassword("")
      setConfirmPassword("")
    // }, 3000)
  }

  return (
    <div className="mainpage">

      <p>{users.status}</p>

      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          name="username" 
          type="text" 
          value={username} 
          placeholder="Enter a username"
          onChange={usernameChange} 
          required 
        />

        <input 
          name="password" 
          type="password" 
          value={password} 
          placeholder="Type a password"
          onChange={passwordChange} 
          required
        />

        <input 
          name="confirmpassword" 
          type="password" 
          value={confirmpassword} 
          placeholder="Re-type password"
          onChange={confirmPasswordChange} 
          required
        />

        <button 
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  )
}