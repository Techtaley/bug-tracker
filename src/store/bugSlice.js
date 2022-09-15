//import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
//import fetch from 'node-fetch'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const POSTURL='https://bugs-api-default-rtdb.firebaseio.com/bugs.json'

//send new bugs to BE
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

//gets products from DB - another option is fetchBaseURL using bugsApi 
export const getBugsAsync = createAsyncThunk( //has 3 parameters:
  'bugs/getBugsAsync', //action type (slice name/action creator name) - getBugsAsync() = addBug() 
  async() => {    //payload creator callback - this generates 3 action types (code in extraReducers): pending, fulfilled, pending        
        const response = await axios.get(POSTURL) //works!  //REST API - external - firebase database
        return response?.data  //works!  creates a payload   
    }
)

const initialState = {//state.
  //items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [], //id,title,completed,status
  items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [{id: 111, title: "Bug 1", completed: false, status: `Added ${new Date().toLocaleDateString('en-GB')}`}], //id,title,completed
  totalBugs: localStorage.getItem("totalBugs") ? JSON.parse(localStorage.getItem("totalBugs")) : 1,
  status: null, //'idle' | 'loading' | 'succeeded' | 'failed'
}

const bugSlice = createSlice({
  name: "bugs", //slice name
  initialState,     
  reducers: {   
    addBug: (state, action) => { //acm() receives action creators
      const newBug = { //sends new bug to store with a payload 
        id: uuidv4(),
        title: action.payload.title,  //state = action.payload  uses immerjs - state does not mutate
        completed: false,
        status: `Added ${new Date().toLocaleDateString('en-GB')}`
      }
                          //state.ARRAYNAME.find(....)  //findIndex better - more specfic
      const existingBug = state.items.find(bug => bug.id === newBug.id)   
      if (!existingBug) {
        state.items.push(newBug) //immerjs state immutably for us
      }

      state.totalBugs++
      //state.status = 'Loading...'  
      localStorage.setItem("items", JSON.stringify(state.items))
      localStorage.setItem("totalBugs", JSON.stringify(state.totalBugs))
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
  extraReducers: {//related to state of thunk
    [sendBugsAsync.fulfilled]: (state) => { 
      state.status = 'Loading to BE...'   
    },    
    [sendBugsAsync.fulfilled]: (state) => { 
      state.status = 'Bug added!'   
    },        
    [sendBugsAsync.rejected]: (state) => { 
      state.status = 'Failed to load to BE'  
    },
  }   
});

export const { addBug, completeBug, deleteBug } = bugSlice.actions

export default bugSlice.reducer