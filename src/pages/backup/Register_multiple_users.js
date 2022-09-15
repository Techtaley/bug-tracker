import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'  //import acm

// //ACM props: username, password, isLogged, isRegistered, isDisabled 
// export default function Register({username, password}) { //{user}
//   const [formData, setFormData] = useState({
//     username: "", 
//     password: ""
//   })
  
//   const { username, password } = formData

//   const dispatch = useDispatch()
  
//   const users = useSelector(state => state.users)    

//   const handleChange = e => {
//     const { name, value } = e.target  //gets username and password as obj

//     setFormData({[name]: value})  //e.target.value for {username and password}
//   }

//   const handleSubmit = e => {  //Not working
//     e.preventDefault()

//     //const {username, password } = formData
//     //const { name, value } = e.target  //gets username and password as obj

//     dispatch(addUser({username, password})) //acm props passed down over 
// }

//ACM props: values[], isLogged, isRegistered, isDisabled 
export default function Register() { //{user}
  //Longer way:  Works!
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState("")
  //const [welcome, setWelcome] = useState(false)

  const dispatch = useDispatch()
  
  const users = useSelector(state => state.users)  
  //const { isLoggedIn, isRegistered } = useSelector(state => state.users)  

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
        //isLoggedIn,
        //isRegistered        
      })) 

      if(!username || !password) return
      if(password !== confirmpassword) return

    //setWelcome(true)

    // setTimeout(() => {
    //   dispatch(addUser({
    //     username, 
    //     password,
    //     isLoggedIn,
    //     isRegistered        
    //   })) 

      // dispatch(addUser({isLoggedIn: !isLoggedIn}))
      // dispatch(addUser({isRegistered: !isRegistered}))
  
      setUsername("")
      setPassword("")
      setConfirmPassword("")
    // }, 3000)
  }

  return (
    <div className="mainpage">

      <p>{users.status}</p>

      {/* {!setWelcome &&
        <h1>Welcome {users.values[users.values.length-1].username}!</h1>
      } */}

      {/* 
      {users?.values.map((user, key) => 
        <div key={user.id}>
          <h1>Welcome {user.username}!</h1>                
        </div>
      )} */}

      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input 
          name="username" 
          type="text" 
          value={username} 
          placeholder="Enter a username"
          onChange={usernameChange} 
          //onChange={handleChange}
          required 
        />

        <input 
          name="password" 
          type="password" 
          value={password} 
          placeholder="Type a password"
          onChange={passwordChange} 
          //onChange={handleChange} 
          required
        />

        <input 
          name="confirmpassword" 
          type="password" 
          value={confirmpassword} 
          placeholder="Re-type password"
          onChange={confirmPasswordChange} 
          //onChange={handleChange} 
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
