import { useState } from 'react'
import { useDispatch } from 'react-redux'
//import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/userSlice'

export default function Login({ isDisabled}) {  
  const [formData, setFormData] = useState({ //formData obj
    username: "",
    password: ""
  })

  const { username, password } = formData

  //const users = useSelector(state => state.users)

  //const { isDisabled } = useSelector(state => state.user)

  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")

  
  const dispatch = useDispatch()

  const handleChange = e => {
    const { name, value } = e.target;  

    setFormData({ [name]: value })  //sets value in formData obj 
  }

  // const usernameChange = e => {
  //   setUsername(e.target.value)
  // }

  // const passwordChange = e => {
  //   setPassword(e.target.value)    
  // }  
  
  const handleSubmit = e => {
    const { name, value } = e.target;  

    e.preventDefault()

      dispatch(login({  //from formData
        [name] : value
      }))
  }

  return (
    <div className="mainpage">
      <form onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <input 
          name="username" 
          type="text" 
          value={username}
          placeholder="Type a username" 
          onChange={handleChange} 
          required
        />

        <input 
          name="password" 
          type="password" 
          value={password}
          placeholder="Enter a password" 
          onChange={handleChange} 
          required
        />

        <button 
          type="submit"
          //disabled={isDisabled} //dispatched = true
          //className={isDisabled ? "btn-inactive" : "btn-active"} 
        >
          Login
        </button>

        <button>Create Account</button>
      </form>          
    </div>
  )
}
