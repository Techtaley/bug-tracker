//import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
//import fetch from 'node-fetch'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const POSTURL='https://bugs-api-default-rtdb.firebaseio.com/bugs.json'

//gets bugs from firebase display on FE
export const getBugsAsync = createAsyncThunk( //has 3 parameters:
  'bugs/getBugsAsync', //action type (slice name/action creator name) - getBugsAsync() = addBug() 
  async() => {    //payload creator callback - this generates 3 action types (code in extraReducers): pending, fulfilled, pending        
    try{
      //const response = await axios.get(`/bugs`);  //`https://jsonplaceholder.typicode.com/posts`
      const response = await axios.get(POSTURL) //works!  //REST API - external - firebase database
      //const data = await response.json();
      return response?.data  //works!   
      //console.log(response.data)
    } catch(error){
      return error.message
    }
  }
)

//send update to firebase
export const sendBugsAsync = createAsyncThunk( //has 3 parameters
  'bugs/sendBugsAsync', //action type (slice name/name of action creator)
  async(bugData) => {    //payload creator - it's a function that takes   
    try {
      const response = await axios.put(POSTURL, bugData)
      return response?.data
    } catch (error){
      return error.message
    }
   }
)



const initialState = {//state.
  items: [], 
  totalBugs: localStorage.getItem("totalBugs") ? JSON.parse(localStorage.getItem("totalBugs")) : 0,
  status: null, 
  loading: false,
  error: null
}

const bugSlice = createSlice({
  name: "bugs", 
  initialState,     
  reducers: {   
    addBug: (state, action) => { 
      const newBug = {  
        id: uuidv4(),
        title: action.payload.title,  
        completed: false,
        status: "Bug Added",
        date: `Added ${new Date().toLocaleDateString('en-US')}`
      }
                         
      const existingBug = state.items.find(bug => bug.id === newBug.id)   
      if (!existingBug) {
        state.items.push(newBug) 
      }

      state.totalBugs++
      localStorage.setItem("items", JSON.stringify(state.items))
      localStorage.setItem("totalBugs", JSON.stringify(state.totalBugs))
    },
    completeBug: (state, action) => {    //working!
      const existingBug = state.items.find(bug => bug.id === action.payload.id)
      existingBug.completed = !existingBug.completed
      state.status = 'Bug updated'
      existingBug.status = `Updated ${new Date().toLocaleDateString('en-US')}`
    },
    deleteBug: (state, action) => {
      const updatedCart = state.items.filter(bug => bug.id !== action.payload.id)
      state.items = updatedCart
      
      state.totalBugs--
      state.status = 'Bug deleted.'
      updatedCart.status = `Deleted ${new Date().toLocaleDateString('en-GB')}`  
    },
  },//end regular reducer  
  extraReducers: {//related to state of thunk
    [sendBugsAsync.pending]: (state) => { 
      state.status = 'Sending...'  
    },    
    [sendBugsAsync.fulfilled]: (state, action) => { 
      state.status = 'Bug sent!' 
    },        
    [sendBugsAsync.rejected]: (state) => { 
      state.status = 'Failed to send bug to DB.'  
    },
    [getBugsAsync.pending]: (state) => { 
      state.loading = true
      // state.status = 'Loading...'
    },    
    [getBugsAsync.fulfilled]: (state, action) => { 
      state.loading = false
      state = action.payload
    },        
    [getBugsAsync.rejected]: (state, action) => { 
      state.loading = false
      state.error = action.error.message
    },    
   }   
});

export const { addBug, completeBug, deleteBug } = bugSlice.actions

export default bugSlice.reducer