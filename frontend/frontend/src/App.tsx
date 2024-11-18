import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useMainStore from './zustand/mainStore'

function App() {
  const [count, setCount] = useState(0)

  const { tasks, fetchTasks } = useMainStore.getState();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      Tasks

      
    </div>
  )
}

export default App
