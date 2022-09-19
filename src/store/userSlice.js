import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    values: localStorage.getItem("values") ? JSON.parse(localStorage.getItem("values")) : [], //id,username,password,status
    isRegistered: false,
    isLoggedIn:  false,
    status: null
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action){
      const newUser = {
        id: uuidv4(),
        username: action.payload.username,
        password: action.payload.password,  
        date: `${new Date().toLocaleDateString('en-GB')}` 
      }     

      const existingUser = state.values.find(user => user.id === newUser.id)
      if(!existingUser) {
        state.values.push(newUser)
      } 
      
      state.isRegistered = true
      localStorage.setItem("values", JSON.stringify(state.values))

      state.status = "Thank you for registering!"

    },
    login(state, action){  
      const existingUser = state.values.find(user => user.username === action.payload.username && user.password === action.payload.password)
      if(existingUser) {
        state.isLoggedIn = true 
        state.status = `Welcome ${action.payload.username}!`
      } else {
        state.isLoggedIn = false
        state.isRegistered = false
        state.status = "Please register!"
      }
    },
    logout(state, action){
      state.isLoggedIn = false  //false
      state.isRegistered = true
      state.status = "You are logged off."   
    }
  }
});

export const { addUser, login, logout } = userSlice.actions

export default userSlice.reducer