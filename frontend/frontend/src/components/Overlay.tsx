import React from "react";

interface OverlayProps {
    createMenuOpen: boolean;
    setCreateMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const Overlay: React.FC<OverlayProps> = ({createMenuOpen, setCreateMenuOpen}) => {
    return (
        <div 
        className="overlay" 
        style={{display: createMenuOpen ? "block": "none"}}
        onClick={() => setCreateMenuOpen(!createMenuOpen)}>
    
        </div>
    )
}


export default Overlay