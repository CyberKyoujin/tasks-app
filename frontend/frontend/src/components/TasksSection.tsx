import React from "react";
import { MdChecklist } from "react-icons/md";
import Task from "./Task";


interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    dueDate: string;
}

interface TasksSectionProps {
    tasks: Task[];
    title: string;
}

const TasksSection: React.FC<TasksSectionProps> = ({tasks, title}) => {
    return (
        <div className="task-section">
            <div className="tasks-header">
                <MdChecklist style={{fontSize: "60px", color: "rgb(92, 92, 247)"}}/>
                <h1>Active Tasks</h1>
            </div>

            <div className="divider"></div>

            <div className="tasks-container">
                {tasks.map((task) => (
                    <Task 
                    id={task.id} 
                    title={task.title}
                    description={task.description}
                    completed={task.completed}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    />
                ))}
            </div>
        </div>
    )
}

export default TasksSection