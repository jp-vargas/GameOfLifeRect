/**
 * Main Container
 */
import * as React from "react";

// components
import Grid from "./components/Grid/Grid.js";

// styles
import "./styles/main.css";

// helpers
import {cloneObject} from "./helpers";

// constants
const maxRows = 50;
const maxCols = 50;
const intervalTime = 1000;

class Main extends React.Component<*>{
    state={
        grid: Array(maxRows).fill().map(() => Array(maxCols).fill(false))
    };

    componentDidMount(){
        this.initializeGrid();
        setInterval(this.nextStep, intervalTime);
    }

    initializeGrid = () => {
        const {grid} = this.state;
        const newGrid = cloneObject(grid);

        newGrid[0][0] = true;
        newGrid[0][1] = true;
        newGrid[1][0] = true;
        newGrid[1][3] = true;
        newGrid[2][1] = true;
        newGrid[2][2] = true;

        this.setState({grid:newGrid});
    }

    nextStep = () => {
        const {grid} = this.state;
        const newGrid = cloneObject(grid);

        for (let i = 0 ; i < maxRows ; i++){
            for(let j = 0 ; j < maxCols ; j++){
                let neighbors = 0
                //Count neighbors
                if (i < maxRows - 1) if (grid[i + 1][j]) neighbors++; //right neighbor
                if (i > 1) if (grid[i - 1 ][j]) neighbors++; //left neighbor
                if (j > 0) if (grid[j][j + 1]) neighbors++; //bottom neighbor
                if (j > 1) if (grid[j][j - 1 ]) neighbors++; //top neighbor

                // Any live cell with fewer than two live neighbors dies, as if by under population.
                if(newGrid[i][j] && neighbors < 2) newGrid[i][j] = false;
                // Any live cell with two or three live neighbors lives on to the next generation.
                if(newGrid[i][j] && neighbors === 2 || neighbors === 3) newGrid[i][j] = true;
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                if(!newGrid[i][j] && neighbors === 3) newGrid[i][j] = true;
                //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
            }
        }
        this.setState({grid:newGrid});
    }

    render(){
        const {grid} = this.state;
        return(
            <div>
                <Grid
                    grid={grid}
                    rows={maxRows}
                    cols={maxCols}
                /> 
            </div>
        );
    }
}

export default Main;
