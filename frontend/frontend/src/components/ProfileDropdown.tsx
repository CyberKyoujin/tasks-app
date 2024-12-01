import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IoIosClose } from "react-icons/io";
import TextField from '@mui/material/TextField';
import useAuthStore from "../zustand/authStore";


interface ProfileDropdwnProps {
    isOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown: React.FC<ProfileDropdwnProps> = ({ isOpen, setIsDropdownOpen }) => {

    const [value, setValue] = useState('1');
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { registerUser, loginUser, isAuthenticated, user, logoutUser } = useAuthStore();

    useEffect(() => {

    }, [isAuthenticated])
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      event.preventDefault();
      setValue(newValue);
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await registerUser(username, email, password);

      setUsername("");
      setEmail("");
      setPassword("");
    }

    const handleLoginSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await loginUser(username, password);

      setUsername("");
      setPassword("");
    }
  
    return (
      <div className="slide-menu-container" style={{ display: isOpen ? "block" : "none" }}>
        <div className="close-icon-container" onClick={() => setIsDropdownOpen(false)}>
          <IoIosClose />
        </div>
  
        <div>
          {isAuthenticated ? (

            <div className="user-data-container">

              <div className="data-container">
                <div className="main-data-container">
                  <div className="avatar-name-container">
                      <h2>{user?.username[0].toUpperCase()}</h2>
                  </div>
                  <div>
                    <p style={{fontSize: "20px"}}>{user?.username}</p>
                    <p style={{fontSize: "14px", fontWeight: "bold"}}>Joined {user?.date_joined}</p>
                  </div>
                </div>
                <div className="tasks-number-container">
                  <h2 style={{color: "rgb(67, 67, 248)"}}>{user?.tasks}</h2>
                  <p>Tasks</p>
                </div>
              </div>

              <div className="divider">

              </div>

              <div>
                <button 
                className="submit-btn" 
                style={{width: "100%"}}
                onClick={() => logoutUser()}>Log Out</button>
              </div>

            </div>

          ) : (
            
            <Box sx={{ width: '100%', typography: 'body1' }}>

              <TabContext value={value}>
                  
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="Sign Up" value="1" sx={{ width: '50%' }} />
                    <Tab label="Log In" value="2" sx={{ width: '50%' }} />
                  </TabList>
                </Box>
    
                <TabPanel value="1" sx={{ padding: 0 }}>
                  <form action="" className="form" onSubmit={handleRegisterSubmit}>
                    <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" type="password" label="Password" variant="outlined" />
                    <button type="submit" className="submit-btn">SUBMIT</button>
                  </form>
                </TabPanel>
    
                <TabPanel value="2" sx={{ padding: 0 }}>
                  <form action="" className="form" onSubmit={handleLoginSubmit}>
                    <TextField value={username} onChange={(e) => setUsername(e.target.value)} id="outlined-basic" label="Username" variant="outlined" />
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" type="password" label="Password" variant="outlined" />
                    <button type="submit" className="submit-btn">SUBMIT</button>
                  </form>
                </TabPanel>

              </TabContext>

            </Box>
          
          )}
        </div>
      </div>
    );
  };

export default ProfileDropdown;