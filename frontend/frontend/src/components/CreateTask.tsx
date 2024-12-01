import React, { useState } from "react";
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
import useMainStore from "../zustand/mainStore";
import { Dayjs } from "dayjs";


interface CreateTaskProps {
    createMenuOpen: boolean;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setTaskUpdated: React.Dispatch<React.SetStateAction<boolean>>; // New prop
  }
  
  const CreateTask: React.FC<CreateTaskProps> = ({createMenuOpen, setCreateMenuOpen, setTaskUpdated,}) => {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("1");
    const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  
    const { createTask } = useMainStore();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("priority", priority);
      formData.append("due_date", dueDate ? dueDate.toISOString().slice(0, 10) : "");
  
      await createTask(formData);

      setTitle("");
      setDescription("");
      setPriority("1");
      setDueDate(null);
      setCreateMenuOpen(false);
  
      setTaskUpdated((prev) => !prev);
    };
  
    return (
      <div
        className="create-task-container"
        style={{ display: createMenuOpen ? "block" : "none" }}
      >
        <div className="create-title-container">
          <MdOutlinePlaylistAdd style={{ color: "rgb(92, 92, 247)", fontSize: "45px" }} />
          <h2>Create New Task</h2>
        </div>
  
        <div
          className="close-icon-container"
          onClick={() => setCreateMenuOpen(!createMenuOpen)}
        >
          <IoIosClose style={{ fontSize: "50px" }} />
        </div>
  
        <div className="divider"></div>
  
        <div className="create-form-container">
          <form className="create-form" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
  
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
  
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Priority</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
              </RadioGroup>
            </FormControl>
  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Due Date"
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
  
            <button className="submit-btn" type="submit">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  };
  

export default CreateTask;