function Node(value) {
  this.next = null;
  this.value = value;
}

class LinkedList {
  constructor(headValue) {
    if (headValue !== undefined) {
      this.head = new Node(headValue);
      this.tail = this.head;
    }
  }

  appendToTail(value) {
    if (this.head === undefined) {
      this.head = this.tail = new Node(value);
    } else {
      this.tail.next = new Node(value);
      this.tail = this.tail.next;
    }
    return this.tail;
  }

  removeHead() {
    const oldHead = this.head;
    this.head = this.head.next;
    return oldHead;
  }

  findNode(value) {
    const search = (list) => {
      if (value === list.value) {
        return list;
      } else if (list.next === null) {
        return null;
      } else {
        return search(list.next);
      }
    };
    return search(this.head);
  }

  insertHead(value) {
    const newHead = new Node(value);
    const oldHead = this.head;
    this.head = newHead;
    newHead.next = oldHead;
    return this.head;
  }

  forEach(callback) {
    const excute = (list) => {
      if (list.next === null) {
        callback(list.value);
        return;
      } else {
        callback(list.value);
        excute(list.next);
      }
    };
    excute(this.head);
  }

  print() {
    const result = [];
    this.forEach((value) => result.push(value));
    return result.join(", ");
  }

  insertAfter(refNode, value) {
    const search = (list) => {
      if (refNode.value === list.value) {
        const oldNext = list.next;
        const insertedNode = new Node(value);
        insertedNode.next = oldNext;
        list.next = insertedNode;
        return this;
      } else {
        return search(list.next);
      }
    };
    return search(this.head);
  }

  removeAfter(refNode) {
    const search = (list) => {
      if (refNode === undefined || !Object.keys(refNode).includes("value")) {
        return this;
      } else if (refNode.value === list.value) {
        list.next = list.next.next;
        return this;
      } else {
        return search(list.next);
      }
    };
    return search(this.head);
  }
}
