import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IoIosClose } from "react-icons/io";
import TextField from '@mui/material/TextField';


interface ProfileDropdwnProps {
    isOpen: boolean;
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown: React.FC<ProfileDropdwnProps> = ({ isOpen, setIsDropdownOpen }) => {

    const [value, setValue] = React.useState('1');
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    return (
      <div className="slide-menu-container" style={{ display: isOpen ? "block" : "none" }}>
        <div className="close-icon-container" onClick={() => setIsDropdownOpen(false)}>
          <IoIosClose />
        </div>
  
        <div>
          <Box sx={{ width: '100%', typography: 'body1' }}>

            <TabContext value={value}>
                
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange}>
                  <Tab label="Sign Up" value="1" sx={{ width: '50%' }} />
                  <Tab label="Log In" value="2" sx={{ width: '50%' }} />
                </TabList>
              </Box>
  
              <TabPanel value="1" sx={{ padding: 0 }}>
                <form action="" className="form">
                  <TextField id="outlined-basic" label="Username" variant="outlined" />
                  <TextField id="outlined-basic" label="Email" variant="outlined" />
                  <TextField id="outlined-basic" label="Password" variant="outlined" />
                  <button className="submit-btn">SUBMIT</button>
                </form>
              </TabPanel>
  
              <TabPanel value="2" sx={{ padding: 0 }}>
                <form action="" className="form">
                  <TextField id="outlined-basic" label="Username" variant="outlined" />
                  <TextField id="outlined-basic" label="Password" variant="outlined" />
                  <button className="submit-btn">SUBMIT</button>
                </form>
              </TabPanel>

            </TabContext>

          </Box>
        </div>
      </div>
    );
  };

export default ProfileDropdown;