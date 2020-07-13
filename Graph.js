//Adjacency List

class Graph {
  constructor() {
    this.nodes = {};
  }
  addNode(value) {
    this.nodes[value.toString()] = [];
  }
  contains(value) {
    return Object.keys(this.nodes).includes(value.toString());
  }
  hasEdge(value1, value2) {
    return this.nodes[value1.toString()].includes(value2);
  }
  addEdge(value1, value2) {
    if (
      this.contains(value1) &&
      this.contains(value2) &&
      !this.hasEdge(value1, value2)
    ) {
      this.nodes[value1.toString()].push(value2);
      this.nodes[value2.toString()].push(value1);
    } else {
      return "Invalid node value";
    }
  }
  removeEdge(value1, value2) {
    if (
      this.contains(value1) &&
      this.contains(value2) &&
      this.hasEdge(value1, value2)
    ) {
      this.nodes[value1.toString()] = this.nodes[value1.toString()].filter(
        (ele) => ele !== value2
      );
      this.nodes[value2.toString()] = this.nodes[value2.toString()].filter(
        (ele) => ele !== value1
      );
    }
  }
  removeNode(value) {
    this.nodes[value.toString()].forEach((ele) => {
      this.nodes[ele.toString()] = this.nodes[ele.toString()].filter(
        (target) => target !== value
      );
    });
    delete this.nodes[value.toString()];
  }
  forEach(fn) {
    Object.keys(this.nodes).forEach((key) => fn(key));
  }
  traverseDepthFirst(start, fn) {
    let stack = [start];
    let visited = {};
    while (stack.length > 0) {
      if (visited[stack[0].toString()] !== true) {
        fn(stack[0]);
        visited[stack[0].toString()] = true;
        const connection = this.nodes[stack[0].toString()];
        stack.shift();
        stack = [...connection, ...stack];
      } else {
        stack.shift();
      }
    }
  }
  traverseBreadthFirst(start, fn) {
    let queue = [start];
    let visited = {};
    while (queue.length > 0) {
      if (visited[queue[0].toString()] !== true) {
        fn(queue[0]);
        visited[queue[0].toString()] = true;
        const connection = this.nodes[queue[0].toString()];
        queue.shift();
        queue = [...queue, ...connection];
      } else {
        queue.shift();
      }
    }
  }
}
