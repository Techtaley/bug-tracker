//import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
//import fetch from 'node-fetch'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const POSTURL='https://bugs-api-default-rtdb.firebaseio.com/bugs.json'

//send new bugs to DB
export const sendBugsAsync = createAsyncThunk( //has 3 parameters
  'bugs/sendBugsAsync', //action type (slice name/name of action creator)
  async(bugData) => {    //payload creator - it's a function that takes   
    //try {
      const response = await axios.put(POSTURL, bugData)
      return response?.data
    // } catch (error){
    //   return error.message
    // }
   }
)

// //gets products from DB
// export const getBugsAsync = createAsyncThunk( //has 3 parameters:
//   'bugs/getBugsAsync', //action type (slice name/action creator name) - getBugsAsync() = addBug() 
//   async() => {    //payload creator callback - this generates 3 action types (code in extraReducers): pending, fulfilled, pending        
//       //try {
//         //const response = await axios.get('http://localhost:4000/bugs')  //REST API - external - database
//         const response = await axios.get(POSTURL) //works!  //REST API - external - firebase database
//         return response?.data  //works!  creates a payload   
//         // //const response = await fetch('/results')  //REST API - external - database - using Axios
//         // if(response.ok){
//         //   const bugs = await response.json();
//         //   return { bugs }
//       // } catch(error) {
//       //   return error.message
//       // }
//     }
// )

const initialState = {//state.
  items: [], //id,title,completed
  totalBugs: 0,
  status: null, //'idle' | 'loading' | 'succeeded' | 'failed'
}

const bugSlice = createSlice({
  name: "bugs", //slice name
  initialState,   
  //these acm - methods() receives action creators
  reducers: {                       
    addBug: (state, action) => { //sends new bug to store with a payload
      const newBug = {
        id: uuidv4(),
        title: action.payload.title,  //state = action.payload  uses immerjs - state does not mutate
        completed: false,
        status: `Added ${new Date().toLocaleDateString('en-GB')}`
      }
                          //state.ARRAYNAME.find(....)  //findIndex better - more specfic
      const existingBug = state.items.find(bug => bug.id === newBug.id)   
      if(!existingBug) {   
        state.items.push(newBug)       //createSlice uses immerjs
      }  //immerjs which copies state immutably for us

      state.totalBugs++      
    },
    completeBug: (state, action) => {    //working!
      const existingBug = state.items.find(bug => bug.id === action.payload.id)
      existingBug.completed = !existingBug.completed
      state.status = 'Bug updated'
      existingBug.status = `Updated ${new Date().toLocaleDateString('en-GB')}`
    },
    deleteBug: (state, action) => {
      const updatedCart = state.items.filter(bug => bug.id !== action.payload.id)
      state.items = updatedCart
      
      state.totalBugs--
      state.status = 'Bug deleted.'
      updatedCart.status = `Deleted ${new Date().toLocaleDateString('en-GB')}`  
    },
  },//end regular reducer  
  //reducers handles and return action creator method
  //extraReducers 
    //have custom acm, have access to action types
    //do not return actions, but other functions  
    //live outside reducers; independant functions with extra duties  
    //update state, status (shown on FE) 
  extraReducers: {//related to state of thunk
    // //gets bugs from store and displays on FE
    // [getBugsAsync.fulfilled]: (state, action) => {
    //     //state = action.payload;
    //     // //return action.payload.items
    //     // state.status = 'getBug success!';
    //     //console.log("fetching data successfully!")  
    //     state = action.payload;    
    //     //return action.payload.bugs
    // },   
    //addBugs sends to      
    [sendBugsAsync.fulfilled]: (state, action) => { 
    //   state.error = false 
    //   state.push(action.payload) //adds to current payload 
    //   state.error = false        
    //   state.totalBugs++

      // const newBug = {
      //   id: uuidv4(),
      //   title: action.payload.title,  //state = action.payload  uses immerjs - state does not mutate
      //   completed: false,
      // }
      //                     //state.ARRAYNAME.find(....)  //findIndex better - more specfic
      // const existingBug = state.items.find(bug => bug.id === newBug.id)   
      // //createSlice uses immerjs which copies state immutably for us
      // if(!existingBug) {
      //   state.items.push(newBug) //pushing a const as an object
      //   //state.bugs.concat(...state, newBug)
      // } 

      state.status = 'Bug added!'  
    },        
    // [getBugsAsync.pending]: (state) => {
    //   state.status = 'Reloading';
    // },
    // //[getBugsAsync.fulfilled]: (state, action) => {
    // [getBugsAsync.fulfilled]: (state) => {
    //     state.status = 'Updated!';
    //   //state.items = action.payload;
    // },
    // [getBugsAsync.rejected]: (state) => {
    //   state.status = 'Failed to update!';
    // }    
  }   
});

export const { addBug, completeBug, deleteBug } = bugSlice.actions

export default bugSlice.reducer