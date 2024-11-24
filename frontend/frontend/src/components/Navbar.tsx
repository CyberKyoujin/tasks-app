import React from "react";
import { RiCheckDoubleLine } from "react-icons/ri";


const Navbar: React.FC<{ setIsDropdownOpen: (open: boolean) => void }> = ({ setIsDropdownOpen }) => {
 return (
    <div className="nav">
        <div className="nav-header">
            <RiCheckDoubleLine style={{fontSize: "60px"}}/>
            <h1 className="nav-logo-text">Tasks</h1>
        </div>

        <div className="nav-profile-container" onClick={() => setIsDropdownOpen(true)}>
            <div className="nav-avatar-container">
                <h2 className="nav-avatar-text">M</h2>
            </div>
            <div className="nav-name-container">
                <p>Adam Peterson</p>
            </div>
        </div>
    </div>
 )
}


export default Navbar