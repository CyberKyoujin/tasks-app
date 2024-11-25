import React from "react";

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
    <div className="task-container" key={id}>

        <div className="task-header">
            <div className="task-title-container">
                <h2>{title}</h2>
            </div>
            <div className="task-priority-container">
                <div className="task-priority">
                    <h1>{priority}</h1>
                </div>
            </div>
        </div>

        <div className="divider"></div>

        <p>{description}</p>
    </div>
 )
}


export default Task