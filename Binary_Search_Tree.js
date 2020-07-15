class BinarySearchTree {
  constructor(value) {
    this.value = value;
    this.left === undefined;
    this.right === undefined;
  }

  insert(value) {
    if (this.value === undefined) {
      this.value = value;
    } else {
      const newTree = new BinarySearchTree(value);
      const findPosition = (tree) => {
        if (value < tree.value) {
          if (tree.left) {
            findPosition(tree.left);
          } else {
            tree.left = newTree;
          }
        } else if (value > tree.value) {
          if (tree.right) {
            findPosition(tree.right);
          } else {
            tree.right = newTree;
          }
        }
      };
      findPosition(this);
    }
    return this;
  }

  contains(value) {
    let isFound = false;
    const search = (tree) => {
      if (tree.value === value) {
        isFound = true;
        return;
      } else if (value < tree.value) {
        if (tree.left) {
          search(tree.left);
        } else {
          return;
        }
      } else if (value > tree.value) {
        if (tree.right) {
          search(tree.right);
        } else {
          return;
        }
      }
    };
    search(this);
    return isFound;
  }

  // sub by sub
  traverseDepthFirstInOrder(callback) {
    // left - root - right
    // double nested, both subtree and root tree
    const traverse = (tree) => {
      if (tree.left) {
        traverse(tree.left);
      }
      callback(tree);
      if (tree.right) {
        traverse(tree.right);
      }
    };
    return traverse(this);
  }

  traverseDepthFirstPreOrder(callback) {
    // root - left - right
    const traverse = (tree) => {
      callback(tree);
      if (tree.left) {
        traverse(tree.left);
      }
      if (tree.right) {
        traverse(tree.right);
      }
    };
    return traverse(this);
  }

  traverseDepthFirstPostOrder(callback) {
    // left - right - root
    const traverse = (tree) => {
      if (tree.left) {
        traverse(tree.left);
      }
      if (tree.right) {
        traverse(tree.right);
      }
      callback(tree);
    };
    return traverse(this);
  }

  // level by level
  traverseBreadthFirst(callback) {
    let queue = [];
    queue.push(this);

    while (queue.length > 0) {
      let currentNode = queue.shift();
      callback(currentNode);
      if (currentNode.left !== undefined) {
        queue.push(currentNode.left);
      }

      if (currentNode.right !== undefined) {
        queue.push(currentNode.right);
      }
    }
  }

  checkIfFull() {
    let isFull = true;
    const check = (tree) => {
      if (tree.left && tree.right) {
        check(tree.left);
        check(tree.right);
      } else if (tree.left && !tree.right) {
        isFull = false;
        return;
      } else if (!tree.left && tree.right) {
        isFull = false;
        return;
      }
    };

    check(this);
    return isFull;
  }
  getHeight(tree) {
    if (tree === undefined) {
      return 0;
    }
    let left = this.getHeight(tree.left);
    let right = this.getHeight(tree.right);
    return Math.max(left, right) + 1;
  }

  checkIfBalanced() {
    const leftHeight = this.getHeight(this.left);
    const rightHeight = this.getHeight(this.right);
    return Math.abs(leftHeight - rightHeight) < 1;
  }
}
