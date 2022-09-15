import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
    //values: null,  
    //values: localStorage.getItem("values") ? JSON.parse(localStorage.getItem("values")) : [{id: 111, username: "user1", password: "user1", confirmpassword: "User1", isLoggedIn: false, date: `${new Date().toLocaleDateString('en-GB')}`}], //id,username,password,status
    values: localStorage.getItem("values") ? JSON.parse(localStorage.getItem("values")) : [], //id,username,password,status
    //values: localStorage.getItem("values") ? JSON.parse(localStorage.getItem("values")) : null, //id,username,password,status
    // isDisabled: true,
    // isLoggedIn: false,  
    // isRegistered: false,
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
        confirmpassword: action.payload.confirmpassword,
        isLoggedIn: false,
        //isRegistered: true,                
        date: `${new Date().toLocaleDateString('en-GB')}` 
      }     

      ///////////isRegistered: !state.isRegister,      
      const existingUser = state.values.find(user => user.username ===newUser.username && user.password === user.password)
      if(!existingUser) {
          state.values.push(newUser)
      } 
      state.status = "New user added!"

      localStorage.setItem("values", JSON.stringify(state.values))
    },
    login(state, action){
      if(state.values.username === action.payload.username && 
        state.values.password === action.payload.password) {
          // state.values.push({
          //   isLoggedIn: true,
          //   //isRegistered: true, 
          //   // isDisabled: !state.isDisabled        
          // })
        state.values.isLoggedIn = true
        // state.values.isRegistered = true 
      }

      // state.isLoggedIn = true
      // state.isRegistered = true
    },
    logout(state, action){
      state.values.push({
        username: "",
        password: "",      
        LoggedIn: false,
        //isRegistered: true,      
      })

      // state.values.username = ""
      // state.values.password = ""
      // state.isLoggedIn = false;
      // state.isRegistered = true;      
    }
  }
});

export const { addUser, login, logout } = userSlice.actions

export default userSlice.reducer