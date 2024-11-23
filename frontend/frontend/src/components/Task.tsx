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
    <div className="task=container" key={id}>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
 )
}


export default Task