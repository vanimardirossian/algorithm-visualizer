// Grid construction

let graphScreen = document.querySelector(".graphscreen_inner");
let graphScreenPadding = 10;
let cellSize = 40;
let waitTime = 0;

let screenWidth = graphScreen.clientWidth - 2 * graphScreenPadding;
let screenHeight = graphScreen.clientHeight - 2 * 2 * graphScreenPadding;

let nRows = Math.floor(screenHeight / cellSize);
let nCols = Math.floor(screenWidth / cellSize);

renderGrid(cellSize);

// Maze array construction

let mazeArray = constructMazeArray(nRows, nCols);

let cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    let classes = cell.getAttribute("class").split(" ");
    if (!classes.includes("start_cell") && !classes.includes("end_cell")) {
        cell.addEventListener("click", (event) => {
            flipValue(mazeArray, classes);
            cell.classList.toggle("toggled_start");
            console.log(mazeArray);
        });
    }
});

// Graph construction
let buttons = document.querySelectorAll(".button");
let delayInput = document.querySelector(".traversal_delay");
let dfsButton = document.querySelector(".dfs");
let bfsButton = document.querySelector(".bfs");
let g;


dfsButton.addEventListener("click", processTraversal(processDFS));
bfsButton.addEventListener("click", processTraversal(processBFS));

