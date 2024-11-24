import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";


interface TaskProps {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    dueDate: string;
}

const Task: React.FC<TaskProps> = ({id, title, description, completed, priority, dueDate}) => {
    return (
       <div className="task-container" 
       key={id} 
       style={{
            background: completed 
                ? "linear-gradient(to right, rgb(0, 114, 0), rgb(87, 253, 65))" 
                : "linear-gradient(to right, rgb(92, 92, 247), rgb(147, 147, 255))"
        }}>

           <div className="task-header">
               <div className="task-title-container">
                   <h2>{title.length > 18 ? title.slice(0, 17) + "..." : title}</h2>
                   <p>Due to {dueDate}</p>
               </div>
               <div className="task-priority-container">
                   <div className="task-priority"
                   style={{
                    backgroundColor: completed 
                       ? "rgb(0, 114, 0)" 
                       : "rgb(67, 67, 252)"
                   }}>
                       <h2>{priority}</h2>
                   </div>
               </div>
           </div>
   
           <div className="divider"></div>
   
           <div className="task-content">
               <p>{description}</p>
           </div>
   
           <div className="task-btn-container">
               <button style={{backgroundColor: completed ? "rgb(0, 114, 0)" : "rgb(67, 67, 252)", width: completed ? "100%": "160px"}}><MdOutlineDeleteOutline/></button>
               <button style={{display: completed ? "none" : "flex", backgroundColor: completed ? "rgb(0, 114, 0)" : "rgb(67, 67, 252)"}}><MdOutlineModeEditOutline/></button>
           </div>
       </div>
    );
   }

export default Task