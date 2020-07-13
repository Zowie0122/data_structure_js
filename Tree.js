class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(value) {
    const newChild = new Tree(value);
    // below 'this' is the child node you want to add child to, not has to be the root
    this.children.push(newChild);
    return newChild;
  }

  contains(value) {
    let isFound = false;
    const search = (tree) => {
      if (tree.value === value) {
        isFound = true;
      } else {
        for (const i of tree.children) {
          search(i);
        }
      }
    };

    search(this);
    return isFound;
  }

  traverseDepthFirst(fn) {}

  traverseBreadthFirst(fn) {}
}
