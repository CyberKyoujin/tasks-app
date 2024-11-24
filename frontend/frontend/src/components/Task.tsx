import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";


interface TaskProps {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    dueDate: string;
    isMissed: boolean;
}

const Task: React.FC<TaskProps> = ({ id, title, description, completed, priority, dueDate, isMissed }) => {

    const [taskBackground, setTaskBackground] = useState<string>('');
    const [itemsBackground, setItemsBackground] = useState<string>('');

    useEffect(() => {
        if (isMissed === true) {
            // Missed tasks
            setTaskBackground("linear-gradient(to right, rgb(110, 110, 110), rgb(203, 203, 203))");
            setItemsBackground("rgb(102, 101, 101)"); 
        } else if (completed) {
            // Completed tasks
            setTaskBackground("linear-gradient(to right, rgb(25, 185, 30), rgb(116, 243, 120))");
            setItemsBackground("rgb(25, 185, 30)"); 
        } else {
            // Active tasks
            setTaskBackground("linear-gradient(to right, rgb(92, 92, 247), rgb(147, 147, 255))");
            setItemsBackground("rgb(92, 92, 247)"); 
        }

    }, [completed, isMissed]); 
     

    return (
        <div 
            className="task-container" 
            key={id} 
            style={{ background: taskBackground }} 
        >
            <div className="task-header">
                <div className="task-title-container">
                    <h2>{title.length > 18 ? title.slice(0, 17) + "..." : title}</h2>
                    <p>Due to {dueDate}</p>
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
                        width: completed || isMissed ? "100%" : "160px"
                    }}
                >
                    <MdOutlineDeleteOutline />
                </button>
                <button 
                    style={{
                        display: completed || isMissed ? "none" : "flex", 
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