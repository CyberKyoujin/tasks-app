import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useMainStore from './zustand/mainStore'
import Navbar from './components/Navbar'
import TasksSection from './components/TasksSection'
import { MdChecklist } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { CiBoxList } from "react-icons/ci";
import ProfileDropdown from './components/ProfileDropdown'

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { tasks, fetchTasks, isLoading, error } = useMainStore();

  useEffect(() => {
    fetchTasks();
    console.log(tasks);
  }, [fetchTasks]);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error fetching tasks: {error}</div>;

  return (
    <>
      <Navbar setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} />
      <ProfileDropdown isOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      <TasksSection 
        tasks={tasks?.filter(task => task.is_missed === false && task.is_completed === false) || []} 
        title="Active Tasks" 
        IconComponent={CiBoxList} 
      />
      <TasksSection 
        tasks={
          tasks?.filter(task => task.is_completed === true) || []
        }
        title="Completed Tasks" 
        IconComponent={MdChecklist} 
      />
      <TasksSection 
        tasks={
          tasks?.filter(task => task.is_missed) || []
        }
        title="Missed Tasks" 
        IconComponent={ImCancelCircle} 
      />
    </>
  );
}

export default App
