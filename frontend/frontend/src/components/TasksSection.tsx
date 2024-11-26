import React from "react";
import Task from "./Task";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";
import Grid from '@mui/material/Grid2';
import { LuSearchX } from "react-icons/lu";
import useAuthStore from "../zustand/authStore";

interface TaskObject {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
    completed_at: string;
}

interface TasksSectionProps {
    tasks: TaskObject[];
    title: string;
    IconComponent: IconType;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TasksSection: React.FC<TasksSectionProps> = ({tasks, title, IconComponent, setCreateMenuOpen, setDropdownOpen}) => {
   
   const { isAuthenticated } = useAuthStore();
   
   
   
    return (
        <div className="task-section">
            <div className="tasks-header">
                <div className="section-title-text">
                    <IconComponent style={{fontSize: "60px", color: "rgb(92, 92, 247)"}}/>
                    <h1>{title}</h1>
                </div>
                
                {title === "Active Tasks" && (
                <div>
                    <button className="add-btn" 
                    onClick={() => {
                        if(isAuthenticated){
                            setCreateMenuOpen(true)
                        } else {
                            setDropdownOpen(true)
                        }
                        }
                    }>
                    <FaPlus/>
                    </button>
                </div>
                )}
                
            </div>

            <div className="divider"></div>

            {tasks.length > 0 ? (
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
                    completed_at={task.completed_at}
                    />
                    </Grid>
                ))}

                </Grid>

            ) : (

                <div className="no-tasks">
                    <LuSearchX style={{fontSize: "100px", color: "rgb(92, 92, 247)"}}/>
                    <p style={{fontSize: "30px"}}>No tasks found.</p>
                </div>

            )}
        </div>
    )
}

export default TasksSection