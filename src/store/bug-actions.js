import axios from 'axios'
//import fetch from 'node-fetch'
//import { useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';

//const bugs = useSelector(state => state.bugs)


//BE API (server) - two types
//1) BE does alot of work - transforms + store data - FE does less work - using BE programming node.js/php
//2) BE does a little work - stores incoming data only (firebase) - FE does more work (more code instructions on FE) 
//you can transform and store data on firebase using the function feature

//Examples:
//1) BE doing the work:  
//2) FE doing the work:  add() - code instructs program gets payload from form, determine if existing, if !existing push to store as an obj, increase total, obj is sent to firebase BE as stored data 
//lesson 255/256 - where to place code


//bugs saved "in memory" on api are not saved to database so data lost with each restart
//thunk gets data from api as payload and sends back to FE 

//use fetch() for get and put - these thunk function calls will create actions: 
//action.payload.pending, action.payload.fullfilled, then push action.payload to state to update store and update FE

//should never perform any side effects (fetch/api call) in the reducer with asynchronous or synchronous
//we can place in a component or bug-actions.js 
//bug-actions.js sends over all createAysncThunk functions as export cont, then import as
//import { sendBugAsync } from '../store/cart-actions' into bugSlice 

//custom action creator functions which does not return actions, but other functions  

//Added step: This returns data from API to localhost:4000 (sendBugsAsync - already sends to firebase)
export const getBugsAsync = createAsyncThunk( //has 3 parameters:
  'bugs/getBugsAsync', //action type (slice name/action creator name) - getBugsAsync() = addBug() 
  async() => {    //payload creator callback - this generates 3 action types (code in extraReducers): pending, fulfilled, pending 
    //try {  
      const response = await axios.get('http://localhost:4000/bugs') //works!  //REST API - external - firebase database
      return await response?.data  //works!  creates a payload

    //   //const response = await fetch('http://localhost:4000/bugs')  //REST API - external - database
    //   if(response.ok){
    //     const bugs = await response.json();  //Works!  returns data
    //     return { bugs }  //this dispatches an action - bugs will be in the payload and actions will be handled by extraReducer
    //     //console.log({bugs})
    // } else if (!response.ok) throw new Error("Error sending data.");    


    //     //optionally:
    //     // const bug = await response.json(); 
    //     // return { id: bugs.id, title: bugs.title, completed: bugs.completed }
    //  // }  
    // } catch(error) {
    //   return error.message
    // }
  }
)

//1. update the redux store with new payload, then
//2. in Home.js (App.js)), using useEffect, send data in firebase

/*
useEffect(() => {
    fetch('http:..../bugs.json'), {
        method: 'PUT',          //put updates entire bug api
        body: JSON.stringify()
    }
}, [bug])
*/

const POSTURL='https://bugs-api-default-rtdb.firebaseio.com/bugs.json'

//we can just do this in the component...
//addBug() acm sends new bug to store 
//sendBugsAsync() send bugs from store to firebase (view on link)
export const sendBugsAsync = createAsyncThunk( //has 3 parameters
  'bugs/sendBugsAsync', //action type (slice name/name of action creator)
  async(bugData) => {    //payload creator - it's a function that takes  
    //try { //not needed with createAsyncThunk
        //const response = await fetch('http://localhost:4000/bugs', {
        //const response = await fetch('/bugs', {  //this is if we are using a specific route - locally it's localhost  
        //const response = await axios('http://localhost:4000/bugs', {
        // const response = await fetch(POSTURL, {
        //   method: 'PUT',
        //   body: JSON.stringify(bugs)  //format exists in firebase   
        // }) 
        //const response = await axios.put(POSTURL, {title: payload.title})
        const response = await axios.put(POSTURL, bugData)
        return response.data
        // if(response.ok){
        //     const bug = await response.json();
        //     return { bug }
        // } 
    //     else if (!response.ok) throw new Error("Error sending data.");    
    // } catch(error){
    //     return error.message
    // }
 }
)


//optionally:
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
//       }) //all other values will send by default - api will return all these values
//     })
//     if(response.ok){
//       const bug = await response.json();
//       return { bug }
//     }
//   }
// )

// //COMPLETE bugs
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

// //DELETE bugs
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