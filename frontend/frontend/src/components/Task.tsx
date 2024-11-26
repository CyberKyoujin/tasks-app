import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiCheckDoubleLine } from "react-icons/ri";
import useMainStore from "../zustand/mainStore";

interface Task {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
    completed_at: string;
}


interface TaskProps {
    id: string;
    title: string;
    description: string;
    is_completed: boolean;
    priority: string;
    due_date: string;
    is_missed: boolean;
    completed_at: string;
}

const Task: React.FC<TaskProps> = ({ id, title, description, is_completed, priority, due_date, is_missed, completed_at}) => {

    const [taskBackground, setTaskBackground] = useState<string>('');
    const [itemsBackground, setItemsBackground] = useState<string>('');

    const {markCompleted, deleteTask, setTasks, tasks} = useMainStore();

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

    const handleMarkCompleted = async (id: string) => {
        try {
            const updatedTasks = tasks.map((task) =>
                task.id === id ? { ...task, is_completed: true } : task
            );
    
            setTasks(updatedTasks); 
    
            await markCompleted(id);
        } catch (error) {
            console.error("Failed to mark task as completed:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            
            await deleteTask(id);
            const updatedTasks = tasks.filter((task) => task.id !== id);
    
            setTasks(updatedTasks);
    
            console.log(`Task with ID ${id} deleted successfully`);

        } catch (error) {
            console.error("Failed to delete task:", error);
            alert("An error occurred while deleting the task. Please try again.");
        }
    };

    return (
        <div 
            className="task-container" 
            key={id} 
            style={{ background: taskBackground }} 
        >
            <div className="task-header">
                <div className="task-title-container">
                    <h2>{title.length > 18 ? title.slice(0, 17) + "..." : title}</h2>
                    {completed_at ? (<p>Completed at {completed_at}</p>) : (<p>Due to {due_date}</p>)}
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

                { is_completed || is_missed ? (

                    <button 
                    style={{
                        display: "flex", 
                        backgroundColor: itemsBackground,
                        width: "100%"
                    }}
                    onClick={() => handleDelete(id)}
                    >
                    <MdOutlineDeleteOutline/>
                    </button>

                ) : (
                <>
                <button 
                    style={{
                        backgroundColor: itemsBackground, 
                        width: "160px"
                    }}
                    onClick={() => handleDelete(id)}
                >
                    <MdOutlineDeleteOutline/>
                    
                </button>
        
                <button 
                    style={{
                        width: "160px",
                        backgroundColor: itemsBackground
                    }}
                    onClick={() => handleMarkCompleted(id)}
                >
                    <RiCheckDoubleLine />
                </button>
                </>
                )}

               
            </div>
        </div>
    );
}


export default Task