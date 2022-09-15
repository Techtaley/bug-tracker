//import { createSlice } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
//import axios from 'axios'
import fetch from 'node-fetch'

//bugs saved in memory on api are not saved to database so data lost with each restart
//thunk gets data from api as payload 

//use fetch() for get and post - these thunk function calls will create actions: 
//action.payload.pending, action.payload.fullfilled, then push action.payload to state to update store

export const getBugsAsync = createAsyncThunk(
  'bugs/getBugsAsync', 
  async() => {    
    try {
      const response = await fetch('http://localhost:4000/bugs')  //REST API - external - database
      //const response = await fetch('/results')  //REST API - external - database - using Axios
      if(response.ok){
        const bugs = await response.json();
        return { bugs }
      }  
    } catch(error) {
      return error.message
    }
  }
)

// export const addBugsAsync = createAsyncThunk(   
//   'bugs/addBugsAsync', 
//   async(payload) => {
//     //const response = await fetch('https://jsonplaceholder.typicode.com/todos') //postman - local api calls - testing
//     const response = await fetch('/bugs', {   //REST API - external - database  
//     //const response = await axios.post('/bugs', {   //REST API - external - database - using Axios   
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title: payload.title
//       }) //all other values will be default - api will return all these values
//     })
//     if(response.ok){
//       const bug = await response.json();
//       return { bug }
//     }
//   }
// )

// //we also need a thunk for completed bugs
// export const completeBugAsync = createAsyncThunk(   
//   'bugs/completeBugAsync', 
//   async(payload) => {
//     //const response = await fetch('https://jsonplaceholder.typicode.com/todos') //postman - local api calls - testing
//     const response = await fetch(`/bugs/${payload.id}`, {   //REST API - external - databasee
//     //const response = await axios.put(`/bugs/${payload.id}`, {   //REST API - external - database - Axios
//       method: 'PUT',  //'PATCH'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         completed: payload.completed
//       }) //all other values will be default - api will return all these values
//     })
//     if(response.ok){
//       const bug = await response.json();
//       return { id: bug.id, completed: bug.completed }
//     }
//   }
// )

// //we also need a thunk for completed bugs
// export const deleteBugAsync = createAsyncThunk(   
//   'bugs/deleteBugAsync', 
//   async(payload) => {
//     //const response = await fetch('https://jsonplaceholder.typicode.com/todos') //postman - local api calls - testing
//     const response = await fetch(`/bugs/${payload.id}`, {   //REST API - external - databasee
//     //const response = await axios.delete(`/bugs/${payload.id}`, {   //REST API - external - database - Axios
//       method: 'DELETE',  //'PATCH'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         completed: payload.completed
//       }) //all other values will be default - api will return all these values
//     })
//     if(response.ok){
//       const bugs = await response.json();
//       return bugs.filter(bug => bug.id !== action.payload.id)      
//     }
//   }
// )

// const initialState = [
//   {    
//     id: uuidv4(),
//     title: "Bug 1",
//     completed: false,
//     date: new Date().toLocaleString()
//   },
//   {    
//     id: uuidv4(),
//     title: "Bug 2",
//     completed: false,
//     date: new Date().toLocaleString()
//   },
//   {    
//     id: uuidv4(),
//     title: "Bug 3",
//     completed: false,
//     date: new Date().toLocaleString()
//   }   
// ]

//official way:

// const intialState = {
//   values: [],
//   status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
//   error: null
// }

//export const bugSlice = createSlice({
const bugSlice = createSlice({
  name: "bugs",     //name that well identifies the state - any name
  //initialState,   //see official way using values:
  initialState: {
    items: [],
    totalBugs: 0
  },
  reducers: {                       //map of reduces that this slice needs with methods addBug, etc
    addBug: (state, action) => {    //state = action.payload  uses immerjs - state does not mutate
      const newBug = {
        id: uuidv4(),
        //id: action.payload.id,
        title: action.payload.title,
        completed: false,
        //date: new Date().toLocaleString()
      }

      const existingBug = state.items.find(bug => bug.title === newBug.title || bug.id === newBug.id)   

      //works because createSlice uses immerjs which copies state immutably for us
      if(!existingBug) state.items.push(newBug)

      state.totalBugs++
    },
    completeBug: (state, action) => {   
      const index = state.findIndex(bug => bug.id === action.payload.id)
      state[index].completed = !
      action.payload.completed
    },
    deleteBug: (state, action) => {
      return state.filter(bug => bug.id !== action.payload.id)
      //state.totalBugs--
    },
  },//end regular reducer  
  extraReducers: {            //related to state of thunk
    [getBugsAsync.pending]: (state, action) => { //fulfilled when thunk completed & succeffully dispatched action
      console.log('fetching data...')
      //state.status = 'loading'
    },
    [getBugsAsync.fulfilled]: (state, action) => { //fulfilled when thunk completed & succesfully dispatched action
      console.log('fetching data successfully!')
      return action.payload.bugs
    },
    [getBugsAsync.fulfilled]: (state, action) => { //updates state
      console.log('fetching data successfully!')

      // const bugs = {
      //   //id: uuidv4(),
      //   id: action.payload.id,
      //   title: action.payload.title,
      //   completed: false,
      //   //date: new Date().toLocaleString()
      // }
      // state.push(bugs)

      state.push(action.payload)
      //state.status = 'succeeded'
    },
    // [completeBugAsync.fulfilled]:  (state, action) => { //fulfilled when thunk completed & succeffully dispatched action
    //   const index = state.findIndex(bug => bug.id === action.payload.id)
    //   state[index].completed = action.payload.completed
    // },
    // [deleteBugAsync.fulfilled]:  (state, action) => { //fulfilled when thunk completed & succeffully dispatched action
    //   state.filter(bug => bug.id !== action.payload.id)
    // }      
  }  
});

export const { addBug, completeBug, deleteBug } = bugSlice.actions

export default bugSlice.reducer