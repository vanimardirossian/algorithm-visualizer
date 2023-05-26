function renderGrid(cellSize) {
    for (let i = 0; i < nRows; i++) {
        let row = document.createElement("div");
        row.classList.add("row", `row${i}`);
        graphScreen.appendChild(row);

        for (let j = 0; j < nCols; j++) {
            let cell = document.createElement("div");
            if (i == 0 && j == 0) {
                cell.classList.add("start_cell");
            }

            if (i == nRows - 1 && j == nCols - 1) {
                cell.classList.add("end_cell");
            }
            cell.classList.add(
                "cell",
                `cell_${i}_${j}`,
                `cell_${j + i * nCols}`,
                `cell${j}`
            );
            cell.style.height = `${cellSize}px`;
            cell.style.width = `${cellSize}px`;
            row.appendChild(cell);
        }
    }

    let start = document.querySelector(".start_cell");
    let end = document.querySelector(".end_cell");
    start.innerHTML = "&#10095;";
    end.innerHTML = "&#10094;";
}

function constructMazeArray(nRows, nCols) {
    let mazeArray = new Array(nRows);
    for (let i = 0; i < nRows; i++) {
        mazeArray[i] = new Array(nCols);
        for (let j = 0; j < nCols; j++) {
            mazeArray[i][j] = 1;
        }
    }
    return mazeArray;
}

function flipValue(mazeArray, cellClasses) {
    let cellFormat = /^cell_(\d+)_(\d+)$/;
    let currentCell = cellClasses.find((value) => cellFormat.test(value));
    let splitCell = currentCell.split("_");
    let i = parseInt(splitCell[1]);
    let j = parseInt(splitCell[2]);
    mazeArray[i][j] = 1 - mazeArray[i][j];
}

function constructGraph(maze, nRows, nCols) {
    let g = new Graph(nRows * nCols);
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            if (maze[i][j] === 0) continue;

            let v1 = i * nCols + j;
            let v2;

            if (i != 0) {
                v2 = (i - 1) * nCols + j;

                if (maze[i - 1][j] === 1) {
                    g.addEdge(v1, v2);
                }
            }

            if (i != nRows - 1) {
                v2 = (i + 1) * nCols + j;
                if (maze[i + 1][j] == 1) {
                    g.addEdge(v1, v2);
                }
            }

            if (j != 0) {
                v2 = i * nCols + (j - 1);
                if (maze[i][j - 1] == 1) {
                    g.addEdge(v1, v2);
                }
            }

            if (j != nCols - 1) {
                v2 = i * nCols + (j + 1);
                if (maze[i][j + 1] == 1) {
                    g.addEdge(v1, v2);
                }
            }
        }
    }
    return g;
}

function wait(mil) {
    return new Promise((resolve) => {
        setTimeout(resolve, mil);
    });
}

function getPath(parent, destination) {
    let path = new Array();
    while (destination != -1) {
        if (parent[destination] == -1 && destination != 0) {
            return false;
        }

        path.unshift(destination);
        destination = parent[destination];
    }

    return path;
}

async function drawPath(path) {
    for (let i = 0; i < path.length; i++) {
        await wait(waitTime);
        document.querySelector(`.cell_${path[i]}`).style.backgroundColor =
            cinnabarTransparent;
    }
}

async function processDFS(graph) {
    let marked = new Array(graph.vertexCount());
    for (let i = 0; i < graph.vertexCount(); i++) {
        marked[i] = false;
    }
    debugger;

    let path = new Array();
    let source = 0;
    let destination = graph.vertexCount() - 1;
    await DFS(graph, marked, source, destination, path);
    drawPath(path);
}

async function processBFS(graph) {
    let source = 0;
    let destination = graph.vertexCount() - 1;
    let parent = await BFS(graph, source);
    path = getPath(parent, destination);
    drawPath(path);
}

async function markVisited(marked, vertex) {
    await wait(waitTime);
        document.querySelector(`.cell_${vertex}`).style.backgroundColor =
            yaleBlueTransparent;
    marked[vertex] = true;
}

function processTraversal(traversal) {
    return async function() {
        setWaitTime();
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
        g = constructGraph(mazeArray, nRows, nCols);
        await traversal(g)

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        }
    
    }
}

function setWaitTime() {
    if (delayInput.value != "") {
        waitTime = parseInt(delayInput.value);
    } else {
        waitTime = 0;
    }
}
