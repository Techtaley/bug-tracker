//import {useState} from 'react'
//import { useDispatch, useSelector } from 'react-redux'  
import { useDispatch } from 'react-redux'  
import { completeBug } from '../store/bugSlice'  //import completedBugsAsync instead of addBug
//import { completeBugAsync, deleteBugAsync } from '../features/bugSlice'
//import axios from 'axios'

//export default function BugCard({id, title, completed}) {  //{id, title, completed}  //template/instance of each bug with id, desc, date
export default function BugCard({ item }) {  //{id, title, completed}  //template/instance of each bug with id, desc, date
    //const [error, setError] = useState(null)
    const dispatch = useDispatch()

    //const bugs = useSelector(state => state.bugs)  //useSeleector needs to be 

    // const getBugsAsync = createAsyncThunk(
    //     'bugs/getBugsAsync',
    //     async()=> {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    //         if(response.ok){
    //             const bugs = await response.json()
    //             return { bugs }
    //         }
    //     }
    // )

//action.payload is sent from bugSlice with id

// const handleDelete = () => {  //deleting from FE
//     // try { 
//     //     // await axios.delete(`/posts/${post._id}`, {
//     //     await fetch(`/bugs/${bugs._id}`, {
//     //         data: {id: bug.id} 
//     //     })

//     //     window.location.replace("/")

//         dispatch(deleteBug(item))
//         // dispatch(deleteBug({        //just need id to delete  
//         // //dispatch(deleteBugAsync({
//         //   id
//         // }))  //only id is needed to delete 
//         // await axios.delete(`/posts/${post._id}`, {
//         //    data: {username: user.username} 
//         // })
//         //window.location.replace("/")
        
//         // dispatch(deleteBug({
//         //   id
//         // }))  //only id is needed to delete 
//     // } catch(error){
//     //      setError(error.message) 
//     // }
// }

//action.payload is sent from bugSlice with id and isCompleted in order to update    
const handleComplete = () => {   //updating on FE
    // try {  
    //     await fetch(`/bugs/${bugs._id}`, {            
    //     //await axios.put(`/posts/${post._id}`, {  
    //         id: bug.id 
    //     })

        dispatch(completeBug(item))  //optionally, just past object
        //updates are sent back to reducer
        // dispatch(completeBug({          
        // //dispatch(completeBugAsync({     //these values come from the payload     
        //     id,                         
        //     completed
        // }))             
    // } catch(error){
    //      setError(error.message) 
    // }
}

    //retired
    // const handleComplete = () => {      //action.payload is sent from bugSlice with id and isCompleted in order to update
    //     dispatch(completeBugAsync({          //updates are sent back to reducer
    //         id,                         
    //         completed: !completed
    //     }))  
    // }

    // const handleDelete = () => {
    //     dispatch(deleteBugAsync({  //action.payload is sent from bugSlice with id
    //         id                    //only id is needed to delete  
    //     }))          
    // }

    return (
        <div>  
            <ul>
                <li key={item.id} className="nobullets list_bugs_li">                        
                    {/* <input 
                        className="bug_checkbox"
                        type="checkbox"
                        onClick={handleComplete} 
                    />  */}
                    <span className='bold-text initial_cap'>{item.title} </span>  
                    {/* <span className='bold-text'> Status:</span> <span>{item.completed ? "Completed" : "In Progress"} </span> */}
                    <span><button className="bug_button_edit"> update</button></span>
                    <span><button className="bug_button_delete" onClick={handleComplete}>{item.completed ? "Completed" : "In Progress"}</button></span>
                    <span>  <i>{item.status}</i></span>
                </li>                
            </ul>
        </div>
    )
}
