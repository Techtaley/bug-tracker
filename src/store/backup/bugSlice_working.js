//import { createSlice } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
//import axios from 'axios'
import fetch from 'node-fetch'

//bugs saved in memory on api are not saved to database so data lost with each restart
//thunk gets data from api as payload 

//use fetch() for get and post - these thunk function calls will create actions: 
//action.payload.pending, action.payload.fullfilled, then push action.payload to state to update store


//optionally, you can create a cart-actions.js send over all createAysncThunk functions as export cont, then import as
//import { sendBugAsync } from '../store/cart-actions' into bugSlice 

export const getBugsAsync = createAsyncThunk(
  'bugs/getBugsAsync', 
  async() => {    
    try {
      const response = await fetch('http://localhost:4000/bugs')  //REST API - external - database
      //const response = await fetch('/results')  //REST API - external - database - using Axios
      if(response.ok){
        const bugs = await response.json();
        return { bugs }

        //optionally:
        //const bug = await response.json(); 
        //return { id: bugs.id, title: bugs.title, completed: bugs.completed }
      }  
    } catch(error) {
      return error.message
    }
  }
)

export const sendBugsAsync = createAsyncThunk(
  'bugs/sendBugsAsync', 
  async(bugs) => {    //Slice name
    const config = {
      method: 'PUT',  //the format already exists in firebase as POST
      //body: JSON.stringify(cart)   //another option

      body: JSON.stringify({   //sends bugs object to firebase using our format design below
        items: bugs.items.title, //slice name - sends entire object
      })
    };
    const response = await fetch('http://localhost:4000/bugs', config)  //REST API - send config above

    if (!response.ok) throw new Error("Error sending data.");

    // try {
    //   const response = await fetch('http://localhost:4000/bugs', config)  //REST API - send config above        
    // } catch(error){
    //   if (!response.ok) throw new Error("Error sending data.");
      
    // }    
 }
)


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
  initialState: {//state.
    items: [], //id,title,completed
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

                          //state.ARRAYNAME.find(....)  //findIndex better - more specfic
      const existingBug = state.items.find(bug => bug.id === newBug.id)   
      //createSlice uses immerjs which copies state immutably for us
      if(!existingBug) {
        state.items.push(newBug) //pushing a const as an object
      } 

      // const existingIndex = state.items.findIndex(bug => bug.id === action.payload.id)
      // if(existingIndex<0) {
      //   //state.items.push({...action.payload})
      //   state.items.push(newBug)
      // }

      state.totalBugs++
    },
    completeBug: (state, action) => {    //working!
      const existingBug = state.items.find(bug => bug.id === action.payload.id)
      existingBug.completed = !existingBug.completed
    },
    deleteBug: (state, action) => {
      const existingBug = state.items.find(bug => bug.id === action.payload.id)

      if(existingBug) {
        return state.items.filter(bug => bug.id !== action.payload.id)      
      }
      state.totalBugs--

      // state.totalBugs--
      // return state.items.filter(bug => bug.id !== action.payload.id)

      //existingBug.totalBugs--

      // const existingIndex = state.items.findIndex(bug => bug.id === action.payload.id)   
      // //const itemIndex = state.items.findIndex(bug => bug.id === action.payload.id)

      // if(existingIndex){  //if the index exists filter it out
      //   return state.items.filter(bug => bug.id !== action.payload.id)
      // }

    },
  },//end regular reducer  
  extraReducers: {            //related to state of thunk
    [getBugsAsync.pending]: (state, action) => {
        state.status = 'loading';
        console.log("loading...")      
    },
    [getBugsAsync.fulfilled]: (state, action) => {
        //state.items = action.payload.items;
        return action.payload.bugs
        state.status = 'success';
        console.log("fetching data successfully!")      
    },        
    [getBugsAsync.rejected]: (state, action) => {
        state.status = 'failed';      
        console.log("fetching data failed!")      
    },
    [sendBugsAsync.pending]: (state, action) => {
        state.status = 'loading';
        console.log("loading...")      
    },
    [sendBugsAsync.fulfilled]: (state, action) => {
        //state.items = action.payload.items;
        
        //optionally:
        // const newBugs = {
        //     //id: uuidv4(),
        //     id: action.payload.id,
        //     title: action.payload.title,
        //     completed: false,
        // }
        // state.push(newBugs)

        state.push(action.payload)
        //return action.payload.bugs

        state.status = 'success';
        console.log("fetching data successfully!")      
    },        
    [sendBugsAsync.rejected]: (state, action) => {
        state.status = 'failed';      
        console.log("fetching data failed!")      
    },    
  }  
});

export const { addBug, completeBug, deleteBug } = bugSlice.actions

export default bugSlice.reducer