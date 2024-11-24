import React from "react";
import { MdChecklist } from "react-icons/md";
import Task from "./Task";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    dueDate: string;
    isMissed: boolean;
}

interface TasksSectionProps {
    tasks: Task[];
    title: string;
    IconComponent: IconType;
}

const TasksSection: React.FC<TasksSectionProps> = ({tasks, title, IconComponent}) => {
    return (
        <div className="task-section">
            <div className="tasks-header">
                <div className="section-title-text">
                    <IconComponent style={{fontSize: "60px", color: "rgb(92, 92, 247)"}}/>
                    <h1>{title}</h1>
                </div>
                
                {title === "Active Tasks" && (
                <div>
                    <button className="add-btn"><FaPlus/></button>
                </div>
                )}
                
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
                    isMissed={task.isMissed}
                    />
                ))}
            </div>
        </div>
    )
}

export default TasksSection