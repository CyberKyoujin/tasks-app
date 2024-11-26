import React from "react";
import { RiCheckDoubleLine } from "react-icons/ri";
import useAuthStore from "../zustand/authStore";

interface NavbarProps {
    isDropdownOpen: boolean;
    setIsDropdownOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDropdownOpen, setIsDropdownOpen }) => {


 const { user, isAuthenticated } = useAuthStore();

 return (
    <div className="nav">
        <div className="nav-header">
            <RiCheckDoubleLine style={{fontSize: "60px"}}/>
            <h1 className="nav-logo-text">Tasks</h1>
        </div>

        <div className="nav-profile-container" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="nav-avatar-container">
                <h2 className="nav-avatar-text">{user?.username[0].toUpperCase() || "?"}</h2>
            </div>
            <div className="nav-name-container">
                <p>{user?.username || "Please, log in!"}</p>
            </div>
        </div>
    </div>
 )
}


export default Navbar