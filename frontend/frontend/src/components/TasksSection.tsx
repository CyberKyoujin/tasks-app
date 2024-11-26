import React from "react";
import { MdChecklist } from "react-icons/md";
import Task from "./Task";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";
import Grid from '@mui/material/Grid2';


interface TaskObject {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
}

interface TasksSectionProps {
    tasks: TaskObject[];
    title: string;
    IconComponent: IconType;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const TasksSection: React.FC<TasksSectionProps> = ({tasks, title, IconComponent, setCreateMenuOpen, setTaskUpdated}) => {
    return (
        <div className="task-section">
            <div className="tasks-header">
                <div className="section-title-text">
                    <IconComponent style={{fontSize: "60px", color: "rgb(92, 92, 247)"}}/>
                    <h1>{title}</h1>
                </div>
                
                {title === "Active Tasks" && (
                <div>
                    <button className="add-btn" onClick={() => setCreateMenuOpen(true)}><FaPlus/></button>
                </div>
                )}
                
            </div>

            <div className="divider"></div>


            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 0, md: 0, lg: 4 }}>

                {tasks.map((task) => (
                    <Grid size={4} key={task.id}>
                    <Task key={task.id}
                    id={task.id} 
                    title={task.title}
                    description={task.description}
                    is_completed={task.is_completed}
                    priority={task.priority}
                    due_date={task.due_date}
                    is_missed={task.is_missed}
                    />
                    </Grid>
                ))}

            </Grid>

        </div>
    )
}

export default TasksSection