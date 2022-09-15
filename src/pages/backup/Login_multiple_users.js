import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/userSlice'

export default function Login({ isDisabled}) {  
  // const [formData, setFormData] = useState({ //formData obj
  //   username: "",
  //   password: ""
  // })
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const users = useSelector(state => state.users)

  //const { isDisabled } = useSelector(state => state.user)

  // const [username, setUsername] = useState("")
  // const [password, setPassword] = useState("")

  // //destructure formData
  //const { username, password } = formData
  
  const dispatch = useDispatch()

  const usernameChange = e => {
    //destructure input value - get others if need to compare
    //const { name, value } = e.target;  

    //setFormData({ [name]: value })  //sets value in formData obj 
    setUsername(e.target.value)

    // if(e.target.value.length >= 6){
    //   setFormData({ value })  //{sets value to name}
    // } 
  }

  const passwordChange = e => {
    //destructure input value - get others if need to compare
    //const { name, value } = e.target;  

    //setFormData({ [name]: value })  //sets value in formData obj 
    setPassword(e.target.value)    

    // if(e.target.value.length >= 6){
    //   setFormData({ value })  //{sets value to name}
    // } 
  }  
  
  const handleSubmit = e => {
    e.preventDefault()

    users.values.map(user => {
      if(user.username === username && user.password === password){
        dispatch(login({
          username,
          password,
        }))
      }
    })
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
          disabled={isDisabled} //dispatched = true
          //className={isDisabled ? "btn-inactive" : "btn-active"} 
        >
          Login
        </button>

        <button>Create Account</button>
      </form>          
    </div>
  )
}
