async function BFS(graph, source) {
    let vertexCount = graph.vertexCount();
    let parent = new Array(vertexCount);
    for (let i = 0; i < vertexCount; i++)
        parent[i] = -1;
    let marked = new Array(vertexCount);
    let queue = new Array();
    queue.push(source);
    await markVisited(marked, source);
    // marked[source] = true;
    parent[source] = -1;
    while (queue.length != 0) {
        console.log("in bfs");
        source = queue.shift();
        for (let vertex of graph.edges[source]) {
            if (!marked[vertex]) {
                queue.push(vertex);
                await markVisited(marked, vertex);
                // marked[vertex] = true;
                parent[vertex] = source;
            }
        }
    }
    return parent;
}


async function DFS(graph, marked, source, destination, path) {
    if (source === destination) {
        path.unshift(source);
        return true;
    }
    // marked[source] = true;
    await markVisited(marked, source);
    for (let vertex of graph.edges[source]) {
        if (!marked[vertex]) {
            let dfsResult = await DFS(graph, marked, vertex, destination, path);
            if (dfsResult === true) {
                path.unshift(source);
                return true;
            }
        }
    }
    return false;
}
