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

  const { tasks, fetchTasks } = useMainStore.getState();

  useEffect(() => {
    fetchTasks();
    console.log(isDropdownOpen)
  }, [isDropdownOpen]);

  return (
    <>
      <Navbar setIsDropdownOpen={setIsDropdownOpen}/>
      <ProfileDropdown isOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen}/>
      <TasksSection 
      tasks={
        [
          {
            id: "1", 
            title: "Make Homework", 
            description: "Do math tasks for the exam on Thursday", 
            completed: false,
            priority: "1",
            dueDate: "2022-01-15",
            isMissed: false
          }
        ]
      }
      title="Active Tasks"
      IconComponent={CiBoxList}
      />
      <TasksSection 
      tasks={
        [
          {
            id: "1", 
            title: "Make Homework", 
            description: "Do math tasks for the exam on Thursday", 
            completed: true,
            priority: "1",
            dueDate: "2022-01-15",
            isMissed: false,
          }
        ]
      }
      title="Completed Tasks"
      IconComponent={MdChecklist}
      />
      <TasksSection 
      tasks={
        [
          {
            id: "1", 
            title: "Take dog", 
            description: "Do math tasks for the exam on Thursday", 
            completed: false,
            priority: "1",
            dueDate: "2022-01-15",
            isMissed: true,
          }
        ]
      }
      title="Missed Tasks"
      IconComponent={ImCancelCircle}
      />
    </>
  )
}

export default App
