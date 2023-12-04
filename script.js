class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift().element;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

//Copyright
document.getElementById("copyrightYear").textContent = new Date().getFullYear();

// Greeting Message
const getGreetingMsg = function (currentHour) {
  const greeting =
    currentHour < 5
      ? "Night"
      : currentHour < 12
      ? "Morning"
      : currentHour < 15
      ? "Noon"
      : currentHour < 17
      ? "Afternoon"
      : currentHour < 20
      ? "Evening"
      : "Night";

  return `Good ${greeting}`;
};

/**
 * Homepage Greeting Message
 */
const $greetElem = document.querySelector("[data-greeting]");
const currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg(currentHour);

/**
 *  Display Current Date
 */
const $currentDateElem = document.querySelector("[data-current-date]");
$currentDateElem.textContent = new Date().toDateString().replace(" ", ", ");

// Dark Light Theme
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );

  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/**************************************************************************************************************
 ***************************************************** GRAPH **************************************************
 ***************************************************************************************************************/

//Primary Arrays
const graph = {
  vertices: {},
  edges: new Set(),
  vertexPositions: new Map(),
};

// Buttons
const vertexBtn = document.getElementById("add-vertex");
const edgeBtn = document.getElementById("add-edge");
const findVertexBtn = document.getElementById("findVertexBtn");
const findBtn = document.getElementById("findBtn");
const removeVertexBtn = document.getElementById("remove-vertex");
const remEdgeBtn = document.getElementById("rem-edge");

// Inputs
const userVertex = document.getElementById("vertexValue");
const firstVertex = document.getElementById("edgeStart");
const endVertex = document.getElementById("edgeEnd");
const findVertex = document.getElementById("findVertexValue");
const startPoint = document.getElementById("startVertex");
const endPoint = document.getElementById("endVertex");
const removeVertexInput = document.getElementById("removeVertexValue");
const remEdgeInput1 = document.getElementById("firstEdge");
const remEdgeInput2 = document.getElementById("endEdge");

// Errors
const vertexErr = document.getElementById("vertexError");
const edgeStart = document.getElementById("startError");
const edgeEnd = document.getElementById("endError");
const findVertexError = document.getElementById("findVertexError");
const shortStart = document.getElementById("startPointError");
const shortEnd = document.getElementById("endPointError");
const removeVertexError = document.getElementById("removeVertexError");
const remEdgeError = document.getElementById("remEdgeError");
const remEndError = document.getElementById("remEndError");

// Displays
const displayConnectedEdges = document.getElementById(
  "displayVertexConnections"
);

vertexBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const pattern = /^[a-zA-Z1-9]{1,2}$/;
  const checkValue = userVertex.value;

  if (userVertex.value === "") {
    vertexErr.innerHTML = "Please Enter A Value";
  } else if (!pattern.test(userVertex.value)) {
    vertexErr.innerHTML = "Please enter a valid value (1-99 or any alphabet)";
  } else if (graph.vertices[checkValue]) {
    vertexErr.innerHTML = `${checkValue} is already in the graph`;
  } else {
    graph.vertices[checkValue] = true;
    userVertex.value = "";
    vertexErr.innerHTML = "";
    const x = Math.random() * (canvas.width - 2 * vertexRadius) + vertexRadius;
    const y = Math.random() * (canvas.height - 2 * vertexRadius) + vertexRadius;
    drawVertex(x, y, checkValue);
    graph.vertexPositions.set(checkValue, { x, y });
  }
  console.log(graph.vertices);
});

edgeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const startValue = firstVertex.value;
  const endValue = endVertex.value;

  if (startValue === "") {
    edgeStart.innerHTML = "Please Enter A Value";
  } else if (!graph.vertices[startValue]) {
    edgeStart.innerHTML = "Vertex Not Found";
  } else {
    edgeStart.innerHTML = "";
    firstVertex.value = "";
  }

  if (endValue === "") {
    edgeEnd.innerHTML = "Please Enter A Value";
  } else if (!graph.vertices[endValue]) {
    edgeEnd.innerHTML = "Vertex Not Found";
  } else if (endValue === startValue) {
    edgeEnd.innerHTML = "Input Different Values";
  } else if (
    graph.edges.has(`${startValue}-${endValue}`) ||
    graph.edges.has(`${endValue}-${startValue}`)
  ) {
    edgeEnd.innerHTML = `${startValue} & ${endValue} is already in the graph`;
  } else {
    edgeEnd.innerHTML = "";
    endVertex.value = "";
    const startPos = graph.vertexPositions.get(startValue);
    const endPos = graph.vertexPositions.get(endValue);
    drawEdge(startPos.x, startPos.y, endPos.x, endPos.y);
    graph.edges.add(`${startValue}-${endValue}`);
    console.log(graph.edges);
  }
});

findVertexBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const getVertex = findVertex.value;

  if (findVertex.value === "") {
    findVertexError.innerHTML = "Please Enter a Vertex to be found";
  } else if (!graph.vertices[getVertex]) {
    findVertexError.innerHTML = "Vertex Not Found";
  } else {
    findVertexError.innerHTML = "";
    findVertex.value = "";
    displayEdges(getVertex);
  }
});

findBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let startPath = startPoint.value;
  let endPath = endPoint.value;

  if (!graph.vertices[startPath]) {
    shortStart.innerHTML = "Vertex Not Found";
  } else {
    shortStart.innerHTML = "";
    console.log(startPath);
  }

  if (!graph.vertices[endPath]) {
    shortEnd.innerHTML = "Vertex Not Found";
  } else {
    shortEnd.innerHTML = "";
    console.log(endPath);
  }

  const shortestPath = findShortestPath(graph, startPath, endPath);

  if (shortestPath) {
    displayShortestPath(shortestPath);
    startPoint.value = "";
    endPoint.value = "";
  } else {
    console.log("No path found");
  }
});

removeVertexBtn.addEventListener("click", () => {
  const vertexToRemove = removeVertexInput.value;
  if (graph.vertices[vertexToRemove]) {
    delete graph.vertices[vertexToRemove];
    for (const edge of graph.edges) {
      const [start, end] = edge.split("-");
      if (start === vertexToRemove || end === vertexToRemove) {
        graph.edges.delete(edge);
      }
    }
    // Clear the canvas
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw all vertices and edges except the removed one
    for (const vertex in graph.vertices) {
      const { x, y } = graph.vertexPositions.get(vertex);
      drawVertex(x, y, vertex);
    }
    for (const edge of graph.edges) {
      const [start, end] = edge.split("-");
      const startPos = graph.vertexPositions.get(start);
      const endPos = graph.vertexPositions.get(end);
      drawEdge(startPos.x, startPos.y, endPos.x, endPos.y);
    }
    removeVertexError.innerHTML = "";
    removeVertexInput.value = "";
  } else {
    removeVertexError.innerHTML = "Vertex not found";
  }
});

remEdgeBtn.addEventListener("click", () => {
  const startVertex = remEdgeInput1.value;
  const endVertex = remEdgeInput2.value;

  if (
    graph.edges.has(`${startVertex}-${endVertex}`) ||
    graph.edges.has(`${endVertex}-${startVertex}`)
  ) {
    graph.edges.delete(`${startVertex}-${endVertex}`);
    graph.edges.delete(`${endVertex}-${startVertex}`);

    // Code to remove edge from the canvas
    const startX = graph.vertexPositions.get(startVertex).x;
    const startY = graph.vertexPositions.get(startVertex).y;
    const endX = graph.vertexPositions.get(endVertex).x;
    const endY = graph.vertexPositions.get(endVertex).y;

    ctx.clearRect(
      Math.min(startX, endX),
      Math.min(startY, endY),
      Math.abs(startX - endX),
      Math.abs(startY - endY)
    );

    console.log(`Edge between ${startVertex} and ${endVertex} removed`);
    remEdgeInput1.value = "";
    remEdgeInput2.value = "";
    remEdgeError.innerHTML = "";
  } else {
    remEdgeError.innerHTML = "Edge not found";
  }
});

// Function to check paths
function checkForPath(path) {
  for (const edge of graph.edges) {
    if (isEqualSet(edge, path)) {
      return true;
    }
  }
  return false;
}

// To Check Both Values
function isEqualSet(set1, set2) {
  if (set1.size !== set2.size) return false;
  for (const item of set1) {
    if (!set2.has(item)) return false;
  }
  return true;
}

// Function to find connected edges
function displayEdges(vertex) {
  const connectedEdges = Array.from(graph.edges).filter((edge) => {
    const [start, end] = edge.split("-");
    return start === vertex || end === vertex;
  });

  if (connectedEdges.length > 0) {
    displayConnectedEdges.innerHTML = `Edges connected to ${vertex}: ${connectedEdges.join(
      ", "
    )}`;
  } else {
    displayConnectedEdges.innerHTML = `No edges connected to ${vertex}`;
  }
}

// Function to find shortest path
function findShortestPath(graph, startNode, endNode) {
  const queue = new PriorityQueue();
  const distance = {};
  const previous = {};

  for (let vertex in graph.vertices) {
    distance[vertex] = vertex === startNode ? 0 : Infinity;
    previous[vertex] = null;
    queue.enqueue(vertex, distance[vertex]);
  }

  while (!queue.isEmpty()) {
    const current = queue.dequeue();

    if (current === endNode) {
      // Reconstruct the path from end to start
      const path = [];
      let node = endNode;
      while (node) {
        path.unshift(node);
        node = previous[node];
      }
      return path;
    }

    for (let neighbor in graph.vertices) {
      if (graph.edges.has(`${current}-${neighbor}`)) {
        const dist = distance[current] + 1;
        if (dist < distance[neighbor]) {
          distance[neighbor] = dist;
          previous[neighbor] = current;
          queue.enqueue(neighbor, distance[neighbor]);
        }
      }
    }
  }

  return null; // No path found
}

// Display Shortest Path
function displayShortestPath(path) {
  console.log(path);
  const lengthSpan = document.getElementById("shortestPathLength");
  const verticesSpan = document.getElementById("shortestPathVertices");

  const length = path.length - 1; // Length is the number of edges, which is the number of vertices - 1
  lengthSpan.innerHTML = "Length: " + length;

  let vertices = "";
  for (let i = 0; i < path.length; i++) {
    vertices += path[i];
    if (i < path.length - 1) {
      vertices += " -> ";
    }
  }
  verticesSpan.innerHTML = "Vertices: " + vertices;
}

/**************************************************************************************************************
 ***************************************************** CANVAS **************************************************
 ***************************************************************************************************************/
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
const vertexRadius = 7;

function drawVertex(x, y, value) {
  ctx.beginPath();
  ctx.arc(x, y, vertexRadius, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.font = "8px";
  ctx.textBaseline = "middle";
  ctx.fillText(value, x, y);
}

function drawEdge(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = "red";
  ctx.stroke();
  ctx.closePath();
}

// Clear Modal
const clearBtn = document.getElementById("clearBtn");
const clearModal = document.getElementById("clearModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    clearModal.classList.add("show-clear");
    document.body.classList.add("modal-open");
  });
}

if (noBtn) {
  noBtn.addEventListener("click", () => {
    clearModal.classList.remove("show-clear");
    document.body.classList.remove("modal-open");
  });
}

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    graph.vertices = {};
    graph.edges = new Set();
    const canvas = document.getElementById("graphCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearModal.classList.remove("show-clear");
    document.body.classList.remove("modal-open");
  });
}
