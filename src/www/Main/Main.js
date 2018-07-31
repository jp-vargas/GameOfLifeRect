/**
 * Main Container
 */
import React, {Component} from "react";

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
const maxIteration = 10;

class Main extends Component{
    state={
        grid: Array(maxRows).fill().map(() => Array(maxCols).fill(false)),
        iteration: 0,
    };

    componentDidMount(){
        this.initializeGrid();
        this.interval = setInterval(this.nextStep, intervalTime);
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
        const {grid, iteration} = this.state;
        const newGrid = cloneObject(grid);

        for (let i = 0 ; i < maxRows ; i++){
            for(let j = 0 ; j < maxCols ; j++){
                let neighbors = 0;

                if (i < maxRows - 1 && grid[i + 1][j]) neighbors++;
                if (i > 0  && grid[i - 1][j]) neighbors++;
                if (j < maxCols - 1 && grid[i][j + 1]) neighbors++;
                if (j > 0 && grid[i][j - 1]) neighbors++;
                if (i > 0 && j > 0 && grid[i - 1][j - 1]) neighbors++;
                if (i < maxRows - 1 && j > 0 && grid[i + 1][j - 1]) neighbors++;
                if (i > 0 && j < maxCols - 1 && grid[i - 1][j + 1]) neighbors++;
                if (i < maxRows -1 && j < maxCols -1 && grid[i + 1][j + 1]) neighbors++;
                // Any live cell with fewer than two live neighbors dies, as if by under population.
                // Any live cell with more than three live neighbors dies, as if by overpopulation.
                if(grid[i][j]) if(neighbors < 2 || neighbors > 3 ) newGrid[i][j] = false;
                // Any live cell with two or three live neighbors lives on to the next generation.
                if(grid[i][j]) if(neighbors === 2 || neighbors === 3) newGrid[i][j] = true;
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                if(neighbors === 3 && !grid[i][j]) newGrid[i][j] = true;
            }
        }
        this.setState({
            grid: newGrid,
            iteration: iteration + 1
        });

        if ( iteration + 1 === maxIteration ){
            clearInterval(this.interval);
        }
    }

    render(){
        const {grid} = this.state;
        return(
            <Grid
                grid={grid}
                rows={maxRows}
                cols={maxCols}
            /> 
        );
    }
}

export default Main;
