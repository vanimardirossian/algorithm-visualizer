class Graph {
    constructor(nVertices) {
        this.edges = new Array(nVertices);
        for (let i = 0; i < nVertices; i++) {
            this.edges[i] = new Array();
        }
    }

    addEdge(vertex1, vertex2) {
        this.edges[vertex1].push(vertex2);
    }

    vertexCount() {
        return this.edges.length;
    }
}
