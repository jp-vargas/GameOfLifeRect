/**
 * Grid Component
 */

import * as React from "react";

// components
import Cell from "../Cell/Cell.js";

// styles
import "./styles/grid.css";

const Grid = (props) => {
    const {grid, rows, cols} = props;
    const width = cols * 16;
    const rowsArray = [];

    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            const cellId = `${i}${j}`;

            rowsArray.push(
                <Cell
                    cellState={grid[i][j]}
                    key={cellId}
                    id={cellId}
                />
            );
        }
    }

    return(
        <div className="grid" style={{width:width}}>
            {rowsArray}
        </div>
    );
}

export default Grid;
