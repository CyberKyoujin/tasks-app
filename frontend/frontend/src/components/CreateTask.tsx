import React from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { IoIosClose } from "react-icons/io";


interface CreateTaskProps {
    createMenuOpen: boolean;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const CreateTask: React.FC<CreateTaskProps> = ({createMenuOpen, setCreateMenuOpen}) => {
    return (
        <div className="create-task-container" style={{display: createMenuOpen ? "block" : "none"}}>
            <div className="create-title-container">
                <MdOutlinePlaylistAdd style={{color: "rgb(92, 92, 247)", fontSize: "45px"}}/>
                <h2>Create New Task</h2>
            </div>

            <div className="close-icon-container" onClick={() => setCreateMenuOpen(!createMenuOpen)}>
                <IoIosClose style={{fontSize: "50px"}}/>
            </div>

            <div className="divider"></div>

            <div className="create-form-container">
                <form action="" className="create-form">
                    <TextField id="outlined-basic" label="Title" variant="outlined" fullWidth/>
                    <TextField id="outlined-basic" label="Description" variant="outlined" fullWidth/>

                    <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="1" />
                            <FormControlLabel value="male" control={<Radio />} label="2" />
                            <FormControlLabel value="other" control={<Radio />} label="3" />
                            
                        </RadioGroup>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Due to</FormLabel>
                        <DatePicker />
                    </LocalizationProvider>

                    <button className="submit-btn">SUBMIT</button>

                </form>
            </div>
        </div>
    )
}

export default CreateTask;