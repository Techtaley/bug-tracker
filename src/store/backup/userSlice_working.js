import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // userName: "",
    email: "",
    password: "",
    // isDisabled: false,
    isLoggedIn: false  //or isAuthenticated
}

//export const userSlice = createSlice({     
//and remove from bottom 
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state, action){
      // state.email = action.payload.email,
      // state.password = action.payload.password,
      // state.isLoggedIn = action.payload.isLoggedIn
      // state = {
      //   email: action.payload.email,
      //   password: action.payload.password,
      //   isLoggedIn: action.payload.isLoggedIn
      // }
      //state.isLoggedIn = !action.payload.isLoggedIn;
      state.push({
        email: action.payload.email,
        password: action.payload.password,
        isLoggedIn: !action.payload.isLoggedIn
      });
    },
    logout(state, action){
      state.push({
          email: "",
          password: "",      
          isLoggedIn: action.payload.isLoggedIn  
      })

      // state = {
      //   email: "",
      //   password: "",      
      //   isLoggedIn: false  
      // }
      //state.push(action.payload.isLoggedIn);      
      //state.isLoggedIn = action.payload.isLoggedIn
      //state.isLoggedIn = !action.payload.isLoggedIn
      // state.isLoggedIn = action.payload.isLoggedIn;
      //state.push(!action.payload.isLoggedIn);
      //state.isLoggedIn = action.payload.isLoggedIn;
    }
  }
});

export const { login, logout } = userSlice.actions

export default userSlice.reducer