import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";


interface TaskProps {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
}

const Task: React.FC<TaskProps> = ({ id, title, description, is_completed, priority, due_date, is_missed }) => {

    const [taskBackground, setTaskBackground] = useState<string>('');
    const [itemsBackground, setItemsBackground] = useState<string>('');

    useEffect(() => {
        if (is_missed === true) {
            // Missed tasks
            setTaskBackground("linear-gradient(to right, rgb(110, 110, 110), rgb(190, 190, 190))");
            setItemsBackground("rgb(102, 101, 101)"); 
        } else if (is_completed) {
            // Completed tasks
            setTaskBackground("linear-gradient(to right, rgb(25, 185, 30), rgb(116, 243, 120))");
            setItemsBackground("rgb(25, 185, 30)"); 
        } else {
            // Active tasks
            setTaskBackground("linear-gradient(to right, rgb(92, 92, 247), rgb(147, 147, 255))");
            setItemsBackground("rgb(92, 92, 247)"); 
        }

    }, [is_completed, is_missed]); 
     

    return (
        <div 
            className="task-container" 
            key={id} 
            style={{ background: taskBackground }} 
        >
            <div className="task-header">
                <div className="task-title-container">
                    <h2>{title.length > 18 ? title.slice(0, 17) + "..." : title}</h2>
                    <p>Due to {due_date}</p>
                </div>
                <div className="task-priority-container">
                    <div 
                        className="task-priority"
                        style={{ backgroundColor: itemsBackground }} 
                    >
                        <h2>{priority}</h2>
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <div className="task-content">
                <p>{description}</p>
            </div>

            <div className="task-btn-container">
                <button 
                    style={{
                        backgroundColor: itemsBackground, 
                        width: is_completed || is_missed ? "100%" : "160px"
                    }}
                >
                    <MdOutlineDeleteOutline />
                </button>
                <button 
                    style={{
                        display: is_completed || is_missed ? "none" : "flex", 
                        backgroundColor: itemsBackground
                    }}
                >
                    <MdOutlineModeEditOutline />
                </button>
            </div>
        </div>
    );
}


export default Task