let arrays = document.querySelector(".arrays");
let screenWidth = arrays.clientWidth - (2 * 10);
let screenHeight = arrays.clientHeight - (2 * 10);
let arraySize = 100;
arr = [];

for (let i = 0; i < arraySize; i++) {
    arr.push(randomInRange(0, screenHeight - 5));
}

for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("bars");
    bar.style.height = `${arr[i]}px`;
    bar.style.width = `${screenWidth / arraySize}px`;
    arrays.appendChild(bar);
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let graphs = document.querySelector(".graphs");
let graphScreenPadding = 40;
let cellSize = 20;

screenWidth = graphs.clientWidth - (2 * graphScreenPadding);
screenHeight = graphs.clientHeight - (2 * graphScreenPadding);

let nRows =  Math.floor(screenHeight / cellSize);
let nCols = Math.floor(screenWidth / cellSize);

function renderGraph(cellSize) {
    for (let i = 0; i < nRows; i++) {
        let row = document.createElement("div");
        row.classList.add("row", `row${i}`);
        graphs.appendChild(row);
    
        for (let j = 0; j < nCols; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell", `cell${j}`);
            cell.style.height = `${cellSize}px`;
            cell.style.width = `${cellSize}px`;
            row.appendChild(cell);
        }
    }
}

renderGraph(cellSize)
