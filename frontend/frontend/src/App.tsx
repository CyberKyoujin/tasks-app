import { useState, useEffect } from 'react'
import useMainStore from './zustand/mainStore'
import Navbar from './components/Navbar'
import TasksSection from './components/TasksSection'
import { MdChecklist } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { CiBoxList } from "react-icons/ci";
import ProfileDropdown from './components/ProfileDropdown'
import CreateTask from './components/CreateTask'
import Overlay from './components/Overlay'
import useAuthStore from './zustand/authStore'
import CircularProgress from '@mui/material/CircularProgress';
import { BiSolidError } from "react-icons/bi";


function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [taskUpdated, setTaskUpdated] = useState(false);

  const {tasks, fetchTasks, isLoading, error } = useMainStore();

  const { refreshToken } = useAuthStore();

  useEffect(() => {
    const refreshTokenInterval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Error refreshing token:', error);
      }
    }, 240000); 

    return () => clearInterval(refreshTokenInterval);
  }, [useAuthStore]);

  useEffect(() => {
    fetchTasks();
  }, [taskUpdated]);

  if (isLoading) return <div className='progress-container'>
    <CircularProgress style={{width: "100px", height: "100px"}}/>
    <p>Loading tasks...</p>
  </div>;

  if (error) return <div className='progress-container'>
    <BiSolidError style={{fontSize: "140px", color: "rgb(92, 92, 247)"}}/>
    Error fetching tasks: {error}
    </div>;

  return (
    <>
      <Navbar setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen} />
      <CreateTask createMenuOpen={createMenuOpen} setCreateMenuOpen={setCreateMenuOpen} setTaskUpdated={setTaskUpdated}/>
      <Overlay createMenuOpen={createMenuOpen} setCreateMenuOpen={setCreateMenuOpen}/>
      <ProfileDropdown isOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
      <TasksSection 
        tasks={tasks?.filter(task => task.is_missed === false && task.is_completed === false) || []} 
        title="Active Tasks" 
        IconComponent={CiBoxList} 
        setCreateMenuOpen={setCreateMenuOpen}
        setTaskUpdated={setTaskUpdated}
        setDropdownOpen={setIsDropdownOpen}
      />
      <TasksSection 
        tasks={
          tasks?.filter(task => task.is_completed === true) || []
        }
        title="Completed Tasks" 
        IconComponent={MdChecklist} 
        setCreateMenuOpen={setCreateMenuOpen}
        setTaskUpdated={setTaskUpdated}
        setDropdownOpen={setIsDropdownOpen}
      />
      <TasksSection 
        tasks={
          tasks?.filter(task => task.is_missed) || []
        }
        title="Missed Tasks" 
        IconComponent={ImCancelCircle} 
        setCreateMenuOpen={setCreateMenuOpen}
        setTaskUpdated={setTaskUpdated}
        setDropdownOpen={setIsDropdownOpen}
      />
    </>
  );
}

export default App
