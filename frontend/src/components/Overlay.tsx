import React from "react";
import { OverlayProps } from "../types";

const Overlay: React.FC<OverlayProps> = ({createMenuOpen, setCreateMenuOpen}) => {
    return (
        <div 
        className="overlay" 
        data-testid="overlay"
        style={{display: createMenuOpen ? "block": "none"}}
        onClick={() => setCreateMenuOpen(!createMenuOpen)}>
        </div>
    )
}


export default Overlay