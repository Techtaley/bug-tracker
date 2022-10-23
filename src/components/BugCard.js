import { useDispatch } from 'react-redux'  
import { completeBug } from '../store/bugSlice'  

export default function BugCard({ item }) {  
    const dispatch = useDispatch()

    const handleComplete = () => {   
        dispatch(completeBug(item))  
    }

    return (
        <div>  
            <ul>
                <li key={item.id} className="nobullets list_bugs_li">                        

                    <span className='bold-text initial_cap'>{item.title} </span>  
                    <span><button className="bug_button_edit"> edit</button></span>
                    <span><button className="bug_button_delete" onClick={handleComplete}>{item.completed ? "Completed" : "In Progress"}</button></span>
                    <span>  <i>{item.date}</i></span>
                </li>                
            </ul>
        </div>
    )
}
