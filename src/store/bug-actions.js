import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit';

//Added step: This returns data from API to localhost:4000 (sendBugsAsync - already sends to firebase)
export const getBugsAsync = createAsyncThunk( //has 3 parameters:
  'bugs/getBugsAsync', 
  async() => {     
    const response = await axios.get('http://localhost:4000/bugs') //works!  //REST API - external - firebase database
    return await response?.data  //creates a payload
  }
)

const POSTURL='https://bugs-api-default-rtdb.firebaseio.com/bugs.json'

export const sendBugsAsync = createAsyncThunk( //has 3 parameters
  'bugs/sendBugsAsync', 
  async(bugData) => {   
    const response = await axios.put(POSTURL, bugData)
    return response.data
 }
)