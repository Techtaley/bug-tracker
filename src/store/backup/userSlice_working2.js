import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    //values: [], //id,username,password,status        
    values: localStorage.getItem("values") ? JSON.parse(localStorage.getItem("values")) : [], //id,username,password,status
    //values: localStorage.getItem("values") ? JSON.parse(localStorage.getItem("values")) : [{id: 111, username: "User1", password: "User1", date: `${new Date().toLocaleDateString('en-GB')}`}], //id,username,password,status
    //isDisabled: false,
    status: null
}

//export const userSlice = createSlice({     
//and remove from bottom 
const userSlice = createSlice({
  name: "users",
  initialState,
  // initialState: {
  //   isLoggedIn: false  //or isAuthenticated
  // },
  reducers: {
    addUser(state, action){
      const newUser = {
        id: uuidv4(),
        username: action.payload.username,
        password: action.payload.password,  
        isRegistered: true,
        isLoggedIn:  false,
        date: `${new Date().toLocaleDateString('en-GB')}` 
      }     

      ///////////isRegistered: !state.isRegister,      
      const existingUser = state.values.find(user => user.username ===newUser.username && user.password === user.password)
      if(!existingUser) {
        existingUser.push(newUser)
      } 
      
      state.status = "New user added!"
      localStorage.setItem("values", JSON.stringify(state.values))
    },
    login(state, action){
      // state.push({
      //   username: action.payload.username,
      //   password: action.payload.password,
      //   isLoggedIn: !state.isLoggedIn,
      //   isDisabled: !state.isDisabled
      // });

      if(state.values.username === action.payload.username && 
        state.values.password === action.payload.password) {
          state.values.isLoggedIn = true //!state.values.isLoggedIn  
      }
    },
    logout(state, action){
      // state = {
      //   username: state.username,
      //   password: state.password,      
      // }
      state.values.username = ""  //null
      state.values.password = ""  //null    
      state.values.isLoggedIn = false  //false
      //state.values.isDisabled = true  //true        
    }
  }
});

export const { addUser, login, logout } = userSlice.actions

export default userSlice.reducer