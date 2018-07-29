/**
 * Cell Component
 */

import * as React from "react";

// styles
import "./styles/cell.css"

const Cell = (props) => (
    <div 
        className={
            props.cellState 
                ? "cell life" 
                : "cell dead"
        }
        id={props.id}
    />
);

export default Cell;
