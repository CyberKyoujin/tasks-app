import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useMainStore from './zustand/mainStore'
import Navbar from './components/Navbar'
import TasksSection from './components/TasksSection'

function App() {
  const [count, setCount] = useState(0)

  const { tasks, fetchTasks } = useMainStore.getState();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar/>
      <TasksSection 
      tasks={
        [
          {
            id: "1", 
            title: "Make Homework", 
            description: "Do math tasks for the exam on Thursday", 
            completed: false,
            priority: "1",
            dueDate: "2022-01-15"
          }
        ]
      }
      title="Active Tasks"
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
            dueDate: "2022-01-15"
          }
        ]
      }
      title="Completed Tasks"
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
            dueDate: "2022-01-15"
          }
        ]
      }
      title="Missed Tasks"
      />
    </>
  )
}

export default App
